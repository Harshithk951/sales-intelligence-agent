"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Workflow, 
  Database, 
  Users, 
  Mail, 
  Terminal,
  Settings
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const mainNav = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Workflow", href: "/dashboard/workflow", icon: Workflow },
    { name: "Intelligence", href: "/dashboard/intelligence", icon: Database },
    { name: "Contacts", href: "/dashboard/contacts", icon: Users },
    { name: "Outreach", href: "/dashboard/outreach", icon: Mail },
    { name: "Logs", href: "/dashboard/logs", icon: Terminal },
  ];

  return (
    <div className={cn("w-full md:w-64 bg-near-black text-canvas-white flex flex-col h-auto md:h-screen border-b md:border-b-0 md:border-r border-white/10 shrink-0", className)}>
      {/* Brand */}
      <div className="h-20 flex items-center px-6 border-b border-white/10 shrink-0">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-sm bg-canvas-white flex items-center justify-center text-near-black font-bold group-hover:bg-coral transition-colors">
            N
          </div>
          <span className="font-bold text-lg tracking-tight">Nexus AI</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 md:py-6 px-4 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-y-auto dark-scroll">
        <div className="hidden md:block text-mono-label text-muted-slate text-[10px] px-2 mb-2">PLATFORM</div>
        {mainNav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-sm text-body-default transition-colors whitespace-nowrap",
                isActive 
                  ? "bg-white/10 text-canvas-white font-medium" 
                  : "text-muted-slate hover:text-canvas-white hover:bg-white/5"
              )}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Settings */}
      <div className="p-4 border-t border-white/10 shrink-0 hidden md:block">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-sm text-body-default text-muted-slate hover:text-canvas-white hover:bg-white/5 transition-colors"
        >
          <Settings size={18} />
          Settings
        </Link>
        
        <div className="mt-4 px-3 py-3 bg-white/5 rounded-sm border border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-focus-blue/20 text-focus-blue flex items-center justify-center font-medium">
            H
          </div>
          <div className="flex flex-col">
            <span className="text-micro font-medium text-canvas-white">Harshith</span>
            <span className="text-[10px] text-muted-slate">Enterprise Plan</span>
          </div>
        </div>
      </div>
    </div>
  );
}
