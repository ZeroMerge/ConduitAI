# ConduitAI

An AI co-pilot that allows freelancers to describe workflows in plain English and then the AI builds and runs automations by connecting their existing tools.

## Dashboard Features

### Welcome Header
- Personalized greeting with user's name
- Current date display
- Monthly time-saving statistics

### Connected Apps Grid
- Visual overview of connected applications (Gmail, Notion, Slack, Calendly, Stripe, Google Sheets)
- Real-time connection status indicators
- Last sync timestamps
- Quick access to app management

### Active Workflows
- Comprehensive workflow cards showing:
  - Workflow name and description
  - Visual trigger → action flow
  - Active/inactive toggle switches
  - Time saved per week metrics
  - Edit functionality

### Quick Actions Bar
- Floating action buttons for:
  - Creating new workflows
  - Connecting apps
  - Viewing history

### Recent Activity Feed
- Timeline of recent workflow executions
- Action completion notifications
- Timestamp tracking

### Empty State
- Onboarding guidance for new users
- Example workflow suggestions
- Clear call-to-action

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Technology Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS v4
- **State Management**: React Hooks
- **Icons**: SVG

## Project Structure

```
src/
├── components/
│   ├── Dashboard/          # Dashboard-specific components
│   │   ├── WelcomeHeader.tsx
│   │   ├── ConnectedApps.tsx
│   │   ├── AppCard.tsx
│   │   ├── ActiveWorkflows.tsx
│   │   ├── WorkflowCard.tsx
│   │   ├── QuickActions.tsx
│   │   ├── RecentActivity.tsx
│   │   └── EmptyState.tsx
│   └── common/             # Reusable components
│       └── Toggle.tsx
├── pages/                  # Page components
│   ├── Dashboard.tsx
│   └── EmptyDashboard.tsx
├── types/                  # TypeScript type definitions
│   └── index.ts
└── utils/                  # Utility functions and mock data
    └── mockData.ts
```

## Responsive Design

The dashboard is fully responsive and optimized for:
- **Mobile** (≤768px): Single column layout
- **Tablet** (768px-1024px): Two column grid
- **Desktop** (≥1024px): Three column grid

## Screenshots

### Desktop View
![Desktop Dashboard](https://github.com/user-attachments/assets/08ea6155-1e7a-4a5b-b665-353c9aba2689)

### Mobile View
![Mobile Dashboard](https://github.com/user-attachments/assets/d21b7b8b-3cd7-4506-a2cb-e7c2d4ac255d)

### Tablet View
![Tablet Dashboard](https://github.com/user-attachments/assets/06ea96f7-aaa5-47f2-9142-73cea7af07a8)
