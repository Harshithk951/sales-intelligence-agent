"use client";

import { ButtonPrimary } from "@/components/button-primary";

export default function OutreachPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      <h1 className="text-card-heading text-ink mb-3">Outreach Workspace</h1>
      <p className="text-body-default text-slate mb-8">
        Draft and review personalized outreach generated from the latest intelligence run.
      </p>
      <ButtonPrimary href="/dashboard/logs">View Execution Logs</ButtonPrimary>
    </div>
  );
}
