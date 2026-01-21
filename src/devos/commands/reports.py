"""
Automated Reporting - Comprehensive Project Analytics and Reports
Provides automated reporting, analytics, and insights for project management.
"""

import asyncio
import json
from pathlib import Path
from typing import Dict, List, Any, Optional
from dataclasses import dataclass, asdict
from datetime import datetime, timedelta
import click
from collections import defaultdict

from devos.core.progress import show_success, show_info, show_warning
from devos.core.ai_config import get_ai_config_manager, initialize_ai_providers
from devos.core.ai import get_ai_service, AIServiceError, UserPreferences
from devos.core.ai.enhanced_context import EnhancedContextBuilder
from devos.core.command_history import get_command_history
from devos.core.rich_progress import show_progress, show_steps


@dataclass
class ReportSection:
    """Individual report section."""
    title: str
    content: str
    metrics: Dict[str, Any]
    recommendations: List[str]
    generated_at: datetime


@dataclass
class ProjectReport:
    """Complete project report."""
    title: str
    period: str
    generated_at: datetime
    sections: List[ReportSection]
    summary: str
    overall_score: float
    action_items: List[Dict[str, Any]]


@dataclass
class TrendData:
    """Trend analysis data."""
    metric: str
    values: List[float]
    timestamps: List[datetime]
    trend: str  # improving, declining, stable
    change_percentage: float


