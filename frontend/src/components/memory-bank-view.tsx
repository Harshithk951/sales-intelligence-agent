"use client";

import { cn } from "@/lib/utils";
import { MemoryEntry } from "@/lib/types";
import { Database, Search, ArrowRight } from "lucide-react";
import { useState } from "react";

interface MemoryBankViewProps {
  entries: MemoryEntry[];
  className?: string;
}

export function MemoryBankView({ entries, className }: MemoryBankViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredEntries = entries.filter(entry => 
    entry.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={cn("bg-canvas-white border border-border-light rounded-sm flex flex-col h-full", className)}>
      <div className="p-6 border-b border-border-light flex justify-between items-center">
        <div className="flex items-center gap-2 text-ink">
          <Database size={20} />
          <h3 className="text-feature-heading">Memory Bank</h3>
        </div>
        <div className="text-micro text-slate px-2 py-1 bg-soft-stone rounded-sm">
          {entries.length} items
        </div>
      </div>
      
      <div className="p-4 border-b border-hairline bg-soft-stone/30">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" />
          <input 
            type="text" 
            placeholder="Search cached companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-canvas-white border border-border-light rounded-sm py-2 pl-9 pr-4 text-body-default focus:outline-none focus:border-form-violet transition-colors"
          />
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto">
        {filteredEntries.length > 0 ? (
          <div className="flex flex-col">
            {filteredEntries.map((entry, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-4 border-b border-hairline hover:bg-soft-stone/50 transition-colors group cursor-pointer"
              >
                <div>
                  <h4 className="text-body-default text-ink font-medium">{entry.companyName}</h4>
                  <div className="text-micro text-slate mt-1 font-mono">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "text-micro px-2 py-0.5 rounded-sm border uppercase tracking-wider",
                    entry.status === "cached" ? "bg-pale-green text-deep-green border-deep-green/20" : "bg-soft-stone text-slate border-slate/20"
                  )}>
                    {entry.status}
                  </span>
                  <ArrowRight size={16} className="text-slate opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-8 text-slate text-center">
            <Database size={32} className="opacity-20 mb-4" />
            <p>No cached companies found matching &quot;{searchQuery}&quot;</p>
          </div>
        )}
      </div>
    </div>
  );
}
