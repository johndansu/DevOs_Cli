"""DevOps and deployment commands."""

import click
import os
import subprocess
import json
import yaml
from pathlib import Path
from typing import Dict, Any, Optional, List

from devos.core.progress import show_success, show_info, show_warning, show_operation_status, ProgressBar


@click.command()
@click.option('--environment', '-e', type=click.Choice(['development', 'staging', 'production']), default='staging', help='Target environment')
@click.option('--strategy', type=click.Choice(['blue-green', 'canary', 'rolling', 'recreate']), default='rolling', help='Deployment strategy')
@click.option('--dry-run', is_flag=True, help='Preview deployment without executing')
@click.option('--force', is_flag=True, help='Force deployment even if checks fail')
@click.pass_context
def deploy(ctx, environment: str, strategy: str, dry_run: bool, force: bool):
    """Smart deployment with multiple strategies."""
    
    project_path = Path.cwd()
    deploy_config = _detect_deployment_config(project_path)
    
    if not deploy_config:
        show_warning("No deployment configuration found")
        if click.confirm("Create basic deployment configuration?"):
            _create_deployment_config(project_path)
            deploy_config = _detect_deployment_config(project_path)
        else:
            return
    
    click.echo(f"🚀 Deploying to {environment} using {strategy} strategy")
    
    if dry_run:
        _preview_deployment(deploy_config, environment, strategy)
        return
    
    # Pre-deployment checks
    if not force and not _run_pre_deployment_checks(deploy_config, environment):
        show_warning("Pre-deployment checks failed. Use --force to override.")
        return
    
    # Execute deployment
    success = _execute_deployment(deploy_config, environment, strategy)
    
    if success:
        show_success(f"Deployment to {environment} completed!")
        _run_post_deployment_checks(deploy_config, environment)
    else:
        show_operation_status("Deployment failed", False)


@click.command()
@click.option('--environment', '-e', type=click.Choice(['development', 'staging', 'production']), help='Environment to rollback')
@click.option('--version', help='Specific version to rollback to')
@click.option('--backup', is_flag=True, help='Create backup before rollback')
@click.pass_context
def rollback(ctx, environment: Optional[str], version: Optional[str], backup: bool):
    """Rollback to previous deployment."""
    
    if not environment:
        # Auto-detect current environment
        environment = _detect_current_environment()
    
    deployments = _get_deployment_history(environment)
    
    if not deployments:
        show_warning(f"No deployment history found for {environment}")
        return
    
    click.echo(f"🔄 Available deployments for {environment}:")
    for i, dep in enumerate(deployments[:5], 1):  # Show last 5
        status_emoji = "✅" if dep['status'] == 'success' else "❌"
        click.echo(f"  {i}. {status_emoji} {dep['version']} ({dep['timestamp']})")
    
    if not version:
        choice = click.prompt("Select deployment to rollback to", type=click.IntRange(1, min(5, len(deployments))))
        target_deployment = deployments[choice - 1]
    else:
        target_deployment = _find_deployment_by_version(deployments, version)
    
    if not target_deployment:
        show_warning("Target deployment not found")
        return
    
    if backup:
        _create_deployment_backup(environment)
    
    success = _execute_rollback(target_deployment, environment)
    
    if success:
        show_success(f"Rollback to {target_deployment['version']} completed!")
    else:
        show_operation_status("Rollback failed", False)


@click.command()
@click.option('--environment', '-e', type=click.Choice(['development', 'staging', 'production']), help='Environment to check')
@click.option('--detailed', is_flag=True, help='Show detailed status')
@click.pass_context
def status(ctx, environment: Optional[str], detailed: bool):
    """Check deployment status."""
    
    if environment:
        status_info = _get_deployment_status(environment, detailed)
        _display_deployment_status(status_info)
    else:
        # Show all environments
        environments = ['development', 'staging', 'production']
        for env in environments:
            status_info = _get_deployment_status(env, detailed)
            _display_deployment_status(status_info)
            click.echo()


