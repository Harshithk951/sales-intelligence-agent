#!/usr/bin/env python3
"""
Runner script that ensures proper Python path
"""
import sys
import os

# Add current directory to Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

# Now import and run main
from main import main

if __name__ == "__main__":
    main()