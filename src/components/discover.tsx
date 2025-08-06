'use client';

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { getCategories } from '@/services/category-service';
import { TCategory } from '@/types';

import { Button } from './ui/button';

export default function Discover() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['CATEGORIES'],
    queryFn: () => getCategories(),
  });
  const pathname = usePathname();

  const [discover, setDiscover] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const getCategory = params.get('category');
    setDiscover(getCategory || '');
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const newUrl = `/${pathname}?${params.toString()}`;
    if (searchParams.toString() !== params.toString()) {
      router.push(newUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <p>Loading...</p>;
  const handleCategoryChange = (category: string) => {
    setDiscover(() => category);
    const params = new URLSearchParams(searchParams.toString());

    if (!(category === '""')) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="w-full">
      <div className="space-y-4 border p-4 rounded-2xl">
        <h2 className="text-lg font-semibold mb-4 ">Discover</h2>
        <div className="flex flex-col gap-2">
          {categories.map((cat: TCategory) => (
            <div key={cat._id}>
              <Button
                variant={discover === cat._id ? 'link' : 'ghost'}
                onClick={() => handleCategoryChange(cat._id)}
                value={cat._id}
              >
                # {cat.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
