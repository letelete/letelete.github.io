import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import { Nunito_Sans } from 'next/font/google';

import { SSRQueryClientProvider } from '~api/shared/query-client/provider';

import { BASE_URL } from '~constants/index';

import '~styles/globals.css';

import { ThemeProvider } from '~ui/atoms/theme/theme-provider';

import { cn, tw } from '~utils/style';

const fontSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const viewport: Viewport = {
  themeColor: tw.theme.colors.ctx.primary.DEFAULT,
  initialScale: 1.0,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: '%s | Bruno Kawka',
    default: 'Bruno Kawka',
  },
  description:
    "I'm a Software Engineer specializing in creating amazing UI experiences with attention to details, performance, and accessibility.",
  manifest: `${BASE_URL}/manifest.webmanifest`,
  keywords: [
    'Bruno Kawka',
    'Software Engineer',
    'Frontend Development',
    'Tutorials',
    'Blog',
    'React',
    'Javascript',
    'Typescript',
    'Next.js',
    'React developer',
    'Web Performance',
    'UI/UX Design',
    'Full-stack Developer',
    'React Query',
    'Portfolio',
    'Blog Writer',
    'Tech Enthusiast',
    'Minimal Portfolio',
    'Minimal Gallery',
  ],
  authors: [{ name: 'Bruno Kawka' }],
  creator: 'Bruno Kawka',
  publisher: 'Bruno Kawka',
  category: 'technology',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Bruno Kawka',
    description:
      "I'm a Software Engineer specializing in creating amazing UI experiences with attention to details, performance, and accessibility.",
    url: 'https://kawka.me',
    siteName: 'Bruno Kawka',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/content/800x600.jpg',
        width: 800,
        height: 600,
        alt: 'Headshot of Bruno Kawka from the shoulders up smiling in the black t-shirt, and black glasses.',
      },
      {
        url: '/content/1800x1600.jpg',
        width: 1800,
        height: 1600,
        alt: 'Headshot of Bruno Kawka from the shoulders up smiling in the black t-shirt, and black glasses.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bruno Kawka',
    description:
      "I'm a Software Engineer specializing in creating amazing UI experiences with attention to details, performance, and accessibility.",
    siteId: '1073997624527806473',
    creator: '@brunokawka',
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
      <body className={cn(`${fontSans.variable} ${fontMono.variable}`)}>
        <SSRQueryClientProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SSRQueryClientProvider>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
