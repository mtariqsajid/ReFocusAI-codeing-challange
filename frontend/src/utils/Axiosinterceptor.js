import axios from 'axios';
import { config } from '@/config/config';

export const AxiosInterceptor = {
  initialize: () => {
    axios.defaults.baseURL = config.baseUrl;
    console.log('🚀 ~ config.baseUrl:', config.baseUrl);
    axios.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        return Promise.reject(error);
      }
    );
  },
};
