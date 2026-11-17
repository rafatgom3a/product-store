import api from './api';

export async function fetchProductById(id) {
  const response = await api.get(`/products/${encodeURIComponent(id)}`);
  return response.data;
}
