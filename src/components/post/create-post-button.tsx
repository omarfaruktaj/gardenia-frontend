'use client';

import { useState } from 'react';

import { PenBox, Plus } from 'lucide-react';

import { Button } from '../ui/button';
import Model from '../ui/model';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
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

      <div className="hidden xl:block">
        <Button
          variant={'default'}
          onClick={() => setOpenModel(true)}
          className="flex items-center space-x-2 rounded-full w-full "
        >
          <PenBox className="h-4 w-4" />
          <div>Start Writing</div>
        </Button>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="xl:hidden w-10 h-10 p-0 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center"
            onClick={() => setOpenModel(true)}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" align="center">
          <p>Create Post</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
