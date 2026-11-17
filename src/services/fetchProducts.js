import api from './api';

export async function fetchProducts() {
  try {
    const response = await api.get('/products');
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}