"""
Memory and Session Management Module
Handles session state and long-term memory storage
This satisfies "Sessions & Memory" and "Memory Bank" requirements
"""

import json
import os
from typing import Dict, Any, Optional
from datetime import datetime
from utils.logger import agent_logger


class SessionMemory:
    """
    In-memory session storage for current execution
    Maintains state across agent executions within a session
    """
    
    def __init__(self):
        """Initialize empty session state"""
        self.session_data = {}
        self.session_id = datetime.now().strftime("%Y%m%d_%H%M%S")
        agent_logger.info(f"🆔 Session initialized: {self.session_id}")
    
    def store(self, key: str, value: Any):
        """Store data in current session"""
        self.session_data[key] = value
        agent_logger.log_memory_access("WRITE", key)
    
    def retrieve(self, key: str) -> Optional[Any]:
        """Retrieve data from current session"""
        value = self.session_data.get(key)
        agent_logger.log_memory_access("READ", key)
        return value
    
    def get_all(self) -> Dict[str, Any]:
        """Get all session data"""
        return self.session_data.copy()
    
    def clear(self):
        """Clear session data"""
        self.session_data = {}
        agent_logger.info("🗑️ Session cleared")


class MemoryBank:
    """
    Long-term memory storage using JSON files
    Stores historical data across sessions
    This is the "Memory Bank" requirement
    """
    
    def __init__(self, storage_path: str = "memory_bank.json"):
        """Initialize memory bank with file storage"""
        self.storage_path = storage_path
        self.memory = self._load_memory()
        agent_logger.info(f"💾 Memory Bank loaded from {storage_path}")
    
    def _load_memory(self) -> Dict[str, Any]:
        """Load memory from JSON file"""
        if os.path.exists(self.storage_path):
            try:
                with open(self.storage_path, 'r') as f:
                    return json.load(f)
            except Exception as e:
                agent_logger.error(f"Failed to load memory: {str(e)}")
                return {}
        return {}
    
    def _save_memory(self):
        """Save memory to JSON file"""
        try:
            with open(self.storage_path, 'w') as f:
                json.dump(self.memory, f, indent=2)
            agent_logger.info("💾 Memory Bank saved")
        except Exception as e:
            agent_logger.error(f"Failed to save memory: {str(e)}")
    
    def store_company_research(self, company_name: str, research_data: Dict[str, Any]):
        """
        Store research results for a company
        Prevents re-researching the same company
        """
        key = f"company_{company_name.lower().replace(' ', '_')}"
        self.memory[key] = {
            "company_name": company_name,
            "timestamp": datetime.now().isoformat(),
            "data": research_data
        }
        self._save_memory()
        agent_logger.log_memory_access("STORE", key)
    
    def get_company_research(self, company_name: str) -> Optional[Dict[str, Any]]:
        """
        Retrieve stored research for a company
        Returns None if not found
        """
        key = f"company_{company_name.lower().replace(' ', '_')}"
        data = self.memory.get(key)
        
        if data:
            agent_logger.info(f"✅ Found cached research for {company_name}")
            agent_logger.log_memory_access("RETRIEVE", key)
        else:
            agent_logger.info(f"❌ No cached research for {company_name}")
        
        return data
    
    def has_company_research(self, company_name: str) -> bool:
        """Check if we have research for a company"""
        key = f"company_{company_name.lower().replace(' ', '_')}"
        return key in self.memory
    
    def get_all_companies(self) -> list:
        """Get list of all researched companies"""
        companies = [
            v["company_name"] 
            for k, v in self.memory.items() 
            if k.startswith("company_")
        ]
        return companies
    
    def clear_company(self, company_name: str):
        """Remove a company from memory"""
        key = f"company_{company_name.lower().replace(' ', '_')}"
        if key in self.memory:
            del self.memory[key]
            self._save_memory()
            agent_logger.log_memory_access("DELETE", key)
    
    def clear_all(self):
        """Clear all memory"""
        self.memory = {}
        self._save_memory()
        agent_logger.warning("🗑️ Memory Bank cleared completely")


# Global instances
session_memory = SessionMemory()
memory_bank = MemoryBank()