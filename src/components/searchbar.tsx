'use client';

import { useEffect, useState } from 'react';

import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const initial = searchParams.get('searchTerm');
    if (initial) {
      setSearchTerm(initial);
    }
  }, [searchParams]);

  const triggerSearch = () => {
    const params = new URLSearchParams();

    if (searchTerm.trim()) {
      params.set('searchTerm', searchTerm.trim());
    }

    router.push(`/search?${params.toString()}`);
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
      <InputGroupAddon onClick={triggerSearch} className="cursor-pointer">
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
}
