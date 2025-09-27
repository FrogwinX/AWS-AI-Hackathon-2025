import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AlgoBot | AI Agentic Chatbot & Security Solutions',
  description: 'Complete WealthTech Solution for Financial Institutions',
  icons: '/favicon.ico',
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