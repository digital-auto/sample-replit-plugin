# digital.auto Plugin Demo

## Overview
A template project for building digital.auto plugins. This project demonstrates how to create a React-based plugin that can display prototype data and interact with the Plugin API.

## Project Structure

```
├── src/
│   ├── plugin/                # The actual plugin code (deployable)
│   │   ├── index.ts           # Entry point with mount/unmount functions
│   │   ├── Page.tsx           # Main plugin component
│   │   ├── build.sh           # Build script for production bundle
│   │   ├── package.json       # Plugin dependencies
│   │   └── README.md          # Plugin documentation
│   │
│   └── demo/                  # Demo application (for local testing)
│       ├── pages/
│       │   ├── home.tsx       # Demo page that loads and mounts the plugin
│       │   └── not-found.tsx  # 404 page
│       ├── App.tsx            # App router
│       ├── main.tsx           # Entry point
│       ├── index.css          # Basic styles
│       └── index.html         # HTML template
│
├── dist/                      # Built plugin output
│   └── index.js               # The plugin bundle to deploy
│
├── package.json               # Root package configuration
├── vite.config.ts             # Vite configuration
└── tsconfig.json              # TypeScript configuration
```

## Plugin Output

The plugin is automatically built to `dist/index.js` whenever you change code in `src/plugin/`.

**Access URL:** `/index.js` (served from the dist folder)

## What This Demo Demonstrates

1. **Reading Prototype & Model Data**: Shows how plugins can read data from the current prototype and model:
   - Prototype Name, State, and Language
   - Model Name
   - Customer Journey content
   - Prototype Code

2. **Writing Data Back**: Demonstrates how plugins can update data back to the platform using the Plugin API (e.g., `updatePrototype`)

3. **Available APIs**: Shows which Plugin API methods are available in the current context

## Development

Run the development server:
```bash
npm run dev
```

This will:
- Start the Vite dev server for the demo app
- Watch for changes in `src/plugin/` and automatically rebuild `dist/index.js`

## Building the Plugin Manually

```bash
npm run build:plugin
```

Or:
```bash
cd src/plugin
bash build.sh
```

This will:
- Bundle with esbuild as IIFE format
- External: react, react-dom/client, react/jsx-runtime (provided by host)
- Output: `dist/index.js` and `dist/index.js.map`

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

## Key Points

1. **React from Global**: The plugin uses `globalThis.React` instead of importing React, because the host application provides React
2. **No External Dependencies**: Plugin should minimize external dependencies for easier deployment
3. **Self-contained Styling**: Use inline styles for portability
4. **Error Handling**: Always use optional chaining (`?.`) for data access
5. **API Availability**: Check if API methods exist before calling them

## Deployment

1. The plugin is automatically built to `dist/index.js`
2. Host the `dist/index.js` file on a CDN or server
3. Register the plugin URL in digital.auto

## User Preferences

- No Tailwind CSS - use inline styles
- Clean, minimal project structure
- Self-documenting code with inline comments where needed
