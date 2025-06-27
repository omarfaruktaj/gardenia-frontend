'use client';

import { useState } from 'react';

import { Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Model from '@/components/ui/model';

import UpdateProfileForm from './update-profile-form';

export default function ProfileUpdateButton() {
  const [openModel, setOpenModel] = useState(false);

  const closeModel = () => setOpenModel(false);

  return (
    <div>
      <Model isOpen={openModel} onClose={closeModel}>
        <div className="px-2">
          <UpdateProfileForm closeModel={closeModel} />
        </div>
      </Model>

      <Button
        variant="outline"
        onClick={() => setOpenModel(true)}
        className="flex items-center gap-2 text-sm font-medium rounded-full px-4 py-2 border border-border bg-background hover:bg-muted/50 transition-transform duration-200 hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Pencil className="h-4 w-4" />
        <span>Edit Profile</span>
      </Button>
    </div>
  );
}
