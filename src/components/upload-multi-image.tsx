import { useState } from 'react';

import axios from 'axios';
import { Trash, Upload } from 'lucide-react';
import Image from 'next/image';

import envConfig from '@/config/env-config';

import { Button } from './ui/button';

interface UploadImageProps {
  disabled?: boolean;
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export default function UploadMultiImage({
  disabled,
  onChange,
  onRemove,
  value,
}: UploadImageProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setIsUploading(true);
      const files = Array.from(event.target.files);
      const uploadedImages: string[] = [];

      try {
        for (const file of files) {
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
          uploadedImages.push(imageUrl);
        }
        onChange(uploadedImages);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // console.error('Image upload failed:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center flex-wrap gap-4">
        {value.length > 0 &&
          value.map((url) => (
            <div
              key={url}
              className="relative w-24 h-24 sm:w-24 sm:h-24 rounded-lg overflow-hidden border  hover:shadow-md transition-shadow pt-2"
            >
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
                disabled={disabled}
                className="absolute top-1 right-1 h-7 w-7 bg-red-500 hover:bg-red-600 text-white z-10"
              >
                <Trash className="h-4 w-4" />
              </Button>
              <Image
                className="object-cover w-full h-full"
                alt="Uploaded"
                src={url}
                layout="fill"
              />
            </div>
          ))}
      </div>

      <label
        htmlFor="file-upload"
        className={`flex items-center justify-center  mt-2 rounded-lg 
           transition-colors border border-dashed  border-primary
          ${disabled || isUploading ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        <div className=" flex items-center justify-center flex-col py-3 cursor-pointer">
          <Upload className="text-[2rem] " />

          <p className="text-secondary-foreground">Browse to upload images</p>
        </div>
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        disabled={disabled || isUploading}
        className="hidden mt-1"
      />
      {isUploading && <p className="mt-2 text-primary">Uploading...</p>}
    </div>
  );
}
