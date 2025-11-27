"""
Smart Sales Intelligence Agent - MOCK MODE (No API calls)
Perfect for testing without hitting API limits!

All the same features, but uses pre-written analysis instead of calling Gemini.
"""

import os
import json
import logging
from datetime import datetime
from typing import Dict, List, Optional
from dotenv import load_dotenv

load_dotenv()

# ============================================================================
# LOGGING
# ============================================================================

def setup_logger(name: str, level=logging.INFO):
    logger = logging.getLogger(name)
    logger.setLevel(level)
    
    if logger.handlers:
        return logger
    
    console_handler = logging.StreamHandler()
    console_handler.setLevel(level)
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    console_handler.setFormatter(formatter)
    
    os.makedirs('logs', exist_ok=True)
    log_file = f'logs/agent_{datetime.now().strftime("%Y%m%d")}.log'
    file_handler = logging.FileHandler(log_file)
    file_handler.setLevel(level)
    file_handler.setFormatter(formatter)
    
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)
    
    return logger

main_logger = setup_logger('SalesAgent')

def log_agent_start(agent_name: str, input_data: dict):
    main_logger.info(f"🚀 {agent_name} started with input: {input_data}")

def log_agent_complete(agent_name: str, output_summary: str):
    main_logger.info(f"✅ {agent_name} completed: {output_summary}")

def log_agent_error(agent_name: str, error: Exception):
    main_logger.error(f"❌ {agent_name} failed: {str(error)}", exc_info=True)

def log_tool_call(tool_name: str, parameters: dict):
    main_logger.info(f"🔧 Tool called: {tool_name} with params: {parameters}")

# ============================================================================
# MEMORY SYSTEM
# ============================================================================

class MemoryBank:
    def __init__(self, memory_file: str = 'memory_bank.json'):
        self.memory_file = memory_file
        self.memory = self._load_memory()
        self.logger = setup_logger('Memory')
    
    def _load_memory(self) -> Dict:
        if os.path.exists(self.memory_file):
            try:
                with open(self.memory_file, 'r') as f:
                    return json.load(f)
            except:
                return {}
        return {}
    
    def _save_memory(self):
        try:
            with open(self.memory_file, 'w') as f:
                json.dump(self.memory, f, indent=2)
        except Exception as e:
            self.logger.error(f"Failed to save memory: {e}")
    
    def store_company_research(self, company_name: str, research_data: Dict):
        key = company_name.lower().strip()
        self.memory[key] = {
            'company_name': company_name,
            'research_data': research_data,
            'timestamp': datetime.now().isoformat(),
            'last_accessed': datetime.now().isoformat()
        }
        self._save_memory()
        self.logger.info(f"✅ Stored research for {company_name}")
    
    def get_company_research(self, company_name: str) -> Optional[Dict]:
        key = company_name.lower().strip()
        if key in self.memory:
            self.memory[key]['last_accessed'] = datetime.now().isoformat()
            self._save_memory()
            self.logger.info(f"📖 Retrieved cached research for {company_name}")
            return self.memory[key]['research_data']
        return None
    
    def has_company(self, company_name: str) -> bool:
        key = company_name.lower().strip()
        return key in self.memory

class SessionState:
    def __init__(self):
        self.state = {
            'session_id': datetime.now().strftime('%Y%m%d_%H%M%S'),
            'company_name': None,
            'research_results': None,
            'analysis_results': None,
            'contact_results': None,
            'outreach_results': None,
            'errors': []
        }
        self.logger = setup_logger('Session')
        self.logger.info(f"🆕 Created new session: {self.state['session_id']}")
    
    def update(self, key: str, value):
        self.state[key] = value
        self.logger.info(f"📝 Updated session state: {key}")
    
    def get(self, key: str):
        return self.state.get(key)
    
    def add_error(self, error: str):
        self.state['errors'].append({'error': error, 'timestamp': datetime.now().isoformat()})
    
    def get_full_state(self) -> Dict:
        return self.state.copy()

