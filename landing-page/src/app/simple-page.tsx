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
  BookOpen
} from "lucide-react";

const features = [
  {
    icon: <Terminal className="h-6 w-6" />,
    title: "Project Management",
    description: "Initialize projects with templates for Python, JavaScript, Go, and Rust"
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Session Tracking",
    description: "Track your development time with automatic session management"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Secure Environment",
    description: "Encrypted storage for environment variables and sensitive data"
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Productivity Reports",
    description: "Generate detailed reports on your development activity"
  }
];

export default function SimpleDevOSLandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            DevOS CLI
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            One command-line to manage your entire dev life. Local-first, secure, and built for modern developers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6">
              <Download className="mr-2 h-5 w-5" />
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <Github className="mr-2 h-5 w-5" />
              View on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Why Choose DevOS?
            </h2>
            <p className="text-xl text-muted-foreground">
              Built for developers who value local-first development, security, and productivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="h-full p-6 text-center hover:shadow-lg transition-shadow">
                <div className="mb-4 flex justify-center text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Quick Installation
            </h2>
            <p className="text-xl text-muted-foreground">
              Get up and running in seconds. DevOS works on Windows, macOS, and Linux.
            </p>
          </div>

          <div className="space-y-4">
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Python Installation</CardTitle>
                <CardDescription>Install from source</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                  pip install -e .
                </pre>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle>Quick Start</CardTitle>
                <CardDescription>Get started in minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12 bg-gradient-to-br from-primary/10 via-background to-primary/5 border-primary/20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join developers who are already streamlining their workflow with DevOS CLI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6">
                <Download className="mr-2 h-5 w-5" />
                Download Now
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <BookOpen className="mr-2 h-5 w-5" />
                Read Documentation
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>© 2024 DevOS CLI. Built with ❤️ for developers.</p>
        </div>
      </footer>
    </div>
  );
}
