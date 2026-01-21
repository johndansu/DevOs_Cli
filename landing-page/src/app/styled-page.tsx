export default function StyledPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1rem', background: 'linear-gradient(to right, #f8fafc, #3b82f6, #f8fafc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          DevOS CLI
        </h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#94a3b8' }}>
          One command-line to manage your entire dev life. Local-first, secure, and built for modern developers.
        </p>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
          <button style={{ backgroundColor: '#3b82f6', color: 'white', padding: '1rem 2rem', fontSize: '1.125rem', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>
            🚀 Get Started
          </button>
          <button style={{ backgroundColor: 'transparent', color: '#f8fafc', padding: '1rem 2rem', fontSize: '1.125rem', border: '1px solid #475569', borderRadius: '0.5rem', cursor: 'pointer' }}>
            📚 View Docs
          </button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ backgroundColor: '#1e293b', padding: '2rem', borderRadius: '0.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#3b82f6' }}>💻</div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Project Management</h3>
            <p style={{ color: '#94a3b8' }}>Initialize projects with templates for Python, JavaScript, Go, and Rust</p>
          </div>
          <div style={{ backgroundColor: '#1e293b', padding: '2rem', borderRadius: '0.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#3b82f6' }}>⚡</div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Session Tracking</h3>
            <p style={{ color: '#94a3b8' }}>Track your development time with automatic session management</p>
          </div>
          <div style={{ backgroundColor: '#1e293b', padding: '2rem', borderRadius: '0.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#3b82f6' }}>🔒</div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Secure Environment</h3>
            <p style={{ color: '#94a3b8' }}>Encrypted storage for environment variables and sensitive data</p>
          </div>
          <div style={{ backgroundColor: '#1e293b', padding: '2rem', borderRadius: '0.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#3b82f6' }}>📊</div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Productivity Reports</h3>
            <p style={{ color: '#94a3b8' }}>Generate detailed reports on your development activity</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#1e293b', padding: '2rem', borderRadius: '0.75rem', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Quick Installation</h2>
          <div style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '0.5rem', fontFamily: 'monospace', fontSize: '0.875rem', marginBottom: '1rem' }}>
            pip install -e .
          </div>
          <div style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '0.5rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>
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
      </div>
    </div>
  );
}
