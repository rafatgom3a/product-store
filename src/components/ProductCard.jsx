// components/ProductCard.jsx
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="group flex flex-col justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        <div className="p-4">
          <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-400">
            {product.title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 line-clamp-2 text-sm mt-1">
            {product.description}
          </p>
          <p className="mt-2 text-emerald-600 dark:text-emerald-400 font-bold text-md">
            ${product.price}
          </p>
        </div>
      </Link>

      <div className="px-4 pb-4 flex justify-between items-center gap-2">
        <Link
          to={`/products/${product.id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          View Details
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault(); // Prevent Link navigation
            onAddToCart(product);
          }}
          className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded transition"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
