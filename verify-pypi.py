#!/usr/bin/env python3
"""Verify PyPI configuration"""

import configparser
import os
from pathlib import Path

def verify_pypi_config():
    """Check if .pypirc is properly configured."""
    pypirc_path = Path.home() / '.pypirc'
    
    if not pypirc_path.exists():
        print("❌ .pypirc file not found")
        return False
    
    config = configparser.ConfigParser()
    config.read(pypirc_path)
    
    # Check sections
    required_sections = ['distutils', 'pypi']
    missing_sections = [s for s in required_sections if s not in config]
    
    if missing_sections:
        print(f"❌ Missing sections: {missing_sections}")
        return False
    
    # Check credentials
    pypi_section = config['pypi']
    if pypi_section.get('username') != '__token__':
        print("❌ Username should be __token__")
        return False
    
    password = pypi_section.get('password')
    if password in ['YOUR_PYPI_TOKEN_HERE', None]:
        print("❌ Please set your actual PyPI token")
        return False
    
    print("✅ PyPI configuration looks good!")
    return True

if __name__ == "__main__":
    verify_pypi_config()