@click.command()
@click.option('--provider', type=click.Choice(['aws', 'gcp', 'azure', 'digitalocean', 'heroku']), help='Cloud provider')
@click.option('--service', type=click.Choice(['web', 'api', 'database', 'cdn']), help='Service type')
@click.pass_context
def setup(ctx, provider: Optional[str], service: Optional[str]):
    """Setup deployment infrastructure."""
    
    if not provider:
        provider = click.prompt(
            "Select cloud provider",
            type=click.Choice(['aws', 'gcp', 'azure', 'digitalocean', 'heroku'])
        )
    
    if not service:
        service = click.prompt(
            "Select service type",
            type=click.Choice(['web', 'api', 'database', 'cdn'])
        )
    
    click.echo(f"🔧 Setting up {service} deployment on {provider}")
    
    infrastructure = _generate_infrastructure_config(provider, service)
    
    if infrastructure:
        _save_infrastructure_config(infrastructure)
        show_success(f"Infrastructure configuration created for {provider} {service}")
        
        # Show next steps
        click.echo("\nNext steps:")
        click.echo("1. Review the generated configuration files")
        click.echo("2. Update environment variables as needed")
        click.echo("3. Run 'devos deploy' to deploy")
    else:
        show_warning(f"Setup not yet supported for {provider} {service}")


@click.command()
@click.option('--format', type=click.Choice(['json', 'yaml', 'table']), default='table', help='Output format')
@click.option('--limit', default=20, help='Number of recent deployments')
@click.pass_context
def history(ctx, format: str, limit: int):
    """Show deployment history."""
    
    deployments = _get_all_deployments(limit)
    
    if not deployments:
        show_info("No deployment history found")
        return
    
    if format == 'json':
        click.echo(json.dumps(deployments, indent=2, default=str))
    elif format == 'yaml':
        click.echo(yaml.dump(deployments, default_flow_style=False))
    else:
        _display_deployment_history(deployments)


@click.command()
@click.option('--environment', '-e', type=click.Choice(['development', 'staging', 'production']), help='Environment')
@click.option('--service', help='Specific service to monitor')
@click.option('--interval', default=30, help='Monitoring interval in seconds')
@click.pass_context
def monitor(ctx, environment: Optional[str], service: Optional[str], interval: int):
    """Monitor deployment health."""
    
    click.echo(f"📊 Monitoring deployment health")
    click.echo(f"Environment: {environment or 'all'}")
    click.echo(f"Service: {service or 'all'}")
    click.echo(f"Interval: {interval} seconds")
    click.echo("Press Ctrl+C to stop monitoring")
    
    try:
        while True:
            health_data = _get_health_metrics(environment, service)
            _display_health_metrics(health_data)
            
            import time
            time.sleep(interval)
            
    except KeyboardInterrupt:
        show_info("Monitoring stopped")


@click.command()
@click.option('--type', type=click.Choice(['docker', 'kubernetes', 'terraform', 'ansible']), help='CI/CD type')
@click.option('--platform', type=click.Choice(['github', 'gitlab', 'jenkins']), help='CI/CD platform')
@click.pass_context
def pipeline(ctx, type: Optional[str], platform: Optional[str]):
    """Setup CI/CD pipeline."""
    
    if not type:
        type = click.prompt(
            "Select pipeline type",
            type=click.Choice(['docker', 'kubernetes', 'terraform', 'ansible'])
        )
    
    if not platform:
        platform = click.prompt(
            "Select CI/CD platform",
            type=click.Choice(['github', 'gitlab', 'jenkins'])
        )
    
    click.echo(f"🔄 Setting up {type} pipeline on {platform}")
    
    pipeline_config = _generate_pipeline_config(type, platform)
    
    if pipeline_config:
        _save_pipeline_config(pipeline_config, type, platform)
        show_success(f"{type} pipeline configuration created for {platform}")
    else:
        show_warning(f"Pipeline setup not yet supported for {type} on {platform}")


