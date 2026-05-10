"use client";

import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";
import { AgentInfo } from "@/lib/types";
import { Loader2, CheckCircle2, AlertCircle, PlayCircle, Search, BrainCircuit, Users, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, LucideIcon> = {
  "search": Search,
  "brain-circuit": BrainCircuit,
  "users": Users,
  "mail": Mail
};

interface AgentNodeProps {
  data: {
    agent: AgentInfo;
  };
  isConnectable?: boolean;
}

export function AgentNode({ data, isConnectable }: AgentNodeProps) {
  const { agent } = data;
  
  const AgentIcon = iconMap[agent.icon] || PlayCircle;
  
  const statusConfig = {
    idle: { color: "text-slate", bg: "bg-near-black", border: "border-white/10", shadow: "" },
    running: { color: "text-focus-blue", bg: "bg-focus-blue/10", border: "border-focus-blue/50", shadow: "shadow-[0_0_20px_rgba(24,99,220,0.15)]" },
    complete: { color: "text-pale-green", bg: "bg-deep-green", border: "border-pale-green/30", shadow: "" },
    error: { color: "text-error-red", bg: "bg-error-red/10", border: "border-error-red/50", shadow: "" }
  };
  
  const config = statusConfig[agent.status];

  return (
    <div className={cn(
      "w-72 bg-near-black rounded-lg border flex flex-col transition-all duration-500 overflow-hidden",
      config.border,
      config.shadow
    )}>
      {/* Target Handle (Left) */}
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-white/20 border-2 border-near-black rounded-full !-left-1.5"
      />
      
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-white/5 flex items-center justify-center text-canvas-white border border-white/10">
            <AgentIcon size={16} />
          </div>
          <div>
            <h4 className="text-button-label text-canvas-white leading-none">{agent.name}</h4>
            {agent.duration && (
              <span className="text-[10px] text-muted-slate font-mono mt-1 block">
                {(agent.duration / 1000).toFixed(1)}s
              </span>
            )}
          </div>
        </div>
        
        <div className={cn("flex items-center justify-center w-6 h-6 rounded-full", config.bg, config.color)}>
          {agent.status === "idle" && <PlayCircle size={12} />}
          {agent.status === "running" && <Loader2 size={12} className="animate-spin" />}
          {agent.status === "complete" && <CheckCircle2 size={12} />}
          {agent.status === "error" && <AlertCircle size={12} />}
        </div>
      </div>
      
      {/* Body */}
      <div className="p-5 flex flex-col gap-3">
        <p className="text-micro text-muted-slate leading-relaxed">
          {agent.description}
        </p>
        
        {agent.output && (
          <div className="mt-2 bg-canvas-white/5 rounded-sm p-3 text-[11px] font-mono text-canvas-white/80 border border-white/5 break-words">
            {agent.output}
          </div>
        )}
      </div>

      {/* Source Handle (Right) */}
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-action-blue border-2 border-near-black rounded-full !-right-1.5"
      />
      
      {/* Active scanning effect */}
      {agent.status === "running" && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-focus-blue/10 to-transparent pointer-events-none"
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
}
