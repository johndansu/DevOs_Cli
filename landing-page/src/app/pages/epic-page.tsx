"use client";
import React, { useState, useEffect, useRef } from "react";
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
  Cpu,
  Database,
  GitBranch,
  Clock,
  Hash,
  Folder,
  Server,
  Command,
  Layers,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Award,
  Users,
  Building,
  Briefcase,
  Lightbulb,
  Cog,
  Wrench,
  Settings2,
  Monitor,
  Smartphone,
  Tablet,
  Laptop
} from "lucide-react";

const features = [
  {
    icon: <Terminal className="h-8 w-8" />,
    title: "Intelligent CLI",
    description: "Smart command completion and context-aware suggestions",
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-600/20 to-pink-600/20",
    stats: "10x faster"
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Lightning Performance",
    description: "Optimized for speed with sub-second response times",
    gradient: "from-yellow-500 to-orange-600",
    bgGradient: "from-yellow-600/20 to-orange-600/20",
    stats: "0.1s latency"
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Enterprise Security",
    description: "Military-grade encryption for all your sensitive data",
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-600/20 to-emerald-600/20",
    stats: "AES-256"
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Global Scale",
    description: "Distributed architecture supporting millions of users",
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-600/20 to-pink-600/20",
    stats: "99.99% uptime"
  }
];

const techStack = [
  { name: "Python", icon: <Code className="h-6 w-6" />, color: "from-green-500 to-emerald-500" },
  { name: "FastAPI", icon: <Zap className="h-6 w-6" />, color: "from-green-500 to-emerald-500" },
  { name: "PostgreSQL", icon: <Database className="h-6 w-6" />, color: "from-purple-600 to-indigo-600" },
  { name: "Docker", icon: <Server className="h-6 w-6" />, color: "from-cyan-500 to-teal-500" },
  { name: "Redis", icon: <Activity className="h-6 w-6" />, color: "from-red-500 to-rose-500" },
  { name: "Git", icon: <GitBranch className="h-6 w-6" />, color: "from-orange-500 to-red-500" }
];

const metrics = [
    { value: "2.5M+", label: "Commands Executed", icon: <Terminal className="h-8 w-8" />, trend: "+25%" },
    { value: "50K+", label: "Active Developers", icon: <Users className="h-8 w-8" />, trend: "+15%" },
    { value: "100+", label: "Enterprise Clients", icon: <Building className="h-8 w-8" />, trend: "+30%" },
    { value: "99.99%", label: "Uptime SLA", icon: <Award className="h-8 w-8" />, trend: "Stable" }
  ];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Developer at TechCorp",
    content: "DevOS transformed our workflow. What used to take hours now takes minutes.",
    avatar: "SC",
    company: "TechCorp",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "DevOps Lead at StartupXYZ",
    content: "The best CLI tool I've ever used. The session tracking alone is worth it.",
    avatar: "MR",
    company: "StartupXYZ",
    rating: 5
  },
  {
    name: "Emily Johnson",
    role: "Full Stack Developer",
    content: "Finally, a tool that understands how developers actually work.",
    avatar: "EJ",
    company: "Freelance",
    rating: 5
  }
];

