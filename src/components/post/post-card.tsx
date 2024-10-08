import Link from 'next/link';

import { PostResponse } from '@/types';

import { Button } from '../ui/button';

export default function PostCard({ post }: { post: PostResponse }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={post.images[0]}
        alt={post.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>

        <p className="text-gray-600 text-sm mb-2">Category: {post.category}</p>

        <p className="text-gray-700 text-sm mb-4">
          {post.content.substring(0, 100)}...
        </p>

        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span>By {post.author}</span>
          <span>{post.createdAt}</span>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          <div className="flex space-x-4">
            <span className="flex items-center space-x-1">
              <svg
                className="w-5 h-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5c0-2.5 2-4.5 4.5-4.5 1.74 0 3.41 1.01 4.07 2.44 0.65-1.43 2.32-2.44 4.07-2.44C20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
              </svg>
              <span>{post.votes}</span>
            </span>
            <span className="flex items-center space-x-1">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 22c5.33 0 8-4.37 8-8V5c0-1.66-1.34-3-3-3H7C5.34 2 4 3.34 4 5v9c0 3.63 2.67 8 8 8zM12 7.9c.56 0 1.12.15 1.61.42L18 7.47v6.91l-4.39-1.41a3.43 3.43 0 00-1.61-.41 3.43 3.43 0 00-1.61.41L6 14.38V7.47l4.39 1.41c.5-.27 1.05-.42 1.61-.42z"></path>
              </svg>
            </span>
            <span className="flex items-center space-x-1">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path>
              </svg>
            </span>
          </div>
        </div>

        <Button
          asChild
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Link href={`/${post.author}/posts/${post._id}`}> See more</Link>
        </Button>
      </div>
    </div>
  );
}
