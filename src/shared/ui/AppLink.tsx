import Link from 'next/link';
import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';

type BaseProps = PropsWithChildren<{
  className?: string;
  ariaLabel?: string;
}> & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children' | 'className' | 'aria-label'>;

type InternalLink = BaseProps & {
  kind: 'internal';
  href: string; // Flexible; typed routes enforced at call sites when using next/link directly
};

type ExternalLink = BaseProps & {
  kind: 'external';
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
};

export type AppLinkProps = InternalLink | ExternalLink;

export function AppLink(props: AppLinkProps) {
  const { children, className, ariaLabel, href, ...rest } = props as any;

  if (props.kind === 'external') {
    const target = props.target ?? '_blank';
    const rel = props.rel ?? 'noreferrer noopener';
    return (
      <a href={href} className={className} aria-label={ariaLabel} target={target} rel={rel} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href as any} className={className} aria-label={ariaLabel} {...(rest as any)}>
      {children}
    </Link>
  );
}
