import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home Page', () => {
  it('renders the welcome message', () => {
    render(<Home />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Welcome to ConduitAI')
  })

  it('renders the description', () => {
    render(<Home />)
    
    const description = screen.getByText(/AI co-pilot that allows freelancers/i)
    expect(description).toBeInTheDocument()
  })
})
