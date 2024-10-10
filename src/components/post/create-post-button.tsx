'use client';

import { useState } from 'react';

import { PenBox } from 'lucide-react';

import { Button } from '../ui/button';
import Model from '../ui/model';
import PostForm from './post-form';

export default function PostButton() {
  const [openModel, setOpenModel] = useState(false);

  const closeModel = () => {
    setOpenModel(false);
  };

  return (
    <div>
      <Model isOpen={openModel} onClose={() => setOpenModel(false)}>
        <div className="px-2">
          <PostForm closeModel={closeModel} />
        </div>
      </Model>
      <Button
        variant={'secondary'}
        onClick={() => setOpenModel(true)}
        className="flex items-center space-x-2 rounded-full "
      >
        <PenBox className="h-4 w-4" />
        <div>Start Writing</div>
      </Button>
    </div>
  );
}
