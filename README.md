# digital.auto Plugin Template

A template for building React-based plugins for the [digital.auto](https://playground.digital.auto) platform. This demo shows how to read prototype/model data and interact with the Plugin API.

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

This starts:
- A Vite dev server at `http://localhost:5000`
- Auto-rebuild of `dist/index.js` when you change plugin code

### 3. Test in digital.auto

1. Open your prototype on [playground.digital.auto](https://playground.digital.auto)
2. Add a plugin widget and set the URL to your Replit URL + `/index.js`
   - Example: `https://your-repl.replit.dev/index.js`
3. The plugin will load and display prototype data

## Project Structure

```
├── src/
│   ├── plugin/              # Your plugin code (this gets bundled)
│   │   ├── index.ts         # Entry point with mount/unmount
│   │   └── Page.tsx         # Main React component
│   │
│   └── demo/                # Local test harness
│       ├── pages/home.tsx   # Loads and mounts the plugin
│       └── index.css        # CSS variables for testing
│
├── dist/
│   └── index.js             # Built plugin bundle (deploy this)
│
└── package.json
```

## Building Your Plugin

### Development (auto-rebuild)

```bash
npm run dev
```

Changes to `src/plugin/` automatically rebuild `dist/index.js`.

### Manual Build

```bash
npm run build:plugin
```

### Output

The plugin is bundled to `dist/index.js` as an IIFE (Immediately Invoked Function Expression) that:
- Exports `mount()` and `unmount()` functions
- Registers itself as `window.DAPlugins["page-plugin"]`
- Uses React from the host page (not bundled)

## Plugin API Reference

Your plugin receives these props:

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

### Reading Data

Access prototype and model data from `props.data`:

```typescript
const { data } = props;

// Prototype info
const prototypeName = data?.prototype?.name;
const prototypeState = data?.prototype?.state;
const prototypeCode = data?.prototype?.code;
const customerJourney = data?.prototype?.customer_journey;

// Model info
const modelName = data?.model?.name;
```

### Writing Data

Use `props.api` to update prototype or model data:

```typescript
const { api } = props;

// Update prototype fields
await api?.updatePrototype({
  name: "New Prototype Name",
  customer_journey: "Updated journey...",
  code: "# New code..."
});

// Update model fields
await api?.updateModel({
  name: "New Model Name"
});
```

### Available API Methods

| Method | Description |
|--------|-------------|
| `updateModel(updates)` | Update model data |
| `updatePrototype(updates)` | Update prototype data |
| `getComputedAPIs(model_id?)` | Get vehicle APIs |
| `getApiDetail(api_name, model_id?)` | Get specific API details |
| `listVSSVersions()` | List available VSS versions |
| `getRuntimeApiValues()` | Get current runtime values |
| `setRuntimeApiValues(values)` | Set runtime values |
| `createWishlistApi(data)` | Create custom signal |
| `updateWishlistApi(id, data)` | Update custom signal |
| `deleteWishlistApi(id)` | Delete custom signal |

## Customizing Your Plugin

### 1. Edit the Main Component

Open `src/plugin/Page.tsx` and modify the component:

```typescript
export default function Page({ data, config, api }: PageProps) {
  // Your custom plugin logic here
  
  return (
    <div style={styles.container}>
      {/* Your custom UI */}
    </div>
  );
}
```

### 2. Use CSS Variables for Theming

The host page provides CSS variables. Use them with fallbacks:

```typescript
const styles = {
  container: {
    backgroundColor: 'var(--background, #ffffff)',
    color: 'var(--foreground, #1f2937)',
    borderRadius: 'var(--radius, 8px)',
    border: '1px solid var(--border, #e5e7eb)',
  }
};
```

Available CSS variables from the host:
- `--background`, `--foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`
- `--border`, `--input`, `--ring`
- `--radius`
- `--destructive`

### 3. Important: React Usage

The plugin uses React from the host page. At the top of your component:

```typescript
const React: any = (globalThis as any).React;
```

This ensures your plugin uses the same React instance as digital.auto.

## Deployment

1. Build your plugin: `npm run build:plugin`
2. Host the `dist/` folder on any static file server
3. Register the plugin URL in your digital.auto prototype

### Option 1: Deploy on Replit

Your plugin is automatically available at:
```
https://your-repl.replit.dev/index.js
```

### Option 2: Deploy to Nginx / Apache / Other Web Servers

Copy the `dist/` directory to your web server:

```bash
# Build the plugin
npm run build:plugin

# Copy to your web server
cp -r dist/* /var/www/html/my-plugin/
# or
scp -r dist/* user@server:/var/www/html/my-plugin/
```

**Nginx example config:**
```nginx
server {
    listen 80;
    server_name plugins.example.com;
    
    location /my-plugin/ {
        alias /var/www/html/my-plugin/;
        add_header Access-Control-Allow-Origin *;
    }
}
```

**Apache example config:**
```apache
<Directory /var/www/html/my-plugin>
    Header set Access-Control-Allow-Origin "*"
</Directory>
```

Your plugin URL would be: `https://plugins.example.com/my-plugin/index.js`

### Option 3: Deploy to CDN

Upload `dist/index.js` to any CDN or static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any static file host

## Example: Custom Plugin

Here's a minimal custom plugin:

```typescript
const React: any = (globalThis as any).React;

type PageProps = {
  data?: any;
  config?: any;
  api?: any;
};

export default function Page({ data, api }: PageProps) {
  const [value, setValue] = React.useState('');
  
  const handleSave = async () => {
    await api?.updatePrototype({ customer_journey: value });
  };
  
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1 style={{ color: 'var(--primary, #333)' }}>
        My Custom Plugin
      </h1>
      <p>Prototype: {data?.prototype?.name}</p>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: '100%', minHeight: '100px' }}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
```

## Troubleshooting

### CORS Errors

If you see CORS errors when loading from digital.auto, the dev server is configured to allow all origins. Make sure you're using the correct URL.

### Plugin Not Loading

1. Check browser console for errors
2. Verify the plugin URL is accessible
3. Ensure `window.DAPlugins["page-plugin"]` is defined

### React Errors

Make sure you're using `globalThis.React` instead of importing React directly:

```typescript
// Correct
const React: any = (globalThis as any).React;

// Wrong - will bundle a separate React instance
import React from 'react';
```

## License

MIT
