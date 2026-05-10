"use client";

import { cn } from "@/lib/utils";
import { LogEntry } from "@/lib/types";
import { Terminal, Copy } from "lucide-react";
import { useEffect, useRef } from "react";

interface LogTerminalProps {
  logs: LogEntry[];
  className?: string;
}

export function LogTerminal({ logs, className }: LogTerminalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className={cn("bg-near-black rounded-sm border border-white/10 flex flex-col overflow-hidden", className)}>
      <div className="px-4 py-3 border-b border-white/10 bg-black/40 flex justify-between items-center">
        <div className="flex items-center gap-2 text-muted-slate text-micro">
          <Terminal size={14} />
          <span className="uppercase tracking-widest">Execution Logs</span>
        </div>
        <button className="text-muted-slate hover:text-canvas-white transition-colors" title="Copy logs">
          <Copy size={14} />
        </button>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-grow p-4 overflow-y-auto dark-scroll text-[13px] font-mono leading-relaxed"
      >
        {logs.map((log) => (
          <div key={log.id} className="flex gap-4 mb-2 group">
            <span className="text-slate shrink-0">
              {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
            <span className={cn(
              "shrink-0 w-24 truncate",
              log.level === "info" ? "text-action-blue" :
              log.level === "warn" ? "text-coral" :
              log.level === "error" ? "text-error-red" : "text-slate"
            )}>
              [{log.agent}]
            </span>
            <span className={cn(
              "text-canvas-white/80 group-hover:text-canvas-white transition-colors break-words",
              log.level === "error" ? "text-error-red/90" : ""
            )}>
              {log.message}
            </span>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-slate italic">Waiting for execution to start...</div>
        )}
      </div>
    </div>
  );
}
