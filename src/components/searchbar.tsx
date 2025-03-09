'use client';

import { useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import useDebounce from '@/hooks/use-debounce';

import { Input } from './ui/input';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const getSearchTerm = params.get('searchTerm');
    setSearchTerm(getSearchTerm || '');
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearchTerm) {
      params.set('searchTerm', debouncedSearchTerm);
    } else {
      params.delete('searchTerm');
    }
    const newUrl = `/${pathname}?${params.toString()}`;
    if (searchParams.toString() !== params.toString()) {
      router.push(newUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <Input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(() => e.target.value)}
      placeholder="Search for posts..."
      aria-label="Search posts"
      className="rounded-full"
    />
  );
}
