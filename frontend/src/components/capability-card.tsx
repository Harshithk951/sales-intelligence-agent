import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface CapabilityCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkText?: string;
  linkHref?: string;
  className?: string;
}

export function CapabilityCard({
  title,
  description,
  icon,
  linkText = "Learn more",
  linkHref = "#",
  className
}: CapabilityCardProps) {
  return (
    <div className={cn("pt-8 border-t border-hairline flex flex-col h-full", className)}>
      <div className="text-near-black mb-6">
        {icon}
      </div>
      <h3 className="text-feature-heading text-near-black mb-4">{title}</h3>
      <p className="text-body-default text-slate mb-8 flex-grow">{description}</p>
      
      <div className="mt-auto">
        <a href={linkHref} className="text-button-label text-action-blue hover:text-near-black transition-colors flex items-center gap-1 group">
          {linkText}
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}
