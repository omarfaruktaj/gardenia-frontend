'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';

import api from '@/config/axios';

export const updateComment = async (commentId: string, content: string) => {
  try {
    const { data } = await api.put(`/comments/${commentId}`, { content });
    revalidatePath(`/posts/${data?.data?.post}/comments`);
    return {
      data: {
        message: data.message,
      },
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: {
          message: error.response?.data.message || 'Failed to update comment',
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

export const deleteComment = async (commentId: string) => {
  try {
    const { data } = await api.delete(`/comments/${commentId}`);
    revalidatePath(`/posts/${data?.data?.post}/comments`);
    return {
      data: {
        message: data.message,
      },
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: {
          message: error.response?.data.message || 'Failed to delete comment',
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
