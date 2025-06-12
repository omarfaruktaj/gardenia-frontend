'use client';

import { Calendar, Crown, Tag } from 'lucide-react';
import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface PostPreviewProps {
  title?: string;
  content?: string;
  images?: string[];
  category?: string;
  isPremium?: boolean;
  author?: {
    name?: string;
    avatar?: string;
  };
}

export function PostPreview({
  title,
  content,
  images = [],
  category,
  isPremium,
  author,
}: PostPreviewProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="w-fit">
              Preview Mode
            </Badge>
            {isPremium && (
              <Badge
                variant="secondary"
                className="flex items-center space-x-1"
              >
                <Crown className="h-3 w-3" />
                <span>Premium</span>
              </Badge>
            )}
          </div>

          {/* Post Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold leading-tight">
              {title || 'Your post title will appear here'}
            </h1>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={author?.avatar || '/placeholder.svg'} />
                  <AvatarFallback>
                    {author?.name?.charAt(0) || 'A'}
                  </AvatarFallback>
                </Avatar>
                <span>{author?.name || 'Author Name'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(new Date())}</span>
              </div>
              {category && (
                <div className="flex items-center space-x-1">
                  <Tag className="h-4 w-4" />
                  <span>{category}</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Featured Image */}
          {images.length > 0 && (
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={images[0] || '/placeholder.svg'}
                alt="Featured image"
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {content ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <p className="text-muted-foreground italic">
                Your post content will appear here. Start writing to see the
                preview.
              </p>
            )}
          </div>

          {/* Additional Images */}
          {images.length > 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Images</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.slice(1).map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-lg overflow-hidden"
                  >
                    <Image
                      src={image || '/placeholder.svg'}
                      alt={`Additional image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
