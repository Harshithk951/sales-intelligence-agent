"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ButtonPrimary } from "@/components/button-primary";
import { MetricsCard } from "@/components/metrics-card";
import { ExecutionTimeline } from "@/components/execution-timeline";
import { EmailPreview } from "@/components/email-preview";
import { MemoryBankView } from "@/components/memory-bank-view";
import { mockDashboardMetrics, mockExecutionSteps, mockReport, mockMemory } from "@/lib/mock-data";
import { Search, Play } from "lucide-react";

export default function DashboardOverview() {
  const [targetCompany, setTargetCompany] = useState("");
  const router = useRouter();

  const handleRunPipeline = () => {
    const company = targetCompany.trim();
    const query = company ? `?company=${encodeURIComponent(company)}` : "";
    router.push(`/dashboard/workflow${query}`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-canvas-white p-6 rounded-sm border border-border-light shadow-sm">
        <div>
          <h1 className="text-card-heading text-ink">Intelligence Overview</h1>
          <p className="text-body-default text-slate mt-1">Run agents or review cached intelligence.</p>
        </div>
        
        <div className="flex w-full md:w-auto items-center gap-3">
          <div className="relative flex-grow md:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" />
            <input 
              type="text" 
              placeholder="Target company name..."
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-soft-stone/50 border border-border-light rounded-sm text-body-default focus:outline-none focus:border-form-violet transition-colors"
            />
          </div>
          <ButtonPrimary className="py-2 flex items-center gap-2" onClick={handleRunPipeline}>
            <Play size={16} />
            <span>Run Pipeline</span>
          </ButtonPrimary>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockDashboardMetrics.map((metric, idx) => (
          <MetricsCard key={idx} metric={metric} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column - Timeline */}
        <div className="xl:col-span-4 flex flex-col h-full">
          <ExecutionTimeline steps={mockExecutionSteps} className="h-full" />
        </div>
        
        {/* Right Column - Intelligence Summary */}
        <div className="xl:col-span-8 flex flex-col gap-8">
          <div className="bg-canvas-white border border-border-light rounded-sm p-8">
            <div className="flex justify-between items-start mb-6 pb-6 border-b border-hairline">
              <div>
                <h2 className="text-section-heading text-ink">{mockReport.company.name}</h2>
                <div className="flex gap-4 mt-2 text-body-default text-slate">
                  <span>{mockReport.company.industry}</span>
                  <span>•</span>
                  <span>{mockReport.company.size}</span>
                  <span>•</span>
                  <span>{mockReport.company.location}</span>
                </div>
              </div>
              <div className="px-3 py-1 bg-pale-green text-deep-green border border-deep-green/20 rounded-sm text-micro uppercase tracking-wider">
                Research Complete
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-feature-heading text-ink mb-4">Key Challenges</h3>
                <ul className="space-y-3">
                  {mockReport.keyChallenges.slice(0, 3).map((challenge, idx) => (
                    <li key={idx} className="flex gap-3 text-body-default text-slate">
                      <span className="text-coral shrink-0 mt-0.5">•</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-feature-heading text-ink mb-4">Priority Contacts</h3>
                <ul className="space-y-4">
                  {mockReport.priorityContacts.map((contact, idx) => (
                    <li key={idx} className="flex items-center justify-between border border-border-light rounded-sm p-3 bg-soft-stone/30">
                      <div>
                        <div className="text-body-default text-ink font-medium">{contact.name}</div>
                        <div className="text-micro text-slate">{contact.title}</div>
                      </div>
                      <div className="text-mono-label text-action-blue bg-action-blue/10 px-2 py-1 rounded-sm">
                        SCORE: {contact.priorityScore}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8">
          <h2 className="text-card-heading text-ink mb-4">Generated Outreach</h2>
          <EmailPreview emails={mockReport.outreachEmails} />
        </div>
        <div className="xl:col-span-4">
          <h2 className="text-card-heading text-ink mb-4">System Cache</h2>
          <MemoryBankView entries={mockMemory} />
        </div>
      </div>
    </div>
  );
}
