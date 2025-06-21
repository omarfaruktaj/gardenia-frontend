'use client';

import { useEffect, useState } from 'react';

export default function LoadingToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        fixed top-100 left-1/2 transform -translate-x-1/2 mt-4 z-50
          shadow-lg rounded-md px-6 py-3 flex items-center
        transition-all duration-500 ease-in-out
        ${visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
    >
      <div className="animate-spin h-5 w-5 border-t-2 border-blue-500 rounded-full mr-3"></div>
      <span className="text-gray-800 text-sm font-medium">Loading...</span>
    </div>
  );
}
