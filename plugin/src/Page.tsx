const React: any = (globalThis as any).React;

type PageProps = { data?: any; config?: any };

export default function Page({ data, config }: PageProps) {
  const modelName = data?.model?.name || 'No model name';
  const prototypeName = data?.prototype?.name || 'No prototype name';
  const customerJourney = data?.prototype?.customerJourney || [];
  const code = data?.prototype?.code || '';

  return React.createElement('div', {
    className: 'min-h-screen w-full bg-gray-900 p-6'
  },
    React.createElement('div', {
      className: 'max-w-4xl mx-auto'
    },
      React.createElement('div', {
        className: 'bg-gray-800 rounded-lg shadow-sm p-6 space-y-6'
      },
        React.createElement('div', {
          className: 'space-y-2'
        },
          React.createElement('label', {
            className: 'text-sm font-semibold text-gray-400'
          }, 'Model Name'),
          React.createElement('p', {
            className: 'text-lg text-gray-100'
          }, modelName)
        ),
        React.createElement('div', {
          className: 'space-y-2'
        },
          React.createElement('label', {
            className: 'text-sm font-semibold text-gray-400'
          }, 'Prototype Name'),
          React.createElement('p', {
            className: 'text-lg text-gray-100'
          }, prototypeName)
        ),
        React.createElement('div', {
          className: 'space-y-2'
        },
          React.createElement('label', {
            className: 'text-sm font-semibold text-gray-400'
          }, 'Customer Journey'),
          customerJourney.length > 0
            ? React.createElement('ul', {
                className: 'list-disc list-inside space-y-1'
              },
                customerJourney.map((step: string, index: number) =>
                  React.createElement('li', {
                    key: index,
                    className: 'text-gray-100'
                  }, step)
                )
              )
            : React.createElement('p', {
                className: 'text-gray-500 italic'
              }, 'No customer journey defined')
        ),
        React.createElement('div', {
          className: 'space-y-2'
        },
          React.createElement('label', {
            className: 'text-sm font-semibold text-gray-400'
          }, 'Prototype Code'),
          code
            ? React.createElement('pre', {
                className: 'bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono border border-gray-700'
              },
                React.createElement('code', null, code)
              )
            : React.createElement('p', {
                className: 'text-gray-500 italic'
              }, 'No code provided')
        )
      )
    )
  );
}
