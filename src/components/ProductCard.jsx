import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const ProductCard = ({ product, onAddToCart }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const favorite = isInWishlist(product);

  const renderStars = () => {
    const stars = [];
    const rating = Number(product.rating) || 0;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />);
    }
    if (halfStar) {
      stars.push(<Star key="half" size={16} className="text-yellow-400 fill-yellow-400 opacity-50" />);
    }
    while (stars.length < 5) {
      stars.push(<Star key={stars.length} size={16} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="group relative flex flex-col justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl">
      <button
        type="button"
        aria-label={favorite ? 'Remove from wishlist' : 'Add to wishlist'}
        title={favorite ? 'Remove from wishlist' : 'Add to wishlist'}
        onClick={() => toggleWishlist(product)}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/95 p-2 text-rose-500 shadow-md transition hover:scale-110 dark:bg-gray-800"
      >
        <Heart size={20} className={favorite ? 'fill-rose-500' : ''} />
      </button>
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

          <div className="flex items-center gap-1 mt-1">
            {renderStars()}
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({(Number(product.rating) || 0).toFixed(1)})</span>
          </div>

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
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product);
            onAddToCart?.(product);
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