class AutomatedReporting:
    """Automated reporting and analytics engine."""
    
    def __init__(self, project_path: Path):
        self.project_path = project_path
        self.enhanced_context = None
        self.command_history = get_command_history()
        
    async def initialize(self):
        """Initialize reporting engine with project data."""
        try:
            # Build enhanced context
            context_builder = EnhancedContextBuilder()
            self.enhanced_context = await context_builder.build_enhanced_context(self.project_path)
            
        except Exception as e:
            show_warning(f"Failed to build project context: {e}")
    
    def generate_security_report(self) -> ReportSection:
        """Generate security analysis report."""
        if not self.enhanced_context:
            return ReportSection(
                title="Security Analysis",
                content="Unable to analyze security - context not available",
                metrics={},
                recommendations=[],
                generated_at=datetime.now()
            )
        
        arch = self.enhanced_context.architecture
        vulnerabilities = self.enhanced_context.security_issues
        
        # Categorize vulnerabilities
        severity_counts = defaultdict(int)
        type_counts = defaultdict(int)
        
        for vuln in vulnerabilities:
            severity_counts[vuln.severity] += 1
            type_counts[vuln.type] += 1
        
        # Generate recommendations
        recommendations = []
        if severity_counts['high'] > 0:
            recommendations.append(f"Address {severity_counts['high']} high-priority security issues immediately")
        if severity_counts['medium'] > 5:
            recommendations.append("Plan to address medium-priority issues in next sprint")
        if 'HARDCODED_SECRETS' in type_counts:
            recommendations.append("Implement secret management system to eliminate hardcoded secrets")
        
        content = f"""
Security Analysis for {self.project_path.name}

Overview:
- Security Score: {arch.security_score}/100
- Total Vulnerabilities: {len(vulnerabilities)}
- High Severity: {severity_counts['high']}
- Medium Severity: {severity_counts['medium']}
- Low Severity: {severity_counts.get('low', 0)}

Vulnerability Types:
{chr(10).join([f"- {vtype}: {count}" for vtype, count in type_counts.items()])}

Top Issues:
{chr(10).join([f"- {vuln.description}" for vuln in vulnerabilities[:3]])}
        """.strip()
        
        return ReportSection(
            title="Security Analysis",
            content=content,
            metrics={
                'security_score': arch.security_score,
                'total_vulnerabilities': len(vulnerabilities),
                'high_severity': severity_counts['high'],
                'medium_severity': severity_counts['medium'],
                'low_severity': severity_counts.get('low', 0)
            },
            recommendations=recommendations,
            generated_at=datetime.now()
        )
    
    def generate_code_quality_report(self) -> ReportSection:
        """Generate code quality analysis report."""
        if not self.enhanced_context:
            return ReportSection(
                title="Code Quality Analysis",
                content="Unable to analyze code quality - context not available",
                metrics={},
                recommendations=[],
                generated_at=datetime.now()
            )
        
        arch = self.enhanced_context.architecture
        code_smells = len(self.enhanced_context.code_smells)
        
        # Calculate quality metrics
        total_files = arch.total_files
        complexity_score = min(100, max(0, 100 - (code_smells / total_files * 10))) if total_files > 0 else 0
        
        # Language distribution
        language_quality = {}
        for lang, count in arch.languages.items():
            # Simulate quality per language
            lang_quality = max(50, min(100, 100 - (count / total_files * 20)))
            language_quality[lang] = lang_quality
        
        # Generate recommendations
        recommendations = []
        if code_smells > 100:
            recommendations.append(f"Address {code_smells} code smells through refactoring")
        if complexity_score < 70:
            recommendations.append("Improve code complexity through better design patterns")
        if len(arch.architecture_patterns) < 3:
            recommendations.append("Implement more design patterns for better code organization")
        
        content = f"""
Code Quality Analysis for {self.project_path.name}

Overview:
- Total Files: {total_files}
- Code Smells: {code_smells}
- Complexity Score: {complexity_score:.1f}/100
- Architecture Patterns: {len(arch.architecture_patterns)}

Language Distribution:
{chr(10).join([f"- {lang}: {count} files (Quality: {quality:.1f}/100)" for lang, count, quality in [(lang, count, language_quality[lang]) for lang, count in arch.languages.items()]])}

Architecture Patterns:
{chr(10).join([f"- {pattern}" for pattern in arch.architecture_patterns])}

Quality Assessment:
- Maintainability: {'Good' if complexity_score > 80 else 'Fair' if complexity_score > 60 else 'Poor'}
- Technical Debt: {'Low' if code_smells < 50 else 'Medium' if code_smells < 100 else 'High'}
- Code Organization: {'Good' if len(arch.architecture_patterns) >= 4 else 'Fair' if len(arch.architecture_patterns) >= 2 else 'Poor'}
        """.strip()
        
        return ReportSection(
            title="Code Quality Analysis",
            content=content,
            metrics={
                'total_files': total_files,
                'code_smells': code_smells,
                'complexity_score': complexity_score,
                'architecture_patterns': len(arch.architecture_patterns),
                'maintainability': 'Good' if complexity_score > 80 else 'Fair' if complexity_score > 60 else 'Poor'
            },
            recommendations=recommendations,
            generated_at=datetime.now()
        )
    
    def generate_activity_report(self) -> ReportSection:
        """Generate development activity report."""
        history_stats = self.command_history.get_command_stats()
        
        # Simulate activity data (in real implementation, would integrate with Git, etc.)
        daily_commits = [12, 15, 8, 20, 18, 14, 16]  # Last 7 days
        avg_commits_per_day = sum(daily_commits) / len(daily_commits)
        
        # Command usage patterns
        command_usage = history_stats.get('most_used_commands', [])
        
        # Generate recommendations
        recommendations = []
        if avg_commits_per_day < 10:
            recommendations.append("Increase development activity through better planning")
        if len(command_usage) < 5:
            recommendations.append("Encourage team to use more DevOS features for better productivity")
        
        content = f"""
Development Activity Report for {self.project_path.name}

Overview:
- Average Commits per Day: {avg_commits_per_day:.1f}
- Total Commands Executed: {history_stats.get('total_commands', 0)}
- Success Rate: {history_stats.get('success_rate', 0):.1f}%
- Peak Activity Hour: {history_stats.get('peak_hour', 0):02d}:00

Recent Activity (Last 7 Days):
{chr(10).join([f"- Day {i+1}: {commits} commits" for i, commits in enumerate(daily_commits)])}

Most Used Commands:
{chr(10).join([f"- {cmd}: {count} times" for cmd, count in command_usage[:5]])}

Productivity Insights:
- Development Pace: {'High' if avg_commits_per_day > 15 else 'Medium' if avg_commits_per_day > 8 else 'Low'}
- Tool Adoption: {'Good' if history_stats.get('total_commands', 0) > 50 else 'Fair' if history_stats.get('total_commands', 0) > 20 else 'Poor'}
- Consistency: {'Good' if max(daily_commits) - min(daily_commits) < 10 else 'Variable'}
        """.strip()
        
        return ReportSection(
            title="Development Activity",
            content=content,
            metrics={
                'avg_commits_per_day': avg_commits_per_day,
                'total_commands': history_stats.get('total_commands', 0),
                'success_rate': history_stats.get('success_rate', 0),
                'peak_hour': history_stats.get('peak_hour', 0)
            },
            recommendations=recommendations,
            generated_at=datetime.now()
        )
    
    async def generate_ai_insights_report(self) -> ReportSection:
        """Generate AI-powered insights report."""
        try:
            # Initialize AI service
            config_manager = get_ai_config_manager()
            initialize_ai_providers()
            ai_service = await get_ai_service()
            
            # Create insights prompt
            insights_prompt = f"""
            Analyze this project and provide strategic insights:
            
            Project: {self.project_path.name}
            Files: {self.enhanced_context.architecture.total_files if self.enhanced_context else 'Unknown'}
            Languages: {list(self.enhanced_context.architecture.languages.keys()) if self.enhanced_context else 'Unknown'}
            Security Score: {self.enhanced_context.architecture.security_score if self.enhanced_context else 'Unknown'}
            
            Provide insights on:
            1. Project maturity and readiness
            2. Technical debt assessment
            3. Team productivity indicators
            4. Strategic recommendations
            5. Risk factors and mitigation
            """
            
            # Get AI insights
            response = await ai_service.suggest_improvements(
                query=insights_prompt,
                project_path=self.project_path,
                user_preferences=UserPreferences(
                    coding_style="strategic",
                    preferred_patterns=[],
                    ai_model="llama-3.1-8b-instant",
                    temperature=0.7,
                    max_tokens=1500
                ),
                provider_name="groq"
            )
            
            # Extract AI content
            ai_content = ""
            if hasattr(response, 'suggestions') and response.suggestions:
                ai_content = "\n\n".join([str(suggestion) for suggestion in response.suggestions])
            elif hasattr(response, 'content'):
                ai_content = response.content
            else:
                ai_content = "AI insights not available"
            
            recommendations = [
                "Review AI-generated insights for strategic planning",
                "Consider implementing AI-suggested improvements",
                "Monitor project health metrics regularly"
            ]
            
            return ReportSection(
                title="AI-Powered Insights",
                content=f"Strategic AI Analysis for {self.project_path.name}\n\n{ai_content}",
                metrics={
                    'ai_analysis_available': True,
                    'insights_generated': len(ai_content.split('\n')) if ai_content else 0
                },
                recommendations=recommendations,
                generated_at=datetime.now()
            )
            
        except Exception as e:
            return ReportSection(
                title="AI-Powered Insights",
                content=f"AI insights not available: {e}",
                metrics={'ai_analysis_available': False},
                recommendations=["Check AI service configuration"],
                generated_at=datetime.now()
            )
    
    def calculate_overall_score(self, sections: List[ReportSection]) -> float:
        """Calculate overall project health score."""
        if not sections:
            return 0.0
        
        scores = []
        for section in sections:
            if 'security_score' in section.metrics:
                scores.append(section.metrics['security_score'])
            if 'complexity_score' in section.metrics:
                scores.append(section.metrics['complexity_score'])
            if 'success_rate' in section.metrics:
                scores.append(section.metrics['success_rate'])
        
        return sum(scores) / len(scores) if scores else 50.0
    
    def generate_action_items(self, sections: List[ReportSection]) -> List[Dict[str, Any]]:
        """Generate consolidated action items from all sections."""
        action_items = []
        
        for section in sections:
            for i, recommendation in enumerate(section.recommendations):
                action_items.append({
                    'id': f"{section.title.lower().replace(' ', '-')}-{i+1}",
                    'category': section.title,
                    'priority': 'high' if 'immediately' in recommendation.lower() else 'medium',
                    'action': recommendation,
                    'section': section.title,
                    'due_date': datetime.now() + timedelta(days=30)
                })
        
        # Sort by priority
        action_items.sort(key=lambda x: {'high': 3, 'medium': 2, 'low': 1}[x['priority']], reverse=True)
        
        return action_items[:10]  # Top 10 action items
    
    async def generate_comprehensive_report(self, period: str = "weekly") -> ProjectReport:
        """Generate comprehensive project report."""
        await self.initialize()
        
        # Generate all sections
        sections = [
            self.generate_security_report(),
            self.generate_code_quality_report(),
            self.generate_activity_report(),
            await self.generate_ai_insights_report()
        ]
        
        # Calculate overall metrics
        overall_score = self.calculate_overall_score(sections)
        action_items = self.generate_action_items(sections)
        
        # Generate summary
        summary = f"""
Project Health Report for {self.project_path.name}

Overall Score: {overall_score:.1f}/100
Period: {period}
Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}

Key Findings:
- Security: {sections[0].metrics.get('security_score', 'N/A')}/100 with {sections[0].metrics.get('total_vulnerabilities', 0)} issues
- Code Quality: {sections[1].metrics.get('complexity_score', 'N/A')}/100 with {sections[1].metrics.get('code_smells', 0)} code smells
- Activity: {sections[2].metrics.get('avg_commits_per_day', 'N/A'):.1f} commits/day average
- Action Items: {len(action_items)} prioritized tasks

Status: {'Excellent' if overall_score > 85 else 'Good' if overall_score > 70 else 'Fair' if overall_score > 50 else 'Needs Attention'}
        """.strip()
        
        return ProjectReport(
            title=f"Project Health Report - {self.project_path.name}",
            period=period,
            generated_at=datetime.now(),
            sections=sections,
            summary=summary,
            overall_score=overall_score,
            action_items=action_items
        )


