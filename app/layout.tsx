import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import BottomNav from '@/components/BottomNav';

export const metadata: Metadata = {
  title: 'Conductor AI',
  description: 'AI co-pilot for workflow automation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar for desktop */}
          <Sidebar />

          {/* Main content area */}
          <main className="flex-1 overflow-y-auto bg-gray-50 pb-20 lg:pb-0">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
              {children}
            </div>
          </main>
        </div>

        {/* Bottom navigation for mobile */}
        <BottomNav />
      </body>
    </html>
  );
}
