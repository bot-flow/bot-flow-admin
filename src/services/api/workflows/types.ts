export type WorkflowDefinitionStatus = "draft" | "published";

export interface WorkflowValidation {
  valid: boolean;
  process_id: string | null;
  process_name: string | null;
  element_count: number;
  warnings: string[];
  errors: string[];
}

export interface WorkflowDefinition {
  id: string;
  workflow_key: string;
  name: string;
  process_id: string;
  version: number;
  status: WorkflowDefinitionStatus;
  checksum: string;
  bpmn_xml: string;
  created_at: string;
  updated_at: string;
}

export interface WorkflowTask {
  id: string;
  element_id: string;
  name: string;
  state: string;
  lane: string | null;
}

export interface WorkflowInstance {
  id: string;
  workflow_key: string;
  definition_version: number;
  process_id: string;
  status: "running" | "completed" | "error";
  data: Record<string, unknown>;
  ready_tasks: WorkflowTask[];
  active_element_ids: string[];
  completed_element_ids: string[];
  revision: number;
  created_at: string;
  updated_at: string;
}
