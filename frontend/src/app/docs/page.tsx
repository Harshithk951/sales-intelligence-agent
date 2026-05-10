import { ButtonPrimary } from "@/components/button-primary";
import Link from "next/link";

export default function DocsPage() {
  return (
    <main className="container mx-auto px-6 py-16 md:py-20 max-w-5xl">
      <div className="mb-10">
        <h1 className="text-section-heading text-ink mb-4">Nexus AI Documentation</h1>
        <p className="text-body-large text-slate">
          Everything you need to run, understand, and navigate the Sales Intelligence frontend.
        </p>
      </div>

      <section className="mb-10 p-6 border border-border-light rounded-sm bg-canvas-white">
        <h2 className="text-feature-heading text-ink mb-4">Quick Start</h2>
        <ol className="list-decimal pl-5 space-y-2 text-body-default text-slate">
          <li>Open terminal in the repository root.</li>
          <li>Run <code>cd frontend && npm install</code>.</li>
          <li>Start dev server with <code>npm run dev</code>.</li>
          <li>Open <code>http://127.0.0.1:3000</code>.</li>
        </ol>
      </section>

      <section className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/dashboard" className="p-5 border border-border-light rounded-sm hover:border-action-blue transition-colors">
          <h3 className="text-body-large text-ink mb-2">Dashboard</h3>
          <p className="text-body-default text-slate">Run pipeline, inspect intelligence, and view metrics.</p>
        </Link>
        <Link href="/dashboard/workflow" className="p-5 border border-border-light rounded-sm hover:border-action-blue transition-colors">
          <h3 className="text-body-large text-ink mb-2">Workflow Engine</h3>
          <p className="text-body-default text-slate">Execute the full 4-step sequence from research to outreach.</p>
        </Link>
        <Link href="/dashboard/logs" className="p-5 border border-border-light rounded-sm hover:border-action-blue transition-colors">
          <h3 className="text-body-large text-ink mb-2">Logs</h3>
          <p className="text-body-default text-slate">Inspect runtime logs and agent-level observability.</p>
        </Link>
        <Link href="/research" className="p-5 border border-border-light rounded-sm hover:border-action-blue transition-colors">
          <h3 className="text-body-large text-ink mb-2">Research</h3>
          <p className="text-body-default text-slate">Read generated insights and case-style outputs.</p>
        </Link>
      </section>

      <section className="mb-10 p-6 border border-border-light rounded-sm bg-canvas-white">
        <h2 className="text-feature-heading text-ink mb-4">Pipeline Order</h2>
        <div className="text-body-default text-slate space-y-2">
          <p><strong>1. Research Agent</strong> - Collects company context and recent developments.</p>
          <p><strong>2. Analysis Agent</strong> - Converts raw data into key pain points and opportunities.</p>
          <p><strong>3. Contact Agent</strong> - Finds and prioritizes decision makers.</p>
          <p><strong>4. Outreach Agent</strong> - Generates tailored outreach copy.</p>
        </div>
      </section>

      <section className="p-6 border border-border-light rounded-sm bg-canvas-white">
        <h2 className="text-feature-heading text-ink mb-4">Helpful Commands</h2>
        <div className="space-y-2 text-body-default text-slate">
          <p><code>npm run dev</code> - Start local development server.</p>
          <p><code>npm run lint</code> - Run lint checks.</p>
          <p><code>npm run build</code> - Create production build.</p>
        </div>
      </section>

      <div className="mt-10">
        <ButtonPrimary href="/dashboard">Open Dashboard</ButtonPrimary>
      </div>
    </main>
  );
}
