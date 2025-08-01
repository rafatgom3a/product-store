import axios from "axios";

export const fetchFeaturedProducts = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/products?limit=3&skip=5");
    return response.data.products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};