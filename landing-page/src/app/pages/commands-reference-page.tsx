"use client";
import React, { useState } from "react";
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
  Database,
  GitBranch,
  Activity,
  FileText,
  Settings,
  Copy,
  ChevronDown,
  ChevronRight
} from "lucide-react";

const commandCategories = [
  {
    id: "project-management",
    title: "Project Management",
    icon: <Package className="h-5 w-5" />,
    description: "Initialize and manage projects with templates",
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
      },
      {
        name: "devos env generate-example",
        description: "Generate .env.example file",
        usage: [
          "devos env generate-example",
          "devos env generate-example --output .env.example",
          "devos env generate-example --project my-project"
        ],
        options: [
          { flag: "--project", short: "-p", description: "Project name or path" },
          { flag: "--output", short: "-o", description: "Output file path (default: .env.example)" }
        ]
      },
      {
        name: "devos env export",
        description: "Export environment variables for shell",
        usage: [
          "devos env export bash",
          "devos env export powershell",
          "devos env export fish --project my-project"
        ],
        options: [
          { flag: "--project", short: "-p", description: "Project name or path" },
          { flag: "--shell", description: "Shell type: bash, zsh, fish, powershell" }
        ]
      }
    ]
  },
  {
    id: "reports",
    title: "Reports",
    icon: <FileText className="h-5 w-5" />,
    description: "Generate productivity and project reports",
    commands: [
      {
        name: "devos report weekly",
        description: "Generate weekly productivity report",
        usage: [
          "devos report weekly",
          "devos report weekly --project my-project",
          "devos report weekly --format markdown",
          "devos report weekly --output weekly-report.md"
        ],
        options: [
          { flag: "--project", short: "-p", description: "Filter by project name or path" },
          { flag: "--format", short: "-f", description: "Output format: table, json, markdown (default: table)" },
          { flag: "--output", short: "-o", description: "Output file path" }
        ]
      },
      {
        name: "devos report summary",
        description: "Generate summary report for a time period",
        usage: [
          "devos report summary",
          "devos report summary --days 60",
          "devos report summary --project my-project",
          "devos report summary --format json"
        ],
        options: [
          { flag: "--project", short: "-p", description: "Filter by project name or path" },
          { flag: "--days", short: "-d", description: "Number of days to include (default: 30)" },
          { flag: "--format", short: "-f", description: "Output format: table, json, markdown (default: table)" },
          { flag: "--output", short: "-o", description: "Output file path" }
        ]
      },
      {
        name: "devos report projects",
        description: "Generate project breakdown report",
        usage: [
          "devos report projects",
          "devos report projects --format markdown",
          "devos report projects --output projects.md"
        ],
        options: [
          { flag: "--format", short: "-f", description: "Output format: table, json, markdown (default: table)" },
          { flag: "--output", short: "-o", description: "Output file path" }
        ]
      }
    ]
  },
  {
    id: "release-management",
    title: "Release Management",
    icon: <Rocket className="h-5 w-5" />,
    description: "Manage releases and versioning",
    commands: [
      {
        name: "devos ship release",
        description: "Create a new release with semantic versioning",
        usage: [
          "devos ship release patch",
          "devos ship release minor",
          "devos ship release major",
          "devos ship release patch --dry-run",
          "devos ship release patch --no-changelog",
          "devos ship release minor --custom-message \"Add new features\""
        ],
        arguments: [
          { name: "version_type", description: "patch, minor, or major" }
        ],
        options: [
          { flag: "--dry-run", description: "Show what would be done without executing" },
          { flag: "--no-changelog", description: "Skip changelog generation" },
          { flag: "--custom-message", description: "Custom release message" }
        ]
      },
      {
        name: "devos ship changelog",
        description: "Generate changelog from git commits",
        usage: [
          "devos ship changelog",
          "devos ship changelog --since v1.0.0",
          "devos ship changelog --format json",
          "devos ship changelog --output CHANGELOG.md"
        ],
        options: [
          { flag: "--since", description: "Git reference (tag, commit, etc.)" },
          { flag: "--format", description: "Output format: markdown or json (default: markdown)" },
          { flag: "--output", short: "-o", description: "Output file path" }
        ]
      },
      {
        name: "devos ship version",
        description: "Show current version",
        usage: [
          "devos ship version"
        ],
        options: []
      }
    ]
  }
];

const globalOptions = [
  { flag: "--help", short: "-h", description: "Show help message" },
  { flag: "--version", short: "-V", description: "Show version and exit" }
];

export default function CommandsReferencePage() {
  const [activeCategory, setActiveCategory] = useState("project-management");
  const [expandedCommand, setExpandedCommand] = useState<string | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(text);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const currentCategory = commandCategories.find(cat => cat.id === activeCategory);

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
                <span className="text-xl font-semibold text-gray-900">DevOS Commands</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
              <a href="#docs" className="text-gray-600 hover:text-gray-900 transition-colors">Docs</a>
              <a href="#github" className="text-gray-600 hover:text-gray-900 transition-colors">GitHub</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                <Github className="h-4 w-4 mr-2" />
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Complete Command Reference
            </h1>
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
        </div>
      </section>

      {/* Commands */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Code className="h-5 w-5 mr-2 text-blue-600" />
                          Usage Examples
                        </h4>
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
                                    <code className="text-purple-600">{'short' in option ? option.short : '-'}</code>
                                  </div>
                                  <div className="text-gray-600 md:col-span-2">{option.description}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Arguments */}
                      {'arguments' in command && command.arguments && command.arguments.length > 0 && (
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
                              {('arguments' in command ? command.arguments : []).map((arg: any, argIndex: number) => (
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
                      {'templates' in command && command.templates && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                            <Package className="h-5 w-5 mr-2 text-blue-600" />
                            Available Templates
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {('templates' in command ? command.templates : []).map((template: any, templateIndex: number) => (
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
      </section>

      {/* Global Options */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Global Options
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These options are available with all DevOS commands
            </p>
          </div>

          <Card className="border-gray-200 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Available with all commands
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-medium text-gray-700 border-b border-gray-200 pb-2">
                  <div>Option</div>
                  <div>Short</div>
                  <div>Description</div>
                </div>
                {globalOptions.map((option, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <code className="text-blue-600">{option.flag}</code>
                    </div>
                    <div>
                      <code className="text-purple-600">{option.short}</code>
                    </div>
                    <div className="text-gray-600">{option.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>© 2024 DevOS CLI. Complete command reference.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
