import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hong Kong Travel Chat Bot | AI Travel Guide',
  description: 'Your intelligent companion for exploring Hong Kong - get personalized recommendations, itineraries, and travel tips',
  // icons: '/favicon.ico',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50`}>
        {children}
      </body>
    </html>
  );
}