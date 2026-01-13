# digital.auto Plugin Demo

## Overview

A template project for building digital.auto plugins. See [README.md](./README.md) for full documentation.

## Project Structure

```
├── src/
│   ├── plugin/              # Plugin code (gets bundled to dist/)
│   │   ├── index.ts         # Entry point with mount/unmount
│   │   └── Page.tsx         # Main React component
│   │
│   └── demo/                # Local test harness
│       ├── pages/home.tsx   # Loads and mounts the plugin
│       └── index.css        # CSS variables (fallbacks)
│
├── dist/
│   └── index.js             # Built plugin (deploy this)
│
├── README.md                # Full documentation
└── package.json
```

## Quick Commands

- `npm run dev` - Start dev server with auto-rebuild
- `npm run build:plugin` - Build plugin manually

## Plugin Output

Built to `dist/index.js`, accessible at `/index.js`

## Key Points

1. Plugin uses `globalThis.React` (host provides React)
2. Uses CSS variables with fallbacks for theming
3. Inline styles for portability (no Tailwind)
4. CORS enabled for cross-origin loading

## User Preferences

- No Tailwind CSS - use inline styles
- Clean, minimal project structure
- CSS variables from mother page with fallbacks
