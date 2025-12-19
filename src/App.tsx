import './App.css'
import { ChatInterface } from './components/ChatInterface'
import { WorkflowBuilder } from './components/WorkflowBuilder'

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🔌 ConduitAI</h1>
        <p>AI-powered workflow automation for freelancers</p>
      </header>

      <div className="main-content">
        <div className="left-panel">
          <ChatInterface />
        </div>
        <div className="right-panel">
          <WorkflowBuilder />
        </div>
      </div>
    </div>
  )
}

export default App
