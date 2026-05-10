"use client";

import { ButtonPrimary } from "@/components/button-primary";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      <h1 className="text-card-heading text-ink mb-3">Workspace Settings</h1>
      <p className="text-body-default text-slate mb-8">
        Configure model preferences, memory retention, and workspace-level controls.
      </p>
      <ButtonPrimary href="/dashboard/workflow">Manage Workflow</ButtonPrimary>
    </div>
  );
}
