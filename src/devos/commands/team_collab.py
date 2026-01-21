"""
Team Collaboration Features - Enhanced Teamwork and Communication
Provides team collaboration tools, code reviews, and communication features.
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
from devos.core.rich_progress import show_progress, show_steps


@dataclass
class TeamMember:
    """Team member information."""
    name: str
    email: str
    role: str
    specialties: List[str]
    last_activity: datetime
    active: bool


@dataclass
class CodeReview:
    """Code review information."""
    id: str
    title: str
    author: str
    reviewer: str
    status: str  # pending, approved, changes_requested
    files: List[str]
    comments: List[Dict[str, Any]]
    created_at: datetime
    updated_at: datetime
    ai_suggestions: List[Dict[str, Any]]


@dataclass
class TeamActivity:
    """Team activity tracking."""
    type: str  # commit, pr, issue, review, deploy
    description: str
    author: str
    timestamp: datetime
    metadata: Dict[str, Any]


@dataclass
class CollaborationMetrics:
    """Team collaboration metrics."""
    total_commits: int
    active_members: int
    open_prs: int
    merged_prs: int
    code_review_time_avg: float
    collaboration_score: float


class TeamCollaboration:
    """Team collaboration and communication manager."""
    
    def __init__(self, project_path: Path):
        self.project_path = project_path
        self.team_members: List[TeamMember] = []
        self.code_reviews: List[CodeReview] = []
        self.activities: List[TeamActivity] = []
        
    def add_team_member(self, name: str, email: str, role: str, specialties: List[str]):
        """Add a team member."""
        member = TeamMember(
            name=name,
            email=email,
            role=role,
            specialties=specialties,
            last_activity=datetime.now(),
            active=True
        )
        self.team_members.append(member)
        show_success(f"Added team member: {name} ({role})")
    
    def create_code_review(self, title: str, author: str, files: List[str]) -> CodeReview:
        """Create a new code review."""
        review_id = f"pr-{len(self.code_reviews) + 1:03d}"
        
        review = CodeReview(
            id=review_id,
            title=title,
            author=author,
            reviewer="",  # To be assigned
            status="pending",
            files=files,
            comments=[],
            created_at=datetime.now(),
            updated_at=datetime.now(),
            ai_suggestions=[]
        )
        
        self.code_reviews.append(review)
        self.activities.append(TeamActivity(
            type="pr",
            description=f"Created PR: {title}",
            author=author,
            timestamp=datetime.now(),
            metadata={"review_id": review_id}
        ))
        
        show_success(f"Created code review: {review_id} - {title}")
        return review
    
    async def generate_ai_review_suggestions(self, review: CodeReview) -> List[Dict[str, Any]]:
        """Generate AI-powered code review suggestions."""
        try:
            # Initialize AI service
            config_manager = get_ai_config_manager()
            initialize_ai_providers()
            ai_service = await get_ai_service()
            
            # Build context for review
            context_builder = EnhancedContextBuilder()
            enhanced_context = await context_builder.build_enhanced_context(self.project_path)
            
            # Create review prompt
            review_prompt = f"""
            Review this code change: {review.title}
            
            Files changed: {', '.join(review.files)}
            
            Provide specific feedback on:
            1. Code quality and best practices
            2. Potential bugs or issues
            3. Performance considerations
            4. Security implications
            5. Suggestions for improvement
            
            Be constructive and specific with your feedback.
            """
            
            # Get AI analysis
            response = await ai_service.suggest_improvements(
                query=review_prompt,
                project_path=self.project_path,
                user_preferences=UserPreferences(
                    coding_style="clean",
                    preferred_patterns=[],
                    ai_model="llama-3.1-8b-instant",
                    temperature=0.3,
                    max_tokens=1000
                ),
                provider_name="groq"
            )
            
            # Parse AI suggestions
            suggestions = []
            if hasattr(response, 'suggestions') and response.suggestions:
                for suggestion in response.suggestions[:5]:  # Top 5 suggestions
                    suggestions.append({
                        'type': 'ai_suggestion',
                        'severity': 'medium',
                        'message': str(suggestion),
                        'file': 'multiple',
                        'line': None,
                        'suggestion': 'Consider this improvement'
                    })
            
            return suggestions
            
        except Exception as e:
            show_warning(f"Failed to generate AI suggestions: {e}")
            return []
    
    def assign_reviewer(self, review_id: str, reviewer: str) -> bool:
        """Assign a reviewer to a code review."""
        for review in self.code_reviews:
            if review.id == review_id:
                review.reviewer = reviewer
                review.updated_at = datetime.now()
                show_success(f"Assigned {reviewer} to review {review_id}")
                return True
        return False
    
    def add_review_comment(self, review_id: str, author: str, comment: str, file: str = None, line: int = None):
        """Add a comment to a code review."""
        for review in self.code_reviews:
            if review.id == review_id:
                comment_data = {
                    'author': author,
                    'comment': comment,
                    'file': file,
                    'line': line,
                    'timestamp': datetime.now(),
                    'resolved': False
                }
                review.comments.append(comment_data)
                review.updated_at = datetime.now()
                
                self.activities.append(TeamActivity(
                    type="review",
                    description=f"Commented on {review_id}",
                    author=author,
                    timestamp=datetime.now(),
                    metadata={"review_id": review_id, "comment": comment[:50]}
                ))
                
                show_success(f"Added comment to {review_id}")
                return True
        return False
    
    def calculate_collaboration_metrics(self) -> CollaborationMetrics:
        """Calculate team collaboration metrics."""
        # Simulate metrics (in real implementation, would analyze actual data)
        total_commits = sum(1 for activity in self.activities if activity.type == "commit")
        active_members = len([m for m in self.team_members if m.active])
        open_prs = len([r for r in self.code_reviews if r.status == "pending"])
        merged_prs = len([r for r in self.code_reviews if r.status == "approved"])
        
        # Calculate average review time (simulate)
        code_review_time_avg = 24.5  # hours
        
        # Calculate collaboration score
        collaboration_score = min(100, (active_members * 20 + merged_prs * 5 + total_commits * 0.1))
        
        return CollaborationMetrics(
            total_commits=total_commits,
            active_members=active_members,
            open_prs=open_prs,
            merged_prs=merged_prs,
            code_review_time_avg=code_review_time_avg,
            collaboration_score=collaboration_score
        )
    
    def get_team_activity_feed(self, limit: int = 20) -> List[TeamActivity]:
        """Get recent team activity."""
        return sorted(self.activities, key=lambda x: x.timestamp, reverse=True)[:limit]
    
    def get_pending_reviews(self) -> List[CodeReview]:
        """Get pending code reviews."""
        return [r for r in self.code_reviews if r.status == "pending"]
    
    def get_member_workload(self, member_name: str) -> Dict[str, Any]:
        """Get workload information for a team member."""
        pending_reviews = len([r for r in self.code_reviews if r.reviewer == member_name and r.status == "pending"])
        authored_prs = len([r for r in self.code_reviews if r.author == member_name])
        
        return {
            'pending_reviews': pending_reviews,
            'authored_prs': authored_prs,
            'workload_score': pending_reviews * 2 + authored_prs
        }


def display_team_overview(collaboration: TeamCollaboration):
    """Display team collaboration overview."""
    metrics = collaboration.calculate_collaboration_metrics()
    
    click.echo("\n" + "="*80)
    click.echo("👥 Team Collaboration Overview")
    click.echo("="*80)
    
    # Metrics
    click.echo(f"\n📊 Collaboration Metrics:")
    click.echo(f"   🧑‍💻 Active Members: {metrics.active_members}")
    click.echo(f"   📝 Total Commits: {metrics.total_commits}")
    click.echo(f"   🔀 Open PRs: {metrics.open_prs} | ✅ Merged: {metrics.merged_prs}")
    click.echo(f"   ⏱️  Avg Review Time: {metrics.code_review_time_avg:.1f}h")
    click.echo(f"   🤝 Collaboration Score: {metrics.collaboration_score:.1f}/100")
    
    # Team Members
    if collaboration.team_members:
        click.echo(f"\n👨‍💻 Team Members:")
        for member in collaboration.team_members:
            status = "🟢" if member.active else "🔴"
            workload = collaboration.get_member_workload(member.name)
            click.echo(f"   {status} {member.name} ({member.role}) - {workload['pending_reviews']} pending reviews")
            if member.specialties:
                click.echo(f"      🎯 {', '.join(member.specialties[:3])}")
    
    # Pending Reviews
    pending_reviews = collaboration.get_pending_reviews()
    if pending_reviews:
        click.echo(f"\n🔍 Pending Reviews:")
        for review in pending_reviews[:5]:
            click.echo(f"   📋 {review.id}: {review.title}")
            click.echo(f"      👤 {review.author} → {review.reviewer or 'Unassigned'}")
            click.echo(f"      📁 {len(review.files)} files | 💬 {len(review.comments)} comments")
    
    # Recent Activity
    activities = collaboration.get_team_activity_feed(10)
    if activities:
        click.echo(f"\n📈 Recent Activity:")
        for activity in activities:
            type_emoji = {'commit': '📝', 'pr': '🔀', 'issue': '🐛', 'review': '🔍', 'deploy': '🚀'}
            time_ago = datetime.now() - activity.timestamp
            hours_ago = int(time_ago.total_seconds() / 3600)
            click.echo(f"   {type_emoji.get(activity.type, '📋')} {activity.description} - {activity.author} ({hours_ago}h ago)")
    
    click.echo("\n" + "="*80)


@click.group()
def team():
    """Team collaboration and communication features."""
    pass


@team.command()
@click.option('--refresh', is_flag=True, help='Refresh team data')
def overview(refresh: bool):
    """Show team collaboration overview."""
    project_path = Path.cwd()
    collaboration = TeamCollaboration(project_path)
    
    # Add some sample team members for demo
    collaboration.add_team_member("Alex Chen", "alex@example.com", "Senior Developer", ["Python", "AI", "Backend"])
    collaboration.add_team_member("Sarah Johnson", "sarah@example.com", "Frontend Developer", ["React", "TypeScript", "UI/UX"])
    collaboration.add_team_member("Mike Wilson", "mike@example.com", "DevOps Engineer", ["Docker", "CI/CD", "Cloud"])
    
    # Add sample activities
    collaboration.activities.extend([
        TeamActivity("commit", "Fix authentication bug", "Alex Chen", datetime.now() - timedelta(hours=2), {}),
        TeamActivity("pr", "Add user dashboard", "Sarah Johnson", datetime.now() - timedelta(hours=4), {}),
        TeamActivity("deploy", "Deploy to staging", "Mike Wilson", datetime.now() - timedelta(hours=6), {}),
    ])
    
    display_team_overview(collaboration)


@team.command()
@click.argument('title')
@click.argument('author')
@click.argument('files', nargs=-1, required=True)
def create_pr(title: str, author: str, files: tuple):
    """Create a new code review/pull request."""
    project_path = Path.cwd()
    collaboration = TeamCollaboration(project_path)
    
    review = collaboration.create_code_review(title, author, list(files))
    
    click.echo(f"\n📋 Created Pull Request:")
    click.echo(f"   ID: {review.id}")
    click.echo(f"   Title: {review.title}")
    click.echo(f"   Author: {review.author}")
    click.echo(f"   Files: {', '.join(review.files)}")
    click.echo(f"   Status: {review.status}")


@team.command()
@click.argument('review_id')
@click.argument('reviewer')
def assign(review_id: str, reviewer: str):
    """Assign a reviewer to a pull request."""
    project_path = Path.cwd()
    collaboration = TeamCollaboration(project_path)
    
    if collaboration.assign_reviewer(review_id, reviewer):
        click.echo(f"✅ Assigned {reviewer} to review {review_id}")
    else:
        click.echo(f"❌ Review {review_id} not found")


@team.command()
@click.argument('review_id')
@click.argument('author')
@click.argument('comment')
@click.option('--file', help='File to comment on')
@click.option('--line', type=int, help='Line number to comment on')
def comment(review_id: str, author: str, comment: str, file: str = None, line: int = None):
    """Add a comment to a pull request."""
    project_path = Path.cwd()
    collaboration = TeamCollaboration(project_path)
    
    if collaboration.add_review_comment(review_id, author, comment, file, line):
        click.echo(f"✅ Added comment to {review_id}")
    else:
        click.echo(f"❌ Review {review_id} not found")


@team.command()
@click.argument('review_id')
@click.option('--ai-suggestions', is_flag=True, help='Generate AI suggestions')
def review(review_id: str, ai_suggestions: bool):
    """Review a pull request with optional AI assistance."""
    project_path = Path.cwd()
    collaboration = TeamCollaboration(project_path)
    
    # Find the review
    review = None
    for r in collaboration.code_reviews:
        if r.id == review_id:
            review = r
            break
    
    if not review:
        click.echo(f"❌ Review {review_id} not found")
        return
    
    click.echo(f"\n📋 Review Details:")
    click.echo(f"   ID: {review.id}")
    click.echo(f"   Title: {review.title}")
    click.echo(f"   Author: {review.author}")
    click.echo(f"   Reviewer: {review.reviewer}")
    click.echo(f"   Status: {review.status}")
    click.echo(f"   Files: {', '.join(review.files)}")
    
    if review.comments:
        click.echo(f"\n💬 Comments:")
        for comment in review.comments:
            click.echo(f"   👤 {comment['author']}: {comment['comment']}")
            if comment['file']:
                click.echo(f"      📁 {comment['file']}")
                if comment['line']:
                    click.echo(f"      📍 Line {comment['line']}")
    
    if ai_suggestions:
        click.echo(f"\n🤖 Generating AI suggestions...")
        suggestions = asyncio.run(collaboration.generate_ai_review_suggestions(review))
        
        if suggestions:
            click.echo(f"\n💡 AI Suggestions:")
            for i, suggestion in enumerate(suggestions, 1):
                click.echo(f"   {i}. {suggestion['message']}")
        else:
            click.echo(f"   No AI suggestions available")


# Add team commands to main CLI
def register_team_commands(main_cli):
    """Register team commands with main CLI."""
    main_cli.add_command(team, name='team')
