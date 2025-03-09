/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';

import api from '@/config/axios';

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-unused-vars */

export const getPaymentSession = async () => {
  try {
    const response = await api.get('/payments/initiate');
    return response?.data?.data;
  } catch (error) {
    // console.error('Error fetching current user:', error);
    return null;
  }
};
export const confirmPayment = async (transactionID: string) => {
  try {
    const response = await api.post('/payments/confirm', {
      transactionID,
      amount: 20,
    });
    revalidatePath('/payments');
    return {
      success: response?.data?.message,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: {
          message:
            error.response?.data.message || 'Failed to delete confirm payment',
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
