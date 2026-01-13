const React: any = (globalThis as any).React;

type PluginAPI = {
  updateModel?: (updates: any) => Promise<any>;
  updatePrototype?: (updates: any) => Promise<any>;
  getComputedAPIs?: (model_id?: string) => Promise<any>;
  getApiDetail?: (api_name: string, model_id?: string) => Promise<any>;
  listVSSVersions?: () => Promise<string[]>;
  getRuntimeApiValues?: () => Record<string, any>;
  setRuntimeApiValues?: (values: Record<string, any>) => void;
  replaceAPIs?: (api_data_url: string, model_id?: string) => Promise<void>;
  createWishlistApi?: (data: any) => Promise<any>;
  updateWishlistApi?: (id: string, data: any) => Promise<any>;
  deleteWishlistApi?: (id: string) => Promise<void>;
  getWishlistApi?: (name: string, model_id?: string) => Promise<any>;
  listWishlistApis?: (model_id?: string) => Promise<any>;
};

type PageProps = {
  data?: any;
  config?: any;
  api?: PluginAPI;
};

const styles = {
  container: {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: 'var(--muted, #f5f7fa)',
    padding: '24px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    boxSizing: 'border-box' as const,
    color: 'var(--foreground, #1f2937)',
  },
  wrapper: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: 'var(--primary, #1a1a2e)',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--muted-foreground, #6b7280)',
    margin: 0,
  },
  card: {
    backgroundColor: 'var(--background, #ffffff)',
    borderRadius: 'var(--radius, 8px)',
    border: '1px solid var(--border, #e5e7eb)',
    padding: '20px',
    marginBottom: '20px',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--foreground, #374151)',
    margin: '0 0 16px 0',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--border, #e5e7eb)',
  },
  fieldGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--muted-foreground, #6b7280)',
    marginBottom: '4px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  value: {
    fontSize: '14px',
    color: 'var(--foreground, #1f2937)',
    margin: 0,
  },
  codeBlock: {
    backgroundColor: 'var(--primary, #1e1e2e)',
    color: 'var(--primary-foreground, #cdd6f4)',
    padding: '16px',
    borderRadius: 'var(--radius, 6px)',
    fontSize: '13px',
    fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
    overflow: 'auto',
    maxHeight: '300px',
    whiteSpace: 'pre-wrap' as const,
    wordBreak: 'break-word' as const,
  },
  customerJourneyBlock: {
    backgroundColor: 'var(--muted, #f9fafb)',
    padding: '16px',
    borderRadius: 'var(--radius, 6px)',
    fontSize: '14px',
    lineHeight: '1.6',
    color: 'var(--foreground, #374151)',
    whiteSpace: 'pre-wrap' as const,
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    border: '1px solid var(--input, #d1d5db)',
    borderRadius: 'var(--radius, 6px)',
    boxSizing: 'border-box' as const,
    outline: 'none',
    backgroundColor: 'var(--background, #ffffff)',
    color: 'var(--foreground, #1f2937)',
  },
  button: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '500',
    color: 'var(--primary-foreground, #ffffff)',
    backgroundColor: 'var(--primary, #3b82f6)',
    border: 'none',
    borderRadius: 'var(--radius, 6px)',
    cursor: 'pointer',
    marginTop: '12px',
  },
  buttonDisabled: {
    backgroundColor: 'var(--muted-foreground, #9ca3af)',
    cursor: 'not-allowed',
  },
  successMessage: {
    backgroundColor: 'var(--secondary, #d1fae5)',
    color: 'var(--secondary-foreground, #065f46)',
    padding: '12px 16px',
    borderRadius: 'var(--radius, 6px)',
    fontSize: '14px',
    marginTop: '12px',
  },
  errorMessage: {
    backgroundColor: 'var(--destructive, #fee2e2)',
    color: 'var(--primary-foreground, #991b1b)',
    padding: '12px 16px',
    borderRadius: 'var(--radius, 6px)',
    fontSize: '14px',
    marginTop: '12px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 10px',
    fontSize: '12px',
    fontWeight: '500',
    borderRadius: '20px',
    backgroundColor: 'var(--muted, #e0e7ff)',
    color: 'var(--primary, #3730a3)',
  },
  apiSection: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-end',
    flexWrap: 'wrap' as const,
  },
};

