"use client";

import { Button } from "@/components/tailgrids/core/button";
import type { WorkflowInstance } from "@/services/api/workflows/types";

interface ExecutionPanelProps {
  instance: WorkflowInstance | null;
  busy: boolean;
  onCompleteTask: (taskId: string) => void;
}

export function ExecutionPanel({
  instance,
  busy,
  onCompleteTask,
}: ExecutionPanelProps) {
  return (
    <aside className="w-full border-t border-card-border bg-card-background p-4 xl:w-80 xl:border-t-0 xl:border-l">
      <h2 className="font-semibold text-text-primary">Execution</h2>
      {!instance ? (
        <p className="mt-2 text-sm leading-5 text-text-tertiary">
          Publish the current definition, then start an instance to inspect and complete human tasks.
        </p>
      ) : (
        <div className="mt-3 space-y-4">
          <div className="rounded-lg bg-background-soft-50 p-3 text-sm">
            <p className="font-medium capitalize text-text-primary">{instance.status}</p>
            <p className="mt-1 break-all text-xs text-text-tertiary">
              {instance.id} · revision {instance.revision}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-text-tertiary uppercase">
              Ready human tasks
            </p>
            {instance.ready_tasks.length === 0 ? (
              <p className="mt-2 text-sm text-text-tertiary">No task is waiting for input.</p>
            ) : (
              <div className="mt-2 space-y-2">
                {instance.ready_tasks.map((task) => (
                  <div key={task.id} className="rounded-lg border border-card-border p-3">
                    <p className="text-sm font-medium text-text-primary">{task.name}</p>
                    <p className="mt-1 text-xs text-text-tertiary">{task.element_id}</p>
                    <Button
                      className="mt-3 w-full"
                      size="sm"
                      variant="success"
                      isDisabled={busy}
                      onPress={() => onCompleteTask(task.id)}
                    >
                      Complete task
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-text-tertiary uppercase">
              Workflow data
            </p>
            <pre className="mt-2 max-h-52 overflow-auto rounded-lg bg-background-soft-50 p-3 text-xs text-text-secondary">
              {JSON.stringify(instance.data, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </aside>
  );
}
