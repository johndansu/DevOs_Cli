"""Documentation generation and management commands."""

import click
import os
import subprocess
import json
from pathlib import Path
from typing import Dict, Any, Optional, List

from devos.core.progress import show_success, show_info, show_warning, show_operation_status, ProgressBar


@click.command()
@click.option('--format', type=click.Choice(['html', 'markdown', 'pdf']), default='html', help='Output format')
@click.option('--output', '-o', help='Output directory')
@click.option('--serve', is_flag=True, help='Serve documentation locally')
@click.option('--port', default=8000, help='Port for serving docs')
@click.pass_context
def generate(ctx, format: str, output: Optional[str], serve: bool, port: int):
    """Generate documentation for the project."""
    
    project_path = Path.cwd()
    doc_config = _detect_doc_framework(project_path)
    
    if not doc_config:
        show_info("No documentation framework detected", "Using default documentation generator")
        _generate_default_docs(project_path, format, output)
    else:
        framework = doc_config['framework']
        show_info(f"Detected documentation framework: {framework}")
        _generate_framework_docs(doc_config, format, output)
    
    if serve:
        _serve_docs(output or 'docs', port)


@click.command()
@click.option('--port', default=8000, help='Port for serving docs')
@click.option('--directory', '-d', default='docs', help='Documentation directory')
@click.option('--browser', is_flag=True, help='Open in browser')
@click.pass_context
def serve(ctx, port: int, directory: str, browser: bool):
    """Serve documentation locally."""
    
    docs_path = Path(directory)
    
    if not docs_path.exists():
        show_warning(f"Documentation directory '{directory}' not found")
        if click.confirm("Generate basic documentation first?"):
            generate(ctx, 'html', directory, False, port)
        else:
            return
    
    show_info(f"Serving documentation at http://localhost:{port}")
    
    try:
        import http.server
        import socketserver
        import webbrowser
        
        os.chdir(docs_path)
        
        with socketserver.TCPServer(("", port), http.server.SimpleHTTPRequestHandler) as httpd:
            show_info(f"Server started at http://localhost:{port}")
            show_info("Press Ctrl+C to stop the server")
            
            if browser:
                webbrowser.open(f"http://localhost:{port}")
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        show_info("Documentation server stopped")
    except Exception as e:
        show_operation_status(f"Failed to start server: {e}", False)


@click.command()
@click.pass_context
def check(ctx):
    """Check documentation for broken links and issues."""
    
    project_path = Path.cwd()
    
    # Check for README
    readme_files = list(project_path.glob('README*'))
    if not readme_files:
        show_warning("No README file found")
    else:
        show_success(f"Found README: {readme_files[0].name}")
    
    # Check for docstrings (Python)
    if (project_path / 'src').exists():
        docstring_issues = _check_docstrings(project_path / 'src')
        if docstring_issues:
            show_warning(f"Found {len(docstring_issues)} files missing docstrings")
            for file_path in docstring_issues[:5]:  # Show first 5
                click.echo(f"  • {file_path}")
        else:
            show_success("All Python files have docstrings")
    
    # Check for inline documentation
    inline_docs = _check_inline_documentation(project_path)
    show_info(f"Found {len(inline_docs)} documented functions/classes")
    
    # Check for API documentation
    api_docs = _check_api_documentation(project_path)
    if api_docs:
        show_success(f"Found API documentation: {', '.join(api_docs)}")
    else:
        show_warning("No API documentation found")


@click.command()
@click.option('--format', type=click.Choice(['openapi', 'swagger', 'postman']), default='openapi', help='API spec format')
@click.option('--output', '-o', help='Output file')
@click.option('--auto', is_flag=True, help='Auto-detect API endpoints')
@click.pass_context
def api(ctx, format: str, output: Optional[str], auto: bool):
    """Generate API documentation."""
    
    project_path = Path.cwd()
    
    if auto:
        api_endpoints = _auto_detect_api_endpoints(project_path)
        api_spec = _generate_api_spec_from_code(api_endpoints, format)
    else:
        # Try to extract from existing API specs
        api_spec = _extract_existing_api_spec(project_path, format)
    
    if not api_spec:
        show_warning("Could not generate API documentation")
        return
    
    output_file = output or f'api.{format}'
    
    if format == 'openapi':
        Path(output_file).write_text(json.dumps(api_spec, indent=2))
    elif format == 'swagger':
        Path(output_file).write_text(json.dumps(api_spec, indent=2))
    elif format == 'postman':
        Path(output_file).write_text(json.dumps(api_spec, indent=2))
    
    show_success(f"API documentation generated: {output_file}")


