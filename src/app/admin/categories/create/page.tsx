import BackButton from '@/components/ui/back-button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';

import CategoryForm from '../components/category-form';

export default function CreateCategory() {
  //  const title = initialData ? 'Edit category' : 'Create category';
  //  const description = initialData ? 'Edit category' : 'Add a new category';
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <BackButton />
      <div className="my-6">
        <Card className=" max-w-lg mx-auto">
          <CardHeader>
            <Heading title="Create category" description="Add a new category" />
          </CardHeader>
          <CardContent>
            <CategoryForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}