# Conduit AI - Project Outline

## File Structure
```
/mnt/okcomputer/output/
├── index.html              # Landing Page
├── dashboard.html          # Dashboard
├── workflow-builder.html   # Workflow Builder (Main Interface)
├── app-connections.html    # App Connections
├── execution-history.html  # Execution History
├── main.js                 # Core JavaScript functionality
├── resources/              # Assets folder
│   ├── hero-bg.jpg        # Hero background image
│   ├── demo-placeholder.jpg # Demo video placeholder
│   └── app-icons/         # App connection icons
├── interaction.md          # Interaction design document
├── design.md              # Design style guide
└── outline.md             # This file
```

## Page Breakdown

### 1. index.html - Landing Page
**Purpose**: Introduce Conduit AI and convert visitors to users
**Sections**:
- Navigation bar with logo and "Get Started" button
- Hero section with tagline and background effect
- 3 key benefits with icons and descriptions
- Demo video placeholder with play button
- Testimonial carousel
- Footer with minimal branding

**Key Interactions**:
- Get Started button → sets user session and navigates to dashboard
- Demo video → shows "Coming Soon" modal
- Benefit cards → hover effects with lift animation

### 2. dashboard.html - User Dashboard
**Purpose**: Overview of user's automation setup and quick actions
**Sections**:
- Welcome message with user name
- Connected apps grid (3-5 apps with status indicators)
- Active workflows list (3-5 with toggle switches)
- Time saved this week metric card
- Quick action: "Build New Workflow" button
- Navigation to other sections

**Key Interactions**:
- App cards → click to view/edit connections
- Workflow toggles → enable/disable workflows
- Build New Workflow → navigate to workflow builder

### 3. workflow-builder.html - Main Interface
**Purpose**: AI-powered workflow creation interface
**Sections**:
- Chat interface on left (like ChatGPT)
- Visual workflow diagram on right
- Workflow controls (Save, Test, Clear)
- Workflow history sidebar

**Key Interactions**:
- Chat input → submit workflow descriptions
- AI typing indicator → 2 second simulation
- Structured response → updates visual diagram
- Save/Test buttons → simulate workflow actions

### 4. app-connections.html - App Management
**Purpose**: Manage and configure app integrations
**Sections**:
- Available apps grid with search/filter
- Connected apps section
- Connection setup modals
- App categories and filters

**Key Interactions**:
- Connect buttons → OAuth simulation forms
- Search/filter → filter apps by name/category
- Status indicators → show connection health

### 5. execution-history.html - Workflow History
**Purpose**: View and analyze workflow executions
**Sections**:
- Workflow runs list with filters
- Execution details expandable cards
- Status indicators and metrics
- Date range picker

**Key Interactions**:
- Filter controls → filter by date/status/workflow
- Execution cards → click to expand details
- Status indicators → success/failure/pending states

## Technical Implementation

### Core Libraries Used
- **Tailwind CSS**: Styling framework via CDN
- **Anime.js**: Smooth animations and transitions
- **ECharts.js**: Dashboard metrics visualization
- **Pixi.js**: Hero background particle effects
- **Splide.js**: Testimonial carousel
- **localStorage**: User session and data persistence

### JavaScript Modules (main.js)
- **Session Management**: User session handling with localStorage
- **Navigation**: Page routing and active state management
- **Workflow Builder**: Chat interface and AI simulation
- **Data Management**: Mock data generation and persistence
- **UI Interactions**: Modal management, form handling, animations
- **Responsive**: Mobile menu and responsive behaviors

### Responsive Design
- Mobile-first approach with progressive enhancement
- Collapsible navigation for mobile
- Touch-friendly interactive elements
- Optimized layouts for tablet and desktop

### Data Structure
- User profiles and preferences
- App connections with status and settings
- Workflows with triggers, actions, and metadata
- Execution history with timestamps and results
- Session management for user flow

This structure provides a complete, professional prototype that demonstrates the full Conduit AI user experience across all key screens and interactions.