# ============================================================================
# SEARCH TOOL
# ============================================================================

class GoogleSearchTool:
    def __init__(self):
        self.logger = setup_logger('SearchTool')
    
    def search_company_info(self, company_name: str) -> Dict:
        log_tool_call('GoogleSearch', {'query': company_name})
        self.logger.info(f"🔍 Searching for: {company_name}")
        
        results = {
            'company_name': company_name,
            'overview': f"{company_name} is a leading enterprise technology company",
            'industry': "Enterprise Software/SaaS",
            'size': "500-10,000 employees",
            'founded': "2000s",
            'location': "San Francisco, CA",
            'website': f"www.{company_name.lower().replace(' ', '')}.com",
            'recent_news': [
                f"{company_name} announces record Q4 earnings",
                f"{company_name} launches innovative AI-powered platform",
                f"{company_name} expands global footprint with new offices",
                f"{company_name} wins major enterprise contracts"
            ],
            'key_facts': [
                f"{company_name} serves thousands of enterprise customers",
                "Leader in digital transformation solutions",
                "Known for customer-centric innovation"
            ]
        }
        
        self.logger.info(f"✅ Found results for {company_name}")
        return results
    
    def search_company_contacts(self, company_name: str) -> List[Dict]:
        log_tool_call('ContactSearch', {'company': company_name})
        self.logger.info(f"👥 Searching for contacts at: {company_name}")
        
        contacts = [
            {
                'name': 'Jennifer Martinez',
                'title': 'Chief Technology Officer',
                'department': 'Technology',
                'linkedin': 'linkedin.com/in/jennifermartinez',
                'email': f'j.martinez@{company_name.lower().replace(" ", "")}.com'
            },
            {
                'name': 'David Thompson',
                'title': 'VP of Engineering',
                'department': 'Engineering',
                'linkedin': 'linkedin.com/in/davidthompson',
                'email': f'd.thompson@{company_name.lower().replace(" ", "")}.com'
            },
            {
                'name': 'Emily Chen',
                'title': 'Director of Product Management',
                'department': 'Product',
                'linkedin': 'linkedin.com/in/emilychen',
                'email': f'e.chen@{company_name.lower().replace(" ", "")}.com'
            }
        ]
        
        self.logger.info(f"✅ Found {len(contacts)} contacts")
        return contacts

# ============================================================================
# AGENTS
# ============================================================================

class ResearchAgent:
    def __init__(self):
        self.search_tool = GoogleSearchTool()
        self.name = "Research Agent"
        self.logger = setup_logger('ResearchAgent')
        self.logger.info(f"✅ {self.name} initialized")
    
    def execute(self, company_name: str) -> Dict:
        log_agent_start(self.name, {'company_name': company_name})
        
        try:
            self.logger.info(f"Step 1: Gathering company overview")
            company_info = self.search_tool.search_company_info(company_name)
            
            self.logger.info(f"Step 2: Gathering recent news")
            recent_news = company_info['recent_news']
            
            research_data = {
                'company_name': company_name,
                'company_info': company_info,
                'recent_news': recent_news,
                'research_status': 'completed'
            }
            
            log_agent_complete(self.name, f"Completed research for {company_name}")
            return research_data
            
        except Exception as e:
            log_agent_error(self.name, e)
            return {'company_name': company_name, 'error': str(e), 'research_status': 'failed'}

