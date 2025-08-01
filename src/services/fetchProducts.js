import axios from 'axios';

export async function fetchProducts() {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}