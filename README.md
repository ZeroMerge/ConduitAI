# ConduitAI

The core idea is an AI co-pilot that allows freelancers to describe workflows in plain English and then the AI builds and runs automations by connecting their existing tools.

## State Management

This project uses Zustand for state management with TypeScript support. The store includes:

- **User management**: Current user state and authentication
- **Workflows**: Create, update, and manage automation workflows
- **App connections**: Connect and manage third-party app integrations
- **Chat builder**: AI conversation history and state
- **UI preferences**: Theme and sidebar state

### Features

- ✅ TypeScript support with full type safety
- ✅ Persistence middleware (saves to localStorage)
- ✅ Redux DevTools integration for debugging
- ✅ Modular state slices for different features

### Quick Start

```typescript
import { useAppStore } from 'conduitai';

// In a React component
function MyComponent() {
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  
  // Use the state...
}
```

For detailed usage examples and API documentation, see [STORE_USAGE.md](./STORE_USAGE.md).

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

## Project Structure

```
src/
├── types.ts          # TypeScript type definitions
├── store.ts          # Zustand store implementation
├── index.ts          # Main exports
└── example.ts        # Usage examples
```
