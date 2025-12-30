# Migrating to Vite Guide

## Why Vite?

- ⚡ **10-100x faster** dev server startup
- 🔥 **Instant** hot module replacement
- 📦 **Smaller** production bundles
- 🛠️ **Better** developer experience
- 🔧 **Easier** configuration

## Migration Steps

### Option 1: Quick Migration (Recommended)

1. **Install Vite and plugins:**
```bash
npm install -D vite @vitejs/plugin-react
```

2. **Create `vite.config.js` in root:**
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
```

3. **Update `package.json` scripts:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

4. **Move `index.html` to root:**
   - Move `public/index.html` to root directory
   - Update script tag: `<script type="module" src="/src/index.js"></script>`
   - Remove `%PUBLIC_URL%` references

5. **Update imports:**
   - Change relative imports if needed
   - Update asset imports (use `/` for public assets)

6. **Update environment variables:**
   - Change `REACT_APP_*` to `VITE_*`
   - Access via `import.meta.env.VITE_*`

### Option 2: Fresh Start (Clean Migration)

1. Create new Vite project:
```bash
npm create vite@latest healthdecoded-vite -- --template react
```

2. Copy your `src/` folder
3. Copy `public/` assets
4. Install dependencies
5. Update configuration

## Key Differences

### Environment Variables

**CRA:**
```env
REACT_APP_API_URL=https://api.example.com
```
Access: `process.env.REACT_APP_API_URL`

**Vite:**
```env
VITE_API_URL=https://api.example.com
```
Access: `import.meta.env.VITE_API_URL`

### Public Assets

**CRA:**
```jsx
<img src={process.env.PUBLIC_URL + '/logo.png'} />
```

**Vite:**
```jsx
<img src="/logo.png" />
// Or import:
import logo from '/logo.png'
```

### HTML Entry Point

**CRA:** `public/index.html` (processed by webpack)

**Vite:** Root `index.html` with script tag:
```html
<script type="module" src="/src/index.js"></script>
```

## Deployment

Vite builds to `dist/` instead of `build/`

**Update deployment configs:**

**Vercel:** Auto-detects Vite, no changes needed

**Netlify `netlify.toml`:**
```toml
[build]
  command = "npm run build"
  publish = "dist"
```

## Benefits You'll See

1. **Faster Development:**
   - Dev server starts in <1 second (vs 10-30s with CRA)
   - HMR updates in milliseconds

2. **Better Performance:**
   - Smaller bundle sizes
   - Optimized code splitting
   - Tree-shaking works better

3. **Modern Tooling:**
   - Native ESM support
   - Better TypeScript support
   - Easier to configure

## Adding Tailwind to Vite

If migrating, perfect time to add Tailwind:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update `vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
})
```

## Resources

- [Vite Docs](https://vitejs.dev/)
- [Vite React Plugin](https://github.com/vitejs/vite-plugin-react)
- [Migration Guide](https://vitejs.dev/guide/migration.html)

