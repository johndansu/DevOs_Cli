"use client";
import React from "react";
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
  Code,
  Package,
  Lock,
  Sparkles,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const features = [
  {
    icon: <Terminal className="h-8 w-8 text-blue-500" />,
    title: "Project Management",
    description: "Initialize projects with templates for Python, JavaScript, Go, and Rust",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Zap className="h-8 w-8 text-yellow-500" />,
    title: "Session Tracking",
    description: "Track your development time with automatic session management",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: <Shield className="h-8 w-8 text-green-500" />,
    title: "Secure Environment",
    description: "Encrypted storage for environment variables and sensitive data",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: <Globe className="h-8 w-8 text-purple-500" />,
    title: "Productivity Reports",
    description: "Generate detailed reports on your development activity",
    gradient: "from-purple-500 to-pink-500"
  }
];

const commands = [
  { command: "devos init python-api", description: "Initialize a new Python API project" },
  { command: "devos track start", description: "Start tracking your development session" },
  { command: "devos env set DATABASE_URL", description: "Securely store environment variables" },
  { command: "devos report weekly", description: "Generate weekly productivity reports" },
  { command: "devos ship release patch", description: "Deploy your changes with version control" }
];

const backgroundSvg = 'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E';

export default function AmazingDevOSPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0" style={{ backgroundImage: `url('${backgroundSvg}')`, opacity: 0.2 }}></div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              Next-Generation CLI Tool
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                DevOS CLI
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              One command-line to manage your entire dev life. 
              <span className="text-blue-400 font-semibold"> Local-first</span>, 
              <span className="text-green-400 font-semibold"> secure</span>, and 
              <span className="text-purple-400 font-semibold"> built for modern developers</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-6 rounded-xl border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                <Download className="mr-2 h-5 w-5" />
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-lg px-8 py-6 rounded-xl backdrop-blur-sm">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">10K+</div>
                <div className="text-gray-400">Developers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-gray-400">Templates</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                <div className="text-gray-400">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">0ms</div>
                <div className="text-gray-400">Latency</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">DevOS</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Built for developers who value local-first development, security, and productivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-gray-600 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Commands Showcase */}
      <section className="relative py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Powerful <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Commands</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to manage your development workflow
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Terminal className="mr-3 h-6 w-6 text-green-500" />
                  Command Examples
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {commands.map((cmd, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
                    <div className="flex items-center justify-between">
                      <code className="text-green-400 font-mono">{cmd.command}</code>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="text-gray-400 text-sm mt-2">{cmd.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="relative py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Quick <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Installation</span>
            </h2>
            <p className="text-xl text-gray-300">
              Get up and running in seconds. DevOS works on Windows, macOS, and Linux.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Python Installation</CardTitle>
                <CardDescription className="text-gray-400">Install from source</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                  <code className="text-green-400 font-mono text-lg">pip install -e .</code>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Quick Start</CardTitle>
                <CardDescription className="text-gray-400">Get started in minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                  <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`# Initialize a new project
devos init python-api

# Navigate to project
cd python-api

# Start tracking work
devos track start

# Set environment variables
devos env set DATABASE_URL

# Generate reports
devos report weekly`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm border-0 max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Transform</span> Your Workflow?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join developers who are already streamlining their workflow with DevOS CLI
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-6 rounded-xl border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  <Download className="mr-2 h-5 w-5" />
                  Download Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-white border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-lg px-8 py-6 rounded-xl backdrop-blur-sm">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Read Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400">
            <p>© 2024 DevOS CLI. Built with ❤️ for developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
