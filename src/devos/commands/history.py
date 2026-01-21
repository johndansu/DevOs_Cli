"""
Command History Viewer - CLI Command for History Management
Provides commands to view, analyze, and manage command history.
"""

import click
from pathlib import Path
from typing import Optional
from datetime import datetime, timedelta

from devos.core.command_history import get_command_history, get_command_suggestions
from devos.core.progress import show_success, show_info, show_warning


@click.group()
def history():
    """Command history and suggestions management."""
    pass


@history.command()
@click.option('--limit', type=int, default=10, help='Number of recent commands to show')
@click.option('--detailed', is_flag=True, help='Show detailed information')
def recent(limit: int, detailed: bool):
    """Show recent command history."""
    history_manager = get_command_history()
    recent_commands = history_manager.get_recent_commands(limit)
    
    if not recent_commands:
        show_info("No command history found")
        return
    
    click.echo(f"\n📜 Recent {len(recent_commands)} Commands:")
    click.echo("=" * 60)
    
    for i, record in enumerate(recent_commands, 1):
        status_emoji = "✅" if record.success else "❌"
        timestamp = record.timestamp.strftime("%H:%M:%S")
        
        click.echo(f"{i:2d}. {status_emoji} {timestamp} - {record.command}")
        
        if detailed:
            click.echo(f"     📁 {record.working_directory}")
            click.echo(f"     ⏱️  {record.duration:.2f}s")
            if record.args:
                args_str = ", ".join([f"{k}={v}" for k, v in record.args.items()])
                click.echo(f"     🔧 {args_str}")
            click.echo()


@history.command()
@click.option('--days', type=int, default=30, help='Number of days to analyze')
@click.option('--limit', type=int, default=10, help='Number of top commands to show')
def frequent(days: int, limit: int):
    """Show most frequently used commands."""
    history_manager = get_command_history()
    frequent_commands = history_manager.get_frequent_commands(limit, days)
    
    if not frequent_commands:
        show_info(f"No commands found in the last {days} days")
        return
    
    click.echo(f"\n🔥 Most Used Commands (Last {days} days):")
    click.echo("=" * 50)
    
    for i, (command, count) in enumerate(frequent_commands, 1):
        click.echo(f"{i:2d}. {command} - {count} times")
    
    # Show usage percentage
    total_commands = sum(count for _, count in frequent_commands)
    click.echo(f"\n📊 Total commands: {total_commands}")


@history.command()
def stats():
    """Show command usage statistics."""
    history_manager = get_command_history()
    stats = history_manager.get_command_stats()
    
    if not stats:
        show_info("No command history found")
        return
    
    click.echo("\n📈 Command Statistics:")
    click.echo("=" * 40)
    
    click.echo(f"📊 Total commands: {stats['total_commands']}")
    click.echo(f"✅ Successful: {stats['successful_commands']}")
    click.echo(f"❌ Failed: {stats['failed_commands']}")
    click.echo(f"📈 Success rate: {stats['success_rate']:.1f}%")
    
    if stats['average_duration'] > 0:
        click.echo(f"⏱️  Average duration: {stats['average_duration']:.2f}s")
    
    if stats['most_used_commands']:
        click.echo(f"\n🏆 Most Used Commands:")
        for command, count in stats['most_used_commands'][:3]:
            click.echo(f"   • {command}: {count} times")
    
    if stats['peak_hour'] >= 0:
        click.echo(f"⏰ Peak usage hour: {stats['peak_hour']:02d}:00")
    
    if stats['last_command']:
        last_time = datetime.fromisoformat(stats['last_command'])
        time_ago = datetime.now() - last_time
        click.echo(f"🕐 Last command: {time_ago} ago")


@history.command()
@click.option('--partial', default="", help='Partial command to match')
@click.option('--context-aware', is_flag=True, help='Include context-aware suggestions')
def suggest(partial: str, context_aware: bool):
    """Get intelligent command suggestions."""
    # Build context
    context = None
    if context_aware:
        context = {
            'current_directory': str(Path.cwd()),
            'recent_files': [],  # Could be enhanced to track recent files
            'git_status': ''     # Could be enhanced to check git status
        }
    
    suggestions = get_command_suggestions(partial, context)
    
    if not suggestions:
        show_info("No suggestions available")
        return
    
    click.echo(f"\n💡 Command Suggestions:")
    click.echo("=" * 40)
    
    for i, suggestion in enumerate(suggestions, 1):
        category_emoji = {
            'context': '🎯',
            'frequent': '🔥',
            'workflow': '⏰',
            'match': '🔍'
        }.get(suggestion['category'], '💭')
        
        click.echo(f"{i}. {category_emoji} {suggestion['command']}")
        click.echo(f"   {suggestion['description']}")
        click.echo()


@history.command()
@click.option('--confirm', is_flag=True, help='Confirm before clearing')
def clear(confirm: bool):
    """Clear command history."""
    if not confirm:
        click.echo("⚠️  This will permanently delete your command history.")
        click.echo("   Use --confirm to proceed.")
        return
    
    history_manager = get_command_history()
    history_manager.history.clear()
    history_manager.save_history()
    
    show_success("Command history cleared")


@history.command()
@click.option('--export', type=click.Path(), help='Export history to file')
def export(export: Optional[str]):
    """Export command history."""
    history_manager = get_command_history()
    
    if export:
        # Export to file
        export_path = Path(export)
        try:
            with open(export_path, 'w', encoding='utf-8') as f:
                f.write("# DevOS Command History\n")
                f.write(f"# Exported on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
                
                for record in history_manager.history:
                    status = "✅" if record.success else "❌"
                    timestamp = record.timestamp.strftime("%Y-%m-%d %H:%M:%S")
                    f.write(f"{status} {timestamp} - {record.command}\n")
                    f.write(f"   📁 {record.working_directory}\n")
                    f.write(f"   ⏱️  {record.duration:.2f}s\n")
                    if record.args:
                        args_str = ", ".join([f"{k}={v}" for k, v in record.args.items()])
                        f.write(f"   🔧 {args_str}\n")
                    f.write("\n")
            
            show_success(f"History exported to {export}")
        except Exception as e:
            show_warning(f"Failed to export history: {e}")
    else:
        # Display to console
        recent_commands = history_manager.get_recent_commands(50)
        
        if not recent_commands:
            show_info("No command history to export")
            return
        
        click.echo("# DevOS Command History Export")
        click.echo(f"# Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        click.echo()
        
        for record in recent_commands:
            status = "✅" if record.success else "❌"
            timestamp = record.timestamp.strftime("%Y-%m-%d %H:%M:%S")
            click.echo(f"{status} {timestamp} - {record.command}")
            click.echo(f"   📁 {record.working_directory}")
            click.echo(f"   ⏱️  {record.duration:.2f}s")
            if record.args:
                args_str = ", ".join([f"{k}={v}" for k, v in record.args.items()])
                click.echo(f"   🔧 {args_str}")
            click.echo()


# Add the history group to main CLI
def register_history_commands(main_cli):
    """Register history commands with main CLI."""
    main_cli.add_command(history, name='history')
