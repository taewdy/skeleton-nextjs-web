import Link from 'next/link'

type FeatureCardProps = {
  title: string
  children: React.ReactNode
  link?: {
    href: string
    label: string
    ariaLabel: string
  }
}

export function FeatureCard({ title, children, link }: FeatureCardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{children}</p>
      {link && (
        <>
          <div style={{ height: 8 }} />
          <Link href={link.href} aria-label={link.ariaLabel}>
            → {link.label}
          </Link>
        </>
      )}
    </div>
  )
}