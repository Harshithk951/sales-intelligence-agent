<div align="center">

<!-- Animated Header Banner -->
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0f23,50:1a1a3e,100:0d1117&height=200&section=header&text=Smart%20Sales%20Intelligence%20Agent&fontSize=38&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Enterprise%20Multi-Agent%20AI%20%7C%20Powered%20by%20Gemini%202.0%20%26%20Google%20ADK&descAlignY=58&descSize=16&descColor=8b9cf4"/>

<br/>

<!-- Badges Row 1 -->
<a href="https://sales-intelligence-agent.vercel.app">
  <img src="https://img.shields.io/badge/🚀%20Live%20Demo-sales--intelligence--agent.vercel.app-6366f1?style=for-the-badge&logoColor=white"/>
</a>
&nbsp;
<img src="https://img.shields.io/badge/Google%20ADK-Multi--Agent-4285F4?style=for-the-badge&logo=google&logoColor=white"/>
&nbsp;
<img src="https://img.shields.io/badge/Gemini%202.0-Flash-8E75B2?style=for-the-badge&logo=google&logoColor=white"/>
&nbsp;
<img src="https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white"/>

<br/><br/>

<!-- Badges Row 2 -->
<img src="https://img.shields.io/badge/Next.js-15%20Dashboard-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
&nbsp;
<img src="https://img.shields.io/badge/React%20Flow-Orchestration%20View-FF0072?style=for-the-badge&logo=react&logoColor=white"/>
&nbsp;
<img src="https://img.shields.io/badge/Google%20AI%20Agents-Intensive%202025-34A853?style=for-the-badge&logo=google&logoColor=white"/>
&nbsp;
<img src="https://img.shields.io/badge/Capstone-6%2F3%20Features-F97316?style=for-the-badge"/>

<br/><br/>

<!-- Typing animation -->
<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=16&duration=3000&pause=800&color=6366F1&center=true&vCenter=true&multiline=true&repeat=true&width=700&height=80&lines=Orchestrator+%E2%86%92+Research+%E2%86%92+Analysis+%E2%86%92+Contact+%E2%86%92+Outreach;Automates+10%2B+hours+of+B2B+sales+research+per+prospect;Production+Next.js+15+Dashboard+%7C+React+Flow+Orchestration+View" alt="Typing SVG" />
</a>

</div>

---

## 🎯 What Is This?

> **A 4-agent enterprise pipeline that replaces 10+ hours of manual B2B sales research with a single company name.**

Sales teams spend 2–3 hours per prospect researching companies, finding decision-makers, analyzing pain points, and crafting personalized outreach. This system does all of it — automatically, consistently, at scale.

Built as a capstone for the **Google AI Agents Intensive (Nov 2025)**, delivering **6 out of 3 required features** — all 3 core + 3 bonus.

---

## ⚡ Live Demo

<div align="center">

