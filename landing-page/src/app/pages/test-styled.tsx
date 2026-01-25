export default function TestStyledPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          textShadow: '0 0 20px rgba(255,255,255,0.5)'
        }}>
          DevOS CLI
        </h1>
        <p style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          opacity: 0.9
        }}>
          One command-line to manage your entire dev life.
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem',
          marginTop: '4rem'
        }}>
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            backdropFilter: 'blur(10px)',
            padding: '2rem', 
            borderRadius: '1rem',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💻</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Project Management
            </h3>
            <p style={{ opacity: 0.8 }}>
              Initialize projects with templates for Python, JavaScript, Go, and Rust
            </p>
          </div>
          
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            backdropFilter: 'blur(10px)',
            padding: '2rem', 
            borderRadius: '1rem',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Session Tracking
            </h3>
            <p style={{ opacity: 0.8 }}>
              Track your development time with automatic session management
            </p>
          </div>
          
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            backdropFilter: 'blur(10px)',
            padding: '2rem', 
            borderRadius: '1rem',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Secure Environment
            </h3>
            <p style={{ opacity: 0.8 }}>
              Encrypted storage for environment variables and sensitive data
            </p>
          </div>
          
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            backdropFilter: 'blur(10px)',
            padding: '2rem', 
            borderRadius: '1rem',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Productivity Reports
            </h3>
            <p style={{ opacity: 0.8 }}>
              Generate detailed reports on your development activity
            </p>
          </div>
        </div>

        <div style={{ 
          background: 'rgba(0,0,0,0.3)', 
          padding: '2rem', 
          borderRadius: '1rem',
          marginTop: '4rem',
          textAlign: 'left'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>
            Quick Installation
          </h2>
          <div style={{ 
            background: 'rgba(0,0,0,0.5)', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            fontFamily: 'monospace',
            fontSize: '1rem',
            color: '#4ade80',
            marginBottom: '1rem'
          }}>
            pip install -e .
          </div>
          <div style={{ 
            background: 'rgba(0,0,0,0.5)', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            color: '#4ade80'
          }}>
            {`# Initialize a new project
devos init python-api

# Navigate to project
cd python-api

# Start tracking work
devos track start

# Set environment variables
devos env set DATABASE_URL

# Generate reports
devos report weekly`}
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          marginTop: '3rem'
        }}>
          <button style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '1rem 2rem',
            fontSize: '1.125rem',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
          }}>
            🚀 Get Started
          </button>
          <button style={{ 
            background: 'transparent',
            color: 'white',
            padding: '1rem 2rem',
            fontSize: '1.125rem',
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            📚 View Docs
          </button>
        </div>
      </div>
    </div>
  );
}
