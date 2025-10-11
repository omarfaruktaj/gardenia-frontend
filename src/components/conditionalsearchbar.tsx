'use client';

import { usePathname } from 'next/navigation';

import SearchBar from './searchbar';

export default function ConditionalSearchBar() {
  const pathname = usePathname();

  if (pathname.startsWith('/search'))
    return (
      <div className="p-4 rounded-lg border">
        <p className="text-lg font-extrabold">Search filters</p>
      </div>
    );

  return <SearchBar />;
}
