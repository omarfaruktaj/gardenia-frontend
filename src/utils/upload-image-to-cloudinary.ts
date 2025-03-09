import axios from 'axios';

import envConfig from '@/config/env-config';

export const uploadImageToCloudinary = async (
  file: File,
  type: string = 'image'
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'upload_preset',
    `${envConfig.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
  );
  formData.append('folder', 'gardenia');

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${envConfig.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${type}/upload`,
      formData
    );
    return response.data.secure_url;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.error('Cloudinary upload error:', error);
    return null;
  }
};
