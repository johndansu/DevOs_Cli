"""
Workflow Automation - Intelligent Process Automation
Provides automated workflows, triggers, and process optimization.
"""

import asyncio
import json
from pathlib import Path
from typing import Dict, List, Any, Optional, Callable
from dataclasses import dataclass, asdict
from datetime import datetime, timedelta
import click
from collections import defaultdict
import subprocess
import os

from devos.core.progress import show_success, show_info, show_warning
from devos.core.ai_config import get_ai_config_manager, initialize_ai_providers
from devos.core.ai import get_ai_service, AIServiceError, UserPreferences
from devos.core.ai.enhanced_context import EnhancedContextBuilder
from devos.core.rich_progress import show_progress, show_steps, AnimatedSpinner


@dataclass
class WorkflowTrigger:
    """Workflow trigger definition."""
    id: str
    name: str
    type: str  # file_change, time_based, event_based, manual
    condition: Dict[str, Any]
    enabled: bool


@dataclass
class WorkflowAction:
    """Workflow action definition."""
    id: str
    name: str
    type: str  # command, script, ai_analysis, notification
    parameters: Dict[str, Any]
    timeout: int = 300  # seconds


@dataclass
class Workflow:
    """Complete workflow definition."""
    id: str
    name: str
    description: str
    triggers: List[WorkflowTrigger]
    actions: List[WorkflowAction]
    enabled: bool
    created_at: datetime
    last_run: Optional[datetime]
    run_count: int
    success_count: int


@dataclass
class WorkflowExecution:
    """Workflow execution record."""
    workflow_id: str
    execution_id: str
    started_at: datetime
    completed_at: Optional[datetime]
    status: str  # running, completed, failed, cancelled
    results: List[Dict[str, Any]]
    error_message: Optional[str]


