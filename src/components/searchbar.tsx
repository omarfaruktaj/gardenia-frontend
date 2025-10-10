'use client';

import { useEffect, useState } from 'react';

import { SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import useDebounce from '@/hooks/use-debounce';

import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Load initial search term from URL params
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const getSearchTerm = params.get('searchTerm');
    setSearchTerm(getSearchTerm || '');
  }, [searchParams]);

  // Auto-update URL on /search page only
  useEffect(() => {
    if (pathname !== '/search') return;

    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearchTerm) {
      params.set('searchTerm', debouncedSearchTerm);
    } else {
      params.delete('searchTerm');
    }

    const newUrl = `${pathname}?${params.toString()}`;
    if (searchParams.toString() !== params.toString()) {
      router.push(newUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, pathname]);

  // Unified search handler for Enter key and icon click
  const triggerSearch = () => {
    const params = new URLSearchParams();

    if (searchTerm) {
      params.set('searchTerm', searchTerm);
    }

    const newUrl = `/search?${params.toString()}`;

    // If already on /search, just update URL
    if (pathname === '/search') {
      router.push(newUrl);
    } else {
      // Redirect to /search with the search term
      router.push(newUrl);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      triggerSearch();
    }
  };

  return (
    <InputGroup className="rounded-full" aria-label="Search posts">
      <InputGroupInput
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
}
