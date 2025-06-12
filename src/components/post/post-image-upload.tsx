'use client';

import { useCallback, useState } from 'react';

import axios from 'axios';
import { Edit3, Upload, X } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import envConfig from '@/config/env-config';

interface ImageData {
  url: string;
  alt?: string;
  caption?: string;
}

interface ImageUploadProps {
  value: string[];
  disabled?: boolean;
  onChange: (urls: string[]) => void;
  onRemove: (url: string) => void;
}

export function ImageUpload({
  value = [],
  disabled,
  onChange,
  onRemove,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [imageData, setImageData] = useState<Record<string, ImageData>>({});

  const handleUpload = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      setUploading(true);
      const uploadedUrls: string[] = [];

      try {
        for (const file of Array.from(files)) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append(
            'upload_preset',
            `${envConfig.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
          );
          formData.append('folder', 'gardenia');

          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${envConfig.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
          );

          const imageUrl = response.data.secure_url;
          uploadedUrls.push(imageUrl);

          setImageData((prev) => ({
            ...prev,
            [imageUrl]: {
              url: imageUrl,
              alt: '',
              caption: '',
            },
          }));
        }

        onChange(uploadedUrls);
      } catch (error) {
        console.error('Image upload failed:', error);
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  const updateImageData = (url: string, data: Partial<ImageData>) => {
    setImageData((prev) => ({
      ...prev,
      [url]: { ...prev[url], ...data },
    }));
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleUpload(e.target.files)}
          disabled={disabled || uploading}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex flex-col items-center space-y-2"
        >
          <div className="p-3 bg-muted rounded-full">
            <Upload className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">
              {uploading ? 'Uploading...' : 'Click to upload images'}
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, WebP up to 10MB each
            </p>
          </div>
        </label>
      </div>

      {/* Image Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {value.map((url, index) => (
            <Card key={url} className="overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={url || '/placeholder.svg'}
                  alt={imageData[url]?.alt || `Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0"
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit Image Details</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                          <Image
                            src={url || '/placeholder.svg'}
                            alt={imageData[url]?.alt || 'Image preview'}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="alt-text">Alt Text</Label>
                            <Input
                              id="alt-text"
                              placeholder="Describe this image for accessibility"
                              value={imageData[url]?.alt || ''}
                              onChange={(e) =>
                                updateImageData(url, { alt: e.target.value })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="caption">Caption</Label>
                            <Textarea
                              id="caption"
                              placeholder="Add a caption for this image"
                              value={imageData[url]?.caption || ''}
                              onChange={(e) =>
                                updateImageData(url, {
                                  caption: e.target.value,
                                })
                              }
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-8 w-8 p-0"
                    onClick={() => onRemove(url)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="space-y-1">
                  {imageData[url]?.alt && (
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      Alt: {imageData[url].alt}
                    </p>
                  )}
                  {imageData[url]?.caption && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {imageData[url].caption}
                    </p>
                  )}
                  {!imageData[url]?.alt && !imageData[url]?.caption && (
                    <p className="text-xs text-muted-foreground">
                      Click edit to add alt text and caption
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