@click.command()
@click.option('--template', type=click.Choice(['basic', 'comprehensive', 'api']), default='basic', help='README template')
@click.option('--force', is_flag=True, help='Overwrite existing README')
@click.pass_context
def readme(ctx, template: str, force: bool):
    """Generate or update README.md."""
    
    project_path = Path.cwd()
    readme_path = project_path / 'README.md'
    
    if readme_path.exists() and not force:
        show_warning("README.md already exists", "Use --force to overwrite")
        return
    
    project_info = _analyze_project(project_path)
    readme_content = _generate_readme_content(project_info, template)
    
    readme_path.write_text(readme_content)
    show_success(f"README.md generated with {template} template")


@click.command()
@click.pass_context
def changelog(ctx):
    """Generate changelog from git commits."""
    
    try:
        # Get git commits
        result = subprocess.run(
            ['git', 'log', '--pretty=format:%h|%s|%an|%ad', '--date=short'],
            capture_output=True, text=True
        )
        
        if result.returncode != 0:
            show_warning("Not a git repository or git not available")
            return
        
        commits = []
        for line in result.stdout.strip().split('\n'):
            if line:
                hash_val, subject, author, date = line.split('|')
                commits.append({
                    'hash': hash_val,
                    'subject': subject,
                    'author': author,
                    'date': date
                })
        
        changelog_content = _generate_changelog_content(commits)
        
        changelog_path = Path.cwd() / 'CHANGELOG.md'
        if changelog_path.exists():
            changelog_path.write_text(changelog_content)
            show_success("CHANGELOG.md updated")
        else:
            changelog_path.write_text(changelog_content)
            show_success("CHANGELOG.md created")
            
    except Exception as e:
        show_operation_status(f"Failed to generate changelog: {e}", False)


def _detect_doc_framework(project_path: Path) -> Optional[Dict[str, Any]]:
    """Detect documentation framework."""
    
    # Check for Sphinx
    if (project_path / 'docs' / 'conf.py').exists():
        return {'framework': 'sphinx', 'command': 'sphinx-build'}
    
    # Check for MkDocs
    if (project_path / 'mkdocs.yml').exists():
        return {'framework': 'mkdocs', 'command': 'mkdocs'}
    
    # Check for Docusaurus
    if (project_path / 'docusaurus.config.js').exists():
        return {'framework': 'docusaurus', 'command': 'docusaurus'}
    
    # Check for GitBook
    if (project_path / 'book.toml').exists():
        return {'framework': 'gitbook', 'command': 'mdbook'}
    
    # Check for JSDoc
    if (project_path / 'jsdoc.json').exists():
        return {'framework': 'jsdoc', 'command': 'jsdoc'}
    
    return None


def _generate_default_docs(project_path: Path, format: str, output: Optional[str]) -> None:
    """Generate default documentation."""
    
    output_dir = Path(output or 'docs')
    output_dir.mkdir(exist_ok=True)
    
    if format == 'html':
        _generate_html_docs(project_path, output_dir)
    elif format == 'markdown':
        _generate_markdown_docs(project_path, output_dir)
    elif format == 'pdf':
        _generate_pdf_docs(project_path, output_dir)


