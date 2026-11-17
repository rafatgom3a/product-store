import api from './api';

export const fetchFeaturedProducts = async () => {
  const response = await api.get('/products', { params: { featured: true, limit: 3 } });
  return response.data.products;
};
