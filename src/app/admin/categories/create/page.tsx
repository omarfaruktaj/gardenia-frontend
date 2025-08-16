import BackButton from '@/components/ui/back-button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';

import CategoryForm from '../components/category-form';

export default function CreateCategory() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header Section */}
      <div className=" border-border/50">
        <div className=" px-4 sm:px-6 lg:px-8 py-6">
          <BackButton />

          <div className="flex items-center">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Create Category
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Add a new category to organize your content
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-lg border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <div>
                <Heading
                  title="Category Details"
                  description="Fill in the information below to create your new category"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <CategoryForm />
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="mt-8 p-4 rounded-lg bg-muted/30 border border-border/30">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-foreground mb-1">
                Category Guidelines
              </h3>
              <p className="text-sm text-muted-foreground">
                Choose a clear, descriptive name for your category. The
                description helps users understand what content belongs in this
                category.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
