"use client";

import { useEffect, useState } from "react";
import { AgentFlow } from "@/components/workflow/agent-flow";
import Link from "next/link";
import { Play, RotateCcw } from "lucide-react";

export default function WorkflowPage() {
  const [activeStep, setActiveStep] = useState(-1);
  const isRunning = activeStep >= 0 && activeStep < 4;

  useEffect(() => {
    if (!isRunning) return;

    const timer = setTimeout(() => {
      setActiveStep((prev) => prev + 1);
    }, 1200);

    return () => clearTimeout(timer);
  }, [isRunning, activeStep]);

  const startWorkflow = () => {
    setActiveStep(0);
  };

  const resetWorkflow = () => {
    setActiveStep(-1);
  };

  return (
    <div className="flex flex-col h-full bg-cohere-black">
      {/* Workflow Toolbar */}
      <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 shrink-0 bg-near-black text-canvas-white">
        <div>
          <h1 className="text-body-large font-medium tracking-tight">Agent Orchestration</h1>
          <p className="text-micro text-muted-slate font-mono">PIPELINE: SALES_INTELLIGENCE_V2</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetWorkflow}
            className="p-2 text-muted-slate hover:text-canvas-white hover:bg-white/5 rounded-sm transition-colors"
            title="Reset Pipeline"
            aria-label="Reset Pipeline"
          >
            <RotateCcw size={18} />
          </button>
          <div className="w-px h-6 bg-white/10 mx-2" />
          <button
            type="button"
            onClick={startWorkflow}
            disabled={isRunning}
            className="px-4 py-2 bg-focus-blue hover:bg-action-blue disabled:opacity-50 disabled:cursor-not-allowed text-canvas-white rounded-sm text-micro font-medium flex items-center gap-2 transition-colors"
          >
            <Play size={14} fill="currentColor" />
            {isRunning ? "Running..." : "Run Workflow"}
          </button>
          <Link href="/dashboard/logs" className="px-4 py-2 border border-white/20 hover:bg-white/5 text-canvas-white rounded-sm text-micro font-medium transition-colors">
            View Logs
          </Link>
        </div>
      </div>

      {/* React Flow Canvas */}
      <div className="flex-1 relative">
        <AgentFlow activeStep={activeStep} />
      </div>
    </div>
  );
}
