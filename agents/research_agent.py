"""
Research Agent - Gathers company information
First agent in the sequential pipeline
"""

from typing import Dict

# Try relative imports first, fall back to direct imports
try:
    from tools.search_tool import GoogleSearchTool
    from utils.logger import setup_logger, log_agent_start, log_agent_complete, log_agent_error
except ImportError:
    import sys
    import os
    sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    from tools.search_tool import GoogleSearchTool
    from utils.logger import setup_logger, log_agent_start, log_agent_complete, log_agent_error

logger = setup_logger('ResearchAgent')

class ResearchAgent:
    """
    Agent responsible for gathering basic company information
    Uses Google Search tool to find company data
    """
    
    def __init__(self):
        """Initialize the research agent with search tool"""
        self.search_tool = GoogleSearchTool()
        self.name = "Research Agent"
        logger.info(f"✅ {self.name} initialized")
    
    def execute(self, company_name: str) -> Dict:
        """
        Execute research on a company
        
        Args:
            company_name: Name of the company to research
            
        Returns:
            Dictionary containing company research data
        """
        log_agent_start(self.name, {'company_name': company_name})
        
        try:
            # Step 1: Search for company overview
            logger.info(f"Step 1: Gathering company overview for {company_name}")
            company_info = self.search_tool.search_company_info(company_name)
            
            # Step 2: Search for recent news
            logger.info(f"Step 2: Gathering recent news for {company_name}")
            recent_news = self.search_tool.search_company_news(company_name, limit=5)
            
            # Step 3: Compile research results
            research_data = {
                'company_name': company_name,
                'company_info': company_info,
                'recent_news': recent_news,
                'research_status': 'completed'
            }
            
            log_agent_complete(
                self.name, 
                f"Completed research for {company_name}"
            )
            
            return research_data
            
        except Exception as e:
            log_agent_error(self.name, e)
            return {
                'company_name': company_name,
                'error': str(e),
                'research_status': 'failed'
            }
    
    def get_agent_description(self) -> str:
        """Return description of what this agent does"""
        return (
            f"{self.name}: Gathers comprehensive company information "
            "including overview, industry, size, and recent news using web search."
        )