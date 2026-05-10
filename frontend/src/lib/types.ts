// === Core Domain Types ===

export interface Company {
  name: string;
  overview: string;
  industry: string;
  size: string;
  founded: string;
  location: string;
  website: string;
  recentNews: string[];
  keyFacts: string[];
}

export interface Contact {
  name: string;
  title: string;
  department: string;
  linkedin: string;
  email: string;
  priorityScore: number;
}

export interface OutreachEmail {
  recipient: string;
  title: string;
  emailAddress: string;
  subject: string;
  body: string;
  priorityScore: number;
}

export interface IntelligenceReport {
  companyName: string;
  generatedAt: string;
  status: "success" | "failed" | "running";
  company: Company;
  keyChallenges: string[];
  opportunities: string[];
  recommendedApproach: string;
  fullAnalysis: string;
  totalContactsFound: number;
  priorityContacts: Contact[];
  outreachEmails: OutreachEmail[];
  sessionId: string;
}

// === Agent System Types ===

export type AgentStatus = "idle" | "running" | "complete" | "error";

export interface AgentInfo {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  status: AgentStatus;
  duration?: number; // ms
  output?: string;
}

export interface ExecutionStep {
  agentId: string;
  agentName: string;
  status: AgentStatus;
  startedAt?: string;
  completedAt?: string;
  message: string;
  duration?: number;
}

// === Observability Types ===

export type LogLevel = "info" | "warn" | "error" | "debug";

export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  agent: string;
  message: string;
}

export interface MemoryEntry {
  companyName: string;
  timestamp: string;
  lastAccessed: string;
  status: "cached" | "stale";
}

// === Dashboard Types ===

export interface DashboardMetric {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: string;
}

export interface WorkflowNode {
  id: string;
  agent: AgentInfo;
  position: { x: number; y: number };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  animated: boolean;
}
