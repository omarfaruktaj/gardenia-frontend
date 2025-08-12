'use client';

import { useEffect, useState } from 'react';

import { SidebarProvider } from '@/components/ui/sidebar';

interface ResponsiveLayoutWrapperProps {
  children: React.ReactNode;
}

export function ResponsiveLayoutWrapper({
  children,
}: ResponsiveLayoutWrapperProps) {
  const [defaultOpen, setDefaultOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      // On medium screens (768px to 1024px), default to collapsed
      // const isMediumScreen =
      //   window.innerWidth >= 768 && window.innerWidth < 1024;
      const isLargeScreen =
        window.innerWidth >= 1024 && window.innerWidth < 1280;
      setDefaultOpen(!isLargeScreen);
    };

    // Set initial state
    handleResize();

    // Listen for window resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SidebarProvider defaultOpen={defaultOpen}>{children}</SidebarProvider>
  );
}
