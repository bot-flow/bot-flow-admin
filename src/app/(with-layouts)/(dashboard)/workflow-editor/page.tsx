import type { Metadata } from "next";
import { WorkflowWorkspace } from "./_components/workflow-workspace";

export const metadata: Metadata = {
  title: "Workflow editor",
};

export default function WorkflowEditorPage() {
  return (
    <div className="mt-6 space-y-5 px-2 lg:px-5">
      <div className="px-0 lg:px-1">
        <h1 className="mb-1 text-[28px] leading-8 font-medium text-text-primary">
          Workflow editor
        </h1>
        <p className="text-sm leading-5 text-text-tertiary">
          Model BPMN 2.0 processes and execute published versions with SpiffWorkflow.
        </p>
      </div>
      <WorkflowWorkspace />
    </div>
  );
}
