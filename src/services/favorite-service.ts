'use server';

import axios from 'axios';

import api from '@/config/axios';
import { Pagination } from '@/types';

export const fetchFavoritePosts = async ({
  pageParam = 1,
  limit = 10,
}: Pagination) => {
  try {
    const response = await api.get(
      `/favorites/?page=${pageParam}&limit=${limit}`
    );

    return {
      posts: response?.data?.data,
      pagination: response?.data?.pagination,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || 'Failed to get followers'
      );
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