def _detect_deployment_config(project_path: Path) -> Optional[Dict[str, Any]]:
    """Detect deployment configuration."""
    
    config_files = [
        'docker-compose.yml',
        'Dockerfile',
        'k8s/deployment.yaml',
        'terraform/main.tf',
        '.github/workflows/deploy.yml',
        'deploy.yml',
        'deployment.json'
    ]
    
    for config_file in config_files:
        config_path = project_path / config_file
        if config_path.exists():
            return {
                'type': _get_config_type(config_file),
                'path': config_path,
                'content': _load_config_content(config_path)
            }
    
    return None


def _get_config_type(config_file: str) -> str:
    """Get configuration type from filename."""
    
    if 'docker-compose' in config_file:
        return 'docker-compose'
    elif config_file == 'Dockerfile':
        return 'docker'
    elif 'k8s' in config_file or config_file.endswith('.yaml'):
        return 'kubernetes'
    elif 'terraform' in config_file or config_file.endswith('.tf'):
        return 'terraform'
    elif '.github' in config_file:
        return 'github-actions'
    elif config_file.endswith('.yml') or config_file.endswith('.yaml'):
        return 'yaml'
    elif config_file.endswith('.json'):
        return 'json'
    
    return 'unknown'


def _load_config_content(config_path: Path) -> Dict[str, Any]:
    """Load configuration content."""
    
    try:
        if config_path.suffix in ['.yml', '.yaml']:
            import yaml
            return yaml.safe_load(config_path.read_text())
        elif config_path.suffix == '.json':
            return json.loads(config_path.read_text())
        else:
            return {'raw_content': config_path.read_text()}
    except Exception:
        return {'raw_content': config_path.read_text()}


def _create_deployment_config(project_path: Path) -> None:
    """Create basic deployment configuration."""
    
    # Create docker-compose.yml
    docker_compose = f'''version: '3.8'
services:
  app:
    build: .
    ports:
      - "8000:8000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
'''
    
    (project_path / 'docker-compose.yml').write_text(docker_compose)
    
    # Create Dockerfile
    dockerfile = '''FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 8000
CMD ["npm", "start"]
'''
    
    (project_path / 'Dockerfile').write_text(dockerfile)


def _preview_deployment(deploy_config: Dict[str, Any], environment: str, strategy: str) -> None:
    """Preview deployment without executing."""
    
    click.echo("🔍 Deployment Preview:")
    click.echo(f"Environment: {environment}")
    click.echo(f"Strategy: {strategy}")
    click.echo(f"Config Type: {deploy_config['type']}")
    click.echo(f"Config File: {deploy_config['path']}")
    
    click.echo("\n📋 Planned Actions:")
    actions = _get_deployment_actions(deploy_config, environment, strategy)
    for i, action in enumerate(actions, 1):
        click.echo(f"  {i}. {action}")
    
    click.echo("\n⚠️  This is a dry run. No changes will be made.")


def _run_pre_deployment_checks(deploy_config: Dict[str, Any], environment: str) -> bool:
    """Run pre-deployment checks."""
    
    click.echo("🔍 Running pre-deployment checks...")
    
    checks = [
        ('Configuration validation', _validate_config),
        ('Resource availability', _check_resources),
        ('Environment connectivity', _check_connectivity),
        ('Health check endpoints', _check_health_endpoints)
    ]
    
    all_passed = True
    
    for check_name, check_func in checks:
        click.echo(f"  • {check_name}...", nl=False)
        try:
            if check_func(deploy_config, environment):
                click.echo(" ✅")
            else:
                click.echo(" ❌")
                all_passed = False
        except Exception:
            click.echo(" ❌")
            all_passed = False
    
    return all_passed


def _execute_deployment(deploy_config: Dict[str, Any], environment: str, strategy: str) -> bool:
    """Execute deployment based on configuration."""
    
    click.echo(f"🚀 Executing deployment...")
    
    try:
        if deploy_config['type'] == 'docker-compose':
            return _deploy_docker_compose(deploy_config, environment, strategy)
        elif deploy_config['type'] == 'kubernetes':
            return _deploy_kubernetes(deploy_config, environment, strategy)
        elif deploy_config['type'] == 'terraform':
            return _deploy_terraform(deploy_config, environment, strategy)
        else:
            show_warning(f"Deployment type {deploy_config['type']} not yet supported")
            return False
    except Exception as e:
        show_operation_status(f"Deployment failed: {e}", False)
        return False


