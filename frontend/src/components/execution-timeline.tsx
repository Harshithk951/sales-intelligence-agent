"use client";

import { cn } from "@/lib/utils";
import { ExecutionStep } from "@/lib/types";
import { CheckCircle2, Loader2, AlertCircle, Circle } from "lucide-react";
import { motion } from "framer-motion";

interface ExecutionTimelineProps {
  steps: ExecutionStep[];
  className?: string;
}

export function ExecutionTimeline({ steps, className }: ExecutionTimelineProps) {
  return (
    <div className={cn("bg-canvas-white border border-border-light rounded-sm p-6", className)}>
      <h3 className="text-feature-heading text-ink mb-6">Execution Timeline</h3>
      
      <div className="relative border-l border-hairline ml-3 space-y-8 pb-4">
        {steps.map((step, idx) => (
          <div key={step.agentId} className="relative pl-8">
            {/* Timeline dot */}
            <div className="absolute -left-3 top-0.5 bg-canvas-white">
              {step.status === "complete" ? (
                <CheckCircle2 size={24} className="text-pale-green bg-deep-green rounded-full p-1" />
              ) : step.status === "running" ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                  <Loader2 size={24} className="text-focus-blue bg-focus-blue/10 rounded-full p-1" />
                </motion.div>
              ) : step.status === "error" ? (
                <AlertCircle size={24} className="text-error-red bg-error-red/10 rounded-full p-1" />
              ) : (
                <Circle size={24} className="text-slate bg-canvas-white" strokeWidth={1.5} />
              )}
            </div>
            
            <div className="flex flex-col">
              <h4 className={cn("text-body-large", step.status === "idle" ? "text-slate" : "text-ink")}>
                {step.agentName}
              </h4>
              <p className="text-body-default text-slate mt-1">{step.message}</p>
              
              {step.duration && (
                <span className="text-micro text-muted-slate mt-2 font-mono">
                  {(step.duration / 1000).toFixed(1)}s
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
