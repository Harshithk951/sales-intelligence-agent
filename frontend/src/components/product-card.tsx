import { cn } from "@/lib/utils";
import { CheckCircle2, ChevronRight, Activity, Zap } from "lucide-react";
import { ButtonSecondary } from "./button-secondary";

interface ProductCardProps {
  title: string;
  description: string;
  features: string[];
  linkText?: string;
  linkHref?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function ProductCard({
  title,
  description,
  features,
  linkText = "Learn more",
  linkHref = "#",
  className,
  icon
}: ProductCardProps) {
  return (
    <div className={cn("bg-soft-stone rounded-sm p-8 flex flex-col h-full", className)}>
      <div className="mb-6 w-12 h-12 bg-canvas-white rounded-sm flex items-center justify-center shadow-sm text-near-black">
        {icon || <Activity size={24} strokeWidth={1.5} />}
      </div>
      
      <h3 className="text-feature-heading text-near-black mb-3">{title}</h3>
      <p className="text-body-default text-slate mb-8 flex-grow">{description}</p>
      
      <div className="w-full h-px bg-border-light mb-8" />
      
      <ul className="space-y-4 mb-8">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-deep-green mt-0.5 shrink-0" strokeWidth={1.5} />
            <span className="text-body-default text-ink">{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-auto pt-4">
        <a href={linkHref} className="text-button-label text-action-blue hover:text-near-black transition-colors flex items-center gap-1 group">
          {linkText}
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}