class WorkflowEngine:
    """Workflow automation engine."""
    
    def __init__(self, project_path: Path):
        self.project_path = project_path
        self.workflows: List[Workflow] = []
        self.executions: List[WorkflowExecution] = []
        self.running = False
        
    def create_workflow(self, name: str, description: str) -> Workflow:
        """Create a new workflow."""
        workflow_id = f"workflow-{len(self.workflows) + 1:03d}"
        
        workflow = Workflow(
            id=workflow_id,
            name=name,
            description=description,
            triggers=[],
            actions=[],
            enabled=True,
            created_at=datetime.now(),
            last_run=None,
            run_count=0,
            success_count=0
        )
        
        self.workflows.append(workflow)
        show_success(f"Created workflow: {name} ({workflow_id})")
        return workflow
    
    def add_trigger(self, workflow_id: str, trigger_type: str, condition: Dict[str, Any]) -> bool:
        """Add a trigger to a workflow."""
        for workflow in self.workflows:
            if workflow.id == workflow_id:
                trigger_id = f"trigger-{len(workflow.triggers) + 1:02d}"
                trigger = WorkflowTrigger(
                    id=trigger_id,
                    name=f"Trigger {len(workflow.triggers) + 1}",
                    type=trigger_type,
                    condition=condition,
                    enabled=True
                )
                workflow.triggers.append(trigger)
                show_success(f"Added {trigger_type} trigger to {workflow.name}")
                return True
        return False
    
    def add_action(self, workflow_id: str, action_type: str, parameters: Dict[str, Any]) -> bool:
        """Add an action to a workflow."""
        for workflow in self.workflows:
            if workflow.id == workflow_id:
                action_id = f"action-{len(workflow.actions) + 1:02d}"
                action = WorkflowAction(
                    id=action_id,
                    name=f"Action {len(workflow.actions) + 1}",
                    type=action_type,
                    parameters=parameters,
                    timeout=parameters.get('timeout', 300)
                )
                workflow.actions.append(action)
                show_success(f"Added {action_type} action to {workflow.name}")
                return True
        return False
    
    async def execute_action(self, action: WorkflowAction) -> Dict[str, Any]:
        """Execute a single workflow action."""
        result = {
            'action_id': action.id,
            'action_name': action.name,
            'started_at': datetime.now(),
            'status': 'running',
            'output': '',
            'error': None
        }
        
        try:
            if action.type == 'command':
                # Execute shell command
                cmd = action.parameters.get('command')
                if cmd:
                    process = await asyncio.create_subprocess_shell(
                        cmd,
                        stdout=asyncio.subprocess.PIPE,
                        stderr=asyncio.subprocess.PIPE,
                        cwd=self.project_path
                    )
                    
                    stdout, stderr = await asyncio.wait_for(
                        process.communicate(), 
                        timeout=action.timeout
                    )
                    
                    result['output'] = stdout.decode('utf-8')
                    result['return_code'] = process.returncode
                    result['status'] = 'completed' if process.returncode == 0 else 'failed'
                    
                    if process.returncode != 0:
                        result['error'] = stderr.decode('utf-8')
            
            elif action.type == 'script':
                # Execute Python script
                script_path = self.project_path / action.parameters.get('script_path', '')
                if script_path.exists():
                    with open(script_path, 'r') as f:
                        script_content = f.read()
                    
                    # Execute script in isolated namespace
                    namespace = {'__file__': str(script_path)}
                    try:
                        exec(script_content, namespace)
                        result['output'] = 'Script executed successfully'
                        result['status'] = 'completed'
                    except Exception as e:
                        result['error'] = str(e)
                        result['status'] = 'failed'
                else:
                    result['error'] = f"Script not found: {script_path}"
                    result['status'] = 'failed'
            
            elif action.type == 'ai_analysis':
                # Execute AI analysis
                analysis_type = action.parameters.get('analysis_type', 'general')
                
                try:
                    config_manager = get_ai_config_manager()
                    initialize_ai_providers()
                    ai_service = await get_ai_service()
                    
                    # Build context
                    context_builder = EnhancedContextBuilder()
                    enhanced_context = await context_builder.build_enhanced_context(self.project_path)
                    
                    if analysis_type == 'security':
                        # Run security analysis
                        vulnerabilities = enhanced_context.architecture.security_vulnerabilities
                        result['output'] = f"Found {len(vulnerabilities)} security issues"
                        result['details'] = vulnerabilities[:5]  # Top 5 issues
                    
                    elif analysis_type == 'code_quality':
                        # Run code quality analysis
                        code_smells = enhanced_context.architecture.code_smells
                        result['output'] = f"Found {code_smells} code smells"
                        result['details'] = {
                            'total_files': enhanced_context.architecture.total_files,
                            'code_smells': code_smells,
                            'patterns': enhanced_context.architecture.architecture_patterns
                        }
                    
                    else:
                        # General analysis
                        result['output'] = f"Analyzed {enhanced_context.architecture.total_files} files"
                        result['details'] = {
                            'languages': enhanced_context.architecture.languages,
                            'frameworks': enhanced_context.architecture.frameworks,
                            'security_score': enhanced_context.architecture.security_score
                        }
                    
                    result['status'] = 'completed'
                    
                except Exception as e:
                    result['error'] = f"AI analysis failed: {e}"
                    result['status'] = 'failed'
            
            elif action.type == 'notification':
                # Send notification (simulate)
                message = action.parameters.get('message', 'Workflow notification')
                channel = action.parameters.get('channel', 'console')
                
                if channel == 'console':
                    click.echo(f"🔔 Notification: {message}")
                
                result['output'] = f"Notification sent via {channel}: {message}"
                result['status'] = 'completed'
            
            else:
                result['error'] = f"Unknown action type: {action.type}"
                result['status'] = 'failed'
        
        except asyncio.TimeoutError:
            result['error'] = f"Action timed out after {action.timeout} seconds"
            result['status'] = 'failed'
        
        except Exception as e:
            result['error'] = str(e)
            result['status'] = 'failed'
        
        result['completed_at'] = datetime.now()
        return result
    
    async def execute_workflow(self, workflow_id: str, trigger_info: Dict[str, Any] = None) -> WorkflowExecution:
        """Execute a workflow."""
        # Find workflow
        workflow = None
        for w in self.workflows:
            if w.id == workflow_id and w.enabled:
                workflow = w
                break
        
        if not workflow:
            raise ValueError(f"Workflow {workflow_id} not found or disabled")
        
        execution_id = f"exec-{len(self.executions) + 1:04d}"
        
        execution = WorkflowExecution(
            workflow_id=workflow_id,
            execution_id=execution_id,
            started_at=datetime.now(),
            completed_at=None,
            status='running',
            results=[],
            error_message=None
        )
        
        self.executions.append(execution)
        
        try:
            click.echo(f"🚀 Executing workflow: {workflow.name}")
            
            # Execute actions in sequence
            for i, action in enumerate(workflow.actions):
                click.echo(f"   Step {i+1}/{len(workflow.actions)}: {action.name}")
                
                with AnimatedSpinner(f"Running {action.name}") as spinner:
                    result = await self.execute_action(action)
                
                execution.results.append(result)
                
                if result['status'] == 'failed':
                    click.echo(f"   ❌ Action failed: {result.get('error', 'Unknown error')}")
                    # Continue with other actions or stop? For now, continue
                else:
                    click.echo(f"   ✅ Action completed")
            
            # Update workflow stats
            workflow.last_run = datetime.now()
            workflow.run_count += 1
            
            # Check if all actions succeeded
            failed_actions = [r for r in execution.results if r['status'] == 'failed']
            if not failed_actions:
                workflow.success_count += 1
                execution.status = 'completed'
                click.echo(f"✅ Workflow completed successfully")
            else:
                execution.status = 'completed_with_errors'
                click.echo(f"⚠️  Workflow completed with {len(failed_actions)} errors")
        
        except Exception as e:
            execution.status = 'failed'
            execution.error_message = str(e)
            click.echo(f"❌ Workflow failed: {e}")
        
        finally:
            execution.completed_at = datetime.now()
        
        return execution
    
    def check_triggers(self) -> List[str]:
        """Check all triggers and return triggered workflow IDs."""
        triggered_workflows = []
        
        for workflow in self.workflows:
            if not workflow.enabled:
                continue
            
            for trigger in workflow.triggers:
                if not trigger.enabled:
                    continue
                
                triggered = False
                
                if trigger.type == 'manual':
                    # Manual triggers are checked separately
                    pass
                
                elif trigger.type == 'time_based':
                    # Check time-based triggers
                    condition = trigger.condition
                    if condition.get('type') == 'interval':
                        # Check if enough time has passed since last run
                        interval_minutes = condition.get('interval_minutes', 60)
                        if workflow.last_run is None:
                            triggered = True
                        else:
                            time_since_last = datetime.now() - workflow.last_run
                            if time_since_last.total_seconds() >= interval_minutes * 60:
                                triggered = True
                
                elif trigger.type == 'file_change':
                    # Check file change triggers (simplified)
                    condition = trigger.condition
                    file_pattern = condition.get('pattern', '*')
                    check_path = self.project_path / condition.get('path', '.')
                    
                    if check_path.exists():
                        # Simple check: if any files match pattern and are recent
                        import glob
                        files = glob.glob(str(check_path / file_pattern))
                        recent_files = [f for f in files if 
                                       datetime.fromtimestamp(Path(f).stat().st_mtime) > 
                                       (datetime.now() - timedelta(minutes=5))]
                        if recent_files:
                            triggered = True
                
                if triggered:
                    triggered_workflows.append(workflow.id)
                    break  # Only trigger once per workflow check
        
        return triggered_workflows
    
    def get_workflow_stats(self) -> Dict[str, Any]:
        """Get workflow execution statistics."""
        total_workflows = len(self.workflows)
        enabled_workflows = len([w for w in self.workflows if w.enabled])
        total_executions = len(self.executions)
        successful_executions = len([e for e in self.executions if e.status == 'completed'])
        failed_executions = len([e for e in self.executions if e.status == 'failed'])
        
        return {
            'total_workflows': total_workflows,
            'enabled_workflows': enabled_workflows,
            'total_executions': total_executions,
            'successful_executions': successful_executions,
            'failed_executions': failed_executions,
            'success_rate': (successful_executions / total_executions * 100) if total_executions > 0 else 0
        }


