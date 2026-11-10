import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { authStorage } from '../storage';

// Base API configuration (can be moved to .env in future)
export const BASE_URL = 'https://api.chakro.app/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor: attach bearer token if available
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = authStorage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor: handle 401 unauthorized or global errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Auto logout on unauthorized error
      authStorage.removeToken();
    }
    return Promise.reject(error);
  }
);

export default apiClient;

