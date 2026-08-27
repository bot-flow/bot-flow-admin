"use client";

import { ApiError } from "@/services/api/client";
import {
  completeWorkflowTask,
  getWorkflowDefinition,
  publishWorkflowDefinition,
  saveWorkflowDefinition,
  startWorkflowInstance,
  validateWorkflow,
} from "@/services/api/workflows";
import type {
  WorkflowDefinition,
  WorkflowInstance,
} from "@/services/api/workflows/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { BpmnModeler, type BpmnModelerHandle } from "./bpmn-modeler";
import { DEFAULT_BPMN_XML } from "./default-bpmn";
import { ExecutionPanel } from "./execution-panel";
import { WorkflowToolbar } from "./workflow-toolbar";

const WORKFLOW_KEY = "customer-approval";
const WORKFLOW_NAME = "Customer approval";

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unexpected workflow error";
}

export function WorkflowWorkspace() {
  const modelerRef = useRef<BpmnModelerHandle>(null);
  const [xml, setXml] = useState(DEFAULT_BPMN_XML);
  const [definition, setDefinition] = useState<WorkflowDefinition | null>(null);
  const [instance, setInstance] = useState<WorkflowInstance | null>(null);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    getWorkflowDefinition(WORKFLOW_KEY)
      .then((loaded) => {
        setDefinition(loaded);
        setXml(loaded.bpmn_xml);
      })
      .catch((error: unknown) => {
        if (!(error instanceof ApiError && error.status === 404)) {
          toast.error(errorMessage(error));
        }
      })
      .finally(() => setBusy(false));
  }, []);

  const exportXml = useCallback(async () => {
    const currentXml = await modelerRef.current?.exportXml();
    if (!currentXml) throw new Error("The BPMN modeler is not ready");
    return currentXml;
  }, []);

  const runAction = useCallback(async (action: () => Promise<void>) => {
    setBusy(true);
    try {
      await action();
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      setBusy(false);
    }
  }, []);

  const handleValidate = () =>
    runAction(async () => {
      const result = await validateWorkflow(await exportXml());
      if (!result.valid) {
        toast.error(result.errors.join("; "));
        return;
      }
      const warning = result.warnings[0];
      toast.success(
        warning
          ? `Valid with warning: ${warning}`
          : `Valid BPMN process with ${result.element_count} elements`,
      );
    });

  const handleSave = () =>
    runAction(async () => {
      const currentXml = await exportXml();
      const saved = await saveWorkflowDefinition(WORKFLOW_KEY, WORKFLOW_NAME, currentXml);
      setDefinition(saved);
      setDirty(false);
      toast.success(`Draft v${saved.version} saved`);
    });

  const handlePublish = () =>
    runAction(async () => {
      const currentXml = await exportXml();
      const saved = await saveWorkflowDefinition(WORKFLOW_KEY, WORKFLOW_NAME, currentXml);
      const published = await publishWorkflowDefinition(WORKFLOW_KEY);
      setDefinition(published);
      setDirty(false);
      toast.success(`Version ${saved.version} published`);
    });

  const handleStart = () =>
    runAction(async () => {
      const started = await startWorkflowInstance(WORKFLOW_KEY, {
        started_from: "workflow-editor",
      });
      setInstance(started);
      toast.success("Workflow instance started");
    });

  const handleCompleteTask = (taskId: string) =>
    runAction(async () => {
      if (!instance) return;
      const updated = await completeWorkflowTask(instance.id, taskId, {
        last_completed_at: new Date().toISOString(),
      });
      setInstance(updated);
      toast.success(updated.status === "completed" ? "Workflow completed" : "Task completed");
    });

  return (
    <div className="overflow-hidden rounded-xl border border-card-border bg-card-background">
      <WorkflowToolbar
        definition={definition}
        dirty={dirty}
        busy={busy}
        onValidate={handleValidate}
        onSave={handleSave}
        onPublish={handlePublish}
        onStart={handleStart}
        onFit={() => modelerRef.current?.fitViewport()}
      />
      <div className="flex flex-col xl:flex-row">
        <div className="min-w-0 flex-1 overflow-hidden">
          <BpmnModeler
            ref={modelerRef}
            xml={xml}
            onChanged={() => setDirty(true)}
            onImportError={(message) => toast.error(message)}
          />
        </div>
        <ExecutionPanel
          instance={instance}
          busy={busy}
          onCompleteTask={handleCompleteTask}
        />
      </div>
    </div>
  );
}
