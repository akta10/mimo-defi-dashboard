import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MiMo DeFi Dashboard — AI-Powered Multi-Chain Analytics',
  description: 'Multi-chain DeFi analytics dashboard powered by MiMo reasoning models. Real-time portfolio tracking, yield optimization, and risk analysis.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-dark-bg text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