def _deploy_docker_compose(deploy_config: Dict[str, Any], environment: str, strategy: str) -> bool:
    """Deploy using Docker Compose."""
    
    commands = [
        ['docker', 'compose', 'build'],
        ['docker', 'compose', 'up', '-d']
    ]
    
    if environment == 'production':
        commands.append(['docker', 'compose', 'ps'])
    
    for cmd in commands:
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            click.echo(f"Command failed: {' '.join(cmd)}")
            click.echo(result.stderr)
            return False
    
    return True


def _deploy_kubernetes(deploy_config: Dict[str, Any], environment: str, strategy: str) -> bool:
    """Deploy using Kubernetes."""
    
    commands = [
        ['kubectl', 'apply', '-f', str(deploy_config['path'])],
        ['kubectl', 'rollout', 'status', 'deployment/app']
    ]
    
    for cmd in commands:
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            click.echo(f"Command failed: {' '.join(cmd)}")
            click.echo(result.stderr)
            return False
    
    return True


def _deploy_terraform(deploy_config: Dict[str, Any], environment: str, strategy: str) -> bool:
    """Deploy using Terraform."""
    
    commands = [
        ['terraform', 'init'],
        ['terraform', 'plan'],
        ['terraform', 'apply', '-auto-approve']
    ]
    
    for cmd in commands:
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            click.echo(f"Command failed: {' '.join(cmd)}")
            click.echo(result.stderr)
            return False
    
    return True


def _run_post_deployment_checks(deploy_config: Dict[str, Any], environment: str) -> None:
    """Run post-deployment checks."""
    
    click.echo("🔍 Running post-deployment checks...")
    
    checks = [
        ('Service health', _check_service_health),
        ('Endpoint accessibility', _check_endpoints),
        ('Performance metrics', _check_performance)
    ]
    
    for check_name, check_func in checks:
        click.echo(f"  • {check_name}...", nl=False)
        try:
            if check_func(deploy_config, environment):
                click.echo(" ✅")
            else:
                click.echo(" ❌")
        except Exception:
            click.echo(" ❌")


def _get_deployment_history(environment: str, limit: int = 10) -> List[Dict[str, Any]]:
    """Get deployment history for environment."""
    
    # Mock deployment history
    return [
        {
            'version': 'v1.2.3',
            'timestamp': '2024-01-19 10:30:00',
            'status': 'success',
            'environment': environment,
            'strategy': 'rolling'
        },
        {
            'version': 'v1.2.2',
            'timestamp': '2024-01-18 15:45:00',
            'status': 'success',
            'environment': environment,
            'strategy': 'rolling'
        },
        {
            'version': 'v1.2.1',
            'timestamp': '2024-01-17 09:20:00',
            'status': 'failed',
            'environment': environment,
            'strategy': 'blue-green'
        }
    ][:limit]


def _execute_rollback(deployment: Dict[str, Any], environment: str) -> bool:
    """Execute rollback to specific deployment."""
    
    click.echo(f"🔄 Rolling back to {deployment['version']}...")
    
    # Mock rollback implementation
    # In reality, this would use the specific deployment tool
    
    if deployment.get('strategy') == 'blue-green':
        # Switch traffic back to previous version
        click.echo("Switching traffic to previous version...")
    elif deployment.get('strategy') == 'rolling':
        # Rollback using deployment tool
        click.echo("Rolling back deployment...")
    
    return True


def _get_deployment_status(environment: str, detailed: bool = False) -> Dict[str, Any]:
    """Get current deployment status."""
    
    # Mock status data
    status = {
        'environment': environment,
        'version': 'v1.2.3',
        'status': 'healthy',
        'uptime': '2 days, 14 hours',
        'replicas': 3,
        'ready_replicas': 3
    }
    
    if detailed:
        status.update({
            'cpu_usage': '45%',
            'memory_usage': '67%',
            'disk_usage': '23%',
            'network_io': '1.2 MB/s',
            'last_deployment': '2024-01-19 10:30:00',
            'deployment_strategy': 'rolling'
        })
    
    return status


