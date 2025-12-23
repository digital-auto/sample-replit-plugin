# Remote React Plugin System

## Overview
A simple plugin system for building TypeScript React components that can be hot-loaded into any host application.

## Structure

```
plugin/
├── src/
│   ├── index.ts              # Entry point with mount/unmount functions
│   └── components/
│       └── Page.tsx          # Main plugin component
├── package.json              # Plugin dependencies (bundled)
├── build.sh                  # esbuild build script
├── index.js                  # Built bundle (IIFE format)
└── index.js.map             # Source map
```

## How It Works

1. **Build**: Run `bash plugin/build.sh` to bundle the plugin
2. **Serve**: Plugin is served at `/plugin/index.js` with CORS enabled
3. **Load**: Host page loads React first, then loads the plugin
4. **Mount**: Call `window.DAPlugins['page-plugin'].mount(element, props)`

## Building the Plugin

```bash
cd plugin
bash build.sh
```

This will:
- Install npm dependencies (like dayjs)
- Bundle with esbuild as IIFE format
- External: react, react-dom/client, react/jsx-runtime (provided by host)
- Output: `index.js` and `index.js.map`

## Loading in Host

```html
<!-- 1. Load React from CDN -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- 2. Polyfill require() for plugin -->
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

<!-- 3. Load plugin -->
<script src="http://localhost:5000/plugin/index.js"></script>

<!-- 4. Mount it -->
<div id="container"></div>
<script>
  const plugin = window.DAPlugins['page-plugin'];
  plugin.mount(document.getElementById('container'), {
    data: { metrics: [...] },
    config: { title: 'Dashboard' }
  });
</script>
```

## Plugin API

The plugin exports:

- `components.Page` - Main React component
- `mount(element, props)` - Mount to DOM element
- `unmount(element)` - Cleanup and unmount

Props:
- `data?: any` - Dynamic data containing the Python code
  - `data.prototype.code` - The Python source code to display and analyze
- `config?: any` - Configuration
  - `config.backendUrl` - URL of the backend server (defaults to `'https://3f922878-444d-4a75-bebf-5d14f5394eeb-00-16daf27c5lw4s.picard.replit.dev'`)

## Demo

Visit `/demo.html` to see the plugin in action.

## Development

The plugin uses:
- **esbuild** - Fast bundler
- **IIFE format** - Immediately invoked, works everywhere
- **External React** - Host provides React/ReactDOM
- **npm packages** - Bundled automatically (like dayjs)

## Key Points

- React/ReactDOM must be loaded before the plugin
- Plugin registers itself on `window.DAPlugins`
- All npm dependencies are bundled except React
- Simple mount/unmount API
- Works with any host application
