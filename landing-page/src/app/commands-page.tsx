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
  Sparkles,
  ArrowRight,
  CheckCircle,
  Code,
  Package,
  Lock,
  Rocket,
  Star,
  TrendingUp,
  Play,
  Pause,
  Square,
  FileText,
  Settings,
  Database,
  GitBranch,
  Clock,
  Hash,
  Folder,
  Server
} from "lucide-react";

const commandCategories = [
  {
    title: "Project Management",
    icon: <Folder className="h-6 w-6" />,
    gradient: "from-blue-500 to-cyan-500",
    commands: [
      {
        command: "devos init",
        description: "Initialize a new project with templates",
        usage: [
          "devos init",
          "devos init python-api",
          "devos init --name my-project --language python"
        ],
        options: [
          { flag: "--name", short: "-n", desc: "Project name" },
          { flag: "--path", short: "-p", desc: "Project path" },
          { flag: "--language", short: "-l", desc: "Programming language" },
          { flag: "--interactive", short: "-i", desc: "Interactive mode" }
        ],
        templates: ["python-basic", "python-api", "python-cli", "javascript-basic", "javascript-api", "typescript-api", "go-basic", "rust-cli"]
      }
    ]
  },
  {
    title: "Session Tracking",
    icon: <Clock className="h-6 w-6" />,
    gradient: "from-green-500 to-emerald-500",
    commands: [
      {
        command: "devos track start",
        description: "Start a new work session",
        usage: [
          "devos track start",
          "devos track start --notes 'Working on auth'",
          "devos track start --project my-project"
        ],
        options: [
          { flag: "--project", short: "-p", desc: "Project name or path" },
          { flag: "--notes", short: "-n", desc: "Session notes" },
          { flag: "--tags", short: "-t", desc: "Session tags" }
        ]
      },
      {
        command: "devos track stop",
        description: "Stop current work session",
        usage: [
          "devos track stop",
          "devos track stop --notes 'Completed feature'"
        ],
        options: [
          { flag: "--notes", short: "-n", desc: "Completion notes" }
        ]
      },
      {
        command: "devos track status",
        description: "Show current session status",
        usage: ["devos track status"],
        options: []
      },
      {
        command: "devos track list",
        description: "List recent sessions",
        usage: [
          "devos track list",
          "devos track list --limit 10",
          "devos track list --project my-project"
        ],
        options: [
          { flag: "--limit", short: "-l", desc: "Number of sessions to show" },
          { flag: "--project", short: "-p", desc: "Filter by project" },
          { flag: "--date", short: "-d", desc: "Filter by date" }
        ]
      }
    ]
  },
  {
    title: "Environment Variables",
    icon: <Database className="h-6 w-6" />,
    gradient: "from-purple-500 to-pink-500",
    commands: [
      {
        command: "devos env set",
        description: "Set environment variable",
        usage: [
          "devos env set DATABASE_URL postgresql://...",
          "devos env set API_KEY secret123 --encrypt"
        ],
        options: [
          { flag: "--encrypt", short: "-e", desc: "Encrypt the value" },
          { flag: "--scope", short: "-s", desc: "Scope (global/project)" }
        ]
      },
      {
        command: "devos env get",
        description: "Get environment variable",
        usage: [
          "devos env get DATABASE_URL",
          "devos env get --all"
        ],
        options: [
          { flag: "--all", short: "-a", desc: "Show all variables" },
          { flag: "--decrypt", short: "-d", desc: "Decrypt encrypted values" }
        ]
      },
      {
        command: "devos env list",
        description: "List all environment variables",
        usage: [
          "devos env list",
          "devos env list --encrypted-only"
        ],
        options: [
          { flag: "--encrypted-only", short: "-e", desc: "Show only encrypted variables" }
        ]
      },
      {
        command: "devos env remove",
        description: "Remove environment variable",
        usage: ["devos env remove DATABASE_URL"],
        options: [
          { flag: "--force", short: "-f", desc: "Force removal without confirmation" }
        ]
      }
    ]
  },
  {
    title: "Reports",
    icon: <FileText className="h-6 w-6" />,
    gradient: "from-yellow-500 to-orange-500",
    commands: [
      {
        command: "devos report daily",
        description: "Generate daily report",
        usage: [
          "devos report daily",
          "devos report daily --date 2024-01-15"
        ],
        options: [
          { flag: "--date", short: "-d", desc: "Specific date" },
          { flag: "--format", short: "-f", desc: "Output format (json/table)" }
        ]
      },
      {
        command: "devos report weekly",
        description: "Generate weekly report",
        usage: [
          "devos report weekly",
          "devos report weekly --week 5"
        ],
        options: [
          { flag: "--week", short: "-w", desc: "Week number" },
          { flag: "--format", short: "-f", desc: "Output format" }
        ]
      },
      {
        command: "devos report summary",
        description: "Generate project summary",
        usage: [
          "devos report summary",
          "devos report summary --project my-project"
        ],
        options: [
          { flag: "--project", short: "-p", desc: "Specific project" },
          { flag: "--detailed", short: "-d", desc: "Detailed breakdown" }
        ]
      }
    ]
  },
  {
    title: "Release Management",
    icon: <GitBranch className="h-6 w-6" />,
    gradient: "from-red-500 to-rose-500",
    commands: [
      {
        command: "devos ship release",
        description: "Create and deploy release",
        usage: [
          "devos ship release",
          "devos ship release patch",
          "devos ship release --version 1.2.3"
        ],
        options: [
          { flag: "--version", short: "-v", desc: "Specific version" },
          { flag: "--dry-run", short: "-d", desc: "Preview changes" },
          { flag: "--force", short: "-f", desc: "Force release" }
        ]
      },
      {
        command: "devos ship version",
        description: "Bump version number",
        usage: [
          "devos ship version patch",
          "devos ship version minor",
          "devos ship version major"
        ],
        options: [
          { flag: "--pre", short: "-p", desc: "Pre-release version" },
          { flag: "--metadata", short: "-m", desc: "Build metadata" }
        ]
      }
    ]
  }
];

