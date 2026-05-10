import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, PlayCircle } from "lucide-react";

export type AgentStatus = "idle" | "running" | "complete" | "error";

interface AgentConsoleCardProps {
  agentName: string;
  status: AgentStatus;
  promptText?: string;
  responseText?: string;
  badges?: string[];
  className?: string;
}

const statusConfig = {
  idle: { icon: PlayCircle, color: "text-slate", bg: "bg-near-black", label: "Ready" },
  running: { icon: Loader2, color: "text-focus-blue", bg: "bg-focus-blue/10", label: "Running" },
  complete: { icon: CheckCircle2, color: "text-pale-green", bg: "bg-deep-green", label: "Complete" },
  error: { icon: AlertCircle, color: "text-error-red", bg: "bg-error-red/10", label: "Failed" }
};

export function AgentConsoleCard({
  agentName,
  status,
  promptText = "System prompt active...",
  responseText = "Awaiting input...",
  badges = [],
  className
}: AgentConsoleCardProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={cn("bg-near-black rounded-lg border border-white/10 overflow-hidden flex flex-col", className)}>
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-coral" />
          <h4 className="text-button-label text-canvas-white">{agentName}</h4>
        </div>
        
        <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-micro", config.bg, config.color)}>
          <Icon size={12} className={status === "running" ? "animate-spin" : ""} />
          <span>{config.label}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-grow flex flex-col gap-4">
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {badges.map(badge => (
              <span key={badge} className="px-2 py-1 bg-white/5 border border-white/10 rounded-sm text-micro text-muted-slate">
                {badge}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <div className="text-mono-label text-muted-slate text-[10px]">PROMPT</div>
          <div className="bg-black/40 rounded-sm p-3 text-code font-mono text-sm text-canvas-white/80 border border-white/5">
            {promptText}
          </div>
        </div>

        <div className="flex flex-col gap-2 flex-grow">
          <div className="text-mono-label text-action-blue text-[10px]">OUTPUT</div>
          <div className="bg-canvas-white/5 rounded-sm p-4 text-body-default text-canvas-white border border-white/5 flex-grow dark-scroll overflow-auto">
            {status === "running" ? (
              <div className="flex items-center gap-2 text-muted-slate h-full">
                <span className="animate-pulse">Generating response</span>
                <span className="flex gap-1">
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>.</motion.span>
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}>.</motion.span>
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}>.</motion.span>
                </span>
              </div>
            ) : (
              <div className="whitespace-pre-wrap">{responseText}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
