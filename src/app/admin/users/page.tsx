import api from '@/config/axios';

import { columns } from './components/table/columns';
import { DataTable } from './components/table/data-table';

export default async function Users() {
  const response = await api.get('/users');
  const data = response.data;

  return (
    <div className="py-10">
      <div className="flex items-start justify-between pb-8">
        <h1 className="text-2xl font-bold">Users</h1>
        {/* <Button
          variant={'outline'}
          asChild
          className="flex items-center  space-x-2"
        >
          <Link href={'/admin/users/create'}>
            <Plus className="h-5 w-5" />
            <span>New Slot</span>
          </Link>
        </Button> */}
      </div>
      <DataTable columns={columns} data={data.data} />
    </div>
  );
}