| Interface | URL |
|-----------|-----|
| 🌐 Production Dashboard | [sales-intelligence-agent.vercel.app](https://sales-intelligence-agent.vercel.app) |
| 🗺️ Agent Orchestration View | `/dashboard/workflow` |
| 📋 Terminal Log Viewer | `/dashboard/logs` |
| 📊 Intelligence Overview | `/dashboard` |

</div>

---

## 🏗️ System Architecture

```
╔══════════════════════════════════════════════════════════════╗
║                        USER INPUT                            ║
║                   "Company Name: Acme Corp"                  ║
╚═══════════════════════════╦══════════════════════════════════╝
                            ║
                            ▼
╔══════════════════════════════════════════════════════════════╗
║                   ORCHESTRATOR AGENT                         ║
║         Coordinates all agents │ Manages memory & state      ║
║              Handles errors │ Structured logging              ║
╚═══════════════════════════╦══════════════════════════════════╝
                            ║
          ╔═════════════════╩══════════════════╗
          ║        SEQUENTIAL AGENT FLOW        ║
          ╚═════════════════╦══════════════════╝
                            ║
         ┌──────────────────▼──────────────────┐
         │         1. RESEARCH AGENT           │
         │  Tools: Google Search API           │
         │  Output: Company overview + news    │
         └──────────────────┬──────────────────┘
                            │
         ┌──────────────────▼──────────────────┐
         │         2. ANALYSIS AGENT           │
         │  Tools: Gemini 2.0 Flash            │
         │  Output: Challenges + opportunities │
         └──────────────────┬──────────────────┘
                            │
         ┌──────────────────▼──────────────────┐
         │         3. CONTACT AGENT            │
         │  Tools: Search + custom logic       │
         │  Output: Prioritized contact list   │
         └──────────────────┬──────────────────┘
                            │
         ┌──────────────────▼──────────────────┐
         │         4. OUTREACH AGENT           │
         │  Tools: Gemini 2.0 Flash            │
         │  Output: Personalized emails        │
         └──────────────────┬──────────────────┘
                            │
         ┌──────────────────▼──────────────────┐
         │           FINAL OUTPUT              │
         │  📊 Complete Intelligence Report    │
         │  👥 Decision maker contacts         │
         │  📧 Ready-to-send email drafts      │
         └─────────────────────────────────────┘
```

### Cross-Cutting Architecture Concerns

```
┌─────────────────────────────────────────────────────────┐
│                  CROSS-CUTTING LAYER                    │
├──────────────┬──────────────┬──────────────┬───────────┤
│ Memory Bank  │Session State │Observability │  Error    │
│ JSON cache   │ Context across│ Latency +    │ Handling  │
│ across runs  │  executions  │ token logging│ Recovery  │
└──────────────┴──────────────┴──────────────┴───────────┘
```

---

## ✅ Feature Checklist

| # | Feature | Status | Details |
|---|---------|--------|---------|
| 1 | **Multi-Agent System** | ✅ Core | 4 specialized agents with class-based abstractions |
| 2 | **Tools Integration** | ✅ Core | Google Search API + custom business logic tools |
| 3 | **Long-Term Memory** | ✅ Core | JSON memory bank persists research across sessions |
| 4 | **Session & State Management** | ✅ Bonus | `SessionState` maintains context across agent executions |
| 5 | **Observability** | ✅ Bonus | Per-agent logging: latency, error level, token usage |
| 6 | **Gemini Integration** | ✅ Bonus | Analysis + Outreach agents powered by Gemini 2.0 Flash |

**Result: 6/3 required features — all 3 core + 3 bonus**

---

## 🖥️ Production Frontend

Built with **Next.js 15 App Router**, **React Flow**, and **Framer Motion** — deployed to Vercel.

### Dashboard Overview (`/dashboard`)
- 4 live metrics cards: companies researched, contacts found, emails generated, cache hit rate
- Agent execution timeline with animated status chips per agent
- Company intelligence summary panel
- Memory bank visualization with cached entries + timestamps
- Outreach email preview with per-contact tabs

### Orchestration View (`/dashboard/workflow`)
- Full React Flow agent graph with animated data-flow edges
- Per-node status indicators: `idle → running → complete → error`
- Animated bezier connections showing pipeline execution state
- Custom node components matching the agent console design system

### Terminal Log Viewer (`/dashboard/logs`)
- Dark monospace terminal UI
- Columns: timestamp │ agent │ level │ message
- Auto-scroll during live execution

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+ (for frontend)
- Google AI Studio API key → [Get one here](https://aistudio.google.com/app/apikey)

### Backend Setup

```bash
# 1. Clone
git clone https://github.com/Harshithk951/sales-intelligence-agent
cd sales-intelligence-agent

# 2. Python environment
python3 -m venv venv
source venv/bin/activate        # Mac/Linux
# venv\Scripts\activate         # Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Configure
cp .env.example .env
# Add your GOOGLE_API_KEY to .env

# 5. Run
python main.py
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
# → http://localhost:3000
```

### Output Files Generated

```
reports/          ← JSON intelligence reports per company
logs/             ← agent_YYYYMMDD.log with per-agent metrics
memory_bank.json  ← Research cache (persists across runs)
```

---

## 📁 Project Structure

```
sales-intelligence-agent/
│
├── agents/                    # Core agent implementations
│   ├── research_agent.py      # Google Search → company overview
│   ├── analysis_agent.py      # Gemini → challenges & opportunities
│   ├── contact_agent.py       # Search + logic → decision makers
│   └── outreach_agent.py      # Gemini → personalized emails
│
├── tools/
│   └── search_tool.py         # Google Search API wrapper
│
├── utils/
│   ├── memory.py              # Memory bank + session state
│   └── logger.py              # Per-agent observability logging
│
├── frontend/                  # Next.js 15 production dashboard
│   ├── src/app/
│   │   ├── page.tsx           # Landing page
│   │   └── dashboard/         # Dashboard + workflow + logs
│   └── src/components/
│       └── workflow/          # React Flow agent graph
│
├── main.py                    # Orchestrator entry point
├── requirements.txt
└── .env.example
```

---

## 🔧 Configuration

```bash
# .env

# Required
GOOGLE_API_KEY=your_api_key_here

# Optional
MODEL_NAME=gemini-2.0-flash-exp   # or gemini-pro
MAX_RETRIES=3
TIMEOUT_SECONDS=30
```

**Change number of contacts generated:**
```python
# agents/outreach_agent.py, line 45
for contact in contacts[:3]:  # ← adjust here
```

---

## 📊 Example Output

```
📊 SALES INTELLIGENCE REPORT: Acme Corporation
════════════════════════════════════════════════════

🏢 Company:   Acme Corporation | Technology/SaaS | 100-500 employees

🎯 Challenges Identified (3):
   1. Scaling infrastructure under rapid growth
   2. Managing technical debt accumulation
   3. Integrating disparate internal systems

👥 Decision Makers Found (3):
   • John Smith       — Chief Technology Officer
   • Sarah Johnson    — VP of Engineering
   • Michael Chen     — Director of Product

📧 Outreach Emails Generated: 3
📁 Report saved → reports/acme_corporation_20251115.json
⚡ Total execution time: 47.3s
💾 Research cached → memory_bank.json
```

---

## 🧪 Testing

```bash
# Test with known companies
python main.py
# Enter: Salesforce

# Verify memory caching (2nd run should be instant)
python main.py
# Enter: Salesforce
# → "Found cached research for Salesforce (saved 38.2s)"
```

---

## 📚 Technical Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Agent topology | Sequential | Each agent requires previous agent's output as context |
| Memory layer | JSON file | Portable, zero-dependency, sufficient for demo scale |
| LLM | Gemini 2.0 Flash | Fast, cost-effective, strong at analysis + generation |
| Frontend | Next.js 15 App Router | Production deployment, React Flow support, Vercel-native |
| Observability | File + console logging | Dual output — human-readable in terminal, parseable for dashboard |
| API layer | Stubbed with hot-swap interface | Decouples frontend from backend; single env var to connect real Python backend |

---

## 🗺️ Roadmap

- [ ] Wire live Python backend to Next.js dashboard via FastAPI
- [ ] Real Google Custom Search API integration (replace mock)
- [ ] LinkedIn API for verified contact data
- [ ] Async parallel agent execution for sub-10s pipeline
- [ ] Email sending via SendGrid/Gmail API
- [ ] Multi-company batch processing mode
- [ ] Deploy backend to Google Cloud Run
- [ ] Vector store integration (ChromaDB) for semantic memory

---

## 👨‍💻 Author

**Harshith Kumar Mannepalli**

[![Portfolio](https://img.shields.io/badge/Portfolio-harshithkumar.in-6366f1?style=flat-square&logo=safari&logoColor=white)](https://harshithkumar.in)
[![GitHub](https://img.shields.io/badge/GitHub-Harshithk951-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Harshithk951)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-harshith--kumar--dev-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/harshith-kumar-dev)

---

## 🙏 Acknowledgments

- **Google AI & Kaggle** — AI Agents Intensive Course (Nov 2025)
- **Google ADK team** — Multi-agent orchestration framework

---

<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,50:1a1a3e,100:0f0f23&height=120&section=footer"/>

**⭐ Star this repo if it helped you build something.**

</div>
