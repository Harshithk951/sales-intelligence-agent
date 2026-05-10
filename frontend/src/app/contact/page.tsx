import { ButtonPrimary } from "@/components/button-primary";

export default function ContactPage() {
  return (
    <main className="container mx-auto px-6 py-20">
      <h1 className="text-section-heading text-ink mb-4">Contact Sales</h1>
      <p className="text-body-large text-slate mb-8">
        Connect with our team to design an enterprise sales intelligence rollout.
      </p>
      <ButtonPrimary href="/signin">Request a Demo</ButtonPrimary>
    </main>
  );
}
