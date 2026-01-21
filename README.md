# DevOS – Developer Operating CLI

**Tagline:** One command-line to manage your entire dev life.

## Installation

```bash
pip install devos
```

## Quick Start

```bash
# Initialize a new project
devos init python-api

# Start tracking work
devos track start

# Set environment variables
devos env set DATABASE_URL

# Generate weekly report
devos report weekly

# Ship a new version
devos ship minor
```

## Commands

- `devos init` - Project bootstrapper with templates
- `devos track` - Work session tracking
- `devos env` - Secure environment variable management
- `devos report` - Productivity reports
- `devos ship` - Release automation

## Configuration

Configuration is stored in `~/.devos/config.yml`:

```yaml
default_language: python
tracking:
  auto_git: true
reports:
  week_start: monday
```

## Development

```bash
# Install in development mode
pip install -e ".[dev]"

# Run tests
pytest

# Format code
black src/
```

## License

MIT
