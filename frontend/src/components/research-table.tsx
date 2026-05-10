import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ResearchEntry {
  title: string;
  topics: string[];
  date: string;
  url?: string;
}

interface ResearchTableProps {
  entries: ResearchEntry[];
  className?: string;
}

export function ResearchTable({ entries, className }: ResearchTableProps) {
  return (
    <div className={cn("w-full flex flex-col", className)}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-hairline text-micro text-slate uppercase tracking-wider">
        <div className="w-1/2">Publication</div>
        <div className="w-1/4 hidden md:block">Topics</div>
        <div className="w-1/4 text-right">Date</div>
      </div>
      
      {/* Rows */}
      <div className="flex flex-col">
        {entries.map((entry, idx) => (
          <a 
            key={idx} 
            href={entry.url || "#"}
            className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-hairline group hover:bg-soft-stone/50 transition-colors -mx-4 px-4 rounded-sm"
          >
            <div className="w-full md:w-1/2 flex items-start gap-2 mb-3 md:mb-0">
              <h4 className="text-body-large text-ink group-hover:text-action-blue transition-colors">
                {entry.title}
              </h4>
              <ArrowUpRight size={16} className="text-slate opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0" />
            </div>
            
            <div className="w-full md:w-1/4 flex flex-wrap gap-2 mb-3 md:mb-0">
              {entry.topics.map(topic => (
                <span key={topic} className="px-3 py-1 rounded-pill border border-border-light text-micro text-ink bg-canvas-white">
                  {topic}
                </span>
              ))}
            </div>
            
            <div className="w-full md:w-1/4 text-left md:text-right text-body-default text-slate">
              {entry.date}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
