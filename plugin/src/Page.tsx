const React: any = (globalThis as any).React;
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import mermaid from 'mermaid';

type PageProps = { data?: any; config?: any };

export default function Page({ data, config }: PageProps) {
  const [mermaidCode, setMermaidCode] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>('');
  const mermaidRef = React.useRef<HTMLDivElement>(null);
  
  const code = data?.prototype?.code || 'No code provided';
  
  React.useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: false,
      theme: 'default',
      themeVariables: {
        primaryColor: '#f0f0f0',
        primaryTextColor: '#333',
        primaryBorderColor: '#ddd',
        lineColor: '#666',
        secondaryColor: '#fff',
        tertiaryColor: '#fafafa'
      }
    });
  }, []);

  React.useEffect(() => {
    async function generateUML() {
      try {
        setIsLoading(true);
        setError('');
        
        const backendUrl = config?.backendUrl || 'https://3f922878-444d-4a75-bebf-5d14f5394eeb-00-16daf27c5lw4s.picard.replit.dev';
        const apiUrl = backendUrl + '/api/generate-uml';
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate UML');
        }

        const result = await response.json();
        setMermaidCode(result.mermaidCode);
      } catch (err) {
        console.error('Error generating UML:', err);
        setError('Failed to generate UML diagram');
      } finally {
        setIsLoading(false);
      }
    }

    if (code && code !== 'No code provided') {
      generateUML();
    }
  }, [code, config?.backendUrl]);

  React.useEffect(() => {
    async function renderMermaid() {
      if (mermaidCode && mermaidRef.current) {
        try {
          const { svg } = await mermaid.render('mermaid-diagram', mermaidCode);
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = svg;
          }
        } catch (err) {
          console.error('Error rendering mermaid:', err);
          setError('Failed to render UML diagram');
        }
      }
    }

    renderMermaid();
  }, [mermaidCode]);

  return React.createElement('div', {
    className: 'min-h-screen w-full bg-gray-50 p-6'
  },
    React.createElement('div', {
      className: 'max-w-7xl mx-auto'
    },
      React.createElement('div', {
        className: 'grid grid-cols-3 gap-6'
      },
        React.createElement('div', {
          className: 'col-span-1 bg-white rounded-lg shadow-sm overflow-hidden'
        },
          React.createElement('div', {
            className: 'bg-gray-100 px-4 py-2 border-b'
          },
            React.createElement('h2', {
              className: 'text-sm font-semibold text-gray-700'
            }, 'Python Code')
          ),
          React.createElement(SyntaxHighlighter, {
            language: 'python',
            style: oneLight,
            showLineNumbers: true,
            wrapLines: true,
            customStyle: {
              margin: 0,
              borderRadius: 0,
              fontSize: '14px',
              maxHeight: 'calc(100vh - 12rem)',
              overflow: 'auto'
            },
            children: code
          })
        ),
        React.createElement('div', {
          className: 'col-span-2 bg-white rounded-lg shadow-sm overflow-hidden'
        },
          React.createElement('div', {
            className: 'bg-gray-100 px-4 py-2 border-b'
          },
            React.createElement('h2', {
              className: 'text-sm font-semibold text-gray-700'
            }, 'UML Diagram')
          ),
          React.createElement('div', {
            className: 'p-6 overflow-auto',
            style: { maxHeight: 'calc(100vh - 12rem)' }
          },
            isLoading
              ? React.createElement('div', {
                  className: 'flex items-center justify-center h-64'
                },
                  React.createElement('div', {
                    className: 'text-gray-500'
                  }, 'Generating UML diagram...')
                )
              : error
              ? React.createElement('div', {
                  className: 'flex items-center justify-center h-64'
                },
                  React.createElement('div', {
                    className: 'text-red-500'
                  }, error)
                )
              : React.createElement('div', {
                  ref: mermaidRef,
                  className: 'flex items-center justify-center'
                })
          )
        )
      )
    )
  );
}