def _generate_html_docs(project_path: Path, output_dir: Path) -> None:
    """Generate HTML documentation."""
    
    index_html = f'''<!DOCTYPE html>
<html>
<head>
    <title>{project_path.name} Documentation</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 40px; }}
        .header {{ border-bottom: 2px solid #333; padding-bottom: 20px; }}
        .section {{ margin: 20px 0; }}
        .code {{ background: #f4f4f4; padding: 10px; border-radius: 4px; }}
    </style>
</head>
<body>
    <div class="header">
        <h1>{project_path.name} Documentation</h1>
        <p>Generated by DevOS</p>
    </div>
    
    <div class="section">
        <h2>Installation</h2>
        <div class="code">
            <pre>TODO: Add installation instructions</pre>
        </div>
    </div>
    
    <div class="section">
        <h2>Usage</h2>
        <div class="code">
            <pre>TODO: Add usage examples</pre>
        </div>
    </div>
    
    <div class="section">
        <h2>API Reference</h2>
        <p>TODO: Add API documentation</p>
    </div>
</body>
</html>'''
    
    (output_dir / 'index.html').write_text(index_html)
    show_success(f"HTML documentation generated in {output_dir}")


def _generate_markdown_docs(project_path: Path, output_dir: Path) -> None:
    """Generate Markdown documentation."""
    
    index_md = f'''# {project_path.name} Documentation

Generated by DevOS

## Installation

TODO: Add installation instructions

## Usage

TODO: Add usage examples

## API Reference

TODO: Add API documentation

## Contributing

TODO: Add contributing guidelines

## License

TODO: Add license information
'''
    
    (output_dir / 'index.md').write_text(index_md)
    show_success(f"Markdown documentation generated in {output_dir}")


def _generate_pdf_docs(project_path: Path, output_dir: Path) -> None:
    """Generate PDF documentation."""
    
    # For now, generate markdown and suggest conversion
    show_info("PDF generation requires additional tools")
    show_info("Generated Markdown documentation instead")
    _generate_markdown_docs(project_path, output_dir)


def _generate_framework_docs(doc_config: Dict[str, Any], format: str, output: Optional[str]) -> None:
    """Generate documentation using detected framework."""
    
    framework = doc_config['framework']
    
    if framework == 'sphinx':
        cmd = ['sphinx-build', 'docs', output or 'build/docs']
    elif framework == 'mkdocs':
        cmd = ['mkdocs', 'build', '--site-dir', output or 'site']
    elif framework == 'docusaurus':
        cmd = ['npm', 'run', 'build']
    elif framework == 'gitbook':
        cmd = ['mdbook', 'build', '--dest-dir', output or 'book']
    elif framework == 'jsdoc':
        cmd = ['jsdoc', '-c', 'jsdoc.json', '-d', output or 'docs']
    else:
        show_warning(f"Framework {framework} not yet supported")
        return
    
    try:
        subprocess.run(cmd, cwd=Path.cwd(), check=True)
        show_success(f"Documentation generated using {framework}")
    except subprocess.CalledProcessError as e:
        show_operation_status(f"Failed to generate docs: {e}", False)


def _serve_docs(docs_path: str, port: int) -> None:
    """Serve documentation locally."""
    
    docs_dir = Path(docs_path)
    
    if not docs_dir.exists():
        show_warning(f"Documentation directory '{docs_path}' not found")
        return
    
    try:
        import http.server
        import socketserver
        import webbrowser
        
        os.chdir(docs_dir)
        
        with socketserver.TCPServer(("", port), http.server.SimpleHTTPRequestHandler) as httpd:
            show_info(f"Serving docs at http://localhost:{port}")
            webbrowser.open(f"http://localhost:{port}")
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        show_info("Documentation server stopped")
    except Exception as e:
        show_operation_status(f"Failed to start server: {e}", False)


def _check_docstrings(src_path: Path) -> List[str]:
    """Check for missing docstrings in Python files."""
    
    files_without_docstrings = []
    
    for py_file in src_path.rglob('*.py'):
        if py_file.name.startswith('__'):
            continue
            
        content = py_file.read_text()
        
        # Check for functions without docstrings
        import re
        functions = re.findall(r'def\s+\w+\([^)]*\):', content)
        classes = re.findall(r'class\s+\w+.*:', content)
        
        if functions or classes:
            docstrings = re.findall(r'""".*?"""', content, re.DOTALL)
            single_docstrings = re.findall(r"'''.*?'''", content, re.DOTALL)
            
            total_docstrings = len(docstrings) + len(single_docstrings)
            total_items = len(functions) + len(classes)
            
            if total_docstrings < total_items:
                files_without_docstrings.append(str(py_file.relative_to(src_path.parent)))
    
    return files_without_docstrings


