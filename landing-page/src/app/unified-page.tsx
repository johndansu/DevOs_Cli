"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Terminal, 
  Zap, 
  Shield, 
  Globe, 
  Download, 
  Github, 
  BookOpen,
  ArrowRight,
  CheckCircle,
  Code,
  Package,
  Lock,
  Rocket,
  Star,
  Users,
  Building,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Cpu,
  Database,
  GitBranch,
  Activity,
  FileText,
  Settings,
  Copy,
  ChevronDown,
  ChevronRight
} from "lucide-react";

const features = [
  {
    icon: <Terminal className="h-6 w-6" />,
    title: "Complete Command Suite",
    description: "50+ commands covering project management, AI analysis, workflow automation, and personal productivity",
    color: "bg-gray-100 text-gray-600"
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Intelligent Automation",
    description: "AI-powered code analysis, security scanning, and automated development workflows",
    color: "bg-gray-100 text-gray-600"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Privacy-First Design",
    description: "Local data storage, encrypted environment variables, and optional AI integration",
    color: "bg-gray-100 text-gray-600"
  },
  {
    icon: <Github className="h-6 w-6" />,
    title: "Open Source & Extensible",
    description: "Built by developers, for developers. Contribute, fork, and customize to your needs",
    color: "bg-gray-100 text-gray-600"
  }
];

const techStack = [
  { name: "Python", icon: <Code className="h-5 w-5" /> },
  { name: "FastAPI", icon: <Zap className="h-5 w-5" /> },
  { name: "PostgreSQL", icon: <Database className="h-5 w-5" /> },
  { name: "Docker", icon: <Cpu className="h-5 w-5" /> },
  { name: "Redis", icon: <Activity className="h-5 w-5" /> },
  { name: "Git", icon: <GitBranch className="h-5 w-5" /> }
];

const metrics = [
  { value: "10+", label: "Early Adopters" },
  { value: "500+", label: "Commands Executed" },
  { value: "3+", label: "Beta Testers" },
  { value: "100%", label: "Uptime" }
];

