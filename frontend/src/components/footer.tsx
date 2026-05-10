import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-near-black w-full pt-24 pb-12">
      <div className="container mx-auto px-6">
        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row items-start justify-between pb-24 border-b border-white/10 gap-12">
          <div className="max-w-md">
            <span className="inline-block px-3 py-1 bg-coral/10 border border-coral text-coral text-mono-label rounded-sm mb-6">
              AI MOVES FAST
            </span>
            <h2 className="text-card-heading text-canvas-white mb-4">
              Stay ahead with Nexus AI.
            </h2>
            <p className="text-body-default text-muted-slate">
              Get updates on enterprise multi-agent workflows and product releases.
            </p>
          </div>
          
          <div className="w-full md:max-w-md">
            <form action="/contact" className="flex border-b border-white/20 pb-2 hover:border-canvas-white transition-colors group">
              <input 
                type="email" 
                placeholder="Work email address" 
                className="bg-transparent border-none outline-none text-canvas-white flex-grow placeholder:text-muted-slate text-body-large"
              />
              <button type="submit" className="text-canvas-white group-hover:text-coral transition-colors">
                <ArrowRight size={24} />
              </button>
            </form>
            <p className="text-micro text-muted-slate mt-4">
              By subscribing, you agree to our <Link href="/terms" className="underline hover:text-canvas-white">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-canvas-white">Privacy Policy</Link>.
            </p>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
          <div className="flex flex-col gap-4">
            <h4 className="text-body-default text-canvas-white font-medium mb-2">Product</h4>
            <Link href="/dashboard" className="text-body-default text-muted-slate hover:text-canvas-white transition-colors">Platform Overview</Link>
            <Link href="/dashboard/workflow" className="text-body-default text-muted-slate hover:text-canvas-white transition-colors">Agents</Link>
            <Link href="/dashboard/intelligence" className="text-body-default text-muted-slate hover:text-canvas-white transition-colors">Memory Bank</Link>
            <Link href="/dashboard/settings" className="text-body-default text-muted-slate hover:text-canvas-white transition-colors">Security</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-body-default text-canvas-white font-medium mb-2">Use Cases</h4>
            <Link href="/dashboard/intelligence" className="text-body-default text-muted-slate hover:text-canvas-white transition-colors">Sales Intelligence</Link>
            <Link href="/dashboard/outreach" className="text-body-default text-muted-slate hover:text-canvas-white transition-colors">Outreach Generation</Link>
            <Link href="/research" className="text-body-default text-muted-slate hover:text-canvas-white transition-colors">Competitor Analysis</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-body-default text-canvas-white font-medium mb-2">Resources</h4>
            <Link href="/docs" className="text-body-default text-muted-slate hover:text-canvas-white transition-colors">Documentation</Link>
            <Link href="/docs" className="text-body-default text-muted-slate hover:text-canvas-white transition-colors">API Reference</Link>
            <Link href="/research" className="text-body-default text-muted-slate hover:text-canvas-white transition-colors">Blog</Link>
            <Link href="/research" className="text-body-default text-muted-slate hover:text-canvas-white transition-colors">Research</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-body-default text-canvas-white font-medium mb-2">Company</h4>
            <Link href="/about" className="text-body-default text-muted-slate hover:text-canvas-white transition-colors">About</Link>
            <Link href="/careers" className="text-body-default text-muted-slate hover:text-canvas-white transition-colors">Careers</Link>
            <Link href="/contact" className="text-body-default text-muted-slate hover:text-canvas-white transition-colors">Contact</Link>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-micro text-muted-slate">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-5 h-5 rounded-sm bg-canvas-white text-near-black flex items-center justify-center font-bold text-[10px]">N</div>
            <span>© {new Date().getFullYear()} Nexus AI Inc. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-canvas-white transition-colors">Twitter</Link>
            <Link href="/contact" className="hover:text-canvas-white transition-colors">LinkedIn</Link>
            <Link href="/contact" className="hover:text-canvas-white transition-colors">GitHub</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
