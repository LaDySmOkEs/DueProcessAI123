// React Router compatibility for Next.js
'use client';
import React, { createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';

// Create a context to simulate React Router's location
const RouterContext = createContext<{ pathname: string }>({ pathname: '/' });

// Router Provider to wrap the app
export function RouterProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/';
  
  return (
    <RouterContext.Provider value={{ pathname }}>
      {children}
    </RouterContext.Provider>
  );
}

// Mock useLocation hook for compatibility
export function useLocation() {
  const context = useContext(RouterContext);
  return {
    pathname: context.pathname,
    search: '',
    hash: '',
    state: null,
    key: 'default'
  };
}

// Link component that works with Next.js
export function Link({ to, children, className, ...props }: any) {
  return (
    <NextLink href={to} className={className} {...props}>
      {children}
    </NextLink>
  );
}

// Export as react-router-dom for compatibility
export default {
  Link,
  useLocation,
  RouterProvider
};