const commandCategories = [
  {
    id: "ai-integration",
    title: "AI Integration",
    icon: <Cpu className="h-5 w-5" />,
    description: "AI-powered development assistance with multiple providers",
    commands: [
      {
        name: "devos ai-config",
        description: "Manage AI provider configurations and API keys",
        usage: [
          "devos ai-config show",
          "devos ai-config set-api-key groq",
          "devos ai-config list-providers",
          "devos ai-config test groq"
        ],
        arguments: [
          { name: "action", description: "Action to perform: show, set-api-key, list-providers, test" },
          { name: "provider", description: "AI provider: groq, openai, anthropic" }
        ]
      },
      {
        name: "devos ai",
        description: "General AI assistance commands",
        usage: [
          "devos ai review main.py",
          "devos ai explain function.py --line 25",
          "devos ai refactor old_function.py",
          "devos ai test mymodule.py",
          "devos ai generate \"create a REST API endpoint\""
        ],
        options: [
          { flag: "--provider", short: "-p", description: "AI provider to use (openai, groq, anthropic)" },
          { flag: "--model", short: "-m", description: "AI model to use" },
          { flag: "--temperature", short: "-t", description: "AI response temperature (0.0-1.0)" },
          { flag: "--max-tokens", description: "Maximum tokens in response" }
        ]
      },
      {
        name: "devos ai analyze",
        description: "Comprehensive code analysis with AI insights",
        usage: [
          "devos ai analyze \"comprehensive project review\"",
          "devos ai analyze main.py",
          "devos ai analyze --scope current"
        ],
        options: [
          { flag: "--scope", description: "Analysis scope: current, project, all" },
          { flag: "--export", description: "Export results to file" },
          { flag: "--format", description: "Export format: json, markdown" }
        ]
      },
      {
        name: "devos ai security-scan",
        description: "AI-powered security vulnerability scanner",
        usage: [
          "devos ai security-scan",
          "devos ai security-scan --severity high",
          "devos ai security-scan --export security-report.json"
        ],
        options: [
          { flag: "--path", short: "-p", description: "Path to scan" },
          { flag: "--severity", description: "Minimum severity: low, medium, high" },
          { flag: "--export", description: "Export report to file" }
        ]
      },
      {
        name: "devos ai architecture-map",
        description: "AI-powered architecture analysis and mapping",
        usage: [
          "devos ai architecture-map",
          "devos ai architecture-map --patterns mvc",
          "devos ai architecture-map --export architecture.json"
        ],
        options: [
          { flag: "--patterns", description: "Focus on specific architecture patterns" },
          { flag: "--export", description: "Export results to file" },
          { flag: "--depth", description: "Analysis depth: shallow, medium, deep" }
        ]
      },
      {
        name: "devos ai enhance",
        description: "AI-powered code enhancement and improvement suggestions",
        usage: [
          "devos ai enhance",
          "devos ai enhance main.py",
          "devos ai enhance --focus performance"
        ],
        options: [
          { flag: "--focus", description: "Focus areas: performance, security, readability" },
          { flag: "--auto-apply", description: "Automatically apply safe suggestions" }
        ]
      },
      {
        name: "devos ai project-summary",
        description: "Generate comprehensive AI-powered project summary",
        usage: [
          "devos ai project-summary",
          "devos ai project-summary --export summary.md",
          "devos ai project-summary --recommendations"
        ],
        options: [
          { flag: "--detailed", description: "Include detailed analysis" },
          { flag: "--export", description: "Export summary to file" },
          { flag: "--recommendations", description: "Include AI recommendations" }
        ]
      }
    ]
  },
  {
    id: "quick-start",
    title: "Quick Start",
    icon: <Zap className="h-5 w-5" />,
    description: "Shortcuts for the most common operations",
    commands: [
      {
        name: "devos now",
        description: "Quick start tracking current project",
        usage: [
          "devos now"
        ]
      },
      {
        name: "devos done",
        description: "Quick stop current tracking session",
        usage: [
          "devos done"
        ]
      },
      {
        name: "devos status",
        description: "Quick status overview",
        usage: [
          "devos status"
        ]
      },
      {
        name: "devos today",
        description: "Show today's tracking summary",
        usage: [
          "devos today"
        ]
      },
      {
        name: "devos setup",
        description: "Quick setup wizard for new users",
        usage: [
          "devos setup"
        ]
      }
    ]
  },
  {
    id: "project-management",
    title: "Project Management",
    icon: <Package className="h-5 w-5" />,
    description: "Initialize and manage projects with full lifecycle support",
    commands: [
      {
        name: "devos init",
        description: "Initialize a new project with templates",
        usage: [
          "devos init",
          "devos init python-api",
          "devos init --name my-project --language python --path ./my-project"
        ],
        options: [
          { flag: "--name", short: "-n", description: "Project name" },
          { flag: "--path", short: "-p", description: "Project path (default: current directory)" },
          { flag: "--language", short: "-l", description: "Programming language" },
          { flag: "--interactive", short: "-i", description: "Interactive mode" }
        ],
        templates: [
          "python-basic - Basic Python project",
          "python-api - FastAPI web API",
          "python-cli - Click CLI tool",
          "python-web - Flask web app",
          "javascript-basic - Basic Node.js project",
          "javascript-api - Express API",
          "typescript-api - Express API with TypeScript",
          "go-basic - Basic Go module",
          "rust-cli - Rust CLI tool"
        ]
      },
      {
        name: "devos project add",
        description: "Add an existing project to DevOS management",
        usage: [
          "devos project add my-project",
          "devos project add --path ./my-project --language python",
          "devos project add --type web --description \"My web app\""
        ],
        options: [
          { flag: "--path", short: "-p", description: "Project path" },
          { flag: "--language", short: "-l", description: "Programming language" },
          { flag: "--type", short: "-t", description: "Project type (web, cli, api, etc.)" },
          { flag: "--description", short: "-d", description: "Project description" },
          { flag: "--tags", description: "Project tags (comma-separated)" }
        ]
      },
      {
        name: "devos project list",
        description: "List all managed projects",
        usage: [
          "devos project list",
          "devos project list --type web",
          "devos project list --status active",
          "devos project list --format json"
        ],
        options: [
          { flag: "--type", short: "-t", description: "Filter by project type" },
          { flag: "--status", short: "-s", description: "Filter by status" },
          { flag: "--format", short: "-f", description: "Output format: table or json" }
        ]
      },
      {
        name: "devos project status",
        description: "Show detailed project status and overview",
        usage: [
          "devos project status my-project",
          "devos project status --current"
        ],
        options: [
          { flag: "--current", short: "-c", description: "Show current directory project" }
        ]
      },
      {
        name: "devos project tasks",
        description: "Manage project tasks",
        usage: [
          "devos project tasks list",
          "devos project tasks add \"Implement authentication\"",
          "devos project tasks complete \"Implement authentication\"",
          "devos project tasks --project my-project"
        ],
        arguments: [
          { name: "action", description: "Action: list, add, complete" },
          { name: "task_title", description: "Task title (for add/complete actions)" }
        ],
        options: [
          { flag: "--project", short: "-p", description: "Project name" }
        ]
      },
      {
        name: "devos project issues",
        description: "Manage project issues and bugs",
        usage: [
          "devos project issues list",
          "devos project issues add \"Fix login bug\"",
          "devos project issues resolve \"Fix login bug\"",
          "devos project issues --project my-project"
        ],
        arguments: [
          { name: "action", description: "Action: list, add, resolve" },
          { name: "issue_title", description: "Issue title (for add/resolve actions)" }
        ],
        options: [
          { flag: "--project", short: "-p", description: "Project name" }
        ]
      },
      {
        name: "devos project notes",
        description: "Manage project notes and documentation",
        usage: [
          "devos project notes list",
          "devos project notes add \"Remember to update dependencies\"",
          "devos project notes delete \"Remember to update dependencies\"",
          "devos project notes --project my-project"
        ],
        arguments: [
          { name: "action", description: "Action: list, add, delete" },
          { name: "note_content", description: "Note content (for add/delete actions)" }
        ],
        options: [
          { flag: "--project", short: "-p", description: "Project name" }
        ]
      }
    ]
  },
  {
    id: "session-tracking",
    title: "Session Tracking",
    icon: <Activity className="h-5 w-5" />,
    description: "Track and manage development sessions",
    commands: [
      {
        name: "devos track start",
        description: "Start a new work session",
        usage: [
          "devos track start",
          "devos track start --notes \"Working on authentication\"",
          "devos track start --project my-project"
        ],
        options: [
          { flag: "--project", short: "-p", description: "Project name or path" },
          { flag: "--notes", short: "-n", description: "Session notes" },
          { flag: "--tags", short: "-t", description: "Session tags" }
        ]
      },
      {
        name: "devos track stop",
        description: "Stop the current work session",
        usage: [
          "devos track stop",
          "devos track stop --notes \"Completed auth module\""
        ],
        options: [
          { flag: "--notes", short: "-n", description: "Session notes" }
        ]
      },
      {
        name: "devos track status",
        description: "Show current tracking status and recent sessions",
        usage: [
          "devos track status",
          "devos track status --project my-project",
          "devos track status --limit 10"
        ],
        options: [
          { flag: "--project", short: "-p", description: "Filter by project name or path" },
          { flag: "--limit", short: "-l", description: "Number of sessions to show (default: 20)" }
        ]
      },
      {
        name: "devos track list",
        description: "List tracking sessions",
        usage: [
          "devos track list",
          "devos track list --project my-project",
          "devos track list --format json",
          "devos track list --limit 50"
        ],
        options: [
          { flag: "--project", short: "-p", description: "Filter by project name or path" },
          { flag: "--limit", short: "-l", description: "Number of sessions to show (default: 50)" },
          { flag: "--format", short: "-f", description: "Output format: table or json (default: table)" }
        ]
      }
    ]
  },
  {
    id: "environment-variables",
    title: "Environment Variables",
    icon: <Shield className="h-5 w-5" />,
    description: "Manage encrypted environment variables",
    commands: [
      {
        name: "devos env set",
        description: "Set an environment variable (encrypted)",
        usage: [
          "devos env set DATABASE_URL",
          "devos env set API_KEY --project my-project",
          "devos env set NODE_ENV --global"
        ],
        options: [
          { flag: "--project", short: "-p", description: "Project name or path" },
          { flag: "--global", description: "Set global environment variable" },
          { flag: "--value", description: "Environment variable value (prompted if not provided)" }
        ]
      },
      {
        name: "devos env get",
        description: "Get an environment variable",
        usage: [
          "devos env get DATABASE_URL",
          "devos env get DATABASE_URL --show",
          "devos env get NODE_ENV --global"
        ],
        options: [
          { flag: "--project", short: "-p", description: "Project name or path" },
          { flag: "--global", description: "Get global environment variable" },
          { flag: "--show", description: "Show the value (default: hide for security)" }
        ]
      },
      {
        name: "devos env list",
        description: "List environment variables",
        usage: [
          "devos env list",
          "devos env list --global",
          "devos env list --show-values",
          "devos env list --project my-project"
        ],
        options: [
          { flag: "--project", short: "-p", description: "Project name or path" },
          { flag: "--global", description: "List global environment variables" },
          { flag: "--show-values", description: "Show decrypted values" }
        ]
      },
      {
        name: "devos env delete",
        description: "Delete an environment variable",
        usage: [
          "devos env delete DATABASE_URL",
          "devos env delete NODE_ENV --global"
        ],
        options: [
          { flag: "--project", short: "-p", description: "Project name or path" },
          { flag: "--global", description: "Delete global environment variable" }
        ]
      }
    ]
  },
  {
    id: "configuration",
    title: "Configuration",
    icon: <Settings className="h-5 w-5" />,
    description: "Manage DevOS settings and preferences",
    commands: [
      {
        name: "devos config show",
        description: "Show current configuration",
        usage: [
          "devos config show",
          "devos config show --global"
        ],
        options: [
          { flag: "--global", short: undefined, description: "Show global configuration" }
        ]
      },
      {
        name: "devos config set",
        description: "Set a configuration value",
        usage: [
          "devos config set default_language python",
          "devos config set tracking.auto_git true --global"
        ],
        arguments: [
          { name: "key", description: "Configuration key (supports dot notation)" },
          { name: "value", description: "Configuration value" }
        ],
        options: [
          { flag: "--global", description: "Set global configuration" }
        ]
      },
      {
        name: "devos config init",
        description: "Initialize configuration file",
        usage: [
          "devos config init"
        ]
      }
    ]
  },
  {
    id: "interactive-mode",
    title: "Interactive Mode",
    icon: <Monitor className="h-5 w-5" />,
    description: "Guided workflows and interactive setup",
    commands: [
      {
        name: "devos interactive",
        description: "Start interactive mode with guided workflows",
        usage: [
          "devos interactive",
          "devos i",
          "devos wizard"
        ]
      }
    ]
  },
  {
    id: "shell-completion",
    title: "Shell Completion",
    icon: <Terminal className="h-5 w-5" />,
    description: "Command-line auto-completion setup",
    commands: [
      {
        name: "devos completion",
        description: "Generate or install shell completion",
        usage: [
          "devos completion bash",
          "devos completion bash --install"
        ],
        arguments: [
          { name: "shell", description: "Shell type: bash, zsh, fish, powershell" }
        ],
        options: [
          { flag: "--install", description: "Install completion to shell config" }
        ]
      },
      {
        name: "devos setup-completion",
        description: "Setup shell completion interactively",
        usage: [
          "devos setup-completion"
        ]
      }
    ]
  }
];

