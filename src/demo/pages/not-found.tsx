const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    backgroundColor: '#f5f7fa',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  title: {
    fontSize: '72px',
    fontWeight: '700',
    color: '#1a1a2e',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '24px',
    color: '#6b7280',
    margin: '0 0 24px 0',
  },
  link: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#ffffff',
    backgroundColor: '#3b82f6',
    borderRadius: '6px',
    textDecoration: 'none',
  },
};

export default function NotFound() {
  return (
    <div style={styles.container} data-testid="not-found-page">
      <h1 style={styles.title}>404</h1>
      <p style={styles.subtitle}>Page not found</p>
      <a href="/" style={styles.link} data-testid="link-go-home">
        Go Home
      </a>
    </div>
  );
}
