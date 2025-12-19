# Workflow Builder Documentation

## Overview

The ConduitAI Workflow Builder is a visual, drag-and-drop interface for creating automation workflows. It allows users to connect different apps and services together through an intuitive node-based interface.

## Features

### Visual Canvas
- **Interactive workspace** where workflow steps appear as connected nodes
- **Smooth pan and zoom** capabilities
- **Dotted background pattern** for visual guidance
- **Mini-map** for easy navigation of complex workflows

### Node Types

#### 1. Trigger Node (Diamond Shape)
- **Color**: Green border (#22c55e)
- **Purpose**: Starts the workflow when an event occurs
- **Connectors**: Single output connector at the bottom
- **Visual**: Diamond-shaped using CSS clip-path
- **Example uses**: New email received, calendar event created, file uploaded

#### 2. Action Node (Rectangle)
- **Color**: Blue border (#3b82f6)
- **Purpose**: Performs an action in response to data
- **Connectors**: Input at top, output at bottom
- **Visual**: Standard rectangle shape
- **Example uses**: Send email, create document, post to Slack

#### 3. Condition Node (Hexagon)
- **Color**: Yellow border (#eab308)
- **Purpose**: Branches workflow based on conditions
- **Connectors**: Input at top, two outputs at bottom (true/false)
- **Visual**: Hexagon-shaped using CSS clip-path
- **Example uses**: Check if value exists, compare numbers, validate data

### Node Configuration

Click on any node to open the configuration modal:

1. **App Selection**: Choose from integrated apps (Gmail, Slack, Notion, etc.)
2. **Action Selection**: Pick a specific action for the selected app
3. **Parameters**: Fill in required and optional parameters
4. **Test**: Run a test with sample data to verify configuration

### Connections

- **Create**: Drag from an output connector to an input connector
- **Delete**: Click on a connection and confirm deletion
- **Animated**: Active connections show animated flow
- **Color-coded**: Success (green), failure (red), in-progress (blue)

### Canvas Controls

#### Add Nodes Section
- Click buttons to add new nodes to the canvas
- Nodes are placed at random positions within view

#### Controls Section
- **Zoom In** (🔍+): Increase canvas zoom level
- **Zoom Out** (🔍−): Decrease canvas zoom level
- **Fit to View** (⊡): Auto-adjust zoom to show all nodes

#### History Section
- **Undo** (↶): Revert last change (up to 50 steps)
- **Redo** (↷): Re-apply undone change

#### Export
- **Export as Image** (📷): Download workflow as PNG file

### Context Menu

- **Right-click** on empty canvas space to open context menu
- **Long-press** (500ms) on mobile devices
- Quickly add nodes without using toolbar

## Animations

### Node Animations
- **Pulse effect**: Active nodes show a pulsing shadow
- **Status colors**: 
  - Running: Blue background
  - Success: Green background
  - Failure: Red background

### Connection Animations
- **Dashed flow**: Animated dashes show data flow direction
- **Hover effect**: Connections become thicker on hover
- **Arrows**: Show flow direction

## Responsive Design

### Desktop
- Full toolbar on the left side
- Drag and drop with mouse
- Right-click context menu

### Tablet
- Optimized toolbar size
- Touch-based drag and drop
- Long-press context menu

### Mobile
- Toolbar moves to bottom as a sheet
- Smaller node sizes
- Touch gestures for pan and zoom
- Long-press for context menu

## Keyboard Shortcuts

- **Ctrl/Cmd + Z**: Undo
- **Ctrl/Cmd + Shift + Z**: Redo
- **+**: Zoom in
- **-**: Zoom out
- **0**: Fit to view

## State Management

The workflow builder uses Zustand for state management:

- **Nodes**: Array of all nodes in the workflow
- **Edges**: Array of all connections between nodes
- **History**: Stack of previous states for undo/redo
- **Selected Node**: Currently selected node for editing

## API Integration

### Mock Data
Currently uses mock data for demonstration:
- Sample apps (Gmail, Slack, Notion, Calendar, Google Drive)
- Sample actions for each app
- Sample parameters for each action

### Future Integration
To connect real APIs:
1. Replace mock data in `NodeEditor.tsx`
2. Implement API calls in action handlers
3. Add authentication flow
4. Handle real-time updates

## File Structure

```
src/
├── components/
│   ├── WorkflowBuilder/
│   │   ├── WorkflowBuilder.tsx    # Main canvas component
│   │   └── WorkflowBuilder.css    # Canvas styles
│   ├── Nodes/
│   │   ├── TriggerNode.tsx        # Trigger node component
│   │   ├── ActionNode.tsx         # Action node component
│   │   ├── ConditionNode.tsx      # Condition node component
│   │   └── NodeStyles.css         # Node styles
│   └── NodeEditor/
│       ├── NodeEditor.tsx         # Configuration modal
│       └── NodeEditor.css         # Modal styles
├── store/
│   └── workflowStore.ts           # Zustand state management
├── types/
│   └── workflow.ts                # TypeScript type definitions
└── App.tsx                        # Main app component
```

## Customization

### Adding New Node Types

1. Create a new component in `src/components/Nodes/`
2. Add to `nodeTypes` in `WorkflowBuilder.tsx`
3. Update `NodeType` in `src/types/workflow.ts`
4. Add styling in `NodeStyles.css`

### Adding New Apps

1. Add app to `mockApps` array in `NodeEditor.tsx`
2. Add actions to `mockActions` object
3. Define parameters for each action

### Styling

All colors and styles can be customized in the CSS files:
- Node colors: `NodeStyles.css`
- Canvas colors: `WorkflowBuilder.css`
- Modal colors: `NodeEditor.css`

## Performance

### Optimization Techniques
- React Flow handles rendering optimization
- Memoized components prevent unnecessary re-renders
- History limited to 50 items to prevent memory issues
- Event handlers use `useCallback` for stability

### Large Workflows
- Mini-map for navigation
- Fit to view for overview
- Zoom controls for detail work

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support with touch gestures

## Troubleshooting

### Nodes not connecting
- Ensure you're dragging from output to input
- Check that node types allow the connection

### Export not working
- Check browser permissions for downloads
- Ensure canvas is visible when exporting

### Performance issues
- Limit workflow to reasonable size
- Close unused browser tabs
- Clear browser cache

## Future Enhancements

Potential features for future versions:
- Multiple canvas tabs
- Node templates
- Workflow sharing
- Real-time collaboration
- Version control for workflows
- Workflow execution engine
- Integration with more apps
- Custom node creation
- Workflow marketplace

## Support

For issues or questions:
1. Check this documentation
2. Review the code comments
3. Open an issue on GitHub
