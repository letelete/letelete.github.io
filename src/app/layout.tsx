import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { cn } from '~utils/style';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://kawka.me';

// eslint-disable-next-line react-refresh/only-export-components
export const viewport: Viewport = {
  themeColor: 'black',
  initialScale: 1.0,
};

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  manifest: `${baseUrl}/manifest.json`,
  title: {
    template: '%s | Bruno Kawka',
    default: 'Bruno Kawka',
  },
  description:
    "I'm a Frontend Engineer specializing in creating amazing UI experiences with attention to details, performance, and accessibility.",
  keywords: [
    'Bruno Kawka',
    'Frontend',
    'Tutorials',
    'Blog',
    'React',
    'Javascript',
    'Typescript',
  ],
  authors: [{ name: 'Bruno Kawka' }],
  creator: 'Bruno Kawka',
  publisher: 'Bruno Kawka',
  category: 'technology',
  icons: {
    icon: '/icon.png',
    shortcut: '/shortcut-icon.png',
    apple: ['/apple-touch-icon.png'],
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  openGraph: {
    title: 'Bruno Kawka',
    description:
      "I'm a Frontend Engineer specializing in creating amazing UI experiences with attention to details, performance, and accessibility.",
    url: 'https://kawka.me',
    siteName: 'Bruno Kawka',
    images: [
      {
        url: 'https://vsupu83zlkfucch6.public.blob.vercel-storage.com/800x600.jpg',
        width: 800,
        height: 600,
        alt: 'Headshot of Bruno Kawka from the shoulders up smiling in the black t-shirt, and black glasses.',
      },
      {
        url: 'https://vsupu83zlkfucch6.public.blob.vercel-storage.com/1800x1600.jpg',
        width: 1800,
        height: 1600,
        alt: 'Headshot of Bruno Kawka from the shoulders up smiling in the black t-shirt, and black glasses.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bruno Kawka',
    description:
      "I'm a Frontend Engineer specializing in creating amazing UI experiences with attention to details, performance, and accessibility.",
    siteId: '1073997624527806473',
    creator: '@BrunoKawka',
    creatorId: '1073997624527806473',
    images: [
      {
        url: 'https://vsupu83zlkfucch6.public.blob.vercel-storage.com/800x600.jpg',
        width: 800,
        height: 600,
        alt: 'Headshot of Bruno Kawka from the shoulders up smiling in the black t-shirt, and black glasses.',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={cn(inter.className, 'flex flex-col')}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
