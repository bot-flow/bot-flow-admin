"use client";

import { Button } from "@/components/tailgrids/core/button";
import type { WorkflowDefinition } from "@/services/api/workflows/types";

interface WorkflowToolbarProps {
  definition: WorkflowDefinition | null;
  dirty: boolean;
  busy: boolean;
  onValidate: () => void;
  onSave: () => void;
  onPublish: () => void;
  onStart: () => void;
  onFit: () => void;
}

export function WorkflowToolbar({
  definition,
  dirty,
  busy,
  onValidate,
  onSave,
  onPublish,
  onStart,
  onFit,
}: WorkflowToolbarProps) {
  const status = dirty
    ? "Unsaved changes"
    : definition
      ? `${definition.status} · v${definition.version}`
      : "New workflow";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-card-border bg-card-background px-4 py-3">
      <div>
        <p className="font-medium text-text-primary">Customer approval</p>
        <p className="text-xs capitalize text-text-tertiary">{status}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" appearance="ghost" isDisabled={busy} onPress={onFit}>
          Fit view
        </Button>
        <Button size="sm" appearance="outline" isDisabled={busy} onPress={onValidate}>
          Validate
        </Button>
        <Button size="sm" appearance="outline" isDisabled={busy} onPress={onSave}>
          Save draft
        </Button>
        <Button size="sm" isDisabled={busy} onPress={onPublish}>
          Publish
        </Button>
        <Button
          size="sm"
          variant="success"
          isDisabled={busy || dirty || definition?.status !== "published"}
          onPress={onStart}
        >
          Start instance
        </Button>
      </div>
    </div>
  );
}
