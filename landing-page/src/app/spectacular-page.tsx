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
  TrendingUp
} from "lucide-react";

const features = [
  {
    icon: <Terminal className="h-8 w-8" />,
    title: "Project Management",
    description: "Initialize projects with templates for Python, JavaScript, Go, and Rust",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-600/20 to-cyan-600/20"
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Session Tracking",
    description: "Track your development time with automatic session management",
    gradient: "from-yellow-500 to-orange-500",
    bgGradient: "from-yellow-600/20 to-orange-600/20"
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Secure Environment",
    description: "Encrypted storage for environment variables and sensitive data",
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-600/20 to-emerald-600/20"
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Productivity Reports",
    description: "Generate detailed reports on your development activity",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-600/20 to-pink-600/20"
  }
];

const commands = [
  { command: "devos init python-api", description: "Initialize a new Python API project", icon: <Package className="h-4 w-4" /> },
  { command: "devos track start", description: "Start tracking your development session", icon: <TrendingUp className="h-4 w-4" /> },
  { command: "devos env set DATABASE_URL", description: "Securely store environment variables", icon: <Lock className="h-4 w-4" /> },
  { command: "devos report weekly", description: "Generate weekly productivity reports", icon: <Star className="h-4 w-4" /> },
  { command: "devos ship release patch", description: "Deploy your changes with version control", icon: <Rocket className="h-4 w-4" /> }
];

export default function SpectacularDevOSPage() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeCommand, setActiveCommand] = useState(0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    const interval = setInterval(() => {
      setActiveCommand((prev) => (prev + 1) % commands.length);
    }, 3000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black">
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10 animate-pulse"
              style={{
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: Math.random() * 3 + 2 + 's'
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Floating Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium mb-8 animate-bounce">
            <Sparkles className="h-4 w-4 mr-2 text-yellow-400" />
            Next-Generation CLI Tool
            <Sparkles className="h-4 w-4 ml-2 text-yellow-400" />
          </div>
          
          {/* Animated Title */}
          <h1 className="text-6xl lg:text-8xl font-bold mb-6">
            <span className="inline-block bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent animate-pulse">
              DevOS CLI
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            One command-line to manage your entire dev life. 
            <span className="text-blue-400 font-bold animate-pulse"> Local-first</span>, 
            <span className="text-green-400 font-bold animate-pulse"> secure</span>, and 
            <span className="text-purple-400 font-bold animate-pulse"> built for modern developers</span>.
          </p>
          
          {/* Animated Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl px-10 py-8 rounded-2xl border-0 shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 animate-pulse"
            >
              <Download className="mr-3 h-6 w-6" />
              Get Started
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-gray-600 hover:border-gray-400 hover:bg-gray-800/50 text-xl px-10 py-8 rounded-2xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
            >
              <Github className="mr-3 h-6 w-6" />
              View on GitHub
            </Button>
          </div>
          
          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "10K+", label: "Developers", delay: 0 },
              { value: "50+", label: "Templates", delay: 100 },
              { value: "99.9%", label: "Uptime", delay: 200 },
              { value: "0ms", label: "Latency", delay: 300 }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center transform transition-all duration-500"
                style={{ 
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: stat.delay + 'ms'
                }}
              >
                <div className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 lg:py-40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8">
              Why Choose <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">DevOS</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built for developers who value local-first development, security, and productivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm border-gray-700 hover:border-gray-500 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 group transform hover:scale-105`}
                style={{ 
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: index * 100 + 'ms'
                }}
              >
                <CardHeader className="text-center pb-6">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-lg`}>
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <CardTitle className="text-2xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Commands Showcase */}
      <section className="relative py-32 lg:py-40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8">
              Powerful <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Commands</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to manage your development workflow
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-3xl text-white flex items-center">
                  <Terminal className="mr-4 h-8 w-8 text-green-500 animate-pulse" />
                  Command Examples
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {commands.map((cmd, index) => (
                  <div 
                    key={index}
                    className={`bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 transform hover:scale-102 hover:shadow-lg ${
                      index === activeCommand ? 'ring-2 ring-green-500/50 shadow-green-500/20' : ''
                    }`}
                    style={{ transitionDelay: index * 50 + 'ms' }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-green-400">{cmd.icon}</div>
                        <code className="text-green-400 font-mono text-lg">{cmd.command}</code>
                      </div>
                      <CheckCircle className={`h-6 w-6 ${index === activeCommand ? 'text-green-500 animate-pulse' : 'text-gray-500'}`} />
                    </div>
                    <p className="text-gray-400 text-lg mt-3">{cmd.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="relative py-32 lg:py-40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8">
              Quick <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Installation</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get up and running in seconds. DevOS works on Windows, macOS, and Linux.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-gray-700 hover:border-gray-500 transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-3xl text-white">Python Installation</CardTitle>
                <CardDescription className="text-gray-400 text-lg">Install from source</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-700 hover:border-green-500/50 transition-colors">
                  <code className="text-green-400 font-mono text-2xl">pip install -e .</code>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-gray-700 hover:border-gray-500 transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-3xl text-white">Quick Start</CardTitle>
                <CardDescription className="text-gray-400 text-lg">Get started in minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-700 hover:border-blue-500/50 transition-colors">
                  <pre className="text-green-400 font-mono text-lg overflow-x-auto">
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
      <section className="relative py-32 lg:py-40">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30 backdrop-blur-sm border-0 max-w-5xl mx-auto shadow-2xl transform hover:scale-105 transition-transform duration-500">
            <CardContent className="p-16 text-center">
              <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8">
                Ready to <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Transform</span> Your Workflow?
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Join developers who are already streamlining their workflow with DevOS CLI
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl px-12 py-8 rounded-2xl border-0 shadow-2xl hover:shadow-blue-500/50 transform hover:scale-110 transition-all duration-300 animate-pulse"
                >
                  <Download className="mr-3 h-6 w-6" />
                  Download Now
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white border-gray-600 hover:border-gray-400 hover:bg-gray-800/50 text-xl px-12 py-8 rounded-2xl backdrop-blur-sm transform hover:scale-110 transition-all duration-300"
                >
                  <BookOpen className="mr-3 h-6 w-6" />
                  Read Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400">
            <p className="text-lg">© 2024 DevOS CLI. Built with ❤️ for developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
