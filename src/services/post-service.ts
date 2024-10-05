'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';

import api from '@/config/axios';
import { TPostFormSchema } from '@/schemas/post-schema';

export const createPost = async (userData: TPostFormSchema) => {
  try {
    const { data } = await api.post('/posts', userData);
    revalidatePath('/posts');

    return {
      data: {
        message: data.message,
      },
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        error: {
          message: error.response?.data.message || 'Post Creating failed',
        },
      };
    } else {
      return {
        error: {
          message: 'An unexpected error occurred',
        },
      };
    }
  }
};

export const updatePost = async (id: string, userData: TPostFormSchema) => {
  try {
    const { data } = await api.put(`/posts${id}`, userData);
    revalidatePath('/posts');
    return {
      data: {
        message: data.message,
      },
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        error: {
          message: error.response?.data.message || 'Post Updating failed',
        },
      };
    } else {
      return {
        error: {
          message: 'An unexpected error occurred',
        },
      };
    }
  }
};
