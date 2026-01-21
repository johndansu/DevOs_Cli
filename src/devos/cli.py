"""Main CLI entry point for DevOS."""

import click
from pathlib import Path

from devos.commands.init import init
from devos.commands.track import start, stop, status, list as track_list
from devos.commands.env import set as env_set, get as env_get, list as env_list, delete as env_delete, generate_example, export
from devos.commands.report import weekly, summary, projects
from devos.commands.config import show as config_show, set as config_set, reset as config_reset, init as config_init
from devos.commands.interactive import interactive
from devos.commands.quick import now, done, status as quick_status, today, projects as quick_projects, recent, setup
from devos.commands.completion import completion, shells, setup_completion
from devos.commands.test import test as test_cmd, coverage, discover, generate as test_generate
from devos.commands.docs import generate as docs_generate, serve, check, api as docs_api, readme, changelog as docs_changelog
from devos.commands.ai import review, explain, refactor, test, example, debug, chat, suggest, generate
from devos.commands.ai_config import ai_config
from devos.commands.groq import groq, groq_review, groq_explain, groq_chat, groq_generate, groq_status
from devos.commands.groq_enhanced import groq_analyze as ai_analyze, groq_security_scan as ai_security_scan, groq_architecture_map as ai_architecture_map, groq_enhance as ai_enhance, groq_project_summary as ai_project_summary
from devos.commands.ai_chat import ai_interactive_chat
from devos.commands.history import history as cmd_history
from devos.commands.dashboard import dashboard
from devos.commands.team_collab import team, register_team_commands
from devos.commands.reports import reports, register_reports_commands
from devos.commands.workflow_automation import workflow, register_workflow_commands
from devos.commands.deploy import deploy, rollback, status as deploy_status, setup as deploy_setup, history, monitor, pipeline
from devos.commands.api import mock, test as api_test, docs as api_docs, call, load, validate, add, monitor as api_monitor
from devos.commands.project import add as project_add, list as project_list, status as project_status, tasks, issues, notes
from devos.core.config import Config
from devos.core.database import Database
from devos.core.exceptions import handle_error
from devos.core.ai_config import initialize_ai_providers


@click.group()
@click.version_option()
@click.option('--verbose', '-v', is_flag=True, help='Enable verbose output')
@click.pass_context
def main(ctx, verbose: bool):
    """DevOS - One command-line to manage your entire dev life."""
    # Ensure context object exists
    ctx.ensure_object(dict)
    ctx.obj['verbose'] = verbose
    
    # Initialize config and database for all commands
    try:
        ctx.obj['config'] = Config()
        ctx.obj['db'] = Database()
        
        # Initialize AI providers
        initialize_ai_providers()
        
    except Exception as e:
        if verbose:
            click.echo(f"Error initializing DevOS: {e}", err=True)
        handle_error(e)
        ctx.exit(1)


# Register all commands following the pattern: devos <domain> <action>
main.add_command(init, name='init')

# Add common aliases
main.add_command(init, name='create')
main.add_command(init, name='new')

# Add interactive mode
main.add_command(interactive, name='interactive')
main.add_command(interactive, name='i')
main.add_command(interactive, name='wizard')

# Track commands
track_group = click.Group('track')
track_group.add_command(start, name='start')
track_group.add_command(stop, name='stop')
track_group.add_command(status, name='status')
track_group.add_command(track_list, name='list')
main.add_command(track_group, name='track')

# Add track aliases
main.add_command(track_group, name='t')
main.add_command(track_group, name='time')

# Env commands
env_group = click.Group('env')
env_group.add_command(env_set, name='set')
env_group.add_command(env_get, name='get')
env_group.add_command(env_list, name='list')
env_group.add_command(env_delete, name='delete')
env_group.add_command(generate_example, name='generate-example')
env_group.add_command(export, name='export')
main.add_command(env_group, name='env')

# Add env aliases
main.add_command(env_group, name='e')
main.add_command(env_group, name='environment')

# Report commands
report_group = click.Group('report')
report_group.add_command(weekly, name='weekly')
report_group.add_command(summary, name='summary')
report_group.add_command(projects, name='projects')
main.add_command(report_group, name='report')

