import { cn } from "@/lib/utils";

interface TrustLogoStripProps {
  className?: string;
  inverted?: boolean;
}

export function TrustLogoStrip({ className, inverted = false }: TrustLogoStripProps) {
  // Placeholder logos since we don't have SVGs yet
  const logos = [
    { name: "Acme Corp", short: "ACME" },
    { name: "Globex", short: "GLOBEX" },
    { name: "Soylent Corp", short: "SOYLENT" },
    { name: "Initech", short: "INITECH" },
    { name: "Umbrella Corp", short: "UMBRELLA" }
  ];

  return (
    <div className={cn("py-24 flex flex-col items-center justify-center space-y-12", className)}>
      <p className={cn("text-micro text-center uppercase tracking-widest", inverted ? "text-canvas-white/60" : "text-muted-slate")}>
        Trusted by enterprise teams
      </p>
      
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale">
        {logos.map((logo, idx) => (
          <div key={idx} className={cn("font-bold text-2xl tracking-tighter flex items-center", inverted ? "text-canvas-white" : "text-ink")}>
            {/* Real implementation would use SVG logos here */}
            {logo.short}
          </div>
        ))}
      </div>
    </div>
  );
}
