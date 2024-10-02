'use server';

import api from '@/config/axios';
import { TLoginSchema } from '@/schemas/login-schema';
import { TSignUpSchema } from '@/schemas/sign-up-schema';
import axios from 'axios';
import { cookies } from 'next/headers';

export const singUp = async (userData: TSignUpSchema) => {
  try {
    const { data } = await api.post('/auth/signup', userData);

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

export const login = async (userData: TLoginSchema) => {
  try {
    const { data } = await api.post('/auth/signIn', userData);

    if (data.success) {
      cookies().set('access_token', data.data.accessToken);
      cookies().set('refresh_token', data.data.refreshToken);
    }

    return { data: data.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      return { error: error.response?.data.message || 'Login failed' };
    } else {
      return { error: 'An unexpected error occurred' };
    }
  }
};