# Add report aliases
main.add_command(report_group, name='r')
main.add_command(report_group, name='stats')

# Project management commands
project_group = click.Group('project')
project_group.add_command(project_add, name='add')
project_group.add_command(project_list, name='list')
project_group.add_command(project_status, name='status')
project_group.add_command(tasks, name='tasks')
project_group.add_command(issues, name='issues')
project_group.add_command(notes, name='notes')
main.add_command(project_group, name='project')

# Add project aliases
main.add_command(project_group, name='proj')
main.add_command(project_group, name='pm')

# Config commands
config_group = click.Group('config')
config_group.add_command(config_show, name='show')
config_group.add_command(config_set, name='set')
config_group.add_command(config_reset, name='reset')
config_group.add_command(config_init, name='init')
main.add_command(config_group, name='config')

# Add config aliases
main.add_command(config_group, name='c')
main.add_command(config_group, name='settings')

# Quick commands
main.add_command(now, name='now')
main.add_command(done, name='done')
main.add_command(quick_status, name='status')
main.add_command(today, name='today')
main.add_command(quick_projects, name='projects')
main.add_command(recent, name='recent')
main.add_command(setup, name='setup')

# Completion commands
main.add_command(completion, name='completion')
main.add_command(shells, name='shells')
main.add_command(setup_completion, name='setup-completion')

# Test commands
test_group = click.Group('test')
test_group.add_command(test_cmd, name='run')
test_group.add_command(coverage, name='coverage')
test_group.add_command(discover, name='discover')
test_group.add_command(test_generate, name='generate')
main.add_command(test_group, name='test')

# Docs commands
docs_group = click.Group('docs')
docs_group.add_command(docs_generate, name='generate')
docs_group.add_command(serve, name='serve')
docs_group.add_command(check, name='check')
docs_group.add_command(docs_api, name='api')
docs_group.add_command(readme, name='readme')
docs_group.add_command(docs_changelog, name='changelog')
main.add_command(docs_group, name='docs')

# Groq commands (fast AI)
main.add_command(groq, name='groq')
main.add_command(groq, name='ai-fast')

# Enhanced AI commands
main.add_command(ai_analyze, name='ai-analyze')
main.add_command(ai_security_scan, name='ai-security-scan')
main.add_command(ai_architecture_map, name='ai-architecture-map')
main.add_command(ai_enhance, name='ai-enhance')
main.add_command(ai_project_summary, name='ai-project-summary')

# Interactive AI chat
main.add_command(ai_interactive_chat, name='ai-interactive-chat')

# Business features
main.add_command(team, name='team')
main.add_command(reports, name='reports')
main.add_command(workflow, name='workflow')

# AI config commands
main.add_command(ai_config, name='ai-config')

# AI commands
ai_group = click.Group('ai')
ai_group.add_command(review, name='review')
ai_group.add_command(explain, name='explain')
ai_group.add_command(refactor, name='refactor')
ai_group.add_command(test, name='test')
ai_group.add_command(example, name='example')
ai_group.add_command(debug, name='debug')
ai_group.add_command(chat, name='chat')
ai_group.add_command(suggest, name='suggest')
ai_group.add_command(generate, name='generate')
main.add_command(ai_group, name='ai')

# Deploy commands
deploy_group = click.Group('deploy')
deploy_group.add_command(deploy, name='deploy')
deploy_group.add_command(rollback, name='rollback')
deploy_group.add_command(deploy_status, name='status')
deploy_group.add_command(deploy_setup, name='setup')
deploy_group.add_command(history, name='history')
deploy_group.add_command(monitor, name='monitor')
deploy_group.add_command(pipeline, name='pipeline')
main.add_command(deploy_group, name='deploy')

# API commands
api_group = click.Group('api')
api_group.add_command(mock, name='mock')
api_group.add_command(api_test, name='test')
api_group.add_command(api_docs, name='docs')
api_group.add_command(call, name='call')
api_group.add_command(load, name='load')
api_group.add_command(validate, name='validate')
api_group.add_command(add, name='add')
api_group.add_command(api_monitor, name='monitor')
main.add_command(api_group, name='api')


if __name__ == '__main__':
    main()
