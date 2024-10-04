'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

import api from '@/config/axios';
import {
  TForgotPasswordSchema,
  TLoginSchema,
  TSignUpSchema,
} from '@/schemas/auth-schema';

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
      return { error: error.response?.data.message || 'Registration failed' };
    } else {
      return { error: 'An unexpected error occurred' };
    }
  }
};

export const login = async (userData: TLoginSchema) => {
  try {
    const { data } = await api.post('/auth/signIn', userData);
    console.log(data);
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
export const forgotPassword = async (userData: TForgotPasswordSchema) => {
  try {
    const { data } = await api.post('/auth/forgotPassword', userData);

    return { success: data.message };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data.message || 'Login failed' };
    } else {
      return { error: 'An unexpected error occurred' };
    }
  }
};

export const resetPassword = async (password: string, token: string) => {
  try {
    const { data } = await api.patch(`/auth/resetPassword/${token}`, {
      password,
    });

    if (data.success) {
      cookies().set('access_token', data.data.accessToken);
      cookies().set('refresh_token', data.data.refreshToken);
    }
    return { data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data.message || 'Login failed' };
    } else {
      return { error: 'An unexpected error occurred' };
    }
  }
};

export const logout = () => {
  cookies().delete('access_token');
  cookies().delete('refresh_token');
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get('refresh_token')?.value;

    const res = await api.post('/auth/refreshToken', {
      refreshToken,
    });

    return res.data;
  } catch (error) {
    throw new Error('Failed to get new access token');
  }
};
