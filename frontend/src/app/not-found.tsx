import { ButtonPrimary } from "@/components/button-primary";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <h1 className="text-hero-display text-near-black mb-6">404</h1>
      <h2 className="text-card-heading text-near-black mb-4">Page not found</h2>
      <p className="text-body-large text-slate mb-10 max-w-md">
        The requested resource could not be located in the current environment.
      </p>
      <Link href="/">
        <ButtonPrimary>Return to Dashboard</ButtonPrimary>
      </Link>
    </div>
  );
}
