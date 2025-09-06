import { AppLink, type AppLinkProps } from '@shared/ui'

type FeatureCardProps = {
  title: string
  children: React.ReactNode
  link?: Omit<AppLinkProps, 'children'> & { label: string }
}

export function FeatureCard({ title, children, link }: FeatureCardProps) {
  const renderLink = (
    l: Omit<AppLinkProps, 'children'> & { label: string }
  ) => {
    const { label, ...rest } = l;
    if (l.kind === 'external') {
      const props = rest as Extract<AppLinkProps, { kind: 'external' }>;
      return <AppLink {...props}>→ {label}</AppLink>;
    }
    const props = rest as Extract<AppLinkProps, { kind: 'internal' }>;
    return <AppLink {...props}>→ {label}</AppLink>;
  };

  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{children}</p>
      {link && (
        <>
          <div style={{ height: 8 }} />
          {renderLink(link)}
        </>
      )}
    </div>
  )
}
