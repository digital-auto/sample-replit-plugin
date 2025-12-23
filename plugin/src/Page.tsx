const React: any = (globalThis as any).React;

type PageProps = { data?: any; config?: any };

export default function Page({ data, config }: PageProps) {
  const modelName = data?.model?.name || 'No model name';
  const prototypeName = data?.prototype?.name || 'No prototype name';

  return React.createElement('div', {
    className: 'min-h-screen w-full bg-gray-50 p-6'
  },
    React.createElement('div', {
      className: 'max-w-2xl mx-auto'
    },
      React.createElement('div', {
        className: 'bg-white rounded-lg shadow-sm p-6 space-y-4'
      },
        React.createElement('div', {
          className: 'space-y-2'
        },
          React.createElement('label', {
            className: 'text-sm font-semibold text-gray-700'
          }, 'Model Name'),
          React.createElement('p', {
            className: 'text-lg text-gray-900'
          }, modelName)
        ),
        React.createElement('div', {
          className: 'space-y-2'
        },
          React.createElement('label', {
            className: 'text-sm font-semibold text-gray-700'
          }, 'Prototype Name'),
          React.createElement('p', {
            className: 'text-lg text-gray-900'
          }, prototypeName)
        )
      )
    )
  );
}
