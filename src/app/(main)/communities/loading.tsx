import { Separator } from '@radix-ui/react-dropdown-menu';

import { UserCardSkeleton } from '@/components/skeleton/user-card-skeleton';

export default function loading() {
  return (
    <div className="p-4">
      <div className="space-y-4 ">
        <h2 className="text-xl font-semibold mb-4">Communities</h2>
        <Separator />
        <div className="flex flex-col space-y-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <UserCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
