'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import Model from '@/components/ui/model';

import UpdateProfileForm from './update-profile-form';

export default function ProfileUpdateButton() {
  const [openModel, setOpenModel] = useState(false);

  const closeModel = () => {
    setOpenModel(false);
  };

  return (
    <div>
      <Model isOpen={openModel} onClose={() => setOpenModel(false)}>
        <div className="px-2">
          <UpdateProfileForm closeModel={closeModel} />
        </div>
      </Model>
      <Button
        variant={'outline'}
        onClick={() => setOpenModel(true)}
        className="flex items-center space-x-2  text-secondary-foreground  shadow-lg transition duration-200 transform hover:scale-105"
      >
        Edit Profile
      </Button>
    </div>
  );
}
