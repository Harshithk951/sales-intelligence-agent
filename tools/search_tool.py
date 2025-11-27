"""
Search Tool Module
Custom tool for web searching company information
This satisfies the "Tools" requirement (custom tools)
"""

import requests
from typing import List, Dict, Any
from utils.logger import agent_logger


class SearchTool:
    """
    Custom search tool that uses multiple search methods
    Primary: Google Custom Search API
    Fallback: Web scraping (simplified)
    """
    
    def __init__(self, api_key: str = None, search_engine_id: str = None):
        """
        Initialize search tool
        api_key and search_engine_id are optional - we'll use alternative methods
        """
        self.api_key = api_key
        self.search_engine_id = search_engine_id
        self.use_google_api = api_key and search_engine_id
        
        if self.use_google_api:
            agent_logger.info("🔍 Search Tool: Using Google Custom Search API")
        else:
            agent_logger.info("🔍 Search Tool: Using simulated search (demo mode)")
    
    def search_company_info(self, company_name: str) -> Dict[str, Any]:
        """
        Search for general company information
        Returns company overview, industry, size, etc.
        """
        agent_logger.log_tool_call("search_company_info", {"company_name": company_name})
        
        if self.use_google_api:
            return self._google_search(f"{company_name} company overview")
        else:
            # Simulated search results for demo
            return self._simulated_company_search(company_name)
    
    def search_company_news(self, company_name: str) -> Dict[str, Any]:
        """
        Search for recent news about the company
        Returns latest news articles and announcements
        """
        agent_logger.log_tool_call("search_company_news", {"company_name": company_name})
        
        if self.use_google_api:
            return self._google_search(f"{company_name} news recent")
        else:
            return self._simulated_news_search(company_name)
    
    def search_company_contacts(self, company_name: str) -> Dict[str, Any]:
        """
        Search for company decision makers and executives
        Returns names, titles, and LinkedIn profiles
        """
        agent_logger.log_tool_call("search_company_contacts", {"company_name": company_name})
        
        if self.use_google_api:
            return self._google_search(f"{company_name} CEO executives leadership team")
        else:
            return self._simulated_contact_search(company_name)
    
    def _google_search(self, query: str) -> Dict[str, Any]:
        """
        Perform actual Google Custom Search API call
        """
        try:
            url = "https://www.googleapis.com/customsearch/v1"
            params = {
                "key": self.api_key,
                "cx": self.search_engine_id,
                "q": query,
                "num": 5  # Get top 5 results
            }
            
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            
            results = []
            for item in data.get("items", []):
                results.append({
                    "title": item.get("title", ""),
                    "snippet": item.get("snippet", ""),
                    "link": item.get("link", "")
                })
            
            agent_logger.log_tool_result("google_search", f"Found {len(results)} results")
            return {"success": True, "results": results}
            
        except Exception as e:
            agent_logger.log_error("google_search", e)
            return {"success": False, "error": str(e)}
    
    def _simulated_company_search(self, company_name: str) -> Dict[str, Any]:
        """
        Simulated search results for demo purposes
        In production, this would be real API calls
        """
        results = [
            {
                "title": f"{company_name} - Official Website",
                "snippet": f"{company_name} is a leading technology company specializing in enterprise software solutions. Founded in 2010, the company serves Fortune 500 clients across multiple industries including finance, healthcare, and retail.",
                "link": f"https://www.{company_name.lower().replace(' ', '')}.com"
            },
            {
                "title": f"{company_name} Company Profile | LinkedIn",
                "snippet": f"{company_name} | 10,000+ employees on LinkedIn. We provide innovative solutions that help businesses transform digitally. Industry: Technology, Software, Enterprise Solutions.",
                "link": "https://www.linkedin.com/company/example"
            },
            {
                "title": f"About {company_name} - Company Overview",
                "snippet": f"{company_name} has raised $150M in Series C funding and serves over 2,000 enterprise clients worldwide. The company is headquartered in San Francisco with offices in New York, London, and Singapore.",
                "link": "https://www.crunchbase.com/organization/example"
            }
        ]
        
        agent_logger.log_tool_result("simulated_search", f"Generated {len(results)} demo results")
        return {"success": True, "results": results, "demo_mode": True}
    
    def _simulated_news_search(self, company_name: str) -> Dict[str, Any]:
        """Simulated news search"""
        results = [
            {
                "title": f"{company_name} Announces Q3 Growth",
                "snippet": f"{company_name} reported 45% year-over-year revenue growth in Q3 2024, driven by strong enterprise adoption of their AI-powered platform.",
                "link": "https://techcrunch.com/example",
                "date": "2024-10-15"
            },
            {
                "title": f"{company_name} Expands to APAC Region",
                "snippet": f"{company_name} opens new offices in Singapore and Tokyo to support growing demand in Asia-Pacific markets.",
                "link": "https://venturebeat.com/example",
                "date": "2024-09-28"
            }
        ]
        
        return {"success": True, "results": results, "demo_mode": True}
    
    def _simulated_contact_search(self, company_name: str) -> Dict[str, Any]:
        """Simulated contact search"""
        results = [
            {
                "name": "Jane Smith",
                "title": "CEO & Co-Founder",
                "linkedin": "https://linkedin.com/in/janesmith",
                "bio": "Former VP at Salesforce, 15+ years in enterprise software"
            },
            {
                "name": "Michael Chen",
                "title": "CTO",
                "linkedin": "https://linkedin.com/in/michaelchen",
                "bio": "Ex-Google engineer, AI/ML expert"
            },
            {
                "name": "Sarah Johnson",
                "title": "VP of Sales",
                "linkedin": "https://linkedin.com/in/sarahjohnson",
                "bio": "20+ years in enterprise sales, former Oracle executive"
            }
        ]
        
        return {"success": True, "results": results, "demo_mode": True}


# Create search tool instance (will be configured in main.py)
search_tool = None