export default function EpicDevOSPage() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                <Terminal className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                DevOS
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Features', 'Commands', 'Pricing', 'Docs'].map((item) => (
                <button
                  key={item}
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-600/10">
                Sign In
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="absolute inset-0 bg-purple-600/10" />
        
        <div className="relative z-10 text-center max-w-7xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-8 backdrop-blur-sm animate-bounce">
            <Sparkles className="h-4 w-4 mr-2" />
            Version 1.0 Now Available
            <Sparkles className="h-4 w-4 ml-2" />
          </div>
          
          {/* Main Title */}
          <h1 className="text-6xl lg:text-8xl xl:text-9xl font-bold mb-6 leading-tight">
            <span className="block text-white animate-pulse">
              The Future of
            </span>
            <span className="block text-purple-400">
              Development
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            <span className="text-purple-400 font-semibold">DevOS CLI</span> is the next-generation command-line tool that 
            <span className="text-green-400 font-semibold"> automates</span>, 
            <span className="text-purple-400 font-semibold"> optimizes</span>, and 
            <span className="text-yellow-400 font-semibold"> transforms</span> your entire development workflow.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 text-white text-xl px-12 py-8 rounded-2xl border-0 shadow-2xl transform hover:scale-105 transition-all duration-300 group"
            >
              <Download className="mr-3 h-6 w-6 group-hover:animate-bounce" />
              Download Now
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-purple-300 border-purple-500/30 hover:border-purple-400/50 hover:bg-purple-600/10 text-xl px-12 py-8 rounded-2xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
            >
              <Github className="mr-3 h-6 w-6" />
              View on GitHub
            </Button>
          </div>
          
          {/* Hero Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {metrics.map((metric, index) => (
              <div 
                key={index}
                className="text-center transform transition-all duration-500 hover:scale-110"
                style={{ 
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: index * 100 + 'ms'
                }}
              >
                <div className="flex items-center justify-center mb-2">
                  <div className="text-purple-400 mr-2">{metric.icon}</div>
                  <div className="text-4xl font-bold text-white">
                    {metric.value}
                  </div>
                </div>
                <div className="text-gray-400 mb-1">{metric.label}</div>
                <div className="text-green-400 text-sm font-medium">{metric.trend}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="relative py-32 lg:py-40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8">
              Why <span className="text-purple-400">Developers</span> Love DevOS
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built by developers, for developers. Every feature designed with your workflow in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  className={`bg-gray-800/50 backdrop-blur-sm border-gray-800 hover:border-gray-600 transition-all duration-500 group cursor-pointer transform hover:scale-105 hover:shadow-2xl ${
                    index === activeFeature ? 'ring-2 ring-purple-500/50 shadow-purple-500/20' : ''
                  }`}
                  onClick={() => setActiveFeature(index)}
                  style={{ 
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0) rotateX(0)' : 'translateY(30px) rotateX(10deg)',
                    transitionDelay: index * 100 + 'ms',
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                  }}
                >
                  <CardHeader className="text-center pb-6">
                    <div className="w-20 h-20 rounded-2xl bg-purple-600 flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl">
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    <CardTitle className="text-2xl text-white mb-2">{feature.title}</CardTitle>
                    <div className="text-lg font-bold text-purple-400">
                      {feature.stats}
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-300 text-lg">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Interactive Demo */}
            <div className="relative">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="ml-4 text-gray-400 font-mono">devos@terminal</div>
                </div>
                
                <div className="space-y-4 font-mono text-lg">
                  <div className="text-green-400">
                    <span className="text-gray-500">$</span> devos init python-api
                  </div>
                  <div className="text-purple-400 animate-pulse">
                    ✓ Creating project structure...
                  </div>
                  <div className="text-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }}>
                    ✓ Installing dependencies...
                  </div>
                  <div className="text-purple-400 animate-pulse" style={{ animationDelay: '1s' }}>
                    ✓ Setting up environment...
                  </div>
                  <div className="text-green-400" style={{ animationDelay: '1.5s' }}>
                    ✨ Project ready! Run 'cd python-api && devos dev'
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500/20 rounded-full animate-ping" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500/20 rounded-full animate-ping" />
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="relative py-32 lg:py-40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8">
              Built with <span className="text-green-400">Modern</span> Technology
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powered by the latest and greatest in development tools
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="text-center transform transition-all duration-500 hover:scale-110"
                style={{ 
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: index * 50 + 'ms'
                }}
              >
                <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <div className="text-white">{tech.icon}</div>
                </div>
                <div className="text-white font-medium">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-32 lg:py-40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8">
              Loved by <span className="text-yellow-400">Developers</span> Worldwide
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of developers who have transformed their workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border-gray-800 hover:border-gray-600 transition-all duration-300 transform hover:scale-105"
                style={{ 
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: index * 100 + 'ms'
                }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">{testimonial.role}</div>
                      <div className="text-blue-400 text-xs">{testimonial.company}</div>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-300 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 lg:py-40">
        <div className="container mx-auto px-4">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-0 max-w-6xl mx-auto shadow-2xl transform hover:scale-105 transition-transform duration-500">
            <CardContent className="p-20 text-center">
              <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8">
                Ready to <span className="text-purple-400">Revolutionize</span> Your Workflow?
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Join the development revolution. Experience the future of command-line tools today.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xl px-16 py-8 rounded-2xl border-0 shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse"
                >
                  <Download className="mr-3 h-6 w-6" />
                  Start Free Trial
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white border-gray-600 hover:border-gray-400 hover:bg-gray-800/50 text-xl px-16 py-8 rounded-2xl backdrop-blur-sm transform hover:scale-110 transition-all duration-300"
                >
                  <Monitor className="mr-3 h-6 w-6" />
                  Book Demo
                </Button>
              </div>
              
              <div className="mt-12 flex items-center justify-center space-x-8 text-gray-400">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  14-day free trial
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  Cancel anytime
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Terminal className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">DevOS</span>
              </div>
              <p className="text-gray-400">The future of development workflow automation.</p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <div className="space-y-2 text-gray-400">
                <div>Features</div>
                <div>Pricing</div>
                <div>Enterprise</div>
                <div>Changelog</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <div className="space-y-2 text-gray-400">
                <div>Documentation</div>
                <div>API Reference</div>
                <div>Tutorials</div>
                <div>Blog</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-gray-400">
                <div>About</div>
                <div>Careers</div>
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
