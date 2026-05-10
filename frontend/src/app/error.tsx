"use client";

import { useEffect } from "react";
import { ButtonPrimary } from "@/components/button-primary";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <div className="w-16 h-16 bg-error-red/10 text-error-red flex items-center justify-center rounded-full mb-8">
        <AlertCircle size={32} />
      </div>
      <h2 className="text-card-heading text-near-black mb-4">Something went wrong</h2>
      <p className="text-body-large text-slate mb-8 max-w-md">
        An unexpected error occurred in the application. The system has logged the trace.
      </p>
      <ButtonPrimary onClick={() => reset()}>
        Try again
      </ButtonPrimary>
    </div>
  );
}
