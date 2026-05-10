"use client";

import { motion } from "framer-motion";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ButtonPrimary } from "@/components/button-primary";
import { ButtonSecondary } from "@/components/button-secondary";
import { AgentConsoleCard } from "@/components/agent-console-card";
import { CapabilityCard } from "@/components/capability-card";
import { DarkFeatureBand } from "@/components/dark-feature-band";
import { ProductCard } from "@/components/product-card";
import { MetricsCard } from "@/components/metrics-card";
import { LogTerminal } from "@/components/log-terminal";
import { mockDashboardMetrics, mockLogs } from "@/lib/mock-data";
import { Search, BrainCircuit, Users, Mail, Activity, Zap, Database } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/motion";

export default function LandingPage() {
  return (
    <>
      <AnnouncementBar message="Nexus AI v2.0 — Multi-agent orchestration is here." />
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="pt-24 pb-32 overflow-hidden">
          <div className="container mx-auto px-6">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20"
            >
              <motion.h1 variants={fadeInUp} className="text-hero-display text-near-black mb-8">
                Intelligence that <br/> closes deals.
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-body-large text-slate mb-10 max-w-2xl">
                Automate hours of manual research with an orchestrated team of specialized AI agents. From company analysis to personalized outreach in seconds.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-6">
                <ButtonPrimary href="/dashboard">Deploy Agents</ButtonPrimary>
                <ButtonSecondary href="/research">Read the research</ButtonSecondary>
              </motion.div>
            </motion.div>

            {/* HERO MEDIA COMPOSITION */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative"
            >
              {/* Agent Console Mockup */}
              <div className="lg:col-span-12 z-10 max-w-3xl mx-auto w-full">
                <AgentConsoleCard 
                  agentName="Outreach Agent"
                  status="complete"
                  promptText="Generate email for CTO at Salesforce based on scaling challenges."
                  responseText="Draft complete. Personalized outreach generated and ready to review."
                  badges={["Gemini 2.0", "Context: 128k", "SMTP"]}
                  className="h-full min-h-[400px] shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPABILITIES SECTION */}
        <section id="capabilities" className="py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mb-20">
              <h2 className="text-section-heading text-near-black mb-6">A complete intelligence pipeline.</h2>
              <p className="text-body-large text-slate">
                Four specialized agents working sequentially. Each feeds context to the next, building a comprehensive understanding of your prospect before drafting a single word.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              <CapabilityCard 
                title="Deep Research"
                description="Scours the web for company overviews, financials, and recent news to build a factual foundation."
                icon={<Search size={24} strokeWidth={1.5} />}
              />
              <CapabilityCard 
                title="Strategic Analysis"
                description="Synthesizes raw data to identify pain points, technical debt, and business opportunities."
                icon={<BrainCircuit size={24} strokeWidth={1.5} />}
              />
              <CapabilityCard 
                title="Contact Discovery"
                description="Maps the organization to find precise decision makers who own the identified challenges."
                icon={<Users size={24} strokeWidth={1.5} />}
              />
              <CapabilityCard 
                title="Outreach Generation"
                description="Drafts highly personalized, context-aware emails that speak directly to the prospect's needs."
                icon={<Mail size={24} strokeWidth={1.5} />}
              />
            </div>
          </div>
        </section>

        {/* DARK ORCHESTRATION BAND */}
        <DarkFeatureBand variant="deep-green">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-section-display mb-6">Orchestrated Intelligence.</h2>
              <p className="text-body-large text-canvas-white/80 mb-10 max-w-lg">
                Unlike simple chatbots, Nexus AI uses an orchestrated multi-agent architecture. Agents maintain state, share memory, and hand off tasks autonomously.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-body-default">
                  <div className="w-1.5 h-1.5 rounded-full bg-coral" />
                  <span>Sequential data passing</span>
                </li>
                <li className="flex items-center gap-3 text-body-default">
                  <div className="w-1.5 h-1.5 rounded-full bg-coral" />
                  <span>Persistent memory bank caching</span>
                </li>
                <li className="flex items-center gap-3 text-body-default">
                  <div className="w-1.5 h-1.5 rounded-full bg-coral" />
                  <span>Graceful error recovery</span>
                </li>
              </ul>
              <ButtonPrimary inverted href="/docs">View Documentation</ButtonPrimary>
            </div>
            
            <div className="relative aspect-square lg:aspect-auto lg:h-[600px] bg-near-black/50 rounded-lg border border-white/10 p-6 flex flex-col gap-4 overflow-hidden">
              {/* Simplified mock of workflow for landing page */}
              <AgentConsoleCard agentName="Research Agent" status="complete" promptText="Gather data on Acme Corp" responseText="Found 4 articles." badges={["Search"]} />
              <div className="h-4 border-l border-dashed border-white/20 ml-8" />
              <AgentConsoleCard agentName="Analysis Agent" status="complete" promptText="Analyze Acme Corp data" responseText="Identified 3 challenges." badges={["Gemini"]} />
              <div className="h-4 border-l border-dashed border-white/20 ml-8" />
              <AgentConsoleCard agentName="Contact Agent" status="complete" promptText="Find CTO" responseText="Decision makers identified and ranked." badges={["Search"]} />
            </div>
          </div>
        </DarkFeatureBand>

        {/* PRODUCT CARDS */}
        <section id="product" className="py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-section-heading text-near-black mb-6">Enterprise scale.</h2>
              <p className="text-body-large text-slate">Built for teams that need high-volume, high-quality intelligence without sacrificing personalization.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ProductCard 
                title="Memory Bank"
                description="Never research the same company twice. Our persistent cache saves API costs and delivers instant results for known domains."
                icon={<Database size={24} strokeWidth={1.5} />}
                features={["Zero-latency retrieval", "Cost optimization", "Automatic staleness checks"]}
              />
              <ProductCard 
                title="Gemini Powered"
                description="Leveraging Google's Gemini 2.0 for unparalleled reasoning capabilities in analysis and generation."
                icon={<Zap size={24} strokeWidth={1.5} />}
                features={["128k context window", "Advanced reasoning", "Nuanced tone matching"]}
              />
              <ProductCard 
                title="Observability"
                description="Complete transparency into agent decision making. Track every prompt, response, and state change."
                icon={<Activity size={24} strokeWidth={1.5} />}
                features={["Terminal-style logs", "Execution timeline", "Performance metrics"]}
              />
            </div>
          </div>
        </section>

        {/* OBSERVABILITY SECTION (DARK NAVY) */}
        <DarkFeatureBand id="research" variant="dark-navy" className="py-24">
          <div className="mb-16">
            <h2 className="text-card-heading mb-4">Complete Observability</h2>
            <p className="text-body-large text-canvas-white/60 max-w-2xl">Monitor your agent swarm in real-time. Every action, tool call, and state transition is logged and visible.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <LogTerminal logs={mockLogs} className="h-[400px]" />
            </div>
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {mockDashboardMetrics.slice(0, 2).map((metric, idx) => (
                <MetricsCard key={idx} metric={metric} className="bg-canvas-white/5 border-white/10 text-canvas-white [&_h4]:text-canvas-white/60 [&_.text-ink]:text-canvas-white [&_.bg-soft-stone]:bg-white/10" />
              ))}
            </div>
          </div>
        </DarkFeatureBand>

        {/* BOTTOM CTA */}
        <section className="py-32">
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <h2 className="text-product-display text-near-black mb-8">Ready to automate your pipeline?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <ButtonPrimary href="/dashboard">Start deploying agents</ButtonPrimary>
              <ButtonSecondary href="/contact">Contact sales</ButtonSecondary>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
