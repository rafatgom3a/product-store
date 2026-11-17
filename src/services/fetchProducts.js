import api from './api';

export async function fetchProducts(params = {}) {
  const response = await api.get('/products', { params });
  return response.data;
}
