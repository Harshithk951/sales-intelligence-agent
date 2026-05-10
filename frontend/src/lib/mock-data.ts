import { IntelligenceReport, DashboardMetric, LogEntry, MemoryEntry, ExecutionStep } from "./types";

export const mockReport: IntelligenceReport = {
  companyName: "Salesforce",
  generatedAt: "2025-11-20T10:03:28.192548",
  status: "success",
  company: {
    name: "Salesforce",
    overview: "Salesforce is a leading enterprise technology company",
    industry: "Enterprise Software/SaaS",
    size: "500-10,000 employees",
    founded: "2000s",
    location: "San Francisco, CA",
    website: "www.salesforce.com",
    recentNews: [
      "Salesforce announces record Q4 earnings",
      "Salesforce launches innovative AI-powered platform",
      "Salesforce expands global footprint with new offices",
      "Salesforce wins major enterprise contracts"
    ],
    keyFacts: [
      "Salesforce serves thousands of enterprise customers",
      "Leader in digital transformation solutions",
      "Known for customer-centric innovation"
    ]
  },
  keyChallenges: [
    "Scaling infrastructure while maintaining performance and reliability",
    "Managing technical debt accumulated during rapid growth phases",
    "Integrating AI and machine learning into existing product offerings",
    "Attracting and retaining top engineering talent in competitive market",
    "Ensuring data security and compliance across global operations"
  ],
  opportunities: [
    "Automation tools can reduce operational overhead by 40%",
    "AI-powered analytics can improve decision-making speed",
    "Cloud-native solutions enable faster time-to-market",
    "Modern DevOps practices can improve deployment frequency"
  ],
  recommendedApproach: "Emphasize proven ROI in similar enterprise environments. Focus on quick wins and scalability. Lead with technical credibility and case studies from comparable companies.",
  fullAnalysis: "Analysis of Salesforce: The company faces typical enterprise challenges including scaling infrastructure, managing technical debt, and integrating modern AI capabilities. Key opportunities exist in automation and digital transformation.",
  totalContactsFound: 3,
  priorityContacts: [
    {
      name: "Jennifer Martinez",
      title: "Chief Technology Officer",
      department: "Technology",
      linkedin: "linkedin.com/in/jennifermartinez",
      email: "j.martinez@salesforce.com",
      priorityScore: 15
    },
    {
      name: "David Thompson",
      title: "VP of Engineering",
      department: "Engineering",
      linkedin: "linkedin.com/in/davidthompson",
      email: "d.thompson@salesforce.com",
      priorityScore: 15
    },
    {
      name: "Emily Chen",
      title: "Director of Product Management",
      department: "Product",
      linkedin: "linkedin.com/in/emilychen",
      email: "e.chen@salesforce.com",
      priorityScore: 10
    }
  ],
  outreachEmails: [
    {
      recipient: "Jennifer Martinez",
      title: "Chief Technology Officer",
      emailAddress: "j.martinez@salesforce.com",
      subject: "Helping Salesforce scale infrastructure efficiently",
      body: "Hi Jennifer,\n\nI hope this message finds you well. I've been following Salesforce's impressive growth and recent initiatives, particularly your focus on scaling operations and technology innovation.\n\nMany engineering leaders I work with in similar positions face challenges around Scaling infrastructure while maintaining performance and reliability. I noticed Salesforce has been expanding rapidly, which often brings these types of technical challenges to the forefront.\n\nWe've helped companies like yours reduce operational overhead by 40% while improving system reliability through automated infrastructure management and intelligent monitoring solutions.\n\nWould you be open to a brief 15-minute conversation to explore whether our approach might be relevant for Salesforce? I'd be happy to share specific case studies from companies at a similar stage.\n\nBest regards,\n[Your Name]",
      priorityScore: 15
    }
  ],
  sessionId: "20251120_100328"
};

export const mockDashboardMetrics: DashboardMetric[] = [
  { label: "Companies Researched", value: "1,248", change: "+12%", trend: "up", icon: "building-2" },
  { label: "Contacts Found", value: "8,942", change: "+24%", trend: "up", icon: "users" },
  { label: "Emails Generated", value: "8,500", change: "+18%", trend: "up", icon: "mail" },
  { label: "Cache Hit Rate", value: "94.2%", change: "+2.1%", trend: "up", icon: "database" }
];

export const mockLogs: LogEntry[] = [
  { id: "1", timestamp: "2025-11-20T10:03:28", level: "info", agent: "Orchestrator", message: "🚀 Initializing Sales Intelligence Agent System" },
  { id: "2", timestamp: "2025-11-20T10:03:29", level: "info", agent: "ResearchAgent", message: "Step 1: Gathering company overview for Salesforce" },
  { id: "3", timestamp: "2025-11-20T10:03:31", level: "info", agent: "ResearchAgent", message: "Step 2: Gathering recent news for Salesforce" },
  { id: "4", timestamp: "2025-11-20T10:03:32", level: "info", agent: "AnalysisAgent", message: "Analyzing business challenges using Gemini" },
  { id: "5", timestamp: "2025-11-20T10:03:35", level: "info", agent: "ContactAgent", message: "Finding decision makers matching criteria" },
  { id: "6", timestamp: "2025-11-20T10:03:38", level: "info", agent: "OutreachAgent", message: "Generating personalized emails for 3 contacts" }
];

export const mockMemory: MemoryEntry[] = [
  { companyName: "Salesforce", timestamp: "2025-11-20T10:03:28", lastAccessed: "2025-11-20T10:03:28", status: "cached" },
  { companyName: "Google", timestamp: "2025-11-20T10:05:16", lastAccessed: "2025-11-20T10:05:16", status: "cached" },
  { companyName: "Acme Corp", timestamp: "2025-11-19T14:22:00", lastAccessed: "2025-11-19T14:22:00", status: "stale" }
];

export const mockExecutionSteps: ExecutionStep[] = [
  { agentId: "research", agentName: "Research Agent", status: "complete", message: "Gathered company overview and 5 news articles", duration: 3200 },
  { agentId: "analysis", agentName: "Analysis Agent", status: "complete", message: "Identified 5 key challenges and 4 opportunities", duration: 4100 },
  { agentId: "contact", agentName: "Contact Agent", status: "running", message: "Searching for technology and engineering leaders...", duration: 2100 },
  { agentId: "outreach", agentName: "Outreach Agent", status: "idle", message: "Waiting for contacts..." }
];
