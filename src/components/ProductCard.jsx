// components/ProductCard.jsx
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="flex flex-col justify-between bg-white dark:bg-gray-900 rounded-2xl shadow hover:shadow-xl transition-transform transform hover:-translate-y-1 hover:scale-[1.02] p-4">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-40 object-cover rounded-xl mb-4"
        />
        <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-400">
          {product.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 line-clamp-2 text-sm mt-1">
          {product.description}
        </p>
        <p className="mt-2 text-emerald-600 dark:text-emerald-400 font-bold text-md">
          ${product.price}
        </p>
      </Link>

      <div className="mt-4 flex justify-between items-center gap-2">
        <Link
          to={`/products/${product.id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          View Details
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault(); // Prevent navigation
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
