'use server';

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import api from '@/config/axios';

export const getCurrentUser = async () => {
  const accessToken = cookies().get('access_token')?.value;
  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return {
      _id: decodedToken?.userId,
      username: decodedToken?.avatar,
      avatar: decodedToken?.avatar,
      name: decodedToken?.name,
      isVerified: decodedToken?.isVerified,
      role: decodedToken?.role,
    };
  }

  return decodedToken;
};

export const followUser = async (followedId: string) => {
  try {
    const { data } = await api.post(`/users/${followedId}/follow`);
    revalidatePath(`/users/${followedId}`);
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
    revalidatePath(`/users/${unFollowedId}`);
    return { message: data.message };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data.message || 'Creating failed' };
    } else {
      return { error: 'An unexpected error occurred' };
    }
  }
};
