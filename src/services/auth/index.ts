'use server';

import axiosInstance from '@/lib/axios-instance';
import { TRegisterSchema } from '@/schemas/register-schema';
import axios from 'axios';
import { cookies } from 'next/headers';

export const register = async (userData: TRegisterSchema) => {
  try {
    const { data } = await axiosInstance.post('/auth/signup', userData);

    if (data.success) {
      cookies().set('access_token', data.data.accessToken);
      cookies().set('refresh_token', data.data.refreshToken);
    }

    return { data: data.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      return { error: error.response?.data.message || 'Registration failed' };
    } else {
      return { error: 'An unexpected error occurred' };
    }
  }
};
