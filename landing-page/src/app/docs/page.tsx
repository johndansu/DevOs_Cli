"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Terminal, 
  Github, 
  Download, 
  Zap, 
  Shield, 
  Users, 
  Cpu, 
  Database, 
  GitBranch,
  ChevronRight,
  ArrowRight,
  Book,
  Code,
  Settings,
  Rocket,
  Activity,
  FileText,
  CheckCircle,
  AlertCircle,
  Info,
  X
} from 'lucide-react';

export default function DocumentationPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const featureDetails = {
    'project-management': {
      title: 'Project Management',
      icon: <Terminal className="h-6 w-6 text-gray-900 mb-4" />,
      description: 'DevOS CLI provides comprehensive project management capabilities that streamline your development workflow from initialization to deployment.',
      features: [
        'Intelligent Templates: Pre-built project templates for various frameworks and languages',
        'Project Tracking: Monitor project progress and milestones',
        'Dependency Management: Automatic handling of project dependencies',
        'Version Control Integration: Seamless Git workflow integration'
      ],
      commands: [
        { code: 'python -m devos init python-api my-project', description: 'Initialize new project' },
        { code: 'python -m devos project add', description: 'Add existing project' },
        { code: 'python -m devos project list', description: 'List all projects' }
      ]
    },
    'session-tracking': {
      title: 'Session Tracking',
      icon: <Zap className="h-6 w-6 text-gray-900 mb-4" />,
      description: 'Automatic time tracking and session management help you understand your development patterns and optimize productivity.',
      features: [
        'Automatic Detection: Starts tracking when you begin coding',
        'Detailed Analytics: Insights into your coding patterns',
        'Session History: Complete log of all development sessions',
        'Productivity Reports: Weekly and monthly summaries'
      ],
      commands: [
        { code: 'python -m devos now', description: 'Start tracking' },
        { code: 'python -m devos done', description: 'Stop tracking' },
        { code: 'python -m devos session list', description: 'View session history' }
      ]
    },
    'environment-management': {
      title: 'Environment Management',
      icon: <Shield className="h-6 w-6 text-gray-900 mb-4" />,
      description: 'Secure environment variable management with encryption and multi-environment support.',
      features: [
        'Encryption: All environment variables are encrypted at rest',
        'Multi-Environment: Support for development, staging, and production',
        'Access Control: Granular permissions for team members',
        'Audit Logs: Complete history of environment changes'
      ],
      commands: [
        { code: 'python -m devos env set DATABASE_URL postgresql://...', description: 'Set environment variable' },
        { code: 'python -m devos env list', description: 'List environments' },
        { code: 'python -m devos env use production', description: 'Switch environment' }
      ]
    },
    'ai-integration': {
      title: 'AI Integration',
      icon: <Cpu className="h-6 w-6 text-gray-900 mb-4" />,
      description: 'Harness the power of AI for code analysis, security scanning, and intelligent development assistance.',
      features: [
        'Code Analysis: Deep analysis of code quality and patterns',
        'Security Scanning: AI-powered vulnerability detection',
        'Code Enhancement: Intelligent suggestions for improvements',
        'Documentation Generation: Auto-generate documentation from code'
      ],
      commands: [
        { code: 'python -m devos ai-analyze --scope current', description: 'Analyze code with AI' },
        { code: 'python -m devos ai-security-scan', description: 'Security scan' },
        { code: 'python -m devos ai-enhance --file app.py', description: 'Enhance code' }
      ]
    },
    'workflow-automation': {
      title: 'Workflow Automation',
      icon: <Activity className="h-6 w-6 text-gray-900 mb-4" />,
      description: 'Automate repetitive tasks and create intelligent workflows that adapt to your development process.',
      features: [
        'Custom Workflows: Build workflows for any development task',
        'Triggers: Event-driven automation based on Git, file changes, and more',
        'Integration: Connect with external services and APIs',
        'Scheduling: Run tasks on specific schedules'
      ],
      commands: [
        { code: 'python -m devos workflow create deploy', description: 'Create workflow' },
        { code: 'python -m devos workflow run deploy', description: 'Run workflow' },
        { code: 'python -m devos workflow list', description: 'List workflows' }
      ]
    },
    'team-collaboration': {
      title: 'Team Collaboration',
      icon: <Users className="h-6 w-6 text-gray-900 mb-4" />,
      description: 'Collaborate effectively with your team through shared dashboards, workflows, and project management.',
      features: [
        'Team Dashboards: Shared visibility into project progress',
        'Collaborative Workflows: Team-wide automation processes',
        'Role Management: Granular permissions and access control',
        'Activity Feeds: Real-time updates on team activities'
      ],
      commands: [
        { code: 'python -m devos team create my-team', description: 'Create team' },
        { code: 'python -m devos team invite user@example.com', description: 'Invite member' },
        { code: 'python -m devos team share project-name', description: 'Share project' }
      ]
    }
  };

  const openModal = (feature: string) => {
    setActiveModal(feature);
  };

  const closeModal = () => {
    setActiveModal(null);
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                  <Terminal className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">DevOS</span>
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
                <Link href="/#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
                <Link href="/#commands" className="text-gray-600 hover:text-gray-900 transition-colors">Commands</Link>
                <Link href="/docs" className="text-gray-900 font-medium transition-colors">Docs</Link>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Github className="h-5 w-5" />
              </a>
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              DevOS CLI Documentation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete guide to the open source CLI that manages your entire development workflow
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <a href="#quick-start" className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center space-x-2">
                <Rocket className="h-4 w-4" />
                <span>Quick Start</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#installation" className="border border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900 px-6 py-3 rounded-lg flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Installation</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Getting Started</h3>
              <ul className="space-y-2">
                <li><a href="#introduction" className="text-gray-600 hover:text-gray-900 flex items-center"><ChevronRight className="h-3 w-3 mr-2" />Introduction</a></li>
                <li><a href="#installation" className="text-gray-600 hover:text-gray-900 flex items-center"><ChevronRight className="h-3 w-3 mr-2" />Installation</a></li>
                <li><a href="#quick-start" className="text-gray-600 hover:text-gray-900 flex items-center"><ChevronRight className="h-3 w-3 mr-2" />Quick Start</a></li>
                <li><a href="#configuration" className="text-gray-600 hover:text-gray-900 flex items-center"><ChevronRight className="h-3 w-3 mr-2" />Configuration</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Core Features</h3>
              <ul className="space-y-2">
                <li><a href="#project-management" className="text-gray-600 hover:text-gray-900 flex items-center"><ChevronRight className="h-3 w-3 mr-2" />Project Management</a></li>
                <li><a href="#session-tracking" className="text-gray-600 hover:text-gray-900 flex items-center"><ChevronRight className="h-3 w-3 mr-2" />Session Tracking</a></li>
                <li><a href="#environment-management" className="text-gray-600 hover:text-gray-900 flex items-center"><ChevronRight className="h-3 w-3 mr-2" />Environment Management</a></li>
                <li><a href="#ai-integration" className="text-gray-600 hover:text-gray-900 flex items-center"><ChevronRight className="h-3 w-3 mr-2" />AI Integration</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Advanced Features</h3>
              <ul className="space-y-2">
                <li><a href="#workflow-automation" className="text-gray-600 hover:text-gray-900 flex items-center"><ChevronRight className="h-3 w-3 mr-2" />Workflow Automation</a></li>
                <li><a href="#team-collaboration" className="text-gray-600 hover:text-gray-900 flex items-center"><ChevronRight className="h-3 w-3 mr-2" />Team Collaboration</a></li>
                <li><a href="#business-features" className="text-gray-600 hover:text-gray-900 flex items-center"><ChevronRight className="h-3 w-3 mr-2" />Business Features</a></li>
                <li><a href="#command-reference" className="text-gray-600 hover:text-gray-900 flex items-center"><ChevronRight className="h-3 w-3 mr-2" />Command Reference</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section id="introduction" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction</h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                DevOS CLI is a comprehensive open source command-line interface that streamlines your entire development workflow. 
                From project initialization to AI-powered code analysis, DevOS provides a unified toolkit for modern developers.
              </p>
              <p>
                Built with Python and designed for extensibility, DevOS CLI integrates seamlessly with your existing development 
                tools while providing powerful automation capabilities, intelligent project management, and advanced AI features.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Terminal className="h-6 w-6 text-gray-900 mr-3" />
                  <h3 className="font-semibold text-gray-900">50+ Commands</h3>
                </div>
                <p className="text-gray-600">Comprehensive command coverage for all development needs</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Cpu className="h-6 w-6 text-gray-900 mr-3" />
                  <h3 className="font-semibold text-gray-900">AI-Powered</h3>
                </div>
                <p className="text-gray-600">Intelligent code analysis and automation capabilities</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Github className="h-6 w-6 text-gray-900 mr-3" />
                  <h3 className="font-semibold text-gray-900">Open Source</h3>
                </div>
                <p className="text-gray-600">Community-driven and fully customizable</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section id="installation" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Installation</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">No PATH Modifications Required</h3>
                  <p className="text-blue-800">DevOS CLI works without requiring PATH environment variable changes.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Method 1: Python Package</h3>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2"># Install via pip</div>
                  <div className="text-white">pip install devos-cli</div>
                  <div className="text-gray-400 mt-2"># Run immediately</div>
                  <div className="text-white">python -m devos --help</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Method 2: Standalone Binary</h3>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2"># Download and run</div>
                  <div className="text-white">curl -L https://github.com/devos/cli/releases/latest/download/devos.exe -o devos.exe</div>
                  <div className="text-white">./devos.exe --help</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Method 3: Development Mode</h3>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2"># Clone and install</div>
                  <div className="text-white">git clone https://github.com/devos/cli.git</div>
                  <div className="text-white">cd cli</div>
                  <div className="text-white">pip install -e .</div>
                  <div className="text-gray-400 mt-2"># Run in development mode</div>
                  <div className="text-white">python -m devos --help</div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Verification</h3>
                  <p className="text-green-800">After installation, verify with: <code className="bg-green-100 px-2 py-1 rounded">python -m devos --version</code></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section id="quick-start" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Start</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Initialize Your First Project</h3>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2"># Create a new project</div>
                  <div className="text-white">python -m devos init my-project</div>
                  <div className="text-blue-400 mt-2">✓ Project structure created</div>
                  <div className="text-blue-400">✓ Environment configured</div>
                  <div className="text-blue-400">✓ Git repository initialized</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Start Development Session</h3>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2"># Navigate and start tracking</div>
                  <div className="text-white">cd my-project</div>
                  <div className="text-white">python -m devos now</div>
                  <div className="text-blue-400 mt-2">🎯 Development session started</div>
                  <div className="text-gray-400"># Time tracking is now active</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Use AI-Powered Features</h3>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2"># Analyze your code with AI</div>
                  <div className="text-white">python -m devos ai-analyze --scope current</div>
                  <div className="text-blue-400 mt-2">🧠 AI analysis in progress...</div>
                  <div className="text-blue-400">📊 Report generated: analysis.json</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">4. End Session</h3>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2"># Stop tracking and save session</div>
                  <div className="text-white">python -m devos done</div>
                  <div className="text-blue-400 mt-2">✅ Session saved: 2h 34m</div>
                  <div className="text-gray-400"># Session data stored for reporting</div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-1">Pro Tip</h3>
                  <p className="text-yellow-800">Use <code className="bg-yellow-100 px-2 py-1 rounded">python -m devos interactive</code> for a guided workflow experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration */}
      <section id="configuration" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Configuration</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Global Configuration</h3>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2"># Set global preferences</div>
                  <div className="text-white">python -m devos config set --global editor vscode</div>
                  <div className="text-white">python -m devos config set --global ai_provider openai</div>
                  <div className="text-gray-400 mt-2"># View configuration</div>
                  <div className="text-white">python -m devos config show --global</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Configuration</h3>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2"># Set project-specific settings</div>
                  <div className="text-white">python -m devos config set --project template python-api</div>
                  <div className="text-white">python -m devos config set --project auto_track true</div>
                  <div className="text-gray-400 mt-2"># View project config</div>
                  <div className="text-white">python -m devos config show</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Environment Variables</h3>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2"># Set environment variables</div>
                  <div className="text-white">python -m devos env set DATABASE_URL postgresql://...</div>
                  <div className="text-white">python -m devos env set API_KEY sk-...</div>
                  <div className="text-gray-400 mt-2"># List all environments</div>
                  <div className="text-white">python -m devos env list</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Core Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <Terminal className="h-8 w-8 text-gray-900 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Project Management</h3>
              <p className="text-gray-600 mb-4">Initialize projects with intelligent templates, track progress, and manage project lifecycle.</p>
              <button 
                onClick={() => openModal('project-management')}
                className="text-gray-900 hover:text-gray-700 font-medium flex items-center"
              >
                Learn more <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <Zap className="h-8 w-8 text-gray-900 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Session Tracking</h3>
              <p className="text-gray-600 mb-4">Automatic time tracking, session management, and detailed productivity analytics.</p>
              <button 
                onClick={() => openModal('session-tracking')}
                className="text-gray-900 hover:text-gray-700 font-medium flex items-center"
              >
                Learn more <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <Shield className="h-8 w-8 text-gray-900 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Environment Management</h3>
              <p className="text-gray-600 mb-4">Secure environment variable storage, multi-environment support, and encrypted secrets.</p>
              <button 
                onClick={() => openModal('environment-management')}
                className="text-gray-900 hover:text-gray-700 font-medium flex items-center"
              >
                Learn more <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <Cpu className="h-8 w-8 text-gray-900 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Integration</h3>
              <p className="text-gray-600 mb-4">AI-powered code analysis, security scanning, and intelligent development assistance.</p>
              <button 
                onClick={() => openModal('ai-integration')}
                className="text-gray-900 hover:text-gray-700 font-medium flex items-center"
              >
                Learn more <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <Activity className="h-8 w-8 text-gray-900 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Workflow Automation</h3>
              <p className="text-gray-600 mb-4">Custom automation workflows, triggers, and intelligent process management.</p>
              <button 
                onClick={() => openModal('workflow-automation')}
                className="text-gray-900 hover:text-gray-700 font-medium flex items-center"
              >
                Learn more <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <Users className="h-8 w-8 text-gray-900 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Team Collaboration</h3>
              <p className="text-gray-600 mb-4">Team dashboards, collaborative workflows, and shared project management.</p>
              <button 
                onClick={() => openModal('team-collaboration')}
                className="text-gray-900 hover:text-gray-700 font-medium flex items-center"
              >
                Learn more <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Feature Sections */}
      <section id="project-management" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Management</h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                DevOS CLI provides comprehensive project management capabilities that streamline your development workflow from initialization to deployment.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Key Features</h3>
              <ul>
                <li><strong>Intelligent Templates:</strong> Pre-built project templates for various frameworks and languages</li>
                <li><strong>Project Tracking:</strong> Monitor project progress and milestones</li>
                <li><strong>Dependency Management:</strong> Automatic handling of project dependencies</li>
                <li><strong>Version Control Integration:</strong> Seamless Git workflow integration</li>
              </ul>
              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Common Commands</h3>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400 mb-2"># Initialize new project</div>
                <div className="text-white">python -m devos init python-api my-project</div>
                <div className="text-gray-400 mt-4"># Add existing project</div>
                <div className="text-white">python -m devos project add</div>
                <div className="text-gray-400 mt-4"># List all projects</div>
                <div className="text-white">python -m devos project list</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="session-tracking" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Session Tracking</h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                Automatic time tracking and session management help you understand your development patterns and optimize productivity.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Features</h3>
              <ul>
                <li><strong>Automatic Detection:</strong> Starts tracking when you begin coding</li>
                <li><strong>Detailed Analytics:</strong> Insights into your coding patterns</li>
                <li><strong>Session History:</strong> Complete log of all development sessions</li>
                <li><strong>Productivity Reports:</strong> Weekly and monthly summaries</li>
              </ul>
              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Usage</h3>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400 mb-2"># Start tracking</div>
                <div className="text-white">python -m devos now</div>
                <div className="text-gray-400 mt-4"># Stop tracking</div>
                <div className="text-white">python -m devos done</div>
                <div className="text-gray-400 mt-4"># View session history</div>
                <div className="text-white">python -m devos session list</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="environment-management" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Environment Management</h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                Secure environment variable management with encryption and multi-environment support.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Security Features</h3>
              <ul>
                <li><strong>Encryption:</strong> All environment variables are encrypted at rest</li>
                <li><strong>Multi-Environment:</strong> Support for development, staging, and production</li>
                <li><strong>Access Control:</strong> Granular permissions for team members</li>
                <li><strong>Audit Logs:</strong> Complete history of environment changes</li>
              </ul>
              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Commands</h3>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400 mb-2"># Set environment variable</div>
                <div className="text-white">python -m devos env set DATABASE_URL postgresql://...</div>
                <div className="text-gray-400 mt-4"># List environments</div>
                <div className="text-white">python -m devos env list</div>
                <div className="text-gray-400 mt-4"># Switch environment</div>
                <div className="text-white">python -m devos env use production</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ai-integration" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">AI Integration</h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                Harness the power of AI for code analysis, security scanning, and intelligent development assistance.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">AI Capabilities</h3>
              <ul>
                <li><strong>Code Analysis:</strong> Deep analysis of code quality and patterns</li>
                <li><strong>Security Scanning:</strong> AI-powered vulnerability detection</li>
                <li><strong>Code Enhancement:</strong> Intelligent suggestions for improvements</li>
                <li><strong>Documentation Generation:</strong> Auto-generate documentation from code</li>
              </ul>
              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">AI Commands</h3>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400 mb-2"># Analyze code with AI</div>
                <div className="text-white">python -m devos ai-analyze --scope current</div>
                <div className="text-gray-400 mt-4"># Security scan</div>
                <div className="text-white">python -m devos ai-security-scan</div>
                <div className="text-gray-400 mt-4"># Enhance code</div>
                <div className="text-white">python -m devos ai-enhance --file app.py</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow-automation" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Workflow Automation</h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                Automate repetitive tasks and create intelligent workflows that adapt to your development process.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Automation Features</h3>
              <ul>
                <li><strong>Custom Workflows:</strong> Build workflows for any development task</li>
                <li><strong>Triggers:</strong> Event-driven automation based on Git, file changes, and more</li>
                <li><strong>Integration:</strong> Connect with external services and APIs</li>
                <li><strong>Scheduling:</strong> Run tasks on specific schedules</li>
              </ul>
              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Workflow Commands</h3>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400 mb-2"># Create workflow</div>
                <div className="text-white">python -m devos workflow create deploy</div>
                <div className="text-gray-400 mt-4"># Run workflow</div>
                <div className="text-white">python -m devos workflow run deploy</div>
                <div className="text-gray-400 mt-4"># List workflows</div>
                <div className="text-white">python -m devos workflow list</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team-collaboration" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Team Collaboration</h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                Collaborate effectively with your team through shared dashboards, workflows, and project management.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Collaboration Features</h3>
              <ul>
                <li><strong>Team Dashboards:</strong> Shared visibility into project progress</li>
                <li><strong>Collaborative Workflows:</strong> Team-wide automation processes</li>
                <li><strong>Role Management:</strong> Granular permissions and access control</li>
                <li><strong>Activity Feeds:</strong> Real-time updates on team activities</li>
              </ul>
              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Team Commands</h3>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400 mb-2"># Create team</div>
                <div className="text-white">python -m devos team create my-team</div>
                <div className="text-gray-400 mt-4"># Invite member</div>
                <div className="text-white">python -m devos team invite user@example.com</div>
                <div className="text-gray-400 mt-4"># Share project</div>
                <div className="text-white">python -m devos team share project-name</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Command Reference */}
      <section id="command-reference" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Command Reference</h2>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Start Commands</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-gray-300 pl-4">
                <div className="font-mono text-sm text-gray-900">devos now</div>
                <div className="text-gray-600 text-sm mt-1">Quick start tracking current project</div>
              </div>
              <div className="border-l-4 border-gray-300 pl-4">
                <div className="font-mono text-sm text-gray-900">devos done</div>
                <div className="text-gray-600 text-sm mt-1">Quick stop current tracking session</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Management</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-gray-300 pl-4">
                <div className="font-mono text-sm text-gray-900">devos init [template] [name]</div>
                <div className="text-gray-600 text-sm mt-1">Initialize a new project with template</div>
              </div>
              <div className="border-l-4 border-gray-300 pl-4">
                <div className="font-mono text-sm text-gray-900">devos project add</div>
                <div className="text-gray-600 text-sm mt-1">Add current directory as a project</div>
              </div>
              <div className="border-l-4 border-gray-300 pl-4">
                <div className="font-mono text-sm text-gray-900">devos project list</div>
                <div className="text-gray-600 text-sm mt-1">List all managed projects</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Commands</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-gray-300 pl-4">
                <div className="font-mono text-sm text-gray-900">devos ai-analyze [options]</div>
                <div className="text-gray-600 text-sm mt-1">Analyze code with AI</div>
              </div>
              <div className="border-l-4 border-gray-300 pl-4">
                <div className="font-mono text-sm text-gray-900">devos ai-security-scan</div>
                <div className="text-gray-600 text-sm mt-1">Perform AI-powered security scan</div>
              </div>
              <div className="border-l-4 border-gray-300 pl-4">
                <div className="font-mono text-sm text-gray-900">devos ai-enhance [options]</div>
                <div className="text-gray-600 text-sm mt-1">Enhance code with AI suggestions</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a href="#" className="inline-flex items-center text-gray-900 hover:text-gray-700 font-medium">
              View complete command reference <ArrowRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Advanced Topics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Advanced Topics</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Custom Templates</h3>
              <p className="text-gray-600 mb-4">
                Create custom project templates with your preferred structure, dependencies, and configurations.
              </p>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400 mb-2"># Create custom template</div>
                <div className="text-white">python -m devos template create my-template</div>
                <div className="text-gray-400 mt-2"># Use template</div>
                <div className="text-white">python -m devos init my-template project-name</div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Workflow Automation</h3>
              <p className="text-gray-600 mb-4">
                Automate repetitive tasks with custom workflows and intelligent triggers.
              </p>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400 mb-2"># Create workflow</div>
                <div className="text-white">python -m devos workflow create deploy</div>
                <div className="text-gray-400 mt-2"># Execute workflow</div>
                <div className="text-white">python -m devos workflow run deploy</div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Team Integration</h3>
              <p className="text-gray-600 mb-4">
                Integrate with team tools, share configurations, and collaborate effectively.
              </p>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400 mb-2"># Sync team settings</div>
                <div className="text-white">python -m devos team sync</div>
                <div className="text-gray-400 mt-2"># Share project</div>
                <div className="text-white">python -m devos team share project-name</div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">API Integration</h3>
              <p className="text-gray-600 mb-4">
                Integrate DevOS with external APIs, webhooks, and third-party services.
              </p>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400 mb-2"># Configure API</div>
                <div className="text-white">python -m devos api configure github</div>
                <div className="text-gray-400 mt-2"># Test integration</div>
                <div className="text-white">python -m devos api test github</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Troubleshooting</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Issues</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Command not found</h4>
                  <p className="text-gray-600 mb-2">Use <code className="bg-gray-100 px-2 py-1 rounded">python -m devos</code> instead of just <code className="bg-gray-100 px-2 py-1 rounded">devos</code></p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Permission denied</h4>
                  <p className="text-gray-600 mb-2">Check file permissions and ensure you have write access to the project directory</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">AI features not working</h4>
                  <p className="text-gray-600 mb-2">Configure AI provider and API keys in the configuration settings</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Getting Help</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Book className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">Check the <a href="#" className="text-gray-900 hover:text-gray-700">GitHub Wiki</a> for detailed guides</span>
                </div>
                <div className="flex items-center">
                  <Github className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">Open an issue on <a href="#" className="text-gray-900 hover:text-gray-700">GitHub</a> for bugs</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">Join our <a href="#" className="text-gray-900 hover:text-gray-700">Discord community</a> for support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Terminal className="h-5 w-5 text-gray-900" />
              </div>
              <span className="text-xl font-bold">DevOS</span>
            </div>
            <p className="text-gray-400 mb-4">Open source development workflow automation for everyone.</p>
            <div className="flex justify-center space-x-6 mb-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Issues</a>
            </div>
            <div className="text-center text-gray-400 pt-8 border-t border-gray-800">
              <p>© 2026 DevOS CLI. Open source and community-driven.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
              <div>
                {featureDetails[activeModal as keyof typeof featureDetails].icon}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {featureDetails[activeModal as keyof typeof featureDetails].title}
                </h2>
              </div>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-8 text-lg">
                {featureDetails[activeModal as keyof typeof featureDetails].description}
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {featureDetails[activeModal as keyof typeof featureDetails].features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Commands</h3>
                <div className="space-y-3">
                  {featureDetails[activeModal as keyof typeof featureDetails].commands.map((command, index) => (
                    <div key={index} className="bg-gray-900 rounded-lg p-4">
                      <div className="text-green-400 text-sm mb-2">{command.description}</div>
                      <div className="text-white font-mono text-sm">{command.code}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={closeModal}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
