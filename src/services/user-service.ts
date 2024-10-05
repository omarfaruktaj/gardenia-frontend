'use server';

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

import api from '@/config/axios';

export const getCurrentUser = async () => {
  const accessToken = cookies().get('access_token')?.value;
  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      _id: decodedToken?.userId,
      email: decodedToken?.email,
      username: decodedToken?.username,
      avatar: decodedToken?.avatar,
      name: decodedToken?.name,
      isVerified: decodedToken?.isVerified,
      role: decodedToken?.role,
    };
  }

  return decodedToken;
};
interface IFollow {
  userId: string;
  pageParam?: number;
  limit?: number;
}

export const fetchFollowers = async ({
  userId,
  pageParam = 1,
  limit = 10,
}: IFollow) => {
  try {
    const response = await api.get(
      `/users/${userId}/followers?page=${pageParam}&limit=${limit}`
    );
    return {
      followers: response?.data?.data?.followers,
      pagination: response?.data?.data?.pagination,
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

export const fetchFollowing = async ({
  userId,
  pageParam = 1,
  limit = 10,
}: IFollow) => {
  try {
    const response = await api.get(
      `/users/${userId}/following?page=${pageParam}&limit=${limit}`
    );
    return {
      following: response?.data?.data?.following,
      pagination: response?.data?.data?.pagination,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || 'Failed to get followings'
      );
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const followUser = async (followedId: string) => {
  try {
    const { data } = await api.post(`/users/${followedId}/follow`);
    return { message: data.message };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data.message || 'Creating failed' };
    } else {
      return { error: 'An unexpected error occurred' };
    }
  }
};
export const UnfollowUser = async (unFollowedId: string) => {
  try {
    const { data } = await api.delete(`/users/${unFollowedId}/unfollow`);
    return { message: data.message };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data.message || 'Creating failed' };
    } else {
      return { error: 'An unexpected error occurred' };
    }
  }
};
