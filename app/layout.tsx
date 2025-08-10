// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Layout from '../Layout'; // Import the Layout.js from root directory

export const metadata: Metadata = {
  title: 'Due Process AI',
  description: 'Your Constitutional Rights Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout currentPageName="Home">
          {children}
        </Layout>
      </body>
    </html>
  );
}
