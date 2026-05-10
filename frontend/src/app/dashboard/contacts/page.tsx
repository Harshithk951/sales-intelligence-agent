"use client";

import { ButtonPrimary } from "@/components/button-primary";

export default function ContactsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      <h1 className="text-card-heading text-ink mb-3">Decision Maker Contacts</h1>
      <p className="text-body-default text-slate mb-8">
        Prioritized contact discovery view for outreach planning.
      </p>
      <ButtonPrimary href="/dashboard/outreach">Go to Outreach</ButtonPrimary>
    </div>
  );
}
