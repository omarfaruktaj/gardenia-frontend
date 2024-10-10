'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import UserProvider from '@/context/user-provider';

import { ThemeProvider } from './theme-provider';

const queryClient = new QueryClient();
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <UserProvider>{children}</UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