const globalOptions = [
  { flag: "--help", short: "-h", description: "Show help message" },
  { flag: "--version", short: "-V", description: "Show version and exit" }
];

export default function UnifiedDevOSPage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [activeCategory, setActiveCategory] = useState("project-management");
  const [expandedCommand, setExpandedCommand] = useState<string | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(text);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const currentCategory = commandCategories.find(cat => cat.id === activeCategory);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
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
              <button 
                onClick={() => scrollToSection("hero")}
                className={`text-gray-600 hover:text-gray-900 transition-colors ${activeSection === "hero" ? "text-gray-900" : ""}`}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection("features")}
                className={`text-gray-600 hover:text-gray-900 transition-colors ${activeSection === "features" ? "text-gray-900" : ""}`}
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection("commands")}
                className={`text-gray-600 hover:text-gray-900 transition-colors ${activeSection === "commands" ? "text-gray-900" : ""}`}
              >
                Commands
              </button>
              <a 
                href="/docs"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Docs
              </a>
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
      <section id="hero" className="relative py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-6">
              <Github className="h-4 w-4 mr-2" />
              Open Source CLI Tool
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              The open source CLI that
              <span className="block text-gray-600">manages your entire dev life</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              DevOS CLI is the complete development toolkit with project automation, session tracking, 
              environment management, AI-powered analysis, and team collaboration—no PATH modifications required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 text-lg" asChild>
                <a href="https://pypi.org/project/devos-cli/" target="_blank" rel="noopener noreferrer">
                  <Package className="mr-2 h-5 w-5" />
                  Install on PyPI
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900 px-8 py-3 text-lg" asChild>
                <a href="https://github.com/johndansu/DevOs_Cli" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  View on GitHub
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {metrics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              No PATH Modifications Required
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              DevOS CLI works without cluttering your PATH. Choose the installation method that fits your workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-gray-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-gray-600" />
                </div>
                <CardTitle className="text-xl">Python Package</CardTitle>
                <CardDescription>
                  Install as a Python package without PATH changes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 mb-4 font-mono text-sm">
                  <div className="text-green-400"># Install in project</div>
                  <div className="text-white">pip install devos-cli</div>
                  <div className="text-gray-400 mt-2"># Run with python -m</div>
                  <div className="text-white">python -m devos init</div>
                </div>
                <p className="text-gray-600 text-sm">
                  Works in any Python environment without touching your system PATH.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Download className="h-6 w-6 text-gray-600" />
                </div>
                <CardTitle className="text-xl">Standalone Binary</CardTitle>
                <CardDescription>
                  Download and run without installation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 mb-4 font-mono text-sm">
                  <div className="text-green-400"># Download and run</div>
                  <div className="text-white">curl -L devos.dev/install | bash</div>
                  <div className="text-gray-400 mt-2"># Or download directly</div>
                  <div className="text-white">./devos init</div>
                </div>
                <p className="text-gray-600 text-sm">
                  Self-contained binary that runs from any directory.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-gray-600" />
                </div>
                <CardTitle className="text-xl">Development Mode</CardTitle>
                <CardDescription>
                  Clone and run from source code
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 mb-4 font-mono text-sm">
                  <div className="text-green-400"># Clone and run</div>
                  <div className="text-white">git clone github.com/yourname/devos</div>
                  <div className="text-gray-400 mt-2"># Run directly</div>
                  <div className="text-white">cd devos && python devos.py init</div>
                </div>
                <p className="text-gray-600 text-sm">
                  Perfect for contributors and custom modifications.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Shield className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="text-yellow-800 font-medium">
                No system-wide installation required. Runs exactly where you need it.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need in one CLI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From project setup to AI-powered analysis, DevOS CLI provides a complete development toolkit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal Demo */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Powerful CLI commands in action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple commands that leverage advanced features for maximum productivity
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm">
              <div className="flex items-center mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="ml-4 text-gray-400">devos@terminal</div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <span className="text-gray-500">$</span> <span className="text-green-400">devos init python-api</span>
                </div>
                <div className="text-blue-400">✓ Creating project structure...</div>
                <div className="text-blue-400">✓ Installing dependencies...</div>
                <div className="text-blue-400">✓ Setting up environment...</div>
                <div className="text-green-400">✨ Project ready! Run 'cd python-api && devos dev'</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-6">
              <Github className="h-4 w-4 mr-2" />
              100% Open Source
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Built in the Open
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              DevOS CLI is proudly open source. Inspect the code, contribute features, or fork it for your own needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-gray-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Github className="h-6 w-6 text-gray-600" />
                </div>
                <CardTitle className="text-xl">View Source Code</CardTitle>
                <CardDescription>
                  Explore our complete codebase on GitHub
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Every line of code is publicly available for review, learning, and contribution.
                </p>
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:border-gray-400" asChild>
                  <a href="https://github.com/johndansu/DevOs_Cli" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Visit Repository
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-gray-600" />
                </div>
                <CardTitle className="text-xl">Community Driven</CardTitle>
                <CardDescription>
                  Shaped by developers like you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Join our community of contributors building the future of development tools.
                </p>
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:border-gray-400">
                  <Users className="mr-2 h-4 w-4" />
                  Join Community
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-gray-600" />
                </div>
                <CardTitle className="text-xl">Contribute</CardTitle>
                <CardDescription>
                  Help us make DevOS even better
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Submit pull requests, report issues, or suggest new features.
                </p>
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:border-gray-400">
                  <Code className="mr-2 h-4 w-4" />
                  Start Contributing
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Commands Section */}
      <section id="commands" className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Complete Command Reference
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about DevOS CLI commands, options, and usage
            </p>
          </div>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {commandCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg border transition-all ${
                  activeCategory === category.id
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900"
                }`}
              >
                {category.icon}
                <span className="ml-2 font-medium">{category.title}</span>
              </button>
            ))}
          </div>

          {/* Category Description */}
          {currentCategory && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-300">
                {currentCategory.icon}
                <span className="ml-2 text-gray-700">{currentCategory.description}</span>
              </div>
            </div>
          )}

          {/* Commands */}
          <div className="space-y-8">
            {currentCategory && (
              <div className="space-y-8">
                {currentCategory.commands.map((command, index) => (
                  <Card key={index} className="border-gray-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Terminal className="h-5 w-5 text-gray-700" />
                          </div>
                          <div>
                            <CardTitle className="text-xl font-mono text-gray-900">
                              {command.name}
                            </CardTitle>
                            <CardDescription className="text-gray-600">
                              {command.description}
                            </CardDescription>
                          </div>
                        </div>
                        <button
                          onClick={() => setExpandedCommand(expandedCommand === command.name ? null : command.name)}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${
                            expandedCommand === command.name ? "rotate-180" : ""
                          }`} />
                        </button>
                      </div>
                    </CardHeader>
                    
                    {expandedCommand === command.name && (
                      <CardContent className="space-y-6">
                        {/* Usage Examples */}
                        <div>
                          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            DevOS CLI
                            <span className="block text-2xl sm:text-3xl text-blue-600 mt-2">
                              AI-Powered Development Assistant
                            </span>
                          </h1>
                          <div className="space-y-2">
                            {command.usage.map((usage, usageIndex) => (
                              <div key={usageIndex} className="flex items-center justify-between bg-gray-900 rounded-lg p-4">
                                <code className="text-green-400 font-mono text-sm">{usage}</code>
                                <button
                                  onClick={() => copyToClipboard(usage)}
                                  className="p-2 rounded hover:bg-gray-800 transition-colors"
                                >
                                  {copiedCommand === usage ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Copy className="h-4 w-4 text-gray-400" />
                                  )}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Options */}
                        {command.options && command.options.length > 0 && (
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                              <Settings className="h-5 w-5 mr-2 text-blue-600" />
                              Options
                            </h4>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <div className="space-y-2">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm font-medium text-gray-700 border-b border-gray-200 pb-2">
                                  <div>Option</div>
                                  <div>Short</div>
                                  <div>Description</div>
                                </div>
                                {command.options.map((option, optIndex) => (
                                  <div key={optIndex} className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                      <code className="text-blue-600">{option.flag}</code>
                                    </div>
                                    <div>
                                      <code className="text-purple-600">{option.short ?? '-'}</code>
                                    </div>
                                    <div className="text-gray-600">{option.description}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Arguments */}
                        {command.arguments && command.arguments.length > 0 && (
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                              <FileText className="h-5 w-5 mr-2 text-blue-600" />
                              Arguments
                            </h4>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <div className="space-y-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium text-gray-700 border-b border-gray-200 pb-2">
                                  <div>Argument</div>
                                  <div>Description</div>
                                </div>
                                {command.arguments.map((arg, argIndex) => (
                                  <div key={argIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <code className="text-orange-600">{arg.name}</code>
                                    </div>
                                    <div className="text-gray-600">{arg.description}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Templates */}
                        {"templates" in command && command.templates && (
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                              <Package className="h-5 w-5 mr-2 text-blue-600" />
                              Available Templates
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {command.templates.map((template, templateIndex) => (
                                <span
                                  key={templateIndex}
                                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                >
                                  {template}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Built with modern technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powered by the latest and greatest in development tools
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {techStack.map((tech, index) => (
              <div key={index} className="flex items-center space-x-2 text-gray-600">
                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                  {tech.icon}
                </div>
                <span className="font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Section - Commented Out */}
      {/* 
      <section id="docs" className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Documentation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to get started with DevOS CLI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-gray-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-gray-600" />
                </div>
                <CardTitle className="text-xl">Getting Started</CardTitle>
                <CardDescription>
                  Quick start guide and installation instructions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">Installation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">First project setup</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">Basic configuration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">Common workflows</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 border-gray-300 text-gray-700 hover:border-gray-400">
                  Read Guide
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-gray-600" />
                </div>
                <CardTitle className="text-xl">API Reference</CardTitle>
                <CardDescription>
                  Complete API documentation and examples
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">Command reference</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">Option parameters</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">Return values</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">Error handling</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 border-gray-300 text-gray-700 hover:border-gray-400">
                  View API
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Terminal className="h-6 w-6 text-gray-600" />
                </div>
                <CardTitle className="text-xl">Tutorials</CardTitle>
                <CardDescription>
                  Step-by-step tutorials and best practices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">Project setup</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">Session tracking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">Environment management</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">Release workflow</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 border-gray-300 text-gray-700 hover:border-gray-400">
                  Browse Tutorials
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Quick Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">Installation</h4>
                <p className="text-gray-600 text-sm mb-4">Install DevOS CLI on your system</p>
                <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">Install →</a>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">Configuration</h4>
                <p className="text-gray-600 text-sm mb-4">Configure DevOS for your workflow</p>
                <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">Configure →</a>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">Troubleshooting</h4>
                <p className="text-gray-600 text-sm mb-4">Common issues and solutions</p>
                <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">Troubleshoot →</a>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">Community</h4>
                <p className="text-gray-600 text-sm mb-4">Get help from the community</p>
                <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">Join →</a>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Code Examples</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="ml-4 text-gray-400 text-sm">bash</div>
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div className="text-green-400"># Install DevOS CLI</div>
                  <div className="text-white">curl -sSL https://devos.dev/install | bash</div>
                  <div className="text-gray-400 mt-4"># Initialize a new project</div>
                  <div className="text-white">devos init python-api</div>
                  <div className="text-gray-400 mt-4"># Start tracking</div>
                  <div className="text-white">devos track start</div>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="ml-4 text-gray-400 text-sm">python</div>
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div className="text-green-400"># Set environment variables</div>
                  <div className="text-white">import os</div>
                  <div className="text-white">from devos import env</div>
                  <div className="text-gray-400 mt-4"># Get database URL</div>
                  <div className="text-white">db_url = env.get('DATABASE_URL')</div>
                  <div className="text-gray-400 mt-4"># Use in your app</div>
                  <div className="text-white">engine = create_engine(db_url)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* CTA */}
      <section className="py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of developers using our open source CLI to build better software
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 text-lg">
              <Download className="mr-2 h-5 w-5" />
              Download Now
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900 px-8 py-3 text-lg">
              <Github className="mr-2 h-5 w-5" />
              View on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Terminal className="h-5 w-5 text-gray-900" />
                </div>
                <span className="text-xl font-bold">DevOS</span>
              </div>
              <p className="text-gray-400">Open-source development workflow automation for everyone.</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
                <a href="#commands" className="text-gray-600 hover:text-gray-900 transition-colors">Commands</a>
                <a href="/docs" className="text-gray-600 hover:text-gray-900 transition-colors">Documentation</a>
                <a href="#installation" className="text-gray-600 hover:text-gray-900 transition-colors">Installation</a>
                <a href="https://github.com/johndansu/DevOs_Cli" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              </div>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">Documentation</a>
                <a href="#" className="block hover:text-white transition-colors">Command Reference</a>
                <a href="#" className="block hover:text-white transition-colors">GitHub Wiki</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">Documentation</a>
                <a href="#" className="block hover:text-white transition-colors">Command Reference</a>
                <a href="#" className="block hover:text-white transition-colors">GitHub Wiki</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">Contributing</a>
                <a href="#" className="block hover:text-white transition-colors">Issues</a>
                <a href="#" className="block hover:text-white transition-colors">Discussions</a>
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