def _check_inline_documentation(project_path: Path) -> List[str]:
    """Check for inline documentation."""
    
    documented_items = []
    
    for py_file in project_path.rglob('*.py'):
        content = py_file.read_text()
        
        # Count documented items
        import re
        docstrings = re.findall(r'""".*?"""', content, re.DOTALL)
        single_docstrings = re.findall(r"'''.*?'''", content, re.DOTALL)
        
        documented_items.extend([str(py_file)] * (len(docstrings) + len(single_docstrings)))
    
    return documented_items


def _check_api_documentation(project_path: Path) -> List[str]:
    """Check for API documentation."""
    
    api_docs = []
    
    # Check for OpenAPI/Swagger files
    api_files = [
        'openapi.json', 'openapi.yaml', 'swagger.json', 'swagger.yaml',
        'api.json', 'api.yaml'
    ]
    
    for api_file in api_files:
        if (project_path / api_file).exists():
            api_docs.append(api_file)
    
    # Check for Postman collections
    if (project_path / 'postman_collection.json').exists():
        api_docs.append('postman_collection.json')
    
    return api_docs


def _auto_detect_api_endpoints(project_path: Path) -> List[Dict[str, Any]]:
    """Auto-detect API endpoints from code."""
    
    endpoints = []
    
    # Python Flask/FastAPI detection
    for py_file in project_path.rglob('*.py'):
        content = py_file.read_text()
        
        import re
        
        # Flask routes
        flask_routes = re.findall(r'@app\.route\([\'"]([^\'"]+)[\'"]', content)
        for route in flask_routes:
            endpoints.append({
                'path': route,
                'method': 'GET',
                'source': str(py_file)
            })
        
        # FastAPI routes
        fastapi_routes = re.findall(r'@(app|router)\.(get|post|put|delete)\([\'"]([^\'"]+)[\'"]', content)
        for match in fastapi_routes:
            endpoints.append({
                'path': match[2],
                'method': match[1].upper(),
                'source': str(py_file)
            })
    
    # JavaScript/TypeScript Express detection
    for js_file in project_path.rglob('*.js'):
        content = js_file.read_text()
        
        import re
        express_routes = re.findall(r'\.(get|post|put|delete)\([\'"]([^\'"]+)[\'"]', content)
        for match in express_routes:
            endpoints.append({
                'path': match[1],
                'method': match[0].upper(),
                'source': str(js_file)
            })
    
    return endpoints


def _generate_api_spec_from_code(endpoints: List[Dict[str, Any]], format: str) -> Dict[str, Any]:
    """Generate API specification from detected endpoints."""
    
    if format in ['openapi', 'swagger']:
        return {
            'openapi': '3.0.0',
            'info': {
                'title': 'API Documentation',
                'version': '1.0.0'
            },
            'paths': {
                endpoint['path']: {
                    endpoint['method'].lower(): {
                        'summary': f"{endpoint['method']} {endpoint['path']}",
                        'responses': {
                            '200': {
                                'description': 'Successful response'
                            }
                        }
                    }
                }
                for endpoint in endpoints
            }
        }
    
    elif format == 'postman':
        return {
            'info': {
                'name': 'API Collection',
                'schema': 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
            },
            'item': [
                {
                    'name': f"{endpoint['method']} {endpoint['path']}",
                    'request': {
                        'method': endpoint['method'],
                        'url': endpoint['path']
                    }
                }
                for endpoint in endpoints
            ]
        }
    
    return {}


def _extract_existing_api_spec(project_path: Path, format: str) -> Optional[Dict[str, Any]]:
    """Extract existing API specification."""
    
    spec_files = {
        'openapi': ['openapi.json', 'openapi.yaml'],
        'swagger': ['swagger.json', 'swagger.yaml'],
        'postman': ['postman_collection.json']
    }
    
    for spec_file in spec_files.get(format, []):
        spec_path = project_path / spec_file
        if spec_path.exists():
            if spec_file.endswith('.json'):
                return json.loads(spec_path.read_text())
            elif spec_file.endswith('.yaml') or spec_file.endswith('.yml'):
                import yaml
                return yaml.safe_load(spec_path.read_text())
    
    return None


