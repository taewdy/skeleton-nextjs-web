import { AppLink, type AppLinkProps } from '@/components/AppLink'

type FeatureCardProps = {
  title: string
  children: React.ReactNode
  link?: Omit<AppLinkProps, 'children'> & { label: string }
}

export function FeatureCard({ title, children, link }: FeatureCardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{children}</p>
      {link && (
        <>
          <div style={{ height: 8 }} />
          {(() => {
            const { label, ...linkProps } = link;
            return <AppLink {...(linkProps as any)}>→ {label}</AppLink>;
          })()}
        </>
      )}
    </div>
  )
}