export default function CommandsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [expandedCommand, setExpandedCommand] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black">
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10 animate-pulse"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: Math.random() * 3 + 2 + 's'
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium mb-8 animate-bounce">
              <Terminal className="h-4 w-4 mr-2 text-yellow-400" />
              Complete Command Reference
              <Terminal className="h-4 w-4 ml-2 text-yellow-400" />
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                DevOS Commands
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
              Complete reference for all DevOS CLI commands with examples and options
            </p>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {commandCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`px-6 py-3 rounded-xl border transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === index
                    ? `bg-gradient-to-r ${category.gradient} text-white border-transparent shadow-lg`
                    : 'bg-gray-800/50 text-gray-300 border-gray-700 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {category.icon}
                  <span className="font-medium">{category.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Commands Display */}
      <section className="relative pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            {commandCategories[activeCategory].commands.map((cmd, cmdIndex) => (
              <Card 
                key={cmdIndex}
                className="bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:border-gray-500 transition-all duration-300 transform hover:scale-102"
                style={{ 
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: cmdIndex * 100 + 'ms'
                }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${commandCategories[activeCategory].gradient} flex items-center justify-center`}>
                        <Terminal className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-white">{cmd.command}</CardTitle>
                        <CardDescription className="text-gray-300 text-lg">{cmd.description}</CardDescription>
                      </div>
                    </div>
                    <button
                      onClick={() => setExpandedCommand(expandedCommand === cmd.command ? null : cmd.command)}
                      className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                    >
                      <ArrowRight className={`h-5 w-5 text-gray-400 transition-transform ${expandedCommand === cmd.command ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                </CardHeader>
                
                {expandedCommand === cmd.command && (
                  <CardContent className="space-y-6">
                    {/* Usage Examples */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <Play className="h-5 w-5 mr-2 text-green-500" />
                        Usage Examples
                      </h4>
                      <div className="space-y-2">
                        {cmd.usage.map((usage, usageIndex) => (
                          <div key={usageIndex} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                            <code className="text-green-400 font-mono">{usage}</code>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Options */}
                    {cmd.options && cmd.options.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                          <Settings className="h-5 w-5 mr-2 text-blue-500" />
                          Options
                        </h4>
                        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                          <div className="space-y-2">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm font-medium text-gray-400 border-b border-gray-600 pb-2">
                              <div>Option</div>
                              <div>Short</div>
                              <div>Description</div>
                            </div>
                            {cmd.options.map((option, optIndex) => (
                              <div key={optIndex} className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <code className="text-blue-400">{option.flag}</code>
                                </div>
                                <div>
                                  <code className="text-yellow-400">{option.short}</code>
                                </div>
                                <div className="text-gray-300 md:col-span-2">{option.desc}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Templates */}
                    {'templates' in cmd && cmd.templates && (
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                          <Package className="h-5 w-5 mr-2 text-purple-500" />
                          Available Templates
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {cmd.templates.map((template: string, templateIndex: number) => (
                            <span
                              key={templateIndex}
                              className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full text-purple-300 text-sm"
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30 backdrop-blur-sm border-0 max-w-4xl mx-auto">
            <CardContent className="p-16 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Master <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">DevOS</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Start using these powerful commands to streamline your development workflow
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-6 rounded-xl border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-lg px-8 py-6 rounded-xl backdrop-blur-sm"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Full Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
