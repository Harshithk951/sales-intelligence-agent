import { cn } from "@/lib/utils";
import { Building2, Users, Mail, Database, Activity } from "lucide-react";
import { DashboardMetric } from "@/lib/types";

interface MetricsCardProps {
  metric: DashboardMetric;
  className?: string;
}

const iconMap: Record<string, React.ElementType> = {
  "building-2": Building2,
  "users": Users,
  "mail": Mail,
  "database": Database,
};

export function MetricsCard({ metric, className }: MetricsCardProps) {
  const Icon = iconMap[metric.icon] || Activity;

  return (
    <div className={cn("bg-canvas-white border border-border-light p-6 rounded-sm flex flex-col justify-between", className)}>
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-body-default text-slate">{metric.label}</h4>
        <div className="text-slate p-2 bg-soft-stone rounded-sm">
          <Icon size={18} strokeWidth={1.5} />
        </div>
      </div>
      
      <div className="flex items-baseline gap-3">
        <div className="text-card-heading text-ink">{metric.value}</div>
        {metric.change && (
          <div className={cn(
            "text-button-label flex items-center",
            metric.trend === "up" ? "text-deep-green" : metric.trend === "down" ? "text-error-red" : "text-slate"
          )}>
            {metric.change}
          </div>
        )}
      </div>
    </div>
  );
}