class AnalysisAgent:
    """Mock analysis - no API calls!"""
    def __init__(self):
        self.name = "Analysis Agent"
        self.logger = setup_logger('AnalysisAgent')
        self.logger.info(f"✅ {self.name} initialized (MOCK MODE - no API calls)")
    
    def execute(self, research_data: Dict) -> Dict:
        log_agent_start(self.name, {'company': research_data.get('company_name')})
        
        try:
            company_name = research_data.get('company_name')
            
            self.logger.info(f"🤖 Generating mock analysis (no API call)")
            
            # Pre-written analysis
            analysis_data = {
                'company_name': company_name,
                'analysis': f"Analysis of {company_name}: The company faces typical enterprise challenges including scaling infrastructure, managing technical debt, and integrating modern AI capabilities. Key opportunities exist in automation and digital transformation.",
                'key_challenges': [
                    "Scaling infrastructure while maintaining performance and reliability",
                    "Managing technical debt accumulated during rapid growth phases",
                    "Integrating AI and machine learning into existing product offerings",
                    "Attracting and retaining top engineering talent in competitive market",
                    "Ensuring data security and compliance across global operations"
                ],
                'opportunities': [
                    "Automation tools can reduce operational overhead by 40%",
                    "AI-powered analytics can improve decision-making speed",
                    "Cloud-native solutions enable faster time-to-market",
                    "Modern DevOps practices can improve deployment frequency"
                ],
                'recommended_approach': "Emphasize proven ROI in similar enterprise environments. Focus on quick wins and scalability. Lead with technical credibility and case studies from comparable companies.",
                'analysis_status': 'completed'
            }
            
            log_agent_complete(self.name, f"Mock analysis complete for {company_name}")
            return analysis_data
            
        except Exception as e:
            log_agent_error(self.name, e)
            return {'company_name': research_data.get('company_name'), 'error': str(e), 'analysis_status': 'failed'}

class ContactAgent:
    def __init__(self):
        self.search_tool = GoogleSearchTool()
        self.name = "Contact Agent"
        self.logger = setup_logger('ContactAgent')
        self.logger.info(f"✅ {self.name} initialized")
    
    def execute(self, company_name: str, analysis_data: Dict) -> Dict:
        log_agent_start(self.name, {'company': company_name})
        
        try:
            self.logger.info(f"Searching for decision makers")
            contacts = self.search_tool.search_company_contacts(company_name)
            
            self.logger.info(f"Prioritizing {len(contacts)} contacts")
            prioritized = self._prioritize_contacts(contacts)
            
            contact_data = {
                'company_name': company_name,
                'total_contacts_found': len(contacts),
                'prioritized_contacts': prioritized,
                'contact_status': 'completed'
            }
            
            log_agent_complete(self.name, f"Found {len(contacts)} contacts")
            return contact_data
            
        except Exception as e:
            log_agent_error(self.name, e)
            return {'company_name': company_name, 'error': str(e), 'contact_status': 'failed'}
    
    def _prioritize_contacts(self, contacts: List[Dict]) -> List[Dict]:
        priority_titles = ['CTO', 'VP', 'Chief', 'Director', 'Head']
        
        for contact in contacts:
            title = contact.get('title', '')
            priority_score = 0
            
            for priority_title in priority_titles:
                if priority_title.lower() in title.lower():
                    priority_score += 10
                    break
            
            if 'technology' in title.lower() or 'engineering' in title.lower():
                priority_score += 5
            
            contact['priority_score'] = priority_score
        
        return sorted(contacts, key=lambda x: x.get('priority_score', 0), reverse=True)

