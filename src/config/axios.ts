import axios from 'axios';
import { cookies } from 'next/headers';

import { getNewAccessToken } from '@/services/auth-service';

import envConfig from './env-config';

const api = axios.create({
  baseURL: envConfig.BASE_API,
});
api.interceptors.request.use(
  (config) => {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      const res = await getNewAccessToken();

      if (res) {
        const accessToken = res?.data?.accessToken;

        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }

      return api(config);
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
