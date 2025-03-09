import api from '@/config/axios';

import { DataTable } from '../../../components/ui/data-table';
import { columns } from './table/columns';

export default async function Payments() {
  const response = await api.get('/payments');
  const data = response.data.data.payments;

  return (
    <div className="py-10">
      <div className="flex items-start justify-between pb-8">
        <h1 className="text-2xl font-bold">Payments</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
