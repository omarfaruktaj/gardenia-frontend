import { Metadata } from 'next';

import { Open_Sans } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';
import Providers from '@/lib/providers';

import './globals.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Gardenia',
  description:
    'A comprehensive platform for gardening tips, advice, and community engagement.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased`}>
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
