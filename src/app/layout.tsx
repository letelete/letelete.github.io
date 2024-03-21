import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Bruno Kawka - Portfolio',
  description:
    'A Frontend Engineer specializing in creating amazing UI experiences with attention to details, performance, and accessibility.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
