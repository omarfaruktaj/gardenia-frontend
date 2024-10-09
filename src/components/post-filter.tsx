'use client';

import { useCallback, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useDebounce from '@/hooks/use-debounce';
import { getCategories } from '@/services/category-service';
import { TCategory } from '@/types';

import { Input } from './ui/input';
import { Label } from './ui/label';

export default function PostFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['CATEGORIES'],
    queryFn: () => getCategories(),
  });
  const pathname = usePathname();

  const [filters, setFilters] = useState({
    searchTerm: '',
    category: '',
  });

  const debouncedSearchTerm = useDebounce(filters.searchTerm, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    setFilters({
      searchTerm: params.get('searchTerm') || '',
      category: params.get('category') || '',
    });
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
  }, [debouncedSearchTerm]);

  const handleCategoryChange = useCallback(
    (category: string) => {
      setFilters((prev) => ({ ...prev, category }));
      const params = new URLSearchParams(searchParams.toString());
      params.set('category', category);
      router.push(`/?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="w-full">
      <div className="mb-6">
        <Input
          type="text"
          value={filters.searchTerm}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
          }
          placeholder="Search for posts..."
          aria-label="Search posts"
          className="rounded-full"
        />
      </div>

      <div className="space-y-4 border p-4 rounded-2xl">
        <h2 className="text-lg font-semibold mb-4">Discover</h2>
        <div>
          <Label className="pb-3 inline-block">Category</Label>
          <Select
            value={filters.category}
            onValueChange={handleCategoryChange}
            aria-label="Select category"
            disabled={isLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue id="category" placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select category</SelectLabel>
                <SelectItem value={'""'}>All Categories</SelectItem>
                {categories.map((cat: TCategory) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
