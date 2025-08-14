'use client';

import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserInfo } from '@/lib/get-login-user';

import PostForm from './post/post-form';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import Model from './ui/model';

export default function CreatePostCard({ user }: { user: UserInfo }) {
  const [openModel, setOpenModel] = useState(false);

  const closeModel = () => {
    setOpenModel(false);
  };
  return (
    <Card className="mb-6 cursor-pointer hover:shadow-md transition-all duration-200 border-0 shadow-sm bg-white">
      <Model isOpen={openModel} onClose={() => setOpenModel(false)}>
        <div className="px-2">
          <PostForm closeModel={closeModel} />
        </div>
      </Model>
      <CardContent className="p-6" onClick={() => setOpenModel(true)}>
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 ring-2 ring-green-100">
            <AvatarImage src={user.avatar || ''} />
            <AvatarFallback className="bg-gradient-to-br from-green-400 to-green-600 text-white font-semibold text-lg">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="bg-gray-50 rounded-full px-6 py-4 hover:bg-gray-100 transition-colors">
              <span className="text-gray-500 text-lg font-medium">
                What&apos;s growing in your garden?
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end mt-4 px-4">
          <Button
            className="px-8 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-sm hover:shadow-md transition-all duration-200"
            disabled
          >
            Post
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