def display_workflows(workflow_engine: WorkflowEngine):
    """Display all workflows and their status."""
    click.echo("\n" + "="*80)
    click.echo("⚙️  Workflow Automation")
    click.echo("="*80)
    
    stats = workflow_engine.get_workflow_stats()
    click.echo(f"\n📊 Workflow Statistics:")
    click.echo(f"   Total Workflows: {stats['total_workflows']}")
    click.echo(f"   Enabled: {stats['enabled_workflows']}")
    click.echo(f"   Total Executions: {stats['total_executions']}")
    click.echo(f"   Success Rate: {stats['success_rate']:.1f}%")
    
    if workflow_engine.workflows:
        click.echo(f"\n📋 Workflows:")
        for workflow in workflow_engine.workflows:
            status_emoji = "✅" if workflow.enabled else "❌"
            click.echo(f"   {status_emoji} {workflow.name} ({workflow.id})")
            click.echo(f"      📝 {workflow.description}")
            click.echo(f"      🔧 Triggers: {len(workflow.triggers)} | 🎯 Actions: {len(workflow.actions)}")
            click.echo(f"      📊 Runs: {workflow.run_count} | ✅ Success: {workflow.success_count}")
            if workflow.last_run:
                time_ago = datetime.now() - workflow.last_run
                click.echo(f"      ⏰ Last run: {time_ago} ago")
    
    if workflow_engine.executions:
        click.echo(f"\n📈 Recent Executions:")
        recent_executions = sorted(workflow_engine.executions, 
                                key=lambda x: x.started_at, reverse=True)[:5]
        
        for execution in recent_executions:
            status_emoji = {'completed': '✅', 'failed': '❌', 'running': '🔄', 
                           'completed_with_errors': '⚠️'}.get(execution.status, '❓')
            
            workflow_name = next((w.name for w in workflow_engine.workflows 
                                 if w.id == execution.workflow_id), execution.workflow_id)
            
            click.echo(f"   {status_emoji} {workflow_name} - {execution.execution_id}")
            click.echo(f"      📅 {execution.started_at.strftime('%Y-%m-%d %H:%M')}")
            
            if execution.results:
                successful_actions = len([r for r in execution.results if r['status'] == 'completed'])
                click.echo(f"      📊 {successful_actions}/{len(execution.results)} actions successful")
    
    click.echo("\n" + "="*80)


