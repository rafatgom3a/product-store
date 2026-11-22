import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProductById } from '../services/fetchProductById';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();


  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError('');
    fetchProductById(id)
      .then((data) => { if (!cancelled) setProduct(data); })
      .catch((err) => { if (!cancelled) setError(err.response?.data?.message || 'Could not load this product.'); })
      .finally(() => { if (!cancelled) setIsLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Fetching product details...</p>
        </div>
        </div>
    );
  }

  if (error || !product) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 px-6"><p className="text-center text-red-600 dark:text-red-400">{error || 'Product not found.'}</p></div>;
  }

  return (
    <div className="pt-12 px-6 pb-12 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row gap-8">
            {/* Left side: Image */}
            <div className="lg:w-1/2 p-6 flex items-center justify-center">
            <img
                src={product.images?.[0] || product.thumbnail}
                alt={product.title}
                className="w-full h-[400px] object-cover rounded-xl border"
            />
            </div>

            {/* Right side: Details */}
            <div className="lg:w-1/2 p-6 space-y-4 text-gray-800 dark:text-gray-100">
            <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">{product.title}</h1>
            <p className="text-gray-700 dark:text-gray-300">{product.description}</p>

            <div className="flex items-center gap-4">
                <span className="text-2xl text-green-600 dark:text-green-400 font-semibold">${product.price}</span>
                <span className="text-sm text-red-500 line-through">${(product.price / (1 - (product.discountPercentage || 0) / 100)).toFixed(2)}</span>
                <span className="text-sm text-red-600">-{product.discountPercentage || 0}%</span>
            </div>

            <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>{product.rating} / 5</span>
            </div>

            <div className="text-sm">
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <p><strong>Weight:</strong> {product.weight}g</p>
                <p><strong>Dimensions:</strong> {product.dimensions?.width} x {product.dimensions?.height} x {product.dimensions?.depth} cm</p>
                <p><strong>SKU:</strong> {product.sku}</p>
                <p><strong>Barcode:</strong> {product.meta?.barcode || '—'}</p>
                <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
                <p><strong>Shipping:</strong> {product.shippingInformation}</p>
                <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
                <p><strong>Availability:</strong> {product.availabilityStatus}</p>
                <p><strong>Minimum Order:</strong> {product.minimumOrderQuantity}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
              className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded transition"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              className="inline-flex items-center gap-2 rounded-lg border border-rose-300 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50 dark:border-rose-800 dark:hover:bg-rose-950/30"
            >
              <Heart size={17} className={isInWishlist(product) ? 'fill-rose-500 text-rose-500' : ''} />
              {isInWishlist(product) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
            </div>
        </div>
       </div>

        {/* Reviews */}
        <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Customer Reviews</h2>
            <div className="space-y-4">
            {product.reviews?.map((review, index) => (
                <div key={index} className="p-4 bg-white dark:bg-gray-900 rounded shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-blue-600 dark:text-blue-400">{review.reviewerName}</span>
                    <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">{review.comment}</p>
                <span className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                </div>
            ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
