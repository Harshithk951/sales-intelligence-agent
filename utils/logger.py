"""
Logging and Observability Module
Provides structured logging for all agent activities
This satisfies the "Observability" requirement
"""

import logging
import json
from datetime import datetime
from typing import Dict, Any

class AgentLogger:
    """
    Custom logger for tracking agent activities
    Logs all agent actions, tool calls, and results
    """
    
    def __init__(self, log_file: str = "agent_execution.log"):
        """Initialize logger with file and console output"""
        self.logger = logging.getLogger("SalesIntelligenceAgent")
        self.logger.setLevel(logging.INFO)
        
        # File handler - logs everything to file
        file_handler = logging.FileHandler(log_file)
        file_handler.setLevel(logging.INFO)
        
        # Console handler - logs to terminal
        console_handler = logging.StreamHandler()
        console_handler.setLevel(logging.INFO)
        
        # Format: timestamp - level - message
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S'
        )
        file_handler.setFormatter(formatter)
        console_handler.setFormatter(formatter)
        
        self.logger.addHandler(file_handler)
        self.logger.addHandler(console_handler)
    
    def log_agent_start(self, agent_name: str, input_data: Dict[str, Any]):
        """Log when an agent starts execution"""
        self.logger.info(f"🚀 {agent_name} STARTED")
        self.logger.info(f"Input: {json.dumps(input_data, indent=2)}")
    
    def log_agent_end(self, agent_name: str, output_data: Dict[str, Any], duration: float):
        """Log when an agent completes execution"""
        self.logger.info(f"✅ {agent_name} COMPLETED in {duration:.2f}s")
        self.logger.info(f"Output: {json.dumps(output_data, indent=2)}")
    
    def log_tool_call(self, tool_name: str, parameters: Dict[str, Any]):
        """Log when a tool is called"""
        self.logger.info(f"🔧 Tool Call: {tool_name}")
        self.logger.info(f"Parameters: {json.dumps(parameters, indent=2)}")
    
    def log_tool_result(self, tool_name: str, result: Any):
        """Log tool execution result"""
        self.logger.info(f"📊 Tool Result: {tool_name}")
        self.logger.info(f"Result: {str(result)[:200]}...")  # First 200 chars
    
    def log_error(self, agent_name: str, error: Exception):
        """Log errors during agent execution"""
        self.logger.error(f"❌ ERROR in {agent_name}: {str(error)}")
    
    def log_memory_access(self, operation: str, key: str):
        """Log memory operations"""
        self.logger.info(f"💾 Memory {operation}: {key}")
    
    def info(self, message: str):
        """General info logging"""
        self.logger.info(message)
    
    def warning(self, message: str):
        """Warning logging"""
        self.logger.warning(message)
    
    def error(self, message: str):
        """Error logging"""
        self.logger.error(message)


# Global logger instance
agent_logger = AgentLogger()