@click.group()
def workflow():
    """Workflow automation and process management."""
    pass


@workflow.command()
def list():
    """List all workflows."""
    project_path = Path.cwd()
    engine = WorkflowEngine(project_path)
    display_workflows(engine)


@workflow.command()
@click.argument('name')
@click.argument('description')
def create(name: str, description: str):
    """Create a new workflow."""
    project_path = Path.cwd()
    engine = WorkflowEngine(project_path)
    
    workflow = engine.create_workflow(name, description)
    
    click.echo(f"\n📋 Created Workflow:")
    click.echo(f"   ID: {workflow.id}")
    click.echo(f"   Name: {workflow.name}")
    click.echo(f"   Description: {workflow.description}")
    click.echo(f"   Status: {'Enabled' if workflow.enabled else 'Disabled'}")


@workflow.command()
@click.argument('workflow_id')
@click.argument('trigger_type')
@click.option('--condition', help='JSON condition for trigger')
def add_trigger(workflow_id: str, trigger_type: str, condition: str):
    """Add a trigger to a workflow."""
    project_path = Path.cwd()
    engine = WorkflowEngine(project_path)
    
    # Parse condition
    condition_dict = {}
    if condition:
        try:
            condition_dict = json.loads(condition)
        except json.JSONDecodeError:
            show_warning("Invalid JSON condition")
            return
    
    if trigger_type == 'time_based':
        # Default time-based condition
        if not condition_dict:
            condition_dict = {'type': 'interval', 'interval_minutes': 60}
    elif trigger_type == 'file_change':
        # Default file change condition
        if not condition_dict:
            condition_dict = {'pattern': '*.py', 'path': '.'}
    
    if engine.add_trigger(workflow_id, trigger_type, condition_dict):
        show_success(f"Added {trigger_type} trigger to workflow {workflow_id}")
    else:
        show_warning(f"Workflow {workflow_id} not found")


@workflow.command()
@click.argument('workflow_id')
@click.argument('action_type')
@click.option('--parameters', help='JSON parameters for action')
def add_action(workflow_id: str, action_type: str, parameters: str):
    """Add an action to a workflow."""
    project_path = Path.cwd()
    engine = WorkflowEngine(project_path)
    
    # Parse parameters
    params_dict = {}
    if parameters:
        try:
            params_dict = json.loads(parameters)
        except json.JSONDecodeError:
            show_warning("Invalid JSON parameters")
            return
    
    if action_type == 'command':
        if not params_dict.get('command'):
            show_warning("Command action requires 'command' parameter")
            return
    elif action_type == 'ai_analysis':
        if not params_dict.get('analysis_type'):
            params_dict['analysis_type'] = 'general'
    
    if engine.add_action(workflow_id, action_type, params_dict):
        show_success(f"Added {action_type} action to workflow {workflow_id}")
    else:
        show_warning(f"Workflow {workflow_id} not found")


@workflow.command()
@click.argument('workflow_id')
def run(workflow_id: str):
    """Manually run a workflow."""
    project_path = Path.cwd()
    engine = WorkflowEngine(project_path)
    
    async def run_workflow():
        try:
            execution = await engine.execute_workflow(workflow_id)
            
            click.echo(f"\n📊 Execution Results:")
            click.echo(f"   Execution ID: {execution.execution_id}")
            click.echo(f"   Status: {execution.status}")
            click.echo(f"   Duration: {execution.completed_at - execution.started_at}")
            
            if execution.results:
                click.echo(f"   Actions:")
                for i, result in enumerate(execution.results, 1):
                    status_emoji = {'completed': '✅', 'failed': '❌', 'running': '🔄'}.get(result['status'], '❓')
                    click.echo(f"      {i}. {status_emoji} {result['action_name']}")
                    if result.get('output'):
                        output_preview = result['output'][:100] + "..." if len(result['output']) > 100 else result['output']
                        click.echo(f"         📄 {output_preview}")
                    if result.get('error'):
                        click.echo(f"         ❌ {result['error']}")
            
        except Exception as e:
            show_warning(f"Failed to run workflow: {e}")
    
    asyncio.run(run_workflow())


@workflow.command()
def status():
    """Show workflow engine status and statistics."""
    project_path = Path.cwd()
    engine = WorkflowEngine(project_path)
    display_workflows(engine)


# Add workflow commands to main CLI
def register_workflow_commands(main_cli):
    """Register workflow commands with main CLI."""
    main_cli.add_command(workflow, name='workflow')
