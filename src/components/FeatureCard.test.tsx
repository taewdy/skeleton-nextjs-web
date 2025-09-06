import { render, screen } from '@testing-library/react'

import { FeatureCard } from './FeatureCard'

describe('FeatureCard', () => {
  it('renders the title and children', () => {
    render(<FeatureCard title="Test Title">Test Children</FeatureCard>)

    expect(screen.getByRole('heading', { name: /test title/i })).toBeInTheDocument()
    expect(screen.getByText(/test children/i)).toBeInTheDocument()
  })

  it('does not render a link when not provided', () => {
    render(<FeatureCard title="Test Title">Test Children</FeatureCard>)

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders the internal link when provided', () => {
    const linkProps = {
      kind: 'internal' as const,
      href: '/photos',
      label: 'Test Link',
      ariaLabel: 'Navigate to test page',
    }

    render(
      <FeatureCard title="Test Title" link={linkProps}>
        Test Children
      </FeatureCard>
    )

    const link = screen.getByRole('link', { name: /navigate to test page/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/photos')
  })

  it('renders an external link with security attrs', () => {
    const linkProps = {
      kind: 'external' as const,
      href: 'https://example.com',
      label: 'Go External',
      ariaLabel: 'External destination',
    }

    render(
      <FeatureCard title="With External" link={linkProps}>
        External Link Test
      </FeatureCard>
    )

    const link = screen.getByRole('link', { name: /external destination/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringMatching(/noreferrer/))
  })
})
