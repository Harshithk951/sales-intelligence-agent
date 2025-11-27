"""
Analysis Agent - Analyzes company data to identify business challenges
Uses Gemini LLM to perform deep analysis (Bonus points!)
"""

import os
from typing import Dict
from google import genai
from google.genai import types
from utils.logger import setup_logger, log_agent_start, log_agent_complete, log_agent_error

logger = setup_logger('AnalysisAgent')

class AnalysisAgent:
    """
    Agent responsible for analyzing company data to identify:
    - Key business challenges
    - Opportunities for solutions
    - Pain points that sales can address
    Uses Gemini LLM for intelligent analysis
    """
    
    def __init__(self):
        """Initialize the analysis agent with Gemini client"""
        self.name = "Analysis Agent"
        
        # Initialize Gemini client
        api_key = os.getenv('GOOGLE_API_KEY')
        if not api_key:
            raise ValueError("GOOGLE_API_KEY not found in environment variables")
        
        self.client = genai.Client(api_key=api_key)
        self.model_name = os.getenv('MODEL_NAME', 'gemini-2.0-flash-exp')
        
        logger.info(f"✅ {self.name} initialized with model: {self.model_name}")
    
    def execute(self, research_data: Dict) -> Dict:
        """
        Analyze company research data to identify business insights
        
        Args:
            research_data: Dictionary containing company research from ResearchAgent
            
        Returns:
            Dictionary containing analysis results
        """
        log_agent_start(self.name, {'company': research_data.get('company_name')})
        
        try:
            company_name = research_data.get('company_name')
            company_info = research_data.get('company_info', {})
            recent_news = research_data.get('recent_news', [])
            
            # Prepare context for LLM analysis
            context = self._prepare_analysis_context(company_name, company_info, recent_news)
            
            # Create analysis prompt
            prompt = self._create_analysis_prompt(context)
            
            # Call Gemini API for analysis
            logger.info(f"🤖 Calling Gemini API for analysis of {company_name}")
            
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=0.7,
                    max_output_tokens=2000,
                )
            )
            
            # Extract analysis from response
            analysis_text = response.text
            
            # Structure the analysis results
            analysis_data = {
                'company_name': company_name,
                'analysis': analysis_text,
                'key_challenges': self._extract_challenges(analysis_text),
                'opportunities': self._extract_opportunities(analysis_text),
                'recommended_approach': self._extract_approach(analysis_text),
                'analysis_status': 'completed'
            }
            
            log_agent_complete(
                self.name,
                f"Completed analysis for {company_name} - found {len(analysis_data['key_challenges'])} challenges"
            )
            
            return analysis_data
            
        except Exception as e:
            log_agent_error(self.name, e)
            return {
                'company_name': research_data.get('company_name'),
                'error': str(e),
                'analysis_status': 'failed'
            }
    
    def _prepare_analysis_context(self, company_name: str, company_info: Dict, recent_news: list) -> str:
        """Prepare context string for analysis"""
        context = f"""
Company: {company_name}

Company Information:
- Industry: {company_info.get('industry', 'N/A')}
- Size: {company_info.get('size', 'N/A')}
- Founded: {company_info.get('founded', 'N/A')}
- Location: {company_info.get('location', 'N/A')}
- Overview: {company_info.get('overview', 'N/A')}

Recent News:
{chr(10).join(f'- {news}' for news in recent_news)}

Key Facts:
{chr(10).join(f'- {fact}' for fact in company_info.get('key_facts', []))}
"""
        return context
    
    def _create_analysis_prompt(self, context: str) -> str:
        """Create the prompt for Gemini analysis"""
        prompt = f"""
You are a business intelligence analyst helping a sales team understand a potential client.

Based on the following company information, provide a detailed analysis:

{context}

Please provide:

1. KEY BUSINESS CHALLENGES (3-5 main challenges this company likely faces)
2. OPPORTUNITIES (How our solutions could help address these challenges)
3. RECOMMENDED SALES APPROACH (What angles to emphasize in outreach)

Format your response clearly with these three sections.
Be specific and actionable. Focus on insights that would help a sales team engage effectively.
"""
        return prompt
    
    def _extract_challenges(self, analysis_text: str) -> list:
        """Extract key challenges from analysis (simple parsing)"""
        # Simple extraction - in production, use more sophisticated parsing
        challenges = []
        if "KEY BUSINESS CHALLENGES" in analysis_text:
            section = analysis_text.split("KEY BUSINESS CHALLENGES")[1].split("OPPORTUNITIES")[0]
            lines = [line.strip() for line in section.split('\n') if line.strip() and not line.strip().startswith('#')]
            challenges = [line.lstrip('123456789.-) ') for line in lines if line.strip()][:5]
        return challenges
    
    def _extract_opportunities(self, analysis_text: str) -> list:
        """Extract opportunities from analysis"""
        opportunities = []
        if "OPPORTUNITIES" in analysis_text:
            section = analysis_text.split("OPPORTUNITIES")[1].split("RECOMMENDED")[0]
            lines = [line.strip() for line in section.split('\n') if line.strip() and not line.strip().startswith('#')]
            opportunities = [line.lstrip('123456789.-) ') for line in lines if line.strip()][:5]
        return opportunities
    
    def _extract_approach(self, analysis_text: str) -> str:
        """Extract recommended approach from analysis"""
        if "RECOMMENDED SALES APPROACH" in analysis_text:
            section = analysis_text.split("RECOMMENDED SALES APPROACH")[1]
            # Get first substantial paragraph
            lines = [line.strip() for line in section.split('\n') if line.strip() and not line.strip().startswith('#')]
            return ' '.join(lines[:3]) if lines else "Approach with value-focused messaging"
        return "Approach with value-focused messaging"
    
    def get_agent_description(self) -> str:
        """Return description of what this agent does"""
        return (
            f"{self.name}: Uses Gemini LLM to analyze company data and identify "
            "key business challenges, opportunities, and recommended sales approaches."
        )