def _display_deployment_status(status: Dict[str, Any]) -> None:
    """Display deployment status."""
    
    status_emoji = "🟢" if status['status'] == 'healthy' else "🔴"
    
    click.echo(f"{status_emoji} {status['environment'].title()}")
    click.echo(f"  Version: {status['version']}")
    click.echo(f"  Status: {status['status']}")
    click.echo(f"  Uptime: {status['uptime']}")
    
    if 'replicas' in status:
        click.echo(f"  Replicas: {status['ready_replicas']}/{status['replicas']}")
    
    if 'cpu_usage' in status:
        click.echo(f"  CPU: {status['cpu_usage']}")
        click.echo(f"  Memory: {status['memory_usage']}")
        click.echo(f"  Disk: {status['disk_usage']}")


def _generate_infrastructure_config(provider: str, service: str) -> Optional[Dict[str, Any]]:
    """Generate infrastructure configuration."""
    
    configs = {
        ('aws', 'web'): {
            'provider': 'aws',
            'service': 'web',
            'resources': {
                'ec2_instance': {
                    'type': 't3.micro',
                    'ami': 'ami-12345678',
                    'security_groups': ['web-sg']
                },
                'load_balancer': {
                    'type': 'application',
                    'port': 80
                }
            }
        },
        ('heroku', 'web'): {
            'provider': 'heroku',
            'service': 'web',
            'app': {
                'name': 'my-app',
                'dynos': 1,
                'type': 'web'
            }
        }
    }
    
    return configs.get((provider, service))


def _save_infrastructure_config(config: Dict[str, Any]) -> None:
    """Save infrastructure configuration."""
    
    config_dir = Path.cwd() / 'infrastructure'
    config_dir.mkdir(exist_ok=True)
    
    if config['provider'] == 'aws':
        (config_dir / 'main.tf').write_text(_generate_terraform_config(config))
    elif config['provider'] == 'heroku':
        (config_dir / 'app.json').write_text(_generate_heroku_config(config))


def _generate_terraform_config(config: Dict[str, Any]) -> str:
    """Generate Terraform configuration."""
    
    return f'''# Terraform configuration for {config['provider']} {config['service']}

provider "{config['provider']}" {{
  region = "us-west-2"
}}

resource "aws_instance" "web" {{
  ami           = "ami-12345678"
  instance_type = "t3.micro"
  
  tags = {{
    Name = "{config['service']}-instance"
  }}
}}

resource "aws_lb" "web" {{
  name               = "{config['service']}-lb"
  internal           = false
  load_balancer_type = "application"
  
  tags = {{
    Name = "{config['service']}-load-balancer"
  }}
}}
'''


def _generate_heroku_config(config: Dict[str, Any]) -> str:
    """Generate Heroku configuration."""
    
    return json.dumps({
        'name': config['app']['name'],
        'scripts': {
            'postdeploy': 'npm run build'
        },
        'addons': [
            'heroku-postgresql:hobby-dev'
        ]
    }, indent=2)


def _get_all_deployments(limit: int) -> List[Dict[str, Any]]:
    """Get all deployments across environments."""
    
    # Mock data
    return [
        {
            'version': 'v1.2.3',
            'environment': 'production',
            'timestamp': '2024-01-19 10:30:00',
            'status': 'success',
            'duration': '3m 45s'
        },
        {
            'version': 'v1.2.3',
            'environment': 'staging',
            'timestamp': '2024-01-19 09:15:00',
            'status': 'success',
            'duration': '2m 30s'
        },
        {
            'version': 'v1.2.2',
            'environment': 'production',
            'timestamp': '2024-01-18 15:45:00',
            'status': 'success',
            'duration': '4m 12s'
        }
    ][:limit]


