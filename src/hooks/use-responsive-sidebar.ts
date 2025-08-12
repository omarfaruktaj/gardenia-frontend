'use client';

import { useEffect, useState } from 'react';

export function useResponsiveSidebar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMedium, setIsMedium] = useState(false);
  const [shouldCollapse, setShouldCollapse] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const medium = width >= 768 && width < 1024;

      setIsMobile(mobile);
      setIsMedium(medium);
      setShouldCollapse(medium);
    };

    // Initial check
    checkScreenSize();

    // Listen for resize events
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return {
    isMobile,
    isMedium,
    shouldCollapse,
    isDesktop: !isMobile && !isMedium,
  };
}
