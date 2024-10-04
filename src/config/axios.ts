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
    const accessToken = cookieStore.get('accessToken')?.value;

    if (accessToken) {
      config.headers.Authorization = accessToken;
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
      const accessToken = res.data.accessToken;
      const refreshToken = res.data.refreshToken;

      config.headers['Authorization'] = accessToken;
      cookies().set('access_token', accessToken);
      cookies().set('refresh_token', refreshToken);

      return api(config);
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
