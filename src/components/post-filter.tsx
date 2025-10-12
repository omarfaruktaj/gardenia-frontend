'use client';

import { useCallback, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getCategories } from '@/services/category-service';
import { TCategory } from '@/types';

import { Label } from './ui/label';

export default function PostFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['CATEGORIES'],
    queryFn: () => getCategories(),
  });

  const [filters, setFilters] = useState({
    category: '',
    sort: '',
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const getSearchTerm = params.get('searchTerm');
    const getCategory = params.get('category');
    const getSort = params.get('sort');
    setFilters({
      category: getCategory || '',
      sort: getSort
        ? getSort
        : getSearchTerm || getCategory
          ? '-votes'
          : '-createdAt',
    });
  }, [searchParams]);

  const handleCategoryChange = useCallback(
    (category: string) => {
      setFilters((prev) => ({ ...prev, category }));
      const params = new URLSearchParams(searchParams.toString());

      if (!(category === '""')) {
        params.set('category', category);
      } else {
        params.delete('category');
      }
      router.push(`/search/?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleSortChange = useCallback(
    (value: string) => {
      setFilters((prev) => ({ ...prev, sort: value }));
      const params = new URLSearchParams(searchParams.toString());
      params.set('sort', value);
      router.push(`/search/?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="w-full">
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
        <div>
          <Label className="pb-3 inline-block">Sort By</Label>
          <Select
            value={filters.sort}
            onValueChange={handleSortChange}
            aria-label="Select sort order"
            disabled={isLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select order</SelectLabel>
                <SelectItem value={'-createdAt'}>Newest</SelectItem>
                <SelectItem value={'-votes'}>Most Upvotes</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
