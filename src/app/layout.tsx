import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Next.js Skeleton',
    default: 'Next.js Skeleton',
  },
  description: 'A clean, SSR-first Next.js skeleton with TypeScript.',
  metadataBase: new URL('https://example.com')
};

export const viewport: Viewport = {
  themeColor: '#0ea5e9',
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  );
}

