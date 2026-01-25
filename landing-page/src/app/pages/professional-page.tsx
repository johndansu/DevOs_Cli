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
  Activity
} from "lucide-react";

const features = [
  {
    icon: <Terminal className="h-6 w-6" />,
    title: "Smart Project Management",
    description: "Initialize projects with intelligent templates and best practices built-in",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Automatic Session Tracking",
    description: "Focus on coding while we track your development time automatically",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Secure Environment Storage",
    description: "Military-grade encryption for all your environment variables and secrets",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Productivity Analytics",
    description: "Get detailed insights into your development patterns and productivity",
    color: "bg-orange-100 text-orange-600"
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

const stats = [
  { value: "50K+", label: "Active Developers" },
  { value: "2.5M+", label: "Commands Executed" },
  { value: "100+", label: "Enterprise Clients" },
  { value: "99.9%", label: "Uptime" }
];

export default function ProfessionalDevOSPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="/commands" className="text-gray-600 hover:text-gray-900 transition-colors">Commands</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#docs" className="text-gray-600 hover:text-gray-900 transition-colors">Docs</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                Sign In
              </Button>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-2 text-yellow-500" />
              Version 1.0 Now Available
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              The command-line tool that
              <span className="block text-blue-600">manages your entire dev life</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              DevOS CLI is the next-generation development tool that automates project setup, 
              tracks your sessions, and manages your environment—all from your terminal.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 text-lg">
                <Download className="mr-2 h-5 w-5" />
                Download Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900 px-8 py-3 text-lg">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to build better
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From project initialization to deployment tracking, DevOS has you covered
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
              See it in action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple commands that do powerful things
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

      {/* CTA */}
      <section className="py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of developers who are already building better with DevOS
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 text-lg">
              <Download className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900 px-8 py-3 text-lg">
              <Monitor className="mr-2 h-5 w-5" />
              Book Demo
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
              <p className="text-gray-400">The future of development workflow automation.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2 text-gray-400">
                <div>Features</div>
                <div>Pricing</div>
                <div>Enterprise</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <div className="space-y-2 text-gray-400">
                <div>Documentation</div>
                <div>API Reference</div>
                <div>Tutorials</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-gray-400">
                <div>About</div>
                <div>Contact</div>
                <div>Privacy</div>
              </div>
            </div>
          </div>
          
          <div className="text-center text-gray-400 pt-8 border-t border-gray-800">
            <p>© 2024 DevOS CLI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
