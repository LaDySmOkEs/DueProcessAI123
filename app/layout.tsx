// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Layout from '../layout'; // Adjust the import based on where your current layout.js lives

export const metadata: Metadata = {
  title: 'Due Process AI',
  description: 'Your Constitutional Rights Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
