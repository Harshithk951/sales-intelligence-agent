import { ButtonPrimary } from "@/components/button-primary";

export default function SignInPage() {
  return (
    <main className="container mx-auto px-6 py-20">
      <h1 className="text-section-heading text-ink mb-4">Sign In</h1>
      <p className="text-body-large text-slate mb-8">
        Authentication UI placeholder. Continue to dashboard for the current prototype experience.
      </p>
      <ButtonPrimary href="/dashboard">Continue to Dashboard</ButtonPrimary>
    </main>
  );
}
