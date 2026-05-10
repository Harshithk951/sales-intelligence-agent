"use client";

import { ButtonPrimary } from "@/components/button-primary";
import Link from "next/link";

export default function IntelligencePage() {
  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      <h1 className="text-card-heading text-ink mb-3">Intelligence Hub</h1>
      <p className="text-body-default text-slate mb-8">
        Explore analyzed company insights, challenge summaries, and cached research artifacts.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <ButtonPrimary href="/dashboard/workflow">Open Workflow</ButtonPrimary>
        <Link href="/dashboard" className="text-action-blue hover:underline">
          Back to Overview
        </Link>
      </div>
    </div>
  );
}
