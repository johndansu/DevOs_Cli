#!/usr/bin/env python3
"""
DevOS Publishing Script

This script helps publish DevOS to PyPI safely.
"""

import subprocess
import sys
import os
from pathlib import Path

def run_command(cmd, check=True):
    """Run a command and return the result."""
    print(f"Running: {cmd}")
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if check and result.returncode != 0:
        print(f"Error: {result.stderr}")
        sys.exit(1)
    return result

def main():
    """Main publishing function."""
    print("🚀 DevOS Publishing Script")
    print("=" * 40)
    
    # Check if we're in the right directory
    if not Path("pyproject.toml").exists():
        print("❌ Error: Not in DevOS project directory")
        sys.exit(1)
    
    # Clean previous builds
    print("🧹 Cleaning previous builds...")
    if Path("dist").exists():
        run_command("rmdir /s /q dist")
    if Path("build").exists():
        run_command("rmdir /s /q build")
    
    # Run tests
    print("🧪 Running tests...")
    test_result = run_command("python -m pytest tests/ --tb=no -q", check=False)
    if test_result.returncode != 0:
        print("❌ Tests failed! Fix tests before publishing.")
        sys.exit(1)
    print("✅ All tests passed!")
    
    # Build package
    print("📦 Building package...")
    run_command("python -m build")
    
    # Check package
    print("🔍 Checking package...")
    run_command("python -m twine check dist/*")
    
    # Ask for target
    print("\n🎯 Where do you want to publish?")
    print("1. TestPyPI (recommended for testing)")
    print("2. Production PyPI")
    
    choice = input("Enter choice (1 or 2): ").strip()
    
    if choice == "1":
        print("🧪 Publishing to TestPyPI...")
        run_command("python -m twine upload --repository testpypi dist/*")
        print("\n✅ Published to TestPyPI!")
        print("Install with: pip install --index-url https://test.pypi.org/simple/ devos")
    elif choice == "2":
        print("🚀 Publishing to Production PyPI...")
        run_command("python -m twine upload dist/*")
        print("\n✅ Published to PyPI!")
        print("Install with: pip install devos")
    else:
        print("❌ Invalid choice")
        sys.exit(1)
    
    print("\n🎉 Publishing complete!")

if __name__ == "__main__":
    main()
