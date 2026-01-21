"""
Project Management Dashboard - Comprehensive Project Insights
Provides a centralized dashboard for project management, metrics, and analytics.
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
class ProjectMetrics:
    """Project metrics and analytics."""
    total_files: int
    total_lines: int
    languages: Dict[str, int]
    frameworks: List[str]
    security_score: float
    security_issues: int
    code_smells: int
    architecture_patterns: List[str]
    last_analysis: datetime
    health_score: float


@dataclass
class TeamMetrics:
    """Team collaboration metrics."""
    active_developers: int
    commits_today: int
    prs_open: int
    prs_merged: int
    issues_open: int
    issues_resolved: int
    last_activity: datetime


@dataclass
class WorkflowMetrics:
    """Workflow and automation metrics."""
    automated_tasks: int
    successful_deploys: int
    failed_deploys: int
    test_runs: int
    test_pass_rate: float
    build_time_avg: float
    last_deploy: Optional[datetime]


@dataclass
class DashboardData:
    """Complete dashboard data."""
    project_metrics: ProjectMetrics
    team_metrics: TeamMetrics
    workflow_metrics: WorkflowMetrics
    recent_activity: List[Dict[str, Any]]
    alerts: List[Dict[str, Any]]
    recommendations: List[Dict[str, Any]]


class ProjectDashboard:
    """Comprehensive project management dashboard."""
    
    def __init__(self, project_path: Path):
        self.project_path = project_path
        self.enhanced_context = None
        self.command_history = get_command_history()
        
    async def initialize(self):
        """Initialize dashboard with project data."""
        try:
            # Build enhanced context
            context_builder = EnhancedContextBuilder()
            self.enhanced_context = await context_builder.build_enhanced_context(self.project_path)
            
        except Exception as e:
            show_warning(f"Failed to build project context: {e}")
    
    def calculate_project_metrics(self) -> ProjectMetrics:
        """Calculate comprehensive project metrics."""
        if not self.enhanced_context:
            return ProjectMetrics(
                total_files=0, total_lines=0, languages={}, frameworks=[],
                security_score=0, security_issues=0, code_smells=0,
                architecture_patterns=[], last_analysis=datetime.now(), health_score=0
            )
        
        arch = self.enhanced_context.architecture
        
        # Calculate health score based on multiple factors
        security_weight = 0.3
        complexity_weight = 0.2
        pattern_weight = 0.2
        size_weight = 0.3
        
        security_score_normalized = arch.security_score / 100
        complexity_score = max(0, 1 - (arch.total_files / 10000))  # Penalize very large projects
        pattern_score = min(1, len(arch.architecture_patterns) / 6)  # 6 is max patterns
        size_score = min(1, arch.total_files / 1000)  # Optimal around 1000 files
        
        health_score = (
            security_score_normalized * security_weight +
            complexity_score * complexity_weight +
            pattern_score * pattern_weight +
            size_score * size_weight
        ) * 100
        
        return ProjectMetrics(
            total_files=arch.total_files,
            total_lines=arch.total_lines,
            languages=arch.languages,
            frameworks=arch.frameworks,
            security_score=arch.security_score,
            security_issues=len(arch.security_vulnerabilities),
            code_smells=arch.code_smells,
            architecture_patterns=arch.architecture_patterns,
            last_analysis=datetime.now(),
            health_score=health_score
        )
    
    def calculate_team_metrics(self) -> TeamMetrics:
        """Calculate team collaboration metrics."""
        # Simulate team metrics (in real implementation, would integrate with Git, etc.)
        return TeamMetrics(
            active_developers=3,
            commits_today=12,
            prs_open=5,
            prs_merged=8,
            issues_open=7,
            issues_resolved=15,
            last_activity=datetime.now() - timedelta(hours=2)
        )
    
    def calculate_workflow_metrics(self) -> WorkflowMetrics:
        """Calculate workflow and automation metrics."""
        # Get command history for workflow metrics
        history_stats = self.command_history.get_command_stats()
        
        # Simulate workflow metrics
        return WorkflowMetrics(
            automated_tasks=history_stats.get('total_commands', 0),
            successful_deploys=15,
            failed_deploys=2,
            test_runs=45,
            test_pass_rate=0.92,
            build_time_avg=3.5,
            last_deploy=datetime.now() - timedelta(hours=6)
        )
    
    def generate_alerts(self, project_metrics: ProjectMetrics) -> List[Dict[str, Any]]:
        """Generate alerts based on project metrics."""
        alerts = []
        
        # Security alerts
        if project_metrics.security_score < 60:
            alerts.append({
                'type': 'security',
                'severity': 'high' if project_metrics.security_score < 40 else 'medium',
                'message': f"Security score is {project_metrics.security_score}/100",
                'action': 'Run security scan: devos groq-security-scan'
            })
        
        # Code quality alerts
        if project_metrics.code_smells > 100:
            alerts.append({
                'type': 'quality',
                'severity': 'medium',
                'message': f"High number of code smells detected: {project_metrics.code_smells}",
                'action': 'Run code analysis: devos groq-analyze'
            })
        
        # Project size alerts
        if project_metrics.total_files > 5000:
            alerts.append({
                'type': 'scale',
                'severity': 'low',
                'message': f"Large project with {project_metrics.total_files} files",
                'action': 'Consider modularization'
            })
        
        return alerts
    
    def generate_recommendations(self, project_metrics: ProjectMetrics) -> List[Dict[str, Any]]:
        """Generate AI-powered recommendations."""
        recommendations = []
        
        # Security recommendations
        if project_metrics.security_issues > 0:
            recommendations.append({
                'category': 'security',
                'priority': 'high',
                'title': 'Address Security Vulnerabilities',
                'description': f'Fix {project_metrics.security_issues} security issues to improve score',
                'action': 'devos groq-security-scan',
                'impact': 'high'
            })
        
        # Architecture recommendations
        if len(project_metrics.architecture_patterns) < 3:
            recommendations.append({
                'category': 'architecture',
                'priority': 'medium',
                'title': 'Improve Architecture Patterns',
                'description': 'Implement more design patterns for better code organization',
                'action': 'devos groq-architecture-map',
                'impact': 'medium'
            })
        
        # Code quality recommendations
        if project_metrics.code_smells > 50:
            recommendations.append({
                'category': 'quality',
                'priority': 'medium',
                'title': 'Reduce Code Smells',
                'description': f'Refactor {project_metrics.code_smells} code smells for better maintainability',
                'action': 'devos groq-enhance',
                'impact': 'medium'
            })
        
        return recommendations
    
    async def generate_dashboard_data(self) -> DashboardData:
        """Generate complete dashboard data."""
        project_metrics = self.calculate_project_metrics()
        team_metrics = self.calculate_team_metrics()
        workflow_metrics = self.calculate_workflow_metrics()
        
        alerts = self.generate_alerts(project_metrics)
        recommendations = self.generate_recommendations(project_metrics)
        
        # Simulate recent activity
        recent_activity = [
            {'type': 'commit', 'message': 'Fix security vulnerability', 'time': datetime.now() - timedelta(hours=1)},
            {'type': 'deploy', 'message': 'Deployed to production', 'time': datetime.now() - timedelta(hours=6)},
            {'type': 'test', 'message': 'Test suite passed', 'time': datetime.now() - timedelta(hours=8)},
        ]
        
        return DashboardData(
            project_metrics=project_metrics,
            team_metrics=team_metrics,
            workflow_metrics=workflow_metrics,
            recent_activity=recent_activity,
            alerts=alerts,
            recommendations=recommendations
        )


def display_dashboard(dashboard_data: DashboardData):
    """Display the project dashboard."""
    click.echo("\n" + "="*80)
    click.echo("📊 DevOS Project Management Dashboard")
    click.echo("="*80)
    
    # Project Overview
    pm = dashboard_data.project_metrics
    click.echo(f"\n🏗️  Project Overview:")
    click.echo(f"   📁 Files: {pm.total_files:,} | 📄 Lines: {pm.total_lines:,}")
    click.echo(f"   🔒 Security: {pm.security_score}/100 | 🚨 Issues: {pm.security_issues}")
    click.echo(f"   👃 Code Smells: {pm.code_smells} | 💚 Health: {pm.health_score:.1f}/100")
    
    # Languages & Frameworks
    if pm.languages:
        languages_str = ", ".join([f"{lang} ({count})" for lang, count in list(pm.languages.items())[:5]])
        click.echo(f"   💻 Languages: {languages_str}")
    
    if pm.frameworks:
        frameworks_str = ", ".join(pm.frameworks[:5])
        click.echo(f"   🔧 Frameworks: {frameworks_str}")
    
    if pm.architecture_patterns:
        patterns_str = ", ".join(pm.architecture_patterns)
        click.echo(f"   🎨 Patterns: {patterns_str}")
    
    # Team Metrics
    tm = dashboard_data.team_metrics
    click.echo(f"\n👥 Team Activity:")
    click.echo(f"   👨‍💻 Developers: {tm.active_developers} | 📝 Commits: {tm.commits_today}")
    click.echo(f"   🔀 PRs: {tm.prs_open} open / {tm.prs_merged} merged")
    click.echo(f"   🐛 Issues: {tm.issues_open} open / {tm.issues_resolved} resolved")
    
    # Workflow Metrics
    wm = dashboard_data.workflow_metrics
    click.echo(f"\n⚙️  Workflow Metrics:")
    click.echo(f"   🤖 Tasks: {wm.automated_tasks} | 🚀 Deploys: {wm.successful_deploys} success / {wm.failed_deploys} failed")
    click.echo(f"   🧪 Tests: {wm.test_runs} runs | ✅ Pass rate: {wm.test_pass_rate:.1%}")
    click.echo(f"   ⏱️  Avg build: {wm.build_time_avg:.1f}s")
    
    # Alerts
    if dashboard_data.alerts:
        click.echo(f"\n🚨 Alerts:")
        for alert in dashboard_data.alerts:
            severity_emoji = {'high': '🔴', 'medium': '🟡', 'low': '🟢'}
            click.echo(f"   {severity_emoji[alert['severity']]} {alert['message']}")
            click.echo(f"      💡 {alert['action']}")
    
    # Recommendations
    if dashboard_data.recommendations:
        click.echo(f"\n💡 AI Recommendations:")
        for rec in dashboard_data.recommendations:
            priority_emoji = {'high': '🔥', 'medium': '⚡', 'low': '💭'}
            click.echo(f"   {priority_emoji[rec['priority']]} {rec['title']}")
            click.echo(f"      📝 {rec['description']}")
            click.echo(f"      💻 {rec['action']} (Impact: {rec['impact']})")
    
    # Recent Activity
    if dashboard_data.recent_activity:
        click.echo(f"\n📈 Recent Activity:")
        for activity in dashboard_data.recent_activity[:5]:
            time_ago = datetime.now() - activity['time']
            hours_ago = int(time_ago.total_seconds() / 3600)
            type_emoji = {'commit': '📝', 'deploy': '🚀', 'test': '🧪', 'issue': '🐛'}
            click.echo(f"   {type_emoji.get(activity['type'], '📋')} {activity['message']} ({hours_ago}h ago)")
    
    click.echo("\n" + "="*80)


@click.command()
@click.option('--refresh', is_flag=True, help='Refresh dashboard data')
@click.option('--export', type=click.Path(), help='Export dashboard to JSON file')
@click.option('--alerts-only', is_flag=True, help='Show only alerts')
def dashboard(refresh: bool, export: Optional[str], alerts_only: bool):
    """Show comprehensive project management dashboard.
    
    Examples:
        dashboard
        dashboard --refresh
        dashboard --export dashboard.json
        dashboard --alerts-only
    """
    
    async def run_dashboard():
        project_path = Path.cwd()
        dashboard_manager = ProjectDashboard(project_path)
        
        if refresh:
            click.echo("🔄 Refreshing dashboard data...")
            await dashboard_manager.initialize()
        
        dashboard_data = await dashboard_manager.generate_dashboard_data()
        
        if alerts_only:
            if dashboard_data.alerts:
                click.echo("🚨 Active Alerts:")
                for alert in dashboard_data.alerts:
                    severity_emoji = {'high': '🔴', 'medium': '🟡', 'low': '🟢'}
                    click.echo(f"   {severity_emoji[alert['severity']]} {alert['message']}")
                    click.echo(f"      💡 {alert['action']}")
            else:
                click.echo("✅ No active alerts")
        else:
            display_dashboard(dashboard_data)
        
        if export:
            export_path = Path(export)
            try:
                # Convert dataclasses to dict for JSON serialization
                dashboard_dict = {
                    'project_metrics': asdict(dashboard_data.project_metrics),
                    'team_metrics': asdict(dashboard_data.team_metrics),
                    'workflow_metrics': asdict(dashboard_data.workflow_metrics),
                    'recent_activity': dashboard_data.recent_activity,
                    'alerts': dashboard_data.alerts,
                    'recommendations': dashboard_data.recommendations,
                    'generated_at': datetime.now().isoformat()
                }
                
                # Convert datetime objects to strings
                def convert_datetime(obj):
                    if isinstance(obj, datetime):
                        return obj.isoformat()
                    return obj
                
                with open(export_path, 'w', encoding='utf-8') as f:
                    json.dump(dashboard_dict, f, indent=2, default=convert_datetime, ensure_ascii=False)
                
                show_success(f"Dashboard exported to {export}")
            except Exception as e:
                show_warning(f"Failed to export dashboard: {e}")
    
    asyncio.run(run_dashboard())
