import axios from 'axios';
import envConfig from './env-config';

const api = axios.create({
  baseURL: envConfig.BASE_API,
  withCredentials: true,
});

export default api;
