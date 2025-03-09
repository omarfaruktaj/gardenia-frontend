'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';

import api from '@/config/axios';
import { CategoryType } from '@/schemas/category-schema';

export const createCategory = async (userData: CategoryType) => {
  try {
    const { data } = await api.post('/categories', userData);
    revalidatePath('/categories');
    return { data: data.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data.message || 'Creating failed' };
    } else {
      return { error: 'An unexpected error occurred' };
    }
  }
};
export const deleteCategory = async (id: string) => {
  try {
    const { data } = await api.delete(`/categories/${id}`);
    revalidatePath('/categories');
    return { data: data.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data.message || 'Creating failed' };
    } else {
      return { error: 'An unexpected error occurred' };
    }
  }
};

export const updateCategory = async (id: string, userData: CategoryType) => {
  try {
    const { data } = await api.put(`/categories${id}`, userData);
    revalidatePath('categories');
    return { data: data.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data.message || 'Updating failed' };
    } else {
      return { error: 'An unexpected error occurred' };
    }
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response?.data?.data?.categories;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || 'Failed to get categories'
      );
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
