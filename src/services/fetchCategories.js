import api from './api';

export async function fetchCategories() {
  const response = await api.get('/categories');
  return Array.isArray(response.data?.categories) ? response.data.categories : [];
}