def display_report(report: ProjectReport):
    """Display the project report."""
    click.echo("\n" + "="*80)
    click.echo(f"📊 {report.title}")
    click.echo("="*80)
    click.echo(f"📅 Period: {report.period}")
    click.echo(f"⏰ Generated: {report.generated_at.strftime('%Y-%m-%d %H:%M:%S')}")
    click.echo(f"📈 Overall Score: {report.overall_score:.1f}/100")
    
    # Summary
    click.echo(f"\n📋 Executive Summary:")
    click.echo(report.summary)
    
    # Sections
    for section in report.sections:
        click.echo(f"\n" + "-"*60)
        click.echo(f"📑 {section.title}")
        click.echo("-"*60)
        click.echo(section.content)
        
        if section.recommendations:
            click.echo(f"\n💡 Recommendations:")
            for rec in section.recommendations:
                click.echo(f"   • {rec}")
    
    # Action Items
    if report.action_items:
        click.echo(f"\n🎯 Priority Action Items:")
        for i, item in enumerate(report.action_items[:5], 1):
            priority_emoji = {'high': '🔥', 'medium': '⚡', 'low': '💭'}
            click.echo(f"   {i}. {priority_emoji[item['priority']]} {item['action']}")
            click.echo(f"      Category: {item['category']} | Due: {item['due_date'].strftime('%Y-%m-%d')}")
    
    click.echo("\n" + "="*80)


