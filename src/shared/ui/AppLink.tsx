import Link from 'next/link';
import type { Route } from 'next';
import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';

type CommonProps = PropsWithChildren<{
  className?: string;
  ariaLabel?: string;
}>;

type AnchorRest = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'children' | 'className' | 'aria-label'
>;

export type InternalLinkProps = CommonProps & AnchorRest & {
  kind: 'internal';
  href: Route;
};

export type ExternalLinkProps = CommonProps & AnchorRest & {
  kind: 'external';
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
};

export type AppLinkProps = InternalLinkProps | ExternalLinkProps;

export function AppLink(props: ExternalLinkProps): JSX.Element;
export function AppLink(props: InternalLinkProps): JSX.Element;
export function AppLink(props: AppLinkProps): JSX.Element {
  if (props.kind === 'external') {
    const { children, className, ariaLabel, href, target = '_blank', rel, ...rest } = props;
    const safeRel = rel ?? 'noreferrer noopener';
    return (
      <a href={href} className={className} aria-label={ariaLabel} target={target} rel={safeRel} {...rest}>
        {children}
      </a>
    );
  }

  const { children, className, ariaLabel, href, ...rest } = props;
  return (
    <Link href={href} className={className} aria-label={ariaLabel} {...rest}>
      {children}
    </Link>
  );
}