def _analyze_project(project_path: Path) -> Dict[str, Any]:
    """Analyze project to generate documentation."""
    
    info = {
        'name': project_path.name,
        'language': _detect_language(project_path),
        'dependencies': _get_dependencies(project_path),
        'scripts': _get_scripts(project_path),
        'structure': _get_project_structure(project_path)
    }
    
    return info


def _detect_language(project_path: Path) -> str:
    """Detect project language."""
    
    if (project_path / 'pyproject.toml').exists() or (project_path / 'requirements.txt').exists():
        return 'Python'
    elif (project_path / 'package.json').exists():
        return 'JavaScript/TypeScript'
    elif (project_path / 'go.mod').exists():
        return 'Go'
    elif (project_path / 'Cargo.toml').exists():
        return 'Rust'
    else:
        return 'Unknown'


def _get_dependencies(project_path: Path) -> List[str]:
    """Get project dependencies."""
    
    deps = []
    
    if (project_path / 'pyproject.toml').exists():
        import toml
        config = toml.load(project_path / 'pyproject.toml')
        deps.extend(config.get('project', {}).get('dependencies', []))
    
    elif (project_path / 'package.json').exists():
        import json
        config = json.loads((project_path / 'package.json').read_text())
        deps.extend(list(config.get('dependencies', {}).keys()))
    
    return deps


def _get_scripts(project_path: Path) -> List[str]:
    """Get project scripts."""
    
    scripts = []
    
    if (project_path / 'package.json').exists():
        import json
        config = json.loads((project_path / 'package.json').read_text())
        scripts.extend(list(config.get('scripts', {}).keys()))
    
    return scripts


def _get_project_structure(project_path: Path) -> List[str]:
    """Get project structure."""
    
    structure = []
    
    for item in project_path.iterdir():
        if item.is_dir() and not item.name.startswith('.'):
            structure.append(item.name + '/')
        elif item.is_file() and not item.name.startswith('.'):
            structure.append(item.name)
    
    return sorted(structure)


def _generate_readme_content(project_info: Dict[str, Any], template: str) -> str:
    """Generate README content based on template."""
    
    name = project_info['name']
    language = project_info['language']
    
    if template == 'basic':
        return f'''# {name}

TODO: Add project description

## Installation

TODO: Add installation instructions

## Usage

TODO: Add usage examples

## License

TODO: Add license information
'''
    
    elif template == 'comprehensive':
        deps = ', '.join(project_info['dependencies'][:5])  # Show first 5
        scripts = ', '.join(project_info['scripts'])
        structure = '\n'.join([f"- {item}" for item in project_info['structure']])
        
        return f'''# {name}

TODO: Add project description

## Installation

TODO: Add installation instructions

## Usage

TODO: Add usage examples

## Development

### Dependencies
{deps}

### Scripts
{scripts}

### Project Structure
{structure}

## Contributing

TODO: Add contributing guidelines

## License

TODO: Add license information
'''
    
    elif template == 'api':
        return f'''# {name} API

TODO: Add API description

## Base URL

```
TODO: Add base URL
```

## Authentication

TODO: Add authentication information

## Endpoints

TODO: Add endpoint documentation

## Error Handling

TODO: Add error handling information

## Examples

TODO: Add usage examples

## License

TODO: Add license information
'''
    
    return f"# {name}\n\nTODO: Add project description"


def _generate_changelog_content(commits: List[Dict[str, Any]]) -> str:
    """Generate changelog from commits."""
    
    changelog = "# Changelog\n\n"
    
    current_date = None
    current_section = []
    
    for commit in commits:
        date = commit['date']
        
        if date != current_date:
            if current_section:
                changelog += f"## {current_date}\n\n"
                changelog += '\n'.join(current_section) + '\n\n'
            current_date = date
            current_section = []
        
        current_section.append(f"- {commit['subject']} ({commit['hash']})")
    
    # Add last section
    if current_section:
        changelog += f"## {current_date}\n\n"
        changelog += '\n'.join(current_section) + '\n'
    
    return changelog
