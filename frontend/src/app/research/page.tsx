import { ButtonPrimary } from "@/components/button-primary";

export default function ResearchPage() {
  return (
    <main className="container mx-auto px-6 py-20">
      <h1 className="text-section-heading text-ink mb-4">Research</h1>
      <p className="text-body-large text-slate mb-8">
        Summaries, case studies, and intelligence findings produced by the multi-agent pipeline.
      </p>
      <ButtonPrimary href="/dashboard/intelligence">Explore Intelligence</ButtonPrimary>
    </main>
  );
}
