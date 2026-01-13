# digital.auto Plugin Demo

## Overview
A template project for building digital.auto plugins. This project demonstrates how to create a React-based plugin that can display prototype data and interact with the Plugin API.

## Project Structure

```
├── client/                    # Demo frontend application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── home.tsx      # Demo page that loads and mounts the plugin
│   │   │   └── not-found.tsx # 404 page
│   │   ├── App.tsx           # App router
│   │   ├── index.css         # Simple CSS (no Tailwind)
│   │   └── main.tsx          # Entry point
│   └── index.html            # HTML template
│
├── plugin/                    # The actual plugin code
│   ├── src/
│   │   ├── index.ts          # Entry point with mount/unmount functions
│   │   └── Page.tsx          # Main plugin component
│   ├── package.json          # Plugin dependencies
│   ├── build.sh              # Build script
│   ├── index.js              # Built bundle (IIFE format)
│   └── README.md             # Plugin documentation
│
├── server/                    # Express server
└── shared/                    # Shared types
```

## What This Demo Demonstrates

1. **Reading Prototype & Model Data**: Shows how plugins can read data from the current prototype and model:
   - Prototype ID, Name, State, and Language
   - Model ID and Name
   - Customer Journey content
   - Prototype Code

2. **Writing Data Back**: Demonstrates how plugins can update data back to the platform using the Plugin API (e.g., `updatePrototype`)

3. **Available APIs**: Shows which Plugin API methods are available in the current context

## Building the Plugin

```bash
cd plugin
bash build.sh
```

This will:
- Install npm dependencies
- Bundle with esbuild as IIFE format
- External: react, react-dom/client, react/jsx-runtime (provided by host)
- Output: `index.js` and `index.js.map`

## Plugin API

The plugin receives these props:

```typescript
type PageProps = {
  data?: {
    model?: Model;
    prototype?: Prototype;
  };
  config?: {
    plugin_id?: string;
  };
  api?: PluginAPI;
};
```

### Available API Methods

- `updateModel(updates)` - Update model data
- `updatePrototype(updates)` - Update prototype data
- `getComputedAPIs()` - Get vehicle APIs
- `getApiDetail(api_name)` - Get specific API details
- `listVSSVersions()` - List VSS versions
- `getRuntimeApiValues()` - Get current runtime values
- `setRuntimeApiValues(values)` - Set runtime values
- `createWishlistApi(data)` - Create custom signal
- And more...

## Styling

This template uses **inline CSS styles** instead of Tailwind or CSS frameworks. This makes the plugin self-contained and easier to deploy.

The styles object pattern is used:
```typescript
const styles = {
  container: {
    minHeight: '100vh',
    padding: '24px',
    // ...
  },
  // ...
};

// Usage
<div style={styles.container}>...</div>
```

## Key Points

1. **React from Global**: The plugin uses `globalThis.React` instead of importing React, because the host application provides React
2. **No External Dependencies**: Plugin should minimize external dependencies for easier deployment
3. **Self-contained Styling**: Use inline styles for portability
4. **Error Handling**: Always use optional chaining (`?.`) for data access
5. **API Availability**: Check if API methods exist before calling them

## Development

Run the development server:
```bash
npm run dev
```

The demo page shows how the plugin will look when integrated into digital.auto.

## Deployment

1. Build the plugin: `cd plugin && bash build.sh`
2. Host the `plugin/index.js` file on a CDN or server
3. Register the plugin URL in digital.auto

## User Preferences

- No Tailwind CSS - use inline styles
- Clean, minimal project structure
- Self-documenting code with inline comments where needed
