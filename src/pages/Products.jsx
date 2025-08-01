import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/fetchProducts';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2">Our Products</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Browse our collection of carefully selected products.
          </p>
        </header>

        {products.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-64 bg-gray-50 dark:bg-gray-900">
                <div className="w-10 h-10 border-4 border-indigo-500 border-dashed rounded-full animate-spin mb-4"></div>
                <p className="text-base font-medium text-gray-600 dark:text-gray-300">Loading products...</p>
            </div>

        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
