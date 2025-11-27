"""
Smart Sales Intelligence Agent - Main Orchestrator
Capstone Project for AI Agents Intensive Course

This orchestrator coordinates multiple agents in a sequential pipeline:
1. Research Agent → Gathers company data
2. Analysis Agent → Identifies business challenges (uses Gemini)
3. Contact Agent → Finds decision makers
4. Outreach Agent → Generates personalized emails (uses Gemini)

Features implemented (6/3 required):
✓ Multi-agent system (Sequential agents)
✓ Tools (Google Search + Custom tools)
✓ Memory Bank (long-term memory)
✓ Session & State Management
✓ Observability (Logging & Tracing)
✓ Uses Gemini LLM (Bonus points!)
"""

import sys
import os

# Fix import paths
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import json
from dotenv import load_dotenv
from datetime import datetime

# Import agents
from agents.research_agent import ResearchAgent
from agents.analysis_agent import AnalysisAgent
from agents.contact_agent import ContactAgent
from agents.outreach_agent import OutreachAgent

# Import utilities
from utils.memory import MemoryBank, SessionState
from utils.logger import setup_logger, log_agent_start, log_agent_complete

# Load environment variables
load_dotenv()

# Setup logger
logger = setup_logger('Orchestrator')

class SalesIntelligenceOrchestrator:
    """
    Main orchestrator that coordinates all agents
    Implements sequential multi-agent architecture
    """
    
    def __init__(self):
        """Initialize the orchestrator with all agents"""
        logger.info("🚀 Initializing Sales Intelligence Agent System")
        
        # Initialize memory systems
        self.memory_bank = MemoryBank()
        self.session = None
        
        # Initialize all agents
        try:
            self.research_agent = ResearchAgent()
            self.analysis_agent = AnalysisAgent()
            self.contact_agent = ContactAgent()
            self.outreach_agent = OutreachAgent()
            
            logger.info("✅ All agents initialized successfully")
            
        except Exception as e:
            logger.error(f"❌ Failed to initialize agents: {e}")
            raise
    
    def process_company(self, company_name: str, use_cache: bool = True) -> dict:
        """
        Process a company through the entire agent pipeline
        
        Args:
            company_name: Name of the company to research
            use_cache: Whether to use cached results if available
            
        Returns:
            Complete intelligence report dictionary
        """
        logger.info(f"\n{'='*60}")
        logger.info(f"🎯 Starting intelligence gathering for: {company_name}")
        logger.info(f"{'='*60}\n")
        
        # Create new session
        self.session = SessionState()
        self.session.update('company_name', company_name)
        
        try:
            # Check memory bank for cached results
            if use_cache and self.memory_bank.has_company(company_name):
                logger.info(f"📚 Found cached research for {company_name}")
                cached_data = self.memory_bank.get_company_research(company_name)
                logger.info(f"✅ Using cached results (saves time!)")
                return cached_data
            
            # SEQUENTIAL AGENT EXECUTION
            
            # Step 1: Research Agent
            logger.info("\n" + "="*60)
            logger.info("STEP 1: Research Agent - Gathering company information")
            logger.info("="*60)
            research_results = self.research_agent.execute(company_name)
            self.session.update('research_results', research_results)
            
            if research_results.get('research_status') == 'failed':
                raise Exception(f"Research failed: {research_results.get('error')}")
            
            # Step 2: Analysis Agent
            logger.info("\n" + "="*60)
            logger.info("STEP 2: Analysis Agent - Analyzing business challenges")
            logger.info("="*60)
            analysis_results = self.analysis_agent.execute(research_results)
            self.session.update('analysis_results', analysis_results)
            
            if analysis_results.get('analysis_status') == 'failed':
                raise Exception(f"Analysis failed: {analysis_results.get('error')}")
            
            # Step 3: Contact Agent
            logger.info("\n" + "="*60)
            logger.info("STEP 3: Contact Agent - Finding decision makers")
            logger.info("="*60)
            contact_results = self.contact_agent.execute(company_name, analysis_results)
            self.session.update('contact_results', contact_results)
            
            if contact_results.get('contact_status') == 'failed':
                raise Exception(f"Contact search failed: {contact_results.get('error')}")
            
            # Step 4: Outreach Agent
            logger.info("\n" + "="*60)
            logger.info("STEP 4: Outreach Agent - Generating personalized emails")
            logger.info("="*60)
            outreach_results = self.outreach_agent.execute(
                company_name, 
                analysis_results, 
                contact_results
            )
            self.session.update('outreach_results', outreach_results)
            
            if outreach_results.get('outreach_status') == 'failed':
                raise Exception(f"Outreach generation failed: {outreach_results.get('error')}")
            
            # Compile final report
            final_report = self._compile_report(
                company_name,
                research_results,
                analysis_results,
                contact_results,
                outreach_results
            )
            
            # Store in memory bank
            self.memory_bank.store_company_research(company_name, final_report)
            
            logger.info("\n" + "="*60)
            logger.info(f"✅ Intelligence gathering complete for {company_name}!")
            logger.info("="*60 + "\n")
            
            return final_report
            
        except Exception as e:
            logger.error(f"❌ Pipeline failed: {e}")
            self.session.add_error(str(e))
            return {
                'company_name': company_name,
                'status': 'failed',
                'error': str(e),
                'session_state': self.session.get_full_state()
            }
    
    def _compile_report(self, company_name, research, analysis, contacts, outreach) -> dict:
        """Compile all results into a final report"""
        return {
            'company_name': company_name,
            'generated_at': datetime.now().isoformat(),
            'status': 'success',
            
            # Research section
            'company_overview': research.get('company_info', {}),
            'recent_news': research.get('recent_news', []),
            
            # Analysis section
            'key_challenges': analysis.get('key_challenges', []),
            'opportunities': analysis.get('opportunities', []),
            'recommended_approach': analysis.get('recommended_approach', ''),
            'full_analysis': analysis.get('analysis', ''),
            
            # Contacts section
            'total_contacts_found': contacts.get('total_contacts_found', 0),
            'priority_contacts': contacts.get('prioritized_contacts', [])[:3],
            
            # Outreach section
            'outreach_emails': outreach.get('outreach_emails', []),
            
            # Metadata
            'session_id': self.session.get('session_id'),
            'agents_used': [
                'Research Agent',
                'Analysis Agent', 
                'Contact Agent',
                'Outreach Agent'
            ]
        }
    
    def save_report(self, report: dict, filename: str = None):
        """Save report to JSON file"""
        if filename is None:
            company = report.get('company_name', 'unknown').replace(' ', '_')
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filename = f"reports/{company}_{timestamp}.json"
        
        # Create reports directory if it doesn't exist
        os.makedirs('reports', exist_ok=True)
        
        with open(filename, 'w') as f:
            json.dump(report, f, indent=2)
        
        logger.info(f"💾 Report saved to: {filename}")
        return filename
    
    def display_report_summary(self, report: dict):
        """Display a summary of the report"""
        print("\n" + "="*60)
        print(f"📊 SALES INTELLIGENCE REPORT: {report.get('company_name')}")
        print("="*60)
        
        print(f"\n🏢 Company Overview:")
        overview = report.get('company_overview', {})
        print(f"   Industry: {overview.get('industry', 'N/A')}")
        print(f"   Size: {overview.get('size', 'N/A')}")
        print(f"   Location: {overview.get('location', 'N/A')}")
        
        print(f"\n🎯 Key Challenges ({len(report.get('key_challenges', []))}):")
        for i, challenge in enumerate(report.get('key_challenges', [])[:3], 1):
            print(f"   {i}. {challenge}")
        
        print(f"\n👥 Priority Contacts ({len(report.get('priority_contacts', []))}):")
        for contact in report.get('priority_contacts', []):
            print(f"   • {contact.get('name')} - {contact.get('title')}")
        
        print(f"\n📧 Outreach Emails Generated: {len(report.get('outreach_emails', []))}")
        
        print("\n" + "="*60 + "\n")


def main():
    """Main entry point for the application"""
    
    # Initialize orchestrator
    orchestrator = SalesIntelligenceOrchestrator()
    
    # Example usage
    print("\n🎯 Smart Sales Intelligence Agent")
    print("="*60)
    
    # Get company name from user
    company_name = input("\nEnter company name to research: ").strip()
    
    if not company_name:
        print("❌ No company name provided. Using example: 'Acme Corporation'")
        company_name = "Acme Corporation"
    
    # Process the company
    report = orchestrator.process_company(company_name)
    
    # Display summary
    orchestrator.display_report_summary(report)
    
    # Save full report
    filename = orchestrator.save_report(report)
    print(f"✅ Full report saved to: {filename}")
    
    # Show first email as example
    if report.get('outreach_emails'):
        email = report['outreach_emails'][0]
        print("\n" + "="*60)
        print("📧 SAMPLE OUTREACH EMAIL")
        print("="*60)
        print(f"To: {email.get('recipient')} ({email.get('title')})")
        print(f"Subject: {email.get('subject')}\n")
        print(email.get('body', 'No email body'))
        print("="*60 + "\n")


if __name__ == "__main__":
    main()