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
  ChevronRight,
  Package,
  Activity,
  Monitor
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
        name: "python -m devos ai security-scan",
        description: "Comprehensive security vulnerability scan",
        usage: [
          "python -m devos ai security-scan",
          "python -m devos ai security-scan --severity high",
          "python -m devos ai security-scan --export-md security.md"
        ],
        options: [
          { flag: "--severity", description: "Filter by severity (low, medium, high, critical)" },
          { flag: "--export-md", description: "Export results to Markdown file" },
          { flag: "--model", description: "AI model to use" }
        ]
      },
      {
        name: "python -m devos ai analyze",
        description: "Analyze project with deep AI understanding",
        usage: [
          "python -m devos ai analyze \"comprehensive project review\"",
          "python -m devos ai analyze --focus security",
          "python -m devos ai analyze --export-md analysis.md"
        ],
        options: [
          { flag: "--focus", description: "Focus area: security, architecture, performance, all" },
          { flag: "--scope", description: "Analysis scope: file, directory, project" },
          { flag: "--export-md", description: "Export results to Markdown" }
        ]
      },
      {
        name: "python -m devos ai architecture-map",
        description: "Generate comprehensive project architecture map",
        usage: [
          "python -m devos ai architecture-map",
          "python -m devos ai architecture-map --patterns mvc"
        ],
        options: [
          { flag: "--patterns", description: "Architecture patterns to analyze" },
          { flag: "--export-md", description: "Export architecture map" }
        ]
      },
      {
        name: "python -m devos ai review",
        description: "AI-powered code review",
        usage: [
          "python -m devos ai review main.py",
          "python -m devos ai review --directory src/"
        ],
        options: [
          { flag: "--directory", short: "-d", description: "Review entire directory" },
          { flag: "--strict", description: "Enable strict review mode" }
        ]
      },
      {
        name: "python -m devos ai refactor",
        description: "AI-powered code refactoring suggestions",
        usage: [
          "python -m devos ai refactor old_function.py",
          "python -m devos ai refactor --suggestions-only"
        ],
        options: [
          { flag: "--suggestions-only", description: "Show suggestions without applying" },
          { flag: "--backup", description: "Create backup before refactoring" }
        ]
      },
      {
        name: "python -m devos ai debug",
        description: "AI-powered debugging assistance",
        usage: [
          "python -m devos ai debug main.py --line 25",
          "python -m devos ai debug --error traceback.log"
        ],
        options: [
          { flag: "--line", short: "-l", description: "Specific line to debug" },
          { flag: "--error", description: "Error file to analyze" }
        ]
      },
      {
        name: "python -m devos ai enhance",
        description: "Enhance codebase with AI-driven improvements",
        usage: [
          "python -m devos ai enhance",
          "python -m devos ai enhance --focus performance"
        ],
        options: [
          { flag: "--focus", description: "Enhancement focus: performance, security, readability" }
        ]
      },
      {
        name: "python -m devos ai generate",
        description: "Generate code with project context",
        usage: [
          "python -m devos ai generate \"REST API endpoint\"",
          "python -m devos ai generate --template class"
        ],
        options: [
          { flag: "--template", description: "Code template to use" },
          { flag: "--language", description: "Programming language" }
        ]
      },
      {
        name: "python -m devos ai project-summary",
        description: "Get comprehensive project summary with AI insights",
        usage: [
          "python -m devos ai project-summary",
          "python -m devos ai project-summary --export-md summary.md"
        ],
        options: [
          { flag: "--export-md", description: "Export summary to Markdown" },
          { flag: "--detailed", description: "Include detailed analysis" }
        ]
      },
      {
        name: "python -m devos ai suggest",
        description: "Get contextual AI suggestions",
        usage: [
          "python -m devos ai suggest \"optimize this function\"",
          "python -m devos ai suggest --context testing"
        ],
        options: [
          { flag: "--context", description: "Suggestion context" }
        ]
      },
      {
        name: "python -m devos ai test",
        description: "AI-powered test generation",
        usage: [
          "python -m devos ai test mymodule.py",
          "python -m devos ai test --framework pytest"
        ],
        options: [
          { flag: "--framework", description: "Test framework: pytest, unittest" },
          { flag: "--coverage", description: "Generate coverage tests" }
        ]
      },
      {
        name: "python -m devos ai explain",
        description: "AI-powered code explanation",
        usage: [
          "python -m devos ai explain function.py",
          "python -m devos ai explain --line 25"
        ],
        options: [
          { flag: "--line", short: "-l", description: "Specific line to explain" },
          { flag: "--detail", description: "Detailed explanation" }
        ]
      },
      {
        name: "python -m devos ai example",
        description: "Generate code examples",
        usage: [
          "python -m devos ai example myapi.py",
          "python -m devos ai example --usage-patterns"
        ],
        options: [
          { flag: "--usage-patterns", description: "Include usage patterns" }
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
          { flag: "--history", description: "Load previous chat history" }
        ]
      },
      {
        name: "python -m devos ai-fast",
        description: "Fast AI assistance using Groq",
        usage: [
          "python -m devos ai-fast \"review this code\"",
          "python -m devos ai-fast explain function.py"
        ],
        options: [
          { flag: "--model", description: "Groq model to use" },
          { flag: "--quick", description: "Skip deep analysis" }
        ]
      },
      {
        name: "python -m devos ai-quick",
        description: "Ultra-fast AI assistance without deep project analysis",
        usage: [
          "python -m devos ai-quick \"create a function\"",
          "python -m devos ai-quick --no-context"
        ],
        options: [
          { flag: "--no-context", description: "Skip project context" }
        ]
      },
      {
        name: "python -m devos quick-ai",
        description: "Ultra-fast AI assistance without deep project analysis (alias for ai-quick)",
        usage: [
          "python -m devos quick-ai \"create a function\"",
          "python -m devos quick-ai --no-context"
        ],
        options: [
          { flag: "--no-context", description: "Skip project context" }
        ]
      },
      {
        name: "python -m devos ai-interactive-chat",
        description: "Start interactive AI chat with project context",
        usage: [
          "python -m devos ai-interactive-chat",
          "python -m devos ai-interactive-chat --context security"
        ],
        options: [
          { flag: "--context", description: "Chat context: security, architecture, performance" },
          { flag: "--history", description: "Load previous chat history" },
          { flag: "--save", description: "Save chat session" }
        ]
      },
      {
        name: "python -m devos groq",
        description: "Groq-specific fast AI commands",
        usage: [
          "python -m devos groq \"review this code\" main.py",
          "python -m devos groq explain function.py",
          "python -m devos groq chat"
        ],
        options: [
          { flag: "--model", short: "-m", description: "Groq model to use" },
          { flag: "--temp", description: "Temperature (0.0-1.0)" },
          { flag: "--max-tokens", description: "Maximum tokens" },
          { flag: "--file", short: "-f", description: "Include file context" },
          { flag: "--quick", description: "Skip deep analysis" }
        ]
      },
      {
        name: "python -m devos ai-config",
        description: "Manage AI configuration and providers",
        usage: [
          "python -m devos ai-config show",
          "python -m devos ai-config set-api-key groq",
          "python -m devos ai-config test-connection groq"
        ],
        options: [
          { flag: "show-config", description: "Show current AI configuration" },
          { flag: "set-api-key", description: "Set API key for provider" },
          { flag: "list-providers", description: "List available AI providers" },
          { flag: "test-connection", description: "Test provider connection" },
          { flag: "clear-cache", description: "Clear AI response cache" },
          { flag: "usage-stats", description: "Show AI usage statistics" }
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
        name: "python -m devos now",
        description: "Quick start tracking current project",
        usage: [
          "python -m devos now"
        ]
      },
      {
        name: "python -m devos done",
        description: "Quick stop current tracking session",
        usage: [
          "python -m devos done"
        ]
      },
      {
        name: "python -m devos status",
        description: "Quick status overview",
        usage: [
          "python -m devos status"
        ]
      },
      {
        name: "python -m devos today",
        description: "Show today's tracking summary",
        usage: [
          "python -m devos today"
        ]
      },
      {
        name: "python -m devos setup",
        description: "Quick setup wizard for new users",
        usage: [
          "python -m devos setup"
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
        name: "python -m devos init",
        description: "Initialize a new project with templates",
        usage: [
          "python -m devos init",
          "python -m devos init python-api",
          "python -m devos init --name my-project --language python --path ./my-project"
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
        name: "python -m devos create",
        description: "Initialize a new project with templates",
        usage: [
          "python -m devos create my-project",
          "python -m devos create --template python-api"
        ],
        options: [
          { flag: "--template", description: "Project template to use" },
          { flag: "--name", description: "Project name" }
        ]
      },
      {
        name: "python -m devos new",
        description: "Initialize a new project with templates",
        usage: [
          "python -m devos new my-project",
          "python -m devos new --template python-api"
        ],
        options: [
          { flag: "--template", description: "Project template to use" },
          { flag: "--name", description: "Project name" }
        ]
      },
      {
        name: "python -m devos projects",
        description: "Quick list of all projects",
        usage: [
          "python -m devos projects",
          "python -m devos projects --active"
        ],
        options: [
          { flag: "--active", description: "Show only active projects" },
          { flag: "--recent", description: "Show recent projects" }
        ]
      },
      {
        name: "python -m devos project add",
        description: "Add an existing project to DevOS management",
        usage: [
          "python -m devos project add my-project",
          "python -m devos project add --path ./my-project --language python",
          "python -m devos project add --type web --description \"My web app\""
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
        name: "python -m devos project list",
        description: "List all managed projects",
        usage: [
          "python -m devos project list",
          "python -m devos project list --type web",
          "python -m devos project list --status active",
          "python -m devos project list --format json"
        ],
        options: [
          { flag: "--type", short: "-t", description: "Filter by project type" },
          { flag: "--status", short: "-s", description: "Filter by status" },
          { flag: "--format", short: "-f", description: "Output format: table or json" }
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
        name: "python -m devos track start",
        description: "Start a new work session",
        usage: [
          "python -m devos track start",
          "python -m devos track start --notes \"Working on authentication\"",
          "python -m devos track start --project my-project"
        ],
        options: [
          { flag: "--project", short: "-p", description: "Project name or path" },
          { flag: "--notes", short: "-n", description: "Session notes" },
          { flag: "--tags", short: "-t", description: "Session tags" }
        ]
      },
      {
        name: "python -m devos track stop",
        description: "Stop the current work session",
        usage: [
          "python -m devos track stop",
          "python -m devos track stop --notes \"Completed auth module\""
        ],
        options: [
          { flag: "--notes", short: "-n", description: "Session notes" }
        ]
      },
      {
        name: "python -m devos track status",
        description: "Show current tracking status and recent sessions",
        usage: [
          "python -m devos track status",
          "python -m devos track status --project my-project",
          "python -m devos track status --limit 10"
        ],
        options: [
          { flag: "--project", short: "-p", description: "Filter by project name or path" },
          { flag: "--limit", short: "-l", description: "Number of sessions to show (default: 20)" }
        ]
      },
      {
        name: "python -m devos track list",
        description: "List tracking sessions",
        usage: [
          "python -m devos track list",
          "python -m devos track list --project my-project",
          "python -m devos track list --format json",
          "python -m devos track list --limit 50"
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
        name: "python -m devos env set",
        description: "Set an environment variable (encrypted)",
        usage: [
          "python -m devos env set DATABASE_URL postgresql://...",
          "python -m devos env set API_KEY your-api-key --encrypt",
          "python -m devos env set DEBUG true --project my-project"
        ],
        options: [
          { flag: "--encrypt", short: "-e", description: "Encrypt the variable value" },
          { flag: "--project", short: "-p", description: "Set for specific project" },
          { flag: "--global", short: "-g", description: "Set globally for all projects" }
        ]
      },
      {
        name: "python -m devos env get",
        description: "Get an environment variable value",
        usage: [
          "python -m devos env get DATABASE_URL",
          "python -m devos env get API_KEY --decrypt",
          "python -m devos env get --all"
        ],
        options: [
          { flag: "--decrypt", short: "-d", description: "Decrypt encrypted variable" },
          { flag: "--all", short: "-a", description: "Show all environment variables" },
          { flag: "--project", short: "-p", description: "Get from specific project" }
        ]
      },
      {
        name: "python -m devos env list",
        description: "List all environment variables",
        usage: [
          "python -m devos env list",
          "python -m devos env list --project my-project",
          "python -m devos env list --encrypted-only"
        ],
        options: [
          { flag: "--project", short: "-p", description: "List for specific project" },
          { flag: "--encrypted-only", description: "Show only encrypted variables" },
          { flag: "--format", description: "Output format: table or json" }
        ]
      },
      {
        name: "python -m devos env remove",
        description: "Remove an environment variable",
        usage: [
          "python -m devos env remove DATABASE_URL",
          "python -m devos env remove API_KEY --project my-project"
        ],
        options: [
          { flag: "--project", short: "-p", description: "Remove from specific project" },
          { flag: "--global", short: "-g", description: "Remove global variable" }
        ]
      },
      {
        name: "python -m devos env export",
        description: "Export environment variables to file",
        usage: [
          "python -m devos env export .env",
          "python -m devos env export --format json",
          "python -m devos env export --no-decrypt"
        ],
        options: [
          { flag: "--format", description: "Export format: env, json, yaml" },
          { flag: "--no-decrypt", description: "Don't decrypt encrypted variables" },
          { flag: "--project", short: "-p", description: "Export from specific project" }
        ]
      },
      {
        name: "python -m devos env import",
        description: "Import environment variables from file",
        usage: [
          "python -m devos env import .env",
          "python -m devos env import config.json --format json",
          "python -m devos env import --encrypt-all"
        ],
        options: [
          { flag: "--format", description: "Import format: env, json, yaml" },
          { flag: "--encrypt-all", description: "Encrypt all imported variables" },
          { flag: "--merge", description: "Merge with existing variables" }
        ]
      },
      {
        name: "python -m devos environment",
        description: "Environment variable management (alias for env)",
        usage: [
          "python -m devos environment set KEY value",
          "python -m devos environment list"
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
        name: "python -m devos config show",
        description: "Show current configuration",
        usage: [
          "python -m devos config show",
          "python -m devos config show --global"
        ],
        options: [
          { flag: "--global", description: "Show global configuration" }
        ]
      },
      {
        name: "python -m devos config set",
        description: "Set a configuration value",
        usage: [
          "python -m devos config set default_language python",
          "python -m devos config set tracking.auto_git true --global"
        ],
        options: [
          { flag: "--global", description: "Set global configuration" }
        ]
      },
      {
        name: "python -m devos settings",
        description: "Manage DevOS settings (alias for config)",
        usage: [
          "python -m devos settings show",
          "python -m devos settings set key value"
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
        name: "python -m devos interactive",
        description: "Start interactive mode with guided workflows",
        usage: [
          "python -m devos interactive",
          "python -m devos i",
          "python -m devos wizard"
        ]
      },
      {
        name: "python -m devos i",
        description: "Start interactive mode (alias for interactive)",
        usage: [
          "python -m devos i"
        ]
      },
      {
        name: "python -m devos wizard",
        description: "Start interactive mode with guided workflows",
        usage: [
          "python -m devos wizard"
        ]
      },
      {
        name: "python -m devos setup",
        description: "Quick setup wizard for new users",
        usage: [
          "python -m devos setup"
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
        name: "python -m devos completion",
        description: "Generate or install shell completion",
        usage: [
          "python -m devos completion bash",
          "python -m devos completion bash --install"
        ],
        options: [
          { flag: "--install", description: "Install completion to shell config" }
        ]
      },
      {
        name: "python -m devos setup-completion",
        description: "Setup shell completion interactively",
        usage: [
          "python -m devos setup-completion"
        ]
      },
      {
        name: "python -m devos shells",
        description: "List available shells for completion",
        usage: [
          "python -m devos shells"
        ]
      }
    ]
  },
  {
    id: "utility-commands",
    title: "Utility Commands",
    icon: <Activity className="h-5 w-5" />,
    description: "Additional utility and helper commands",
    commands: [
      {
        name: "python -m devos recent",
        description: "Show recent activity or run recent command",
        usage: [
          "python -m devos recent",
          "python -m devos recent --run",
          "python -m devos recent --limit 5"
        ],
        options: [
          { flag: "--run", description: "Run the most recent command" },
          { flag: "--limit", description: "Number of recent items to show" }
        ]
      },
      {
        name: "python -m devos r",
        description: "Show recent activity (alias for recent)",
        usage: [
          "python -m devos r",
          "python -m devos r --run"
        ]
      },
      {
        name: "python -m devos report",
        description: "Generate reports and analytics",
        usage: [
          "python -m devos report",
          "python -m devos report --export-md report.md",
          "python -m devos report --period weekly"
        ],
        options: [
          { flag: "--export-md", description: "Export report to Markdown" },
          { flag: "--period", description: "Report period: daily, weekly, monthly" }
        ]
      },
      {
        name: "python -m devos stats",
        description: "Show statistics and analytics",
        usage: [
          "python -m devos stats",
          "python -m devos stats --project my-project"
        ],
        options: [
          { flag: "--project", description: "Show stats for specific project" }
        ]
      },
      {
        name: "python -m devos time",
        description: "Time tracking and reporting",
        usage: [
          "python -m devos time",
          "python -m devos time --today",
          "python -m devos time --export"
        ],
        options: [
          { flag: "--today", description: "Show today's time" },
          { flag: "--export", description: "Export time data" }
        ]
      },
      {
        name: "python -m devos test",
        description: "Run tests and test-related commands",
        usage: [
          "python -m devos test",
          "python -m devos test --coverage",
          "python -m devos test --watch"
        ],
        options: [
          { flag: "--coverage", description: "Run with coverage" },
          { flag: "--watch", description: "Watch mode for tests" }
        ]
      },
      {
        name: "python -m devos t",
        description: "Run tests (alias for test)",
        usage: [
          "python -m devos t",
          "python -m devos t --coverage"
        ]
      },
      {
        name: "python -m devos c",
        description: "Configuration commands (alias for config)",
        usage: [
          "python -m devos c show",
          "python -m devos c set key value"
        ]
      },
      {
        name: "python -m devos e",
        description: "Environment commands (alias for env)",
        usage: [
          "python -m devos e list",
          "python -m devos e set KEY value"
        ]
      },
      {
        name: "python -m devos pm",
        description: "Project management (alias for project)",
        usage: [
          "python -m devos pm list",
          "python -m devos pm add my-project"
        ]
      },
      {
        name: "python -m devos proj",
        description: "Project management (alias for project)",
        usage: [
          "python -m devos proj list",
          "python -m devos proj add my-project"
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
