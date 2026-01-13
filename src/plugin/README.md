# Remote React Plugin

A simple, hot-loadable React plugin built with TypeScript + TSX.

## Features

- TypeScript + TSX syntax
- Can import npm packages (bundled automatically)
- Hot-loadable into host applications
- Accepts `data` and `config` props
- React/ReactDOM provided by host (not bundled)

## Building

Run the build script:
```bash
cd plugin
bash build.sh
```

This will:
1. Install dependencies from `package.json`
2. Compile TSX to JavaScript
3. Bundle code into `index.js` (IIFE format)
4. Generate source maps

## Loading in Host Application

```html
<!-- Step 1: Load React from CDN -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Step 2: Set up require() polyfill for plugin -->
<script>
  window.require = function(name) {
    if (name === 'react') return window.React;
    if (name === 'react-dom/client') return window.ReactDOM;
    if (name === 'react/jsx-runtime') {
      return {
        jsx: window.React.createElement,
        jsxs: window.React.createElement,
        Fragment: window.React.Fragment
      };
    }
    throw new Error('Module not found: ' + name);
  };
</script>

<!-- Step 3: Load plugin bundle -->
<script src="http://localhost:5000/plugin/index.js"></script>

<!-- Step 4: Mount plugin -->
<div id="plugin-container"></div>
<script>
  const plugin = window.DAPlugins['page-plugin'];
  const container = document.getElementById('plugin-container');
  
  plugin.mount(container, {
    data: { metrics: [...] },
    config: { title: 'My Dashboard' }
  });
  
  // Later: plugin.unmount(container);
</script>
```

## Plugin API

Every plugin exposes:
- `components.Page` - The main React component
- `mount(element, props)` - Mount plugin to DOM element
- `unmount(element)` - Unmount and cleanup

Props:
- `data?: any` - Dynamic data from host
- `config?: any` - Configuration settings
