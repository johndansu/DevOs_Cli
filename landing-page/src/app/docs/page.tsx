"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Terminal, 
  Cpu, 
  Github, 
  CheckCircle, 
  Info, 
  ArrowRight,
  Code,
  Zap,
  Shield,
  Users,
  FileText,
  Settings,
  Clock,
  Database,
  Globe,
  Lock,
  AlertCircle,
  ChevronRight
} from "lucide-react";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  const tableOfContents = [
    { id: "introduction", title: "Introduction", icon: <Info className="h-4 w-4" /> },
    { id: "installation", title: "Installation", icon: <Terminal className="h-4 w-4" /> },
    { id: "quick-start", title: "Quick Start", icon: <Zap className="h-4 w-4" /> },
    { id: "configuration", title: "Configuration", icon: <Settings className="h-4 w-4" /> },
    { id: "commands", title: "Commands", icon: <Code className="h-4 w-4" /> },
    { id: "advanced-usage", title: "Advanced Usage", icon: <Cpu className="h-4 w-4" /> },
    { id: "api-reference", title: "API Reference", icon: <FileText className="h-4 w-4" /> },
    { id: "troubleshooting", title: "Troubleshooting", icon: <AlertCircle className="h-4 w-4" /> },
    { id: "faq", title: "FAQ", icon: <Info className="h-4 w-4" /> }
  ];

  const commandCategories = [
    {
      id: "ai-integration",
      title: "AI Integration",
      icon: <Cpu className="h-5 w-5" />,
      description: "AI-powered development assistance with multiple providers",
      commands: [
        {
          name: "python -m devos quick-ai",
          description: "Fast AI-powered code generation and assistance",
          usage: [
            "python -m devos quick-ai \"create a Python class for user management\"",
            "python -m devos quick-ai \"explain this function\" main.py",
            "python -m devos quick-ai \"generate a REST API endpoint\""
          ],
          options: [
            { flag: "--provider", short: "-p", description: "AI provider to use (groq, openai)" },
            { flag: "--model", short: "-m", description: "AI model to use" }
          ]
        },
        {
          name: "python -m devos ai chat",
          description: "Interactive AI conversation with project context",
          usage: [
            "python -m devos ai chat",
            "python -m devos ai chat --context security",
            "python -m devos ai chat --history"
          ],
          options: [
            { flag: "--context", description: "Chat context: security, architecture, performance" },
            { flag: "--history", description: "Include conversation history" }
          ]
        }
      ]
    },
    {
      id: "project-management",
      title: "Project Management",
      icon: <FileText className="h-5 w-5" />,
      description: "Organize and manage your development projects",
      commands: [
        {
          name: "python -m devos project init",
          description: "Initialize a new development project",
          usage: [
            "python -m devos project init",
            "python -m devos project init --template web-app",
            "python -m devos project init --name my-project"
          ],
          options: [
            { flag: "--template", short: "-t", description: "Project template to use" },
            { flag: "--name", short: "-n", description: "Project name" }
          ]
        },
        {
          name: "python -m devos project list",
          description: "List all available projects",
          usage: [
            "python -m devos project list",
            "python -m devos project list --active"
          ],
          options: [
            { flag: "--active", short: "-a", description: "Show only active projects" }
          ]
        }
      ]
    },
    {
      id: "session-tracking",
      title: "Session Tracking",
      icon: <Clock className="h-5 w-5" />,
      description: "Track and manage development sessions",
      commands: [
        {
          name: "python -m devos session start",
          description: "Start a new development session",
          usage: [
            "python -m devos session start",
            "python -m devos session start --project my-project",
            "python -m devos session start --type coding"
          ],
          options: [
            { flag: "--project", short: "-p", description: "Project name" },
            { flag: "--type", short: "-t", description: "Session type" }
          ]
        },
        {
          name: "python -m devos session status",
          description: "Check current session status",
          usage: [
            "python -m devos session status",
            "python -m devos session status --detailed"
          ],
          options: [
            { flag: "--detailed", short: "-d", description: "Show detailed session info" }
          ]
        }
      ]
    },
    {
      id: "environment-management",
      title: "Environment Management",
      icon: <Globe className="h-5 w-5" />,
      description: "Manage development environments and configurations",
      commands: [
        {
          name: "python -m devos env setup",
          description: "Set up development environment",
          usage: [
            "python -m devos env setup",
            "python -m devos env setup --python 3.9",
            "python -m devos env setup --node latest"
          ],
          options: [
            { flag: "--python", description: "Python version to install" },
            { flag: "--node", description: "Node.js version to install" }
          ]
        },
        {
          name: "python -m devos env list",
          description: "List available environments",
          usage: [
            "python -m devos env list",
            "python -m devos env list --active"
          ],
          options: [
            { flag: "--active", short: "-a", description: "Show only active environment" }
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                  <Terminal className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">DevOS</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/#features"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Features
              </Link>
              <Link 
                href="/#commands"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Commands
              </Link>
              <Link 
                href="/docs"
                className="text-gray-900 transition-colors"
              >
                Docs
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900" asChild>
                <a href="https://github.com/johndansu/DevOs_Cli" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                <Terminal className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">DevOS CLI Documentation</h1>
            </div>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Complete guide to using DevOS CLI - your comprehensive development toolkit for 
              modern software projects.
            </p>
            
            <div className="flex justify-center space-x-4">
              <Button asChild>
                <Link href="#installation">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#commands">
                  View Commands
                  <Code className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Table of Contents</h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {tableOfContents.map((item, index) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={`group flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                  activeSection === item.id
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <span className={`text-xs font-medium ${
                  activeSection === item.id ? "text-white" : "text-gray-400"
                }`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-medium">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section id="introduction" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Introduction</h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                DevOS CLI is a powerful command-line interface designed to streamline your development workflow. 
                Built with Python and designed for extensibility, DevOS CLI integrates seamlessly with your existing 
                development tools while providing powerful automation capabilities, intelligent project management, 
                and advanced AI features.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                <li><strong>Project Management:</strong> Initialize, configure, and manage projects with templates</li>
                <li><strong>Session Tracking:</strong> Track development time and maintain work sessions</li>
                <li><strong>Environment Management:</strong> Set up and manage development environments</li>
                <li><strong>AI Integration:</strong> Get AI-powered assistance for coding and debugging</li>
                <li><strong>Workflow Automation:</strong> Automate repetitive development tasks</li>
                <li><strong>Privacy-First Design:</strong> All data stored locally, no cloud dependencies</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Architecture</h3>
              <p className="text-gray-600 mb-4">
                DevOS CLI follows a modular architecture with pluggable components:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <ul className="space-y-2 text-gray-600">
                  <li><code className="bg-gray-200 px-2 py-1 rounded text-sm">Core Engine:</code> Command processing and workflow orchestration</li>
                  <li><code className="bg-gray-200 px-2 py-1 rounded text-sm">Plugin System:</code> Extensible architecture for custom commands</li>
                  <li><code className="bg-gray-200 px-2 py-1 rounded text-sm">AI Layer:</code> Multiple AI provider integrations</li>
                  <li><code className="bg-gray-200 px-2 py-1 rounded text-sm">Storage Layer:</code> Local data persistence and configuration</li>
                </ul>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <Terminal className="h-6 w-6 text-gray-900 mr-3" />
                    <h3 className="font-semibold text-gray-900">50+ Commands</h3>
                  </div>
                  <p className="text-gray-600">Comprehensive command coverage for all development needs</p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <Cpu className="h-6 w-6 text-gray-900 mr-3" />
                    <h3 className="font-semibold text-gray-900">AI-Powered</h3>
                  </div>
                  <p className="text-gray-600">Intelligent code analysis and automation capabilities</p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <Github className="h-6 w-6 text-gray-900 mr-3" />
                    <h3 className="font-semibold text-gray-900">Open Source</h3>
                  </div>
                  <p className="text-gray-600">Community-driven and fully customizable</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section id="installation" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Installation</h2>
            
            <div className="border border-gray-200 rounded-lg p-4 mb-8">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-gray-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">No PATH Modifications Required</h3>
                  <p className="text-gray-800">DevOS CLI works without requiring PATH environment variable changes.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Method 1: Python Package</h3>
                <p className="text-gray-600 mb-4">Install via pip for the latest stable version:</p>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2"># Install via pip</div>
                  <div className="text-white">pip install devos-cli</div>
                  <div className="text-gray-400 mt-2"># Verify installation</div>
                  <div className="text-white">python -m devos --version</div>
                  <div className="text-gray-400 mt-2"># Run immediately</div>
                  <div className="text-white">python -m devos --help</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Method 2: Standalone Binary</h3>
                <p className="text-gray-600 mb-4">Download pre-compiled binaries for your platform:</p>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2"># Windows</div>
                  <div className="text-white">curl -L https://github.com/devos/cli/releases/latest/download/devos.exe -o devos.exe</div>
                  <div className="text-white">./devos.exe --help</div>
                  <div className="text-gray-400 mt-4"># macOS/Linux</div>
                  <div className="text-white">curl -L https://github.com/devos/cli/releases/latest/download/devos -o devos</div>
                  <div className="text-white">chmod +x devos</div>
                  <div className="text-white">./devos --help</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Method 3: Development Installation</h3>
                <p className="text-gray-600 mb-4">Install from source for development:</p>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2"># Clone repository</div>
                  <div className="text-white">git clone https://github.com/johndansu/DevOs_Cli.git</div>
                  <div className="text-white">cd DevOs_Cli</div>
                  <div className="text-gray-400 mt-2"># Install in development mode</div>
                  <div className="text-white">pip install -e .</div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">System Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Minimum Requirements:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Python 3.8 or higher</li>
                      <li>• 2GB RAM</li>
                      <li>• 100MB disk space</li>
                      <li>• Internet connection (for AI features)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Recommended:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Python 3.10 or higher</li>
                      <li>• 4GB RAM</li>
                      <li>• 500MB disk space</li>
                      <li>• SSD storage for better performance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section id="quick-start" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Quick Start</h2>
            
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-gray-600 font-semibold">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Initialize Your First Project</h3>
                </div>
                <p className="text-gray-600 mb-4 ml-11">Create a new project with your preferred template:</p>
                <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm ml-11">
                  <div className="text-white">python -m devos project init --name my-awesome-project</div>
                  <div className="text-gray-400 mt-2"># Or with a specific template</div>
                  <div className="text-white">python -m devos project init --template web-app --name my-app</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-gray-600 font-semibold">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Start a Development Session</h3>
                </div>
                <p className="text-gray-600 mb-4 ml-11">Track your work and maintain development context:</p>
                <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm ml-11">
                  <div className="text-white">python -m devos session start --project my-awesome-project</div>
                  <div className="text-gray-400 mt-2"># Check session status</div>
                  <div className="text-white">python -m devos session status</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-gray-600 font-semibold">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Get AI Assistance</h3>
                </div>
                <p className="text-gray-600 mb-4 ml-11">Leverage AI for code generation and problem-solving:</p>
                <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm ml-11">
                  <div className="text-white">python -m devos quick-ai "create a REST API for user management"</div>
                  <div className="text-gray-400 mt-2"># Start interactive chat</div>
                  <div className="text-white">python -m devos ai chat --context architecture</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-gray-600 font-semibold">4</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Configure Your Environment</h3>
                </div>
                <p className="text-gray-600 mb-4 ml-11">Set up development environment and preferences:</p>
                <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm ml-11">
                  <div className="text-white">python -m devos env setup --python 3.10</div>
                  <div className="text-gray-400 mt-2"># Configure AI provider</div>
                  <div className="text-white">export DEVOS_AI_PROVIDER=groq</div>
                </div>
              </div>
            </div>

            <div className="mt-12 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Next Steps</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Explore Commands</h4>
                  <p className="text-gray-600 mb-3">Browse all available commands and their options.</p>
                  <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm">
                    <div className="text-white">python -m devos --help</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">View Examples</h4>
                  <p className="text-gray-600 mb-3">Check out practical examples and use cases.</p>
                  <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm">
                    <div className="text-white">python -m devos examples</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration */}
      <section id="configuration" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Configuration</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Environment Variables</h3>
                <div className="space-y-3">
                  <div>
                    <code className="bg-gray-200 px-2 py-1 rounded text-sm">DEVOS_AI_PROVIDER</code>
                    <p className="text-gray-600 mt-1">Default AI provider (groq, openai)</p>
                  </div>
                  <div>
                    <code className="bg-gray-200 px-2 py-1 rounded text-sm">DEVOS_CONFIG_PATH</code>
                    <p className="text-gray-600 mt-1">Custom configuration file path</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration File</h3>
                <p className="text-gray-600 mb-4">Create a <code className="bg-gray-200 px-2 py-1 rounded text-sm">~/.devos/config.json</code> file:</p>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300">
                  <div>{`{`}</div>
                  <div>  "ai_provider": "groq",</div>
                  <div>  "default_project_type": "web-app",</div>
                  <div>  "session_tracking": true</div>
                  <div>{`}`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commands */}
      <section id="commands" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Commands</h2>
          
          <div className="space-y-12">
            {commandCategories.map((category) => (
              <div key={category.id} className="bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="text-gray-600">{category.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                  </div>
                  <p className="text-gray-600 mt-2">{category.description}</p>
                </div>
                
                <div className="p-6 space-y-8">
                  {category.commands.map((command, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-b-0 pb-8 last:pb-0">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3 font-mono text-sm bg-gray-100 px-3 py-2 rounded">
                        {command.name}
                      </h4>
                      <p className="text-gray-600 mb-4">{command.description}</p>
                      
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Usage Examples:</h5>
                          <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm space-y-1">
                            {command.usage.map((example, i) => (
                              <div key={i} className="text-green-400">{example}</div>
                            ))}
                          </div>
                        </div>
                        
                        {command.options && command.options.length > 0 && (
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Options:</h5>
                            <div className="space-y-2">
                              {command.options.map((option, i) => (
                                <div key={i} className="flex items-start space-x-3">
                                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                                    {option.flag}
                                    {'short' in option && <span className="text-gray-500 ml-2">{option.short}</span>}
                                  </code>
                                  <span className="text-gray-600 text-sm">{option.description}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Usage */}
      <section id="advanced-usage" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Advanced Usage</h2>
          
          <div className="space-y-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Custom Templates</h3>
              <p className="text-gray-600 mb-4">Create and use custom project templates for consistent project structure.</p>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400 mb-2"># Create custom template</div>
                <div className="text-white">python -m devos template create --name my-template</div>
                <div className="text-gray-400 mt-2"># Use custom template</div>
                <div className="text-white">python -m devos project init --template my-template</div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Workflow Automation</h3>
              <p className="text-gray-600 mb-4">Automate repetitive tasks with custom workflows.</p>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400 mb-2"># Create workflow</div>
                <div className="text-white">python -m devos workflow create --name deploy</div>
                <div className="text-gray-400 mt-2"># Execute workflow</div>
                <div className="text-white">python -m devos workflow run deploy</div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Integration with IDEs</h3>
              <p className="text-gray-600 mb-4">Seamlessly integrate DevOS CLI with your favorite IDE.</p>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">VS Code</h4>
                  <p className="text-gray-600">Install the DevOS extension for integrated commands.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">PyCharm</h4>
                  <p className="text-gray-600">Configure external tools for quick access to DevOS commands.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Vim/Neovim</h4>
                  <p className="text-gray-600">Use the DevOS plugin for enhanced productivity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">API Reference</h2>
          
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Core API</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 font-mono">devos.init(project_type, options)</h4>
                  <p className="text-gray-600">Initialize a new project with specified type and options.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 font-mono">devos.session.start(options)</h4>
                  <p className="text-gray-600">Start a new development session.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 font-mono">devos.ai.query(prompt, options)</h4>
                  <p className="text-gray-600">Query AI assistant with context.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Configuration API</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 font-mono">devos.config.get(key)</h4>
                  <p className="text-gray-600">Get configuration value.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 font-mono">devos.config.set(key, value)</h4>
                  <p className="text-gray-600">Set configuration value.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How do I update DevOS CLI?</h3>
              <p className="text-gray-600">Use <code className="bg-gray-200 px-2 py-1 rounded text-sm">pip install --upgrade devos-cli</code> to update to the latest version.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Can I use DevOS CLI without internet?</h3>
              <p className="text-gray-600">Yes, most core features work offline. AI features require internet connectivity.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How do I contribute to DevOS CLI?</h3>
              <p className="text-gray-600">Check the <a href="https://github.com/johndansu/DevOs_Cli" className="text-blue-600 hover:underline">GitHub repository</a> for contribution guidelines and open issues.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Is DevOS CLI free to use?</h3>
              <p className="text-gray-600">Yes, DevOS CLI is open source and completely free to use. Some AI features may require API keys from third-party providers.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What Python versions are supported?</h3>
              <p className="text-gray-600">DevOS CLI supports Python 3.8 and above. We recommend using the latest stable Python version.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section id="troubleshooting" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Troubleshooting</h2>
          
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-gray-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Common Issues</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900">Command not found</h4>
                      <p className="text-gray-600">Use <code className="bg-gray-200 px-2 py-1 rounded text-sm">python -m devos</code> instead of just <code className="bg-gray-200 px-2 py-1 rounded text-sm">devos</code></p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Permission denied</h4>
                      <p className="text-gray-600">Check file permissions and ensure Python has access to create files</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">AI provider errors</h4>
                      <p className="text-gray-600">Verify API keys are set correctly in environment variables</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-gray-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Getting Help</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Use <code className="bg-gray-200 px-2 py-1 rounded text-sm">python -m devos --help</code> for command help</li>
                    <li>• Check the <a href="https://github.com/johndansu/DevOs_Cli" className="text-blue-600 hover:underline">GitHub repository</a> for issues</li>
                    <li>• Join our community Discord for support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Terminal className="h-5 w-5 text-gray-900" />
                </div>
                <span className="text-xl font-bold">DevOS</span>
              </div>
              <p className="text-gray-400">Open-source development workflow automation for everyone.</p>
              <div className="flex space-x-4 mt-4">
                <a href="https://github.com/johndansu/DevOs_Cli" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2 text-gray-400">
                <a href="/docs" className="block hover:text-white transition-colors">Documentation</a>
                <a href="/docs#installation" className="block hover:text-white transition-colors">Installation</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <div className="space-y-2 text-gray-400">
                <a href="https://github.com/johndansu/DevOs_Cli" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">GitHub Repository</a>
                <a href="https://pypi.org/project/devos-cli/" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">PyPI Package</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="space-y-2 text-gray-400">
                <a href="https://github.com/johndansu/DevOs_Cli/issues" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">Report Issues</a>
                <a href="https://github.com/johndansu/DevOs_Cli" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">View Source</a>
              </div>
            </div>
          </div>
          
          <div className="text-center text-gray-400 pt-8 border-t border-gray-800">
            <p>© 2026 DevOS CLI. Open source and community-driven.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
