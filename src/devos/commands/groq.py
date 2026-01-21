"""CLI-friendly Groq AI commands."""

import click
import asyncio
from pathlib import Path
from typing import Optional

from devos.core.progress import show_success, show_info, show_warning, show_operation_status
from devos.core.ai_config import get_ai_config_manager, initialize_ai_providers
from devos.core.ai import get_ai_service, AIServiceError, UserPreferences


@click.command()
@click.argument('prompt')
@click.option('--model', default='llama-3.1-8b-instant', help='Groq model to use')
@click.option('--temp', type=float, default=0.7, help='Temperature (0.0-1.0)')
@click.option('--max-tokens', type=int, default=1000, help='Maximum tokens')
@click.option('--file', '-f', type=click.Path(exists=True), help='Include file context')
def groq(prompt: str, model: str, temp: float, max_tokens: int, file: Optional[str]):
    """Fast AI assistance using Groq.
    
    Examples:
        groq "create a python function to validate email"
        groq "explain this code" --file main.py
        groq "how to optimize this database query" --temp 0.3
    """
    
    async def _run_groq():
        try:
            ai_service = await get_ai_service()
            
            # Build full prompt with file context if provided
            full_prompt = prompt
            if file:
                file_path = Path(file)
                file_content = file_path.read_text()
                full_prompt += f"\n\nFile: {file}\n```\n{file_content}\n```"
            
            response = await ai_service.generate_code(
                query=full_prompt,
                project_path=Path(file).parent if file else Path.cwd(),
                user_preferences=UserPreferences(
                    coding_style="clean",
                    preferred_patterns=[],
                    ai_model=model,
                    temperature=temp,
                    max_tokens=max_tokens
                ),
                provider_name="groq"
            )
            
            click.echo("🚀 Groq Response:")
            click.echo("=" * 50)
            click.echo(response.content)
            
            if response.tokens_used > 0:
                click.echo(f"\n⚡ Tokens: {response.tokens_used} | Cost: ${response.cost:.6f}")
                click.echo(f"🦊 Model: {model} | Speed: Fast!")
                
        except AIServiceError as e:
            show_warning(f"Groq error: {e}")
        except Exception as e:
            show_warning(f"Command failed: {e}")
    
    asyncio.run(_run_groq())


@click.command()
@click.argument('file_path', type=click.Path(exists=True))
@click.option('--model', default='llama-3.1-8b-instant', help='Groq model to use')
@click.option('--focus', type=click.Choice(['security', 'performance', 'style', 'all']), default='all', help='Review focus')
def groq_review(file_path: str, model: str, focus: str):
    """Fast code review using Groq.
    
    Examples:
        groq-review main.py
        groq-review . --focus security
        groq-review app.py --model llama3-8b-8192
    """
    
    async def _run_review():
        try:
            ai_service = await get_ai_service()
            path = Path(file_path)
            
            if path.is_file():
                # Single file review
                code = path.read_text()
                result = await ai_service.analyze_code(
                    code=code,
                    project_path=path.parent,
                    user_preferences=UserPreferences(
                        coding_style="clean",
                        preferred_patterns=[],
                        ai_model=model,
                        temperature=0.1,
                        max_tokens=1500
                    ),
                    provider_name="groq"
                )
                
                click.echo(f"🔍 Code Review: {file_path}")
                click.echo("=" * 50)
                
                if result.issues:
                    for issue in result.issues:
                        severity_emoji = {'low': '🟡', 'medium': '🟠', 'high': '🔴'}
                        click.echo(f"{severity_emoji.get(issue['severity'], '⚪')} {issue['message']}")
                        if issue.get('suggestion'):
                            click.echo(f"   💡 {issue['suggestion']}")
                
                if result.suggestions:
                    click.echo("\n💡 Suggestions:")
                    for suggestion in result.suggestions:
                        click.echo(f"• {suggestion}")
                
                click.echo(f"\n📊 Score: {result.score}/10")
                
            else:
                show_warning("Directory review not yet supported. Use specific file.")
                
        except AIServiceError as e:
            show_warning(f"Groq error: {e}")
        except Exception as e:
            show_warning(f"Review failed: {e}")
    
    asyncio.run(_run_review())


@click.command()
@click.argument('file_path', type=click.Path(exists=True))
@click.option('--model', default='llama-3.1-8b-instant', help='Groq model to use')
@click.option('--query', default='Explain this code', help='What to explain')
def groq_explain(file_path: str, model: str, query: str):
    """Fast code explanation using Groq.
    
    Examples:
        groq-explain main.py
        groq-explain complex_function.py --query "How does this work?"
        groq-explain algorithm.py --model llama3-8b-8192
    """
    
    async def _run_explain():
        try:
            ai_service = await get_ai_service()
            path = Path(file_path)
            
            code = path.read_text()
            response = await ai_service.explain_code(
                code=code,
                query=query,
                project_path=path.parent,
                user_preferences=UserPreferences(
                    coding_style="clean",
                    preferred_patterns=[],
                    ai_model=model,
                    temperature=0.2,
                    max_tokens=800
                ),
                provider_name="groq"
            )
            
            click.echo(f"📖 Explanation: {file_path}")
            click.echo("=" * 50)
            click.echo(response.content)
            
            if response.tokens_used > 0:
                click.echo(f"\n⚡ Tokens: {response.tokens_used} | Cost: ${response.cost:.6f}")
                
        except AIServiceError as e:
            show_warning(f"Groq error: {e}")
        except Exception as e:
            show_warning(f"Explanation failed: {e}")
    
    asyncio.run(_run_explain())


