'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';

import api from '@/config/axios';
import { TPostFormSchema } from '@/schemas/post-schema';
import { Pagination, QueryString } from '@/types';

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
    const { data } = await api.put(`/posts/${id}`, userData);
    revalidatePath(`/posts/${id}`);
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

type Vote = {
  postId: string;
  voteType: 'upvote' | 'downvote';
};

export const votePost = async ({ postId, voteType }: Vote) => {
  try {
    const { data } = await api.post(`posts/${postId}/vote`, { voteType });
    revalidatePath(`/posts/${postId}`);
    return {
      data: {
        message: data.message,
      },
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: {
          message: error.response?.data.message || 'Failed to vote',
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

export const toggleFavorite = async (postId: string) => {
  try {
    const { data } = await api.post(`posts/${postId}/favorite`);
    revalidatePath('/users/me');
    return {
      data: {
        message: data.message,
      },
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: {
          message: error.response?.data.message || 'Failed to favorite',
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

export const createComment = async (postId: string, content: string) => {
  try {
    const { data } = await api.post(`posts/${postId}/comments`, { content });
    revalidatePath(`/posts/${postId}/comments`);
    return {
      data: {
        message: data.message,
      },
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: {
          message: error.response?.data.message || 'Failed to favorite',
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

export const deletePost = async (postId: string) => {
  try {
    const { data } = await api.delete(`/posts/${postId}`);
    revalidatePath(`/posts/${postId}`);
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

export const fetchUserPosts = async ({
  userId,
  pageParam = 1,
  limit = 10,
}: Pagination & { userId: string }) => {
  try {
    const response = await api.get(
      `/users/${userId}/posts?page=${pageParam}&limit=${limit}`
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

export const fetchPosts = async ({ pageParam = 1, limit = 10 }: Pagination) => {
  try {
    const response = await api.get(`/posts?page=${pageParam}&limit=${limit}`);

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

export const fetchFeed = async ({
  pageParam = 1,
  limit = 10,
  searchTerm,
  category,
}: Pagination & QueryString) => {
  const sort = searchTerm ? '-votes' : undefined;
  const categoryFilter = category === '' ? category : undefined;
  try {
    const response = await api.get('/posts/feed?', {
      params: {
        limit,
        searchTerm,
        sort,
        page: pageParam,
        category: categoryFilter,
      },
    });

    return {
      posts: response?.data?.data,
      pagination: response?.data?.pagination,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Failed to get posts');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