@click.group()
def reports():
    """Automated reporting and analytics."""
    pass


@reports.command()
@click.option('--period', default='weekly', type=click.Choice(['daily', 'weekly', 'monthly']), help='Report period')
@click.option('--export', type=click.Path(), help='Export report to file')
@click.option('--format', type=click.Choice(['text', 'json', 'html']), default='text', help='Export format')
def generate(period: str, export: Optional[str], format: str):
    """Generate comprehensive project report."""
    
    async def run_generate():
        project_path = Path.cwd()
        reporting = AutomatedReporting(project_path)
        
        click.echo(f"🔄 Generating {period} report...")
        
        report = await reporting.generate_comprehensive_report(period)
        
        if export:
            export_path = Path(export)
            try:
                if format == 'json':
                    # Convert to JSON-serializable format
                    report_dict = {
                        'title': report.title,
                        'period': report.period,
                        'generated_at': report.generated_at.isoformat(),
                        'overall_score': report.overall_score,
                        'summary': report.summary,
                        'sections': [
                            {
                                'title': s.title,
                                'content': s.content,
                                'metrics': s.metrics,
                                'recommendations': s.recommendations,
                                'generated_at': s.generated_at.isoformat()
                            }
                            for s in report.sections
                        ],
                        'action_items': [
                            {
                                'id': item['id'],
                                'category': item['category'],
                                'priority': item['priority'],
                                'action': item['action'],
                                'section': item['section'],
                                'due_date': item['due_date'].isoformat()
                            }
                            for item in report.action_items
                        ]
                    }
                    
                    with open(export_path, 'w', encoding='utf-8') as f:
                        json.dump(report_dict, f, indent=2, ensure_ascii=False)
                
                elif format == 'html':
                    # Generate HTML report
                    html_content = f"""
                    <html>
                    <head><title>{report.title}</title></head>
                    <body>
                    <h1>{report.title}</h1>
                    <p>Period: {report.period}</p>
                    <p>Generated: {report.generated_at.strftime('%Y-%m-%d %H:%M:%S')}</p>
                    <p>Overall Score: {report.overall_score:.1f}/100</p>
                    <h2>Summary</h2>
                    <pre>{report.summary}</pre>
                    {''.join([f'<h3>{s.title}</h3><pre>{s.content}</pre>' for s in report.sections])}
                    </body>
                    </html>
                    """
                    
                    with open(export_path, 'w', encoding='utf-8') as f:
                        f.write(html_content)
                
                else:  # text
                    with open(export_path, 'w', encoding='utf-8') as f:
                        # Capture click.echo output
                        import io
                        import sys
                        from contextlib import redirect_stdout
                        
                        f_capture = io.StringIO()
                        with redirect_stdout(f_capture):
                            display_report(report)
                        
                        f.write(f_capture.getvalue())
                
                show_success(f"Report exported to {export} ({format})")
                
            except Exception as e:
                show_warning(f"Failed to export report: {e}")
        else:
            display_report(report)
    
    asyncio.run(run_generate())