@click.command()
@click.option('--model', default='llama-3.1-8b-instant', help='Groq model to use')
@click.option('--temp', type=float, default=0.7, help='Temperature (0.0-1.0)')
def groq_chat(model: str, temp: float):
    """Interactive chat with Groq.
    
    Examples:
        groq-chat
        groq-chat --model llama3-8b-8192
        groq-chat --temp 0.3
    """
    
    async def _run_chat():
        try:
            ai_service = await get_ai_service()
            
            click.echo("💬 Groq Chat (type 'exit' to quit)")
            click.echo("=" * 50)
            click.echo(f"🦊 Model: {model} | ⚡ Fast inference")
            
            conversation = []
            
            while True:
                try:
                    user_input = click.prompt("\nYou", type=str, show_default=False)
                    
                    if user_input.lower() in ['exit', 'quit', 'q']:
                        click.echo("👋 Goodbye!")
                        break
                    
                    conversation.append({"role": "user", "content": user_input})
                    
                    response = await ai_service.chat(
                        conversation=conversation,
                        project_path=Path.cwd(),
                        user_preferences=UserPreferences(
                            coding_style="clean",
                            preferred_patterns=[],
                            ai_model=model,
                            temperature=temp,
                            max_tokens=1000
                        ),
                        provider_name="groq"
                    )
                    
                    conversation.append({"role": "assistant", "content": response.content})
                    
                    click.echo(f"\n🤖 Groq: {response.content}")
                    
                    if response.tokens_used > 0:
                        click.echo(f"⚡ Tokens: {response.tokens_used} | Cost: ${response.cost:.6f}")
                        
                except KeyboardInterrupt:
                    click.echo("\n👋 Goodbye!")
                    break
                except Exception as e:
                    show_warning(f"Chat error: {e}")
                    
        except AIServiceError as e:
            show_warning(f"Groq error: {e}")
        except Exception as e:
            show_warning(f"Chat failed: {e}")
    
    asyncio.run(_run_chat())


@click.command()
@click.argument('prompt')
@click.option('--language', help='Target programming language')
@click.option('--model', default='llama-3.1-8b-instant', help='Groq model to use')
def groq_generate(prompt: str, language: Optional[str], model: str):
    """Generate code using Groq.
    
    Examples:
        groq-generate "function to sort array"
        groq-generate "REST API endpoint" --language python
        groq-generate "React component" --language javascript --model llama3-8b-8192
    """
    
    async def _run_generate():
        try:
            ai_service = await get_ai_service()
            
            full_prompt = f"Generate code: {prompt}"
            if language:
                full_prompt += f"\nLanguage: {language}"
            
            response = await ai_service.generate_code(
                query=full_prompt,
                project_path=Path.cwd(),
                user_preferences=UserPreferences(
                    coding_style="clean",
                    preferred_patterns=[],
                    ai_model=model,
                    temperature=0.3,
                    max_tokens=1500
                ),
                provider_name="groq"
            )
            
            click.echo("🔧 Generated Code:")
            click.echo("=" * 50)
            click.echo(response.content)
            
            if response.tokens_used > 0:
                click.echo(f"\n⚡ Tokens: {response.tokens_used} | Cost: ${response.cost:.6f}")
                click.echo(f"🦊 Model: {model}")
                
        except AIServiceError as e:
            show_warning(f"Groq error: {e}")
        except Exception as e:
            show_warning(f"Generation failed: {e}")
    
    asyncio.run(_run_generate())


@click.command()
def groq_status():
    """Show Groq status and configuration.
    
    Examples:
        groq-status
    """
    
    config_manager = get_ai_config_manager()
    providers = config_manager.list_providers()
    
    click.echo("🦊 Groq Status")
    click.echo("=" * 30)
    
    if providers.get("groq", False):
        click.echo("✅ Groq is configured")
        
        # Show available models
        models = [
            ("llama-3.1-8b-instant", "Fast & efficient", "$0.05/1M tokens"),
            ("llama-3.1-70b-versatile", "High performance", "$0.59/1M tokens"),
            ("mixtral-8x7b-32768", "Multilingual", "$0.24/1M tokens"),
            ("gemma2-9b-it", "Google model", "$0.07/1M tokens")
        ]
        
        click.echo("\n🚀 Available Models:")
        for model, description, cost in models:
            click.echo(f"  {model:20} {description:15} {cost}")
        
        click.echo("\n💡 Quick Start:")
        click.echo("  groq \"create a python function\"")
        click.echo("  groq-review main.py")
        click.echo("  groq-chat")
        
    else:
        click.echo("❌ Groq not configured")
        click.echo("\n🔧 Setup:")
        click.echo("  export GROQ_API_KEY=<your-api-key>")
        click.echo("  devos ai-config set-api-key groq")
        click.echo("  groq-status")
