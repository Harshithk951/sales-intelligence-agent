import { cn } from "@/lib/utils";

interface DarkFeatureBandProps {
  children: React.ReactNode;
  className?: string;
  variant?: "deep-green" | "dark-navy" | "cohere-black";
  id?: string;
}

export function DarkFeatureBand({
  children,
  className,
  id,
  variant = "deep-green"
}: DarkFeatureBandProps) {
  const bgClass = {
    "deep-green": "bg-deep-green",
    "dark-navy": "bg-dark-navy",
    "cohere-black": "bg-cohere-black"
  }[variant];

  return (
    <section id={id} className={cn("w-full py-24 md:py-32 text-canvas-white", bgClass, className)}>
      <div className="container mx-auto px-6">
        {children}
      </div>
    </section>
  );
}