class OutreachAgent:
    """Mock outreach - no API calls!"""
    def __init__(self):
        self.name = "Outreach Agent"
        self.logger = setup_logger('OutreachAgent')
        self.logger.info(f"✅ {self.name} initialized (MOCK MODE - no API calls)")
    
    def execute(self, company_name: str, analysis_data: Dict, contact_data: Dict) -> Dict:
        log_agent_start(self.name, {'company': company_name})
        
        try:
            contacts = contact_data.get('prioritized_contacts', [])
            emails = []
            
            for contact in contacts[:3]:
                self.logger.info(f"Generating mock email for {contact.get('name')}")
                email = self._generate_mock_email(contact, analysis_data, company_name)
                emails.append(email)
            
            outreach_data = {
                'company_name': company_name,
                'emails_generated': len(emails),
                'outreach_emails': emails,
                'outreach_status': 'completed'
            }
            
            log_agent_complete(self.name, f"Generated {len(emails)} emails")
            return outreach_data
            
        except Exception as e:
            log_agent_error(self.name, e)
            return {'company_name': company_name, 'error': str(e), 'outreach_status': 'failed'}
    
    def _generate_mock_email(self, contact: Dict, analysis_data: Dict, company_name: str) -> Dict:
        challenges = analysis_data.get('key_challenges', [])
        
        body = f"""Hi {contact.get('name').split()[0]},

I hope this message finds you well. I've been following {company_name}'s impressive growth and recent initiatives, particularly your focus on scaling operations and technology innovation.

Many engineering leaders I work with in similar positions face challenges around {challenges[0] if challenges else 'infrastructure scaling'}. I noticed {company_name} has been expanding rapidly, which often brings these types of technical challenges to the forefront.

We've helped companies like yours reduce operational overhead by 40% while improving system reliability through automated infrastructure management and intelligent monitoring solutions.

Would you be open to a brief 15-minute conversation to explore whether our approach might be relevant for {company_name}? I'd be happy to share specific case studies from companies at a similar stage.

Best regards,
[Your Name]"""
        
        return {
            'recipient': contact.get('name'),
            'title': contact.get('title'),
            'email_address': contact.get('email'),
            'subject': f"Helping {company_name} scale infrastructure efficiently",
            'body': body,
            'priority_score': contact.get('priority_score', 0)
        }

# ============================================================================
# ORCHESTRATOR
# ============================================================================

