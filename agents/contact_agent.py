"""
Contact Agent - Finds key decision makers at target company
Third agent in the sequential pipeline
"""

from typing import Dict, List
from tools.search_tool import GoogleSearchTool
from utils.logger import setup_logger, log_agent_start, log_agent_complete, log_agent_error

logger = setup_logger('ContactAgent')

class ContactAgent:
    """
    Agent responsible for finding key decision makers and contacts
    Uses search tools to identify people to reach out to
    """
    
    def __init__(self):
        """Initialize the contact agent with search tool"""
        self.search_tool = GoogleSearchTool()
        self.name = "Contact Agent"
        logger.info(f"✅ {self.name} initialized")
    
    def execute(self, company_name: str, analysis_data: Dict) -> Dict:
        """
        Find key contacts at the target company
        
        Args:
            company_name: Name of the company
            analysis_data: Analysis results from AnalysisAgent (to inform contact selection)
            
        Returns:
            Dictionary containing contact information
        """
        log_agent_start(self.name, {'company': company_name})
        
        try:
            # Step 1: Search for key decision makers
            logger.info(f"Step 1: Searching for decision makers at {company_name}")
            contacts = self.search_tool.search_company_contacts(company_name)
            
            # Step 2: Prioritize contacts based on analysis
            logger.info(f"Step 2: Prioritizing {len(contacts)} contacts")
            prioritized_contacts = self._prioritize_contacts(contacts, analysis_data)
            
            # Step 3: Compile contact data
            contact_data = {
                'company_name': company_name,
                'total_contacts_found': len(contacts),
                'prioritized_contacts': prioritized_contacts,
                'contact_status': 'completed'
            }
            
            log_agent_complete(
                self.name,
                f"Found {len(contacts)} contacts for {company_name}"
            )
            
            return contact_data
            
        except Exception as e:
            log_agent_error(self.name, e)
            return {
                'company_name': company_name,
                'error': str(e),
                'contact_status': 'failed'
            }
    
    def _prioritize_contacts(self, contacts: List[Dict], analysis_data: Dict) -> List[Dict]:
        """
        Prioritize contacts based on their relevance to identified challenges
        
        Args:
            contacts: List of contact dictionaries
            analysis_data: Analysis results to inform prioritization
            
        Returns:
            Sorted list of contacts with priority scores
        """
        # Simple prioritization logic
        # In production, this would be more sophisticated
        
        priority_titles = ['CTO', 'VP', 'Chief', 'Director', 'Head']
        
        for contact in contacts:
            title = contact.get('title', '')
            
            # Calculate priority score
            priority_score = 0
            
            # Higher priority for senior titles
            for priority_title in priority_titles:
                if priority_title.lower() in title.lower():
                    priority_score += 10
                    break
            
            # Add priority based on department relevance
            # (This would use analysis_data in production)
            if 'technology' in title.lower() or 'engineering' in title.lower():
                priority_score += 5
            
            contact['priority_score'] = priority_score
            contact['priority_reason'] = self._get_priority_reason(contact, analysis_data)
        
        # Sort by priority score
        sorted_contacts = sorted(contacts, key=lambda x: x.get('priority_score', 0), reverse=True)
        
        return sorted_contacts
    
    def _get_priority_reason(self, contact: Dict, analysis_data: Dict) -> str:
        """Generate reason for contact priority"""
        title = contact.get('title', '')
        
        if 'CTO' in title or 'Chief Technology' in title:
            return "Senior technology decision maker - high influence on tech purchases"
        elif 'VP' in title:
            return "Executive level contact - can champion solutions internally"
        elif 'Director' in title:
            return "Department leader - involved in solution evaluation"
        else:
            return "Key stakeholder in decision process"
    
    def get_agent_description(self) -> str:
        """Return description of what this agent does"""
        return (
            f"{self.name}: Identifies and prioritizes key decision makers at target companies "
            "based on title, department, and relevance to identified business challenges."
        )