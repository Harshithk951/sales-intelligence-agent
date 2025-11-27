"""
Outreach Agent - Generates personalized sales emails
Final agent in the sequential pipeline
Uses Gemini LLM to create compelling outreach
"""

import os
from typing import Dict, List
from google import genai
from google.genai import types
from utils.logger import setup_logger, log_agent_start, log_agent_complete, log_agent_error

logger = setup_logger('OutreachAgent')

class OutreachAgent:
    """
    Agent responsible for generating personalized outreach emails
    Uses Gemini LLM to create compelling, relevant messages
    """
    
    def __init__(self):
        """Initialize the outreach agent with Gemini client"""
        self.name = "Outreach Agent"
        
        # Initialize Gemini client
        api_key = os.getenv('GOOGLE_API_KEY')
        if not api_key:
            raise ValueError("GOOGLE_API_KEY not found in environment variables")
        
        self.client = genai.Client(api_key=api_key)
        self.model_name = os.getenv('MODEL_NAME', 'gemini-2.0-flash-exp')
        
        logger.info(f"✅ {self.name} initialized with model: {self.model_name}")
    
    def execute(self, company_name: str, analysis_data: Dict, contact_data: Dict) -> Dict:
        """
        Generate personalized outreach emails for contacts
        
        Args:
            company_name: Name of the company
            analysis_data: Analysis results from AnalysisAgent
            contact_data: Contact information from ContactAgent
            
        Returns:
            Dictionary containing generated emails
        """
        log_agent_start(self.name, {'company': company_name})
        
        try:
            contacts = contact_data.get('prioritized_contacts', [])
            
            # Generate email for each contact (top 3 priority)
            emails = []
            for contact in contacts[:3]:  # Top 3 contacts only
                logger.info(f"Generating email for {contact.get('name')}")
                email = self._generate_email(contact, analysis_data, company_name)
                emails.append(email)
            
            outreach_data = {
                'company_name': company_name,
                'emails_generated': len(emails),
                'outreach_emails': emails,
                'outreach_status': 'completed'
            }
            
            log_agent_complete(
                self.name,
                f"Generated {len(emails)} personalized emails for {company_name}"
            )
            
            return outreach_data
            
        except Exception as e:
            log_agent_error(self.name, e)
            return {
                'company_name': company_name,
                'error': str(e),
                'outreach_status': 'failed'
            }
    
    def _generate_email(self, contact: Dict, analysis_data: Dict, company_name: str) -> Dict:
        """
        Generate a personalized email for a specific contact
        
        Args:
            contact: Contact information
            analysis_data: Company analysis
            company_name: Name of the company
            
        Returns:
            Dictionary with email content
        """
        # Prepare context for email generation
        prompt = self._create_email_prompt(contact, analysis_data, company_name)
        
        # Call Gemini API
        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=0.8,  # Higher temperature for creative writing
                    max_output_tokens=800,
                )
            )
            
            email_body = response.text
            
            return {
                'recipient': contact.get('name'),
                'title': contact.get('title'),
                'email_address': contact.get('email'),
                'subject': f"Helping {company_name} with {self._extract_main_challenge(analysis_data)}",
                'body': email_body,
                'priority_score': contact.get('priority_score', 0)
            }
            
        except Exception as e:
            logger.error(f"Failed to generate email for {contact.get('name')}: {e}")
            return {
                'recipient': contact.get('name'),
                'error': str(e)
            }
    
    def _create_email_prompt(self, contact: Dict, analysis_data: Dict, company_name: str) -> str:
        """Create prompt for email generation"""
        
        challenges = analysis_data.get('key_challenges', [])
        opportunities = analysis_data.get('opportunities', [])
        approach = analysis_data.get('recommended_approach', '')
        
        prompt = f"""
You are writing a personalized sales outreach email.

TARGET CONTACT:
- Name: {contact.get('name')}
- Title: {contact.get('title')}
- Company: {company_name}

COMPANY CHALLENGES IDENTIFIED:
{chr(10).join(f'- {challenge}' for challenge in challenges[:3])}

OPPORTUNITIES FOR OUR SOLUTION:
{chr(10).join(f'- {opp}' for opp in opportunities[:2])}

RECOMMENDED APPROACH:
{approach}

Write a professional, personalized sales email that:
1. Opens with a relevant insight or observation about their company
2. Mentions 1-2 specific challenges they likely face
3. Briefly explains how our solution addresses these challenges
4. Includes a clear, low-pressure call-to-action
5. Is concise (150-200 words)
6. Sounds natural and human, not robotic

Do not include [placeholders]. Write the complete email body only (no subject line, no signature).
Make it specific to {company_name} and {contact.get('title')}.
"""
        return prompt
    
    def _extract_main_challenge(self, analysis_data: Dict) -> str:
        """Extract the main challenge for subject line"""
        challenges = analysis_data.get('key_challenges', [])
        if challenges:
            # Get first challenge and make it short
            main = challenges[0]
            words = main.split()
            return ' '.join(words[:4]) + ('...' if len(words) > 4 else '')
        return "Your Technology Needs"
    
    def get_agent_description(self) -> str:
        """Return description of what this agent does"""
        return (
            f"{self.name}: Uses Gemini LLM to generate personalized, compelling "
            "outreach emails based on company analysis and contact information."
        )