class SalesIntelligenceOrchestrator:
    def __init__(self):
        self.logger = setup_logger('Orchestrator')
        self.logger.info("🚀 Initializing Sales Intelligence System (MOCK MODE)")
        
        self.memory_bank = MemoryBank()
        self.session = None
        
        try:
            self.research_agent = ResearchAgent()
            self.analysis_agent = AnalysisAgent()
            self.contact_agent = ContactAgent()
            self.outreach_agent = OutreachAgent()
            self.logger.info("✅ All agents initialized")
        except Exception as e:
            self.logger.error(f"❌ Failed to initialize: {e}")
            raise
    
    def process_company(self, company_name: str, use_cache: bool = True) -> dict:
        self.logger.info(f"\n{'='*60}")
        self.logger.info(f"🎯 Starting intelligence for: {company_name}")
        self.logger.info(f"{'='*60}\n")
        
        self.session = SessionState()
        self.session.update('company_name', company_name)
        
        try:
            if use_cache and self.memory_bank.has_company(company_name):
                self.logger.info(f"📚 Using cached results")
                return self.memory_bank.get_company_research(company_name)
            
            self.logger.info("\n" + "="*60)
            self.logger.info("STEP 1: Research Agent")
            self.logger.info("="*60)
            research_results = self.research_agent.execute(company_name)
            self.session.update('research_results', research_results)
            
            if research_results.get('research_status') == 'failed':
                raise Exception(f"Research failed: {research_results.get('error')}")
            
            self.logger.info("\n" + "="*60)
            self.logger.info("STEP 2: Analysis Agent (MOCK)")
            self.logger.info("="*60)
            analysis_results = self.analysis_agent.execute(research_results)
            self.session.update('analysis_results', analysis_results)
            
            if analysis_results.get('analysis_status') == 'failed':
                raise Exception(f"Analysis failed: {analysis_results.get('error')}")
            
            self.logger.info("\n" + "="*60)
            self.logger.info("STEP 3: Contact Agent")
            self.logger.info("="*60)
            contact_results = self.contact_agent.execute(company_name, analysis_results)
            self.session.update('contact_results', contact_results)
            
            if contact_results.get('contact_status') == 'failed':
                raise Exception(f"Contact failed: {contact_results.get('error')}")
            
            self.logger.info("\n" + "="*60)
            self.logger.info("STEP 4: Outreach Agent (MOCK)")
            self.logger.info("="*60)
            outreach_results = self.outreach_agent.execute(company_name, analysis_results, contact_results)
            self.session.update('outreach_results', outreach_results)
            
            if outreach_results.get('outreach_status') == 'failed':
                raise Exception(f"Outreach failed: {outreach_results.get('error')}")
            
            final_report = self._compile_report(
                company_name, research_results, analysis_results, 
                contact_results, outreach_results
            )
            
            self.memory_bank.store_company_research(company_name, final_report)
            
            self.logger.info("\n" + "="*60)
            self.logger.info(f"✅ Complete for {company_name}!")
            self.logger.info("="*60 + "\n")
            
            return final_report
            
        except Exception as e:
            self.logger.error(f"❌ Pipeline failed: {e}")
            self.session.add_error(str(e))
            return {'company_name': company_name, 'status': 'failed', 'error': str(e)}
    
    def _compile_report(self, company_name, research, analysis, contacts, outreach) -> dict:
        return {
            'company_name': company_name,
            'generated_at': datetime.now().isoformat(),
            'status': 'success',
            'company_overview': research.get('company_info', {}),
            'recent_news': research.get('recent_news', []),
            'key_challenges': analysis.get('key_challenges', []),
            'opportunities': analysis.get('opportunities', []),
            'recommended_approach': analysis.get('recommended_approach', ''),
            'full_analysis': analysis.get('analysis', ''),
            'total_contacts_found': contacts.get('total_contacts_found', 0),
            'priority_contacts': contacts.get('prioritized_contacts', [])[:3],
            'outreach_emails': outreach.get('outreach_emails', []),
            'session_id': self.session.get('session_id')
        }
    
    def save_report(self, report: dict):
        os.makedirs('reports', exist_ok=True)
        company = report.get('company_name', 'unknown').replace(' ', '_')
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"reports/{company}_{timestamp}.json"
        
        with open(filename, 'w') as f:
            json.dump(report, f, indent=2)
        
        self.logger.info(f"💾 Report saved: {filename}")
        return filename
    
    def display_summary(self, report: dict):
        print("\n" + "="*60)
        print(f"📊 SALES INTELLIGENCE: {report.get('company_name')}")
        print("="*60)
        
        print(f"\n🏢 Company Overview:")
        overview = report.get('company_overview', {})
        print(f"   Industry: {overview.get('industry', 'N/A')}")
        print(f"   Size: {overview.get('size', 'N/A')}")
        
        print(f"\n🎯 Key Challenges ({len(report.get('key_challenges', []))}):")
        for i, c in enumerate(report.get('key_challenges', [])[:3], 1):
            print(f"   {i}. {c}")
        
        print(f"\n👥 Priority Contacts ({len(report.get('priority_contacts', []))}):")
        for contact in report.get('priority_contacts', []):
            print(f"   • {contact.get('name')} - {contact.get('title')}")
        
        print(f"\n📧 Emails Generated: {len(report.get('outreach_emails', []))}")
        print("="*60 + "\n")

# ============================================================================
# MAIN
# ============================================================================

def main():
    print("\n🤖 Smart Sales Intelligence Agent (MOCK MODE)")
    print("   No API calls - Perfect for testing!")
    print("="*60)
    
    orchestrator = SalesIntelligenceOrchestrator()
    
    company_name = input("\nEnter company name to research: ").strip()
    
    if not company_name:
        print("Using example: Salesforce")
        company_name = "Salesforce"
    
    report = orchestrator.process_company(company_name)
    
    orchestrator.display_summary(report)
    
    filename = orchestrator.save_report(report)
    print(f"✅ Full report saved to: {filename}")
    
    if report.get('outreach_emails'):
        email = report['outreach_emails'][0]
        print("\n" + "="*60)
        print("📧 SAMPLE EMAIL")
        print("="*60)
        print(f"To: {email.get('recipient')} ({email.get('title')})")
        print(f"Subject: {email.get('subject')}\n")
        print(email.get('body', 'Error generating email'))
        print("="*60 + "\n")

if __name__ == "__main__":
    main()