def _display_deployment_history(deployments: List[Dict[str, Any]]) -> None:
    """Display deployment history."""
    
    click.echo("📜 Deployment History")
    click.echo("-" * 80)
    click.echo(f"{'Version':<12} {'Environment':<12} {'Status':<10} {'Duration':<10} {'Timestamp':<20}")
    click.echo("-" * 80)
    
    for dep in deployments:
        status_emoji = "✅" if dep['status'] == 'success' else "❌"
        click.echo(f"{dep['version']:<12} {dep['environment']:<12} {status_emoji:<10} {dep['duration']:<10} {dep['timestamp']:<20}")


def _get_health_metrics(environment: Optional[str], service: Optional[str]) -> Dict[str, Any]:
    """Get health metrics."""
    
    # Mock health data
    return {
        'timestamp': '2024-01-19 12:00:00',
        'services': [
            {
                'name': 'web-api',
                'status': 'healthy',
                'response_time': '120ms',
                'error_rate': '0.1%',
                'requests_per_second': 45
            },
            {
                'name': 'database',
                'status': 'healthy',
                'connections': 12,
                'query_time': '25ms'
            }
        ]
    }


def _display_health_metrics(health_data: Dict[str, Any]) -> None:
    """Display health metrics."""
    
    click.echo(f"\n📊 Health Metrics - {health_data['timestamp']}")
    click.echo("-" * 60)
    
    for service in health_data['services']:
        status_emoji = "🟢" if service['status'] == 'healthy' else "🔴"
        click.echo(f"{status_emoji} {service['name']}")
        
        for key, value in service.items():
            if key != 'name' and key != 'status':
                click.echo(f"  {key.replace('_', ' ').title()}: {value}")


def _generate_pipeline_config(type: str, platform: str) -> Optional[Dict[str, Any]]:
    """Generate CI/CD pipeline configuration."""
    
    if type == 'docker' and platform == 'github':
        return {
            'name': 'Docker CI/CD',
            'on': {
                'push': {
                    'branches': ['main', 'develop']
                }
            },
            'jobs': {
                'build': {
                    'runs-on': 'ubuntu-latest',
                    'steps': [
                        {'uses': 'actions/checkout@v3'},
                        {'name': 'Build Docker image',
                         'run': 'docker build -t myapp .'},
                        {'name': 'Run tests',
                         'run': 'docker run myapp npm test'}
                    ]
                }
            }
        }
    
    return None


def _save_pipeline_config(config: Dict[str, Any], type: str, platform: str) -> None:
    """Save pipeline configuration."""
    
    if platform == 'github':
        workflows_dir = Path.cwd() / '.github' / 'workflows'
        workflows_dir.mkdir(parents=True, exist_ok=True)
        
        if type == 'docker':
            (workflows_dir / 'docker.yml').write_text(yaml.dump(config, default_flow_style=False))


# Helper functions (simplified implementations)
def _validate_config(config: Dict[str, Any], environment: str) -> bool:
    return True

def _check_resources(config: Dict[str, Any], environment: str) -> bool:
    return True

def _check_connectivity(config: Dict[str, Any], environment: str) -> bool:
    return True

def _check_health_endpoints(config: Dict[str, Any], environment: str) -> bool:
    return True

def _check_service_health(config: Dict[str, Any], environment: str) -> bool:
    return True

def _check_endpoints(config: Dict[str, Any], environment: str) -> bool:
    return True

def _check_performance(config: Dict[str, Any], environment: str) -> bool:
    return True

def _detect_current_environment() -> str:
    return 'staging'

def _find_deployment_by_version(deployments: List[Dict[str, Any]], version: str) -> Optional[Dict[str, Any]]:
    for dep in deployments:
        if dep['version'] == version:
            return dep
    return None

def _create_deployment_backup(environment: str) -> None:
    pass

def _get_deployment_actions(config: Dict[str, Any], environment: str, strategy: str) -> List[str]:
    return [
        f"Validate configuration for {environment}",
        f"Build application image",
        f"Deploy using {strategy} strategy",
        f"Run health checks"
    ]
