# ConduitAI

An AI co-pilot that allows freelancers to describe workflows in plain English and then the AI builds and runs automations by connecting their existing tools.

## Dashboard Features

This repository contains a fully functional main dashboard with the following features:

### ✨ Welcome Header
- Personalized greeting with user name
- Current date display
- Monthly time-saved statistics with visual appeal

### 🔌 Connected Apps Grid
- Displays 6 most-used apps (Gmail, Notion, Slack, Calendly, Stripe, Google Sheets)
- Each app card shows:
  - App logo (emoji-based)
  - Connection status with visual indicator (green dot)
  - Last synced timestamp
  - "Manage" action link

### ⚙️ Active Workflows Section
- Displays 3-5 workflow cards with:
  - Workflow name and description
  - Visual flow diagram (Trigger → Actions with icons)
  - Toggle switch for active/inactive status
  - Time saved per week estimate
  - "Edit" button

### 🚀 Quick Actions Bar
- Floating action buttons (bottom right):
  - "New Workflow" - opens workflow builder
  - "Connect App" - add new app connections
  - "View History" - see activity logs
- Buttons expand on hover to show labels

### 📊 Recent Activity Feed
- Timeline-style activity log showing:
  - Workflow triggers
  - Actions performed
  - Timestamps for each activity

### 🎯 Empty State
- Shown when no workflows exist
- Features:
  - Eye-catching illustration with animated emojis
  - Clear call-to-action: "Start by building your first workflow"
  - Example prompt: "When I get a new client booking..."
  - "Create Your First Workflow" button
  - Three informational cards explaining key features

### 📱 Responsive Design
- **Mobile** (< 640px): Single column, vertical stack
- **Tablet** (640px - 1024px): 2-column grid for app cards
- **Desktop** (> 1024px): 3-column grid for app cards
- All sections adapt gracefully to different screen sizes

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ZeroMerge/ConduitAI.git
cd ConduitAI
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **Modern CSS** - Responsive design with flexbox and grid

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx          # Main dashboard container
│   ├── WelcomeHeader.tsx      # Header with greeting and stats
│   ├── ConnectedAppsGrid.tsx  # Grid of connected apps
│   ├── ActiveWorkflows.tsx    # Workflow cards with toggles
│   ├── QuickActionsBar.tsx    # Floating action buttons
│   ├── RecentActivityFeed.tsx # Activity timeline
│   └── EmptyState.tsx         # Empty state view
├── types.ts                   # TypeScript type definitions
├── App.tsx                    # Root component
├── main.tsx                   # Application entry point
└── index.css                  # Global styles (Tailwind imports)
```

## Features Demonstrated

- ✅ Component-based architecture
- ✅ TypeScript for type safety
- ✅ Responsive design (mobile-first)
- ✅ Interactive UI elements (toggles, buttons)
- ✅ Clean, modern styling with Tailwind CSS
- ✅ Accessible UI components
- ✅ Visual flow diagrams for workflows
- ✅ Empty state handling
- ✅ Mock data structure for easy API integration

## Future Enhancements

- Connect to backend API for real data
- Implement workflow builder UI
- Add app connection flow
- Implement user authentication
- Add workflow execution history
- Real-time updates for activity feed
