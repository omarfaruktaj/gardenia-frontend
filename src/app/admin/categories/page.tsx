import { Plus } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import api from '@/config/axios';

import { DataTable } from '../../../components/ui/data-table';
import { columns } from './components/table/columns';

export default async function Users() {
  const response = await api.get('/categories');
  const data = response.data.data.categories;

  return (
    <div className="py-10">
      <div className="flex items-start justify-between pb-8">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button
          variant={'outline'}
          asChild
          className="flex items-center  space-x-2"
        >
          <Link href={'/admin/categories/create'}>
            <Plus className="h-5 w-5" />
            <span>New Category</span>
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
