import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Read the token for every request so login/logout changes take effect immediately.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('storehub_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  else delete config.headers.Authorization;
  return config;
});

export function getApiError(error) {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.code === 'ECONNABORTED') return 'The request timed out. Please try again.';
  if (!error.response) return 'Cannot connect to the server. Check that the backend is running.';
  return 'Something went wrong. Please try again.';
}

export default api;

// Expired sessions are cleared centrally. The auth provider listens for this event.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || '';
    const isCredentialRequest = requestUrl.includes('/auth/login') || requestUrl.includes('/auth/register');
    if (error.response?.status === 401 && !isCredentialRequest) {
      localStorage.removeItem('storehub_token');
      localStorage.removeItem('storehub_user');
      window.dispatchEvent(new Event('storehub:unauthorized'));
    }
    return Promise.reject(error);
  },
);
