"use client";

import { cn } from "@/lib/utils";
import { OutreachEmail } from "@/lib/types";
import { useState } from "react";
import { Copy, Mail, ExternalLink } from "lucide-react";

interface EmailPreviewProps {
  emails: OutreachEmail[];
  className?: string;
}

export function EmailPreview({ emails, className }: EmailPreviewProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!emails || emails.length === 0) {
    return (
      <div className={cn("bg-canvas-white border border-border-light rounded-sm p-8 flex flex-col items-center justify-center h-full min-h-[400px]", className)}>
        <Mail size={48} className="text-slate opacity-20 mb-4" strokeWidth={1} />
        <p className="text-body-default text-slate">No emails generated yet.</p>
      </div>
    );
  }

  const activeEmail = emails[activeIndex];

  return (
    <div className={cn("bg-canvas-white border border-border-light rounded-sm flex flex-col overflow-hidden h-full", className)}>
      {/* Header/Tabs */}
      <div className="flex border-b border-border-light overflow-x-auto">
        {emails.map((email, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              "px-6 py-4 text-body-default whitespace-nowrap border-b-2 transition-colors",
              activeIndex === idx 
                ? "border-near-black text-near-black font-medium" 
                : "border-transparent text-slate hover:text-ink hover:bg-soft-stone/30"
            )}
          >
            {email.recipient}
          </button>
        ))}
      </div>

      {/* Email Content */}
      <div className="p-6 flex-grow flex flex-col bg-soft-stone/20">
        <div className="bg-canvas-white border border-hairline rounded-sm p-6 shadow-sm flex-grow">
          <div className="flex justify-between items-start mb-6 pb-6 border-b border-hairline">
            <div className="space-y-2">
              <div className="flex gap-4 text-body-default">
                <span className="text-slate w-16">To:</span>
                <span className="text-ink font-medium">{activeEmail.recipient} <span className="text-slate font-normal">&lt;{activeEmail.emailAddress}&gt;</span></span>
              </div>
              <div className="flex gap-4 text-body-default">
                <span className="text-slate w-16">Role:</span>
                <span className="text-ink">{activeEmail.title}</span>
              </div>
              <div className="flex gap-4 text-body-default">
                <span className="text-slate w-16">Subject:</span>
                <span className="text-ink font-medium">{activeEmail.subject}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="p-2 text-slate hover:text-near-black bg-soft-stone rounded-sm transition-colors" title="Copy to clipboard">
                <Copy size={16} />
              </button>
              <button className="p-2 text-canvas-white hover:bg-cohere-black bg-near-black rounded-sm transition-colors flex items-center gap-2 text-micro font-medium" title="Open in mail client">
                <ExternalLink size={16} />
                <span className="hidden md:inline">Open Draft</span>
              </button>
            </div>
          </div>
          
          <div className="text-body-default text-ink whitespace-pre-wrap leading-relaxed font-sans">
            {activeEmail.body}
          </div>
        </div>
      </div>
    </div>
  );
}