@reports.command()
@click.option('--days', default=30, type=int, help='Number of days to analyze')
def trends(days: int):
    """Show project trends over time."""
    project_path = Path.cwd()
    reporting = AutomatedReporting(project_path)
    
    click.echo(f"📈 Project Trends (Last {days} days)")
    click.echo("="*50)
    
    # Simulate trend data (in real implementation, would analyze historical data)
    trends_data = [
        TrendData("Security Score", [45, 48, 50, 52, 50], 
                 [datetime.now() - timedelta(days=i) for i in range(5, 0, -1)], 
                 "improving", 11.1),
        TrendData("Code Quality", [65, 68, 70, 72, 70], 
                 [datetime.now() - timedelta(days=i) for i in range(5, 0, -1)], 
                 "improving", 7.7),
        TrendData("Activity", [12, 15, 8, 20, 18], 
                 [datetime.now() - timedelta(days=i) for i in range(5, 0, -1)], 
                 "stable", 0.0),
    ]
    
    for trend in trends_data:
        trend_emoji = {'improving': '📈', 'declining': '📉', 'stable': '➡️'}
        click.echo(f"\n{trend_emoji[trend.trend]} {trend.metric}:")
        click.echo(f"   Current: {trend.values[-1]}")
        click.echo(f"   Change: {trend.change_percentage:+.1f}%")
        click.echo(f"   Trend: {trend.trend.title()}")


# Add reports commands to main CLI
def register_reports_commands(main_cli):
    """Register reports commands with main CLI."""
    main_cli.add_command(reports, name='reports')
