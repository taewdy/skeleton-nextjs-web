import Link from 'next/link';

export function Header({ className }: { className?: string }) {
  return (
    <header className={["container header", className].filter(Boolean).join(" ")}> 
      <Link href="/" className="brand" aria-label="Home">
        <span className="brand-badge" />
        <span>Next.js Skeleton</span>
      </Link>
      <nav className="nav" aria-label="Main navigation">
        <Link href="/">Home</Link>
        <Link href="/news">News</Link>
        <Link href="/photos">Photos</Link>
      </nav>
    </header>
  );
}
