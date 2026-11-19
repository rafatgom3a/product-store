import api from './api';

export const fetchFeaturedProducts = async () => {
  const response = await api.get('/products', { params: { featured: true, limit: 3 } });
  const products = Array.isArray(response.data?.products) ? response.data.products : [];
  return products.map((product) => ({
    ...product,
    id: product.id || product._id,
    rating: Number(product.rating) || 0,
    discountPercentage: Number(product.discountPercentage) || 0,
    thumbnail: product.thumbnail || product.images?.[0] || '',
  }));
};