export default function Page({ data, config, api }: PageProps) {
  const [prototypeName, setPrototypeName] = React.useState('');
  const [isSaving, setIsSaving] = React.useState(false);
  const [message, setMessage] = React.useState(null as { type: 'success' | 'error'; text: string } | null);

  const prototype = data?.prototype;
  const model = data?.model;

  React.useEffect(() => {
    if (prototype?.name) {
      setPrototypeName(prototype.name);
    }
  }, [prototype?.name]);

  const handleUpdateName = async () => {
    if (!api?.updatePrototype) {
      setMessage({ type: 'error', text: 'updatePrototype API is not available' });
      return;
    }

    if (!prototypeName.trim()) {
      setMessage({ type: 'error', text: 'Please enter a valid name' });
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      await api.updatePrototype({ name: prototypeName });
      setMessage({ type: 'success', text: 'Prototype name updated successfully!' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error?.message || 'Failed to update prototype name' });
    } finally {
      setIsSaving(false);
    }
  };

  const formatCustomerJourney = (journey: string) => {
    if (!journey) return 'No customer journey defined';
    return journey.trim();
  };

  return (
    <div style={styles.container} data-testid="plugin-page">
      <div style={styles.wrapper}>
        <header style={styles.header}>
          <h1 style={styles.title} data-testid="text-page-title">digital.auto Plugin Demo</h1>
          <p style={styles.subtitle}>Demonstrating how plugins can interact with the digital.auto platform</p>
        </header>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Reading Prototype & Model Data</h2>
          <p style={{ ...styles.value, marginBottom: '16px', color: 'var(--muted-foreground, #6b7280)' }}>
            This section demonstrates how plugins can read data from the current prototype and model.
          </p>
          <h3 style={{ ...styles.cardTitle, fontSize: '14px', marginTop: '16px', paddingBottom: '8px', borderBottom: 'none', marginBottom: '8px' }}>Prototype Information</h3>
          <div style={styles.grid}>
            <div style={styles.fieldGroup}>
              <span style={styles.label}>Prototype Name</span>
              <p style={styles.value} data-testid="text-prototype-name">{prototype?.name || 'N/A'}</p>
            </div>
            <div style={styles.fieldGroup}>
              <span style={styles.label}>State</span>
              <span style={styles.badge} data-testid="text-prototype-state">{prototype?.state || 'N/A'}</span>
            </div>
            <div style={styles.fieldGroup}>
              <span style={styles.label}>Language</span>
              <p style={styles.value} data-testid="text-prototype-language">{prototype?.language || 'N/A'}</p>
            </div>
          </div>
          <h3 style={{ ...styles.cardTitle, fontSize: '14px', marginTop: '20px', paddingBottom: '8px', borderBottom: 'none', marginBottom: '8px' }}>Model Information</h3>
          <div style={styles.grid}>
            <div style={styles.fieldGroup}>
              <span style={styles.label}>Model Name</span>
              <p style={styles.value} data-testid="text-model-name">{model?.name || prototype?.model_id?.name || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Customer Journey</h2>
          <div style={styles.customerJourneyBlock} data-testid="text-customer-journey">
            {formatCustomerJourney(prototype?.customer_journey)}
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Prototype Code</h2>
          <pre style={styles.codeBlock} data-testid="text-prototype-code">
            {prototype?.code || '# No code available'}
          </pre>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Writing Data Back</h2>
          <p style={{ ...styles.value, marginBottom: '16px', color: 'var(--muted-foreground, #6b7280)' }}>
            This section demonstrates how plugins can update data back to the platform using the Plugin API.
          </p>
          <div style={styles.apiSection}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <span style={styles.label}>New Prototype Name</span>
              <input
                type="text"
                value={prototypeName}
                onChange={(e) => setPrototypeName(e.target.value)}
                placeholder="Enter new prototype name..."
                style={styles.input}
                data-testid="input-prototype-name"
              />
            </div>
            <button
              onClick={handleUpdateName}
              disabled={isSaving || !api?.updatePrototype}
              style={{
                ...styles.button,
                ...(isSaving || !api?.updatePrototype ? styles.buttonDisabled : {}),
              }}
              data-testid="button-update-prototype"
            >
              {isSaving ? 'Updating...' : 'Update Name'}
            </button>
          </div>
          {!api?.updatePrototype && (
            <p style={{ fontSize: '12px', color: 'var(--muted-foreground, #9ca3af)', marginTop: '8px' }}>
              Note: updatePrototype API is not available in this context
            </p>
          )}
          {message && (
            <div
              style={message.type === 'success' ? styles.successMessage : styles.errorMessage}
              data-testid={`text-message-${message.type}`}
            >
              {message.text}
            </div>
          )}
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Available APIs</h2>
          <p style={{ ...styles.value, marginBottom: '12px', color: 'var(--muted-foreground, #6b7280)' }}>
            The following API methods are available to this plugin:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {api?.updateModel && <span style={styles.badge}>updateModel</span>}
            {api?.updatePrototype && <span style={styles.badge}>updatePrototype</span>}
            {api?.getComputedAPIs && <span style={styles.badge}>getComputedAPIs</span>}
            {api?.getApiDetail && <span style={styles.badge}>getApiDetail</span>}
            {api?.listVSSVersions && <span style={styles.badge}>listVSSVersions</span>}
            {api?.getRuntimeApiValues && <span style={styles.badge}>getRuntimeApiValues</span>}
            {api?.setRuntimeApiValues && <span style={styles.badge}>setRuntimeApiValues</span>}
            {api?.createWishlistApi && <span style={styles.badge}>createWishlistApi</span>}
            {!api && <span style={{ ...styles.badge, backgroundColor: 'var(--destructive, #fef3c7)', color: 'var(--primary-foreground, #92400e)' }}>No API provided</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
