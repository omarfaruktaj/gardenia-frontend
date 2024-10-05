'use client';

import { useState } from 'react';

import { PenBox } from 'lucide-react';

import { Button } from '../ui/button';
import Model from '../ui/model';
import PostForm from './post-form';

export default function PostButton() {
  const [openModel, setOpenModel] = useState(false);

  return (
    <div>
      <Model isOpen={openModel} onClose={() => setOpenModel(false)}>
        <div className="px-2">
          <PostForm />
        </div>
      </Model>
      <Button
        variant={'outline'}
        onClick={() => setOpenModel(true)}
        className="flex items-center space-x-2  text-secondary-foreground  shadow-lg transition duration-200 transform hover:scale-105"
      >
        <PenBox className="h-4 w-4" />
        <div>Write Post</div>
      </Button>
    </div>
  );
}
