# ConduitAI - Visual Workflow Builder

An AI co-pilot that allows freelancers to describe workflows in plain English and then the AI builds and runs automations by connecting their existing tools.

## Features

### Visual Workflow Builder
A powerful, intuitive drag-and-drop interface for creating automation workflows:

- **Interactive Canvas**: Pan, zoom, and arrange workflow nodes
- **Three Node Types**:
  - 🔹 **Trigger** (Diamond) - Start workflows based on events
  - 🔷 **Action** (Rectangle) - Perform actions with your apps
  - 🔶 **Condition** (Hexagon) - Add logic and branching
- **Node Configuration**: Click nodes to configure with dynamic parameters
- **Animated Connections**: Visual flow indicators with animations
- **Canvas Controls**: Zoom, fit to view, undo/redo, export as image
- **Responsive Design**: Works on desktop, tablet, and mobile devices

See [WORKFLOW_BUILDER.md](./WORKFLOW_BUILDER.md) for complete documentation.

## Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Tech Stack

- **React 19** with TypeScript
- **Vite** for blazing-fast builds
- **React Flow** for the visual workflow canvas
- **Zustand** for state management
- **html-to-image** for workflow export

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
