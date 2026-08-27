import { apiGet, apiPost, apiPut } from "@/services/api/client";
import type {
  WorkflowDefinition,
  WorkflowInstance,
  WorkflowValidation,
} from "./types";

export function getWorkflowDefinition(
  workflowKey: string,
): Promise<WorkflowDefinition> {
  return apiGet(`/workflows/${workflowKey}`);
}

export function validateWorkflow(bpmnXml: string): Promise<WorkflowValidation> {
  return apiPost("/workflows/validate", { bpmn_xml: bpmnXml });
}

export function saveWorkflowDefinition(
  workflowKey: string,
  name: string,
  bpmnXml: string,
): Promise<WorkflowDefinition> {
  return apiPut(`/workflows/${workflowKey}`, {
    name,
    bpmn_xml: bpmnXml,
  });
}

export function publishWorkflowDefinition(
  workflowKey: string,
): Promise<WorkflowDefinition> {
  return apiPost(`/workflows/${workflowKey}/publish`);
}

export function startWorkflowInstance(
  workflowKey: string,
  data: Record<string, unknown> = {},
): Promise<WorkflowInstance> {
  return apiPost(`/workflows/${workflowKey}/instances`, { data });
}

export function completeWorkflowTask(
  instanceId: string,
  taskId: string,
  data: Record<string, unknown> = {},
): Promise<WorkflowInstance> {
  return apiPost(
    `/workflows/instances/${instanceId}/tasks/${taskId}/complete`,
    { data },
  );
}
