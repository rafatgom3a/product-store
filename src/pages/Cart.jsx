import { useCart } from '../contexts/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, getTotalItems } = useCart();

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">🛒 Your Shopping Cart</h1>

            {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 text-gray-300 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
                </svg>
                <h3 className="text-xl font-medium text-gray-500 mb-2">Your cart is empty</h3>
                <p className="text-gray-400 mb-6">Looks like you haven't added any items yet</p>
                <Link
                to="/products"
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                Browse Products
                </Link>
            </div>
            ) : (
                <div className="space-y-4">
                {cartItems.map((item) => (
                    <div
                    key={item.id}
                    className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow-md rounded-lg border"
                    >
                    {/* Item Info */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                        <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-16 h-16 object-contain rounded"
                        />
                        <div className="truncate">
                        <h2 className="font-semibold text-lg truncate">{item.title}</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">${item.price.toFixed(2)}</p>
                        </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center w-24">
                        <div className="flex items-center gap-2">
                        <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="p-1 border rounded hover:bg-gray-100"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="font-medium w-6 text-center">{item.quantity}</span>
                        <button
                            onClick={() => increaseQuantity(item.id)}
                            className="p-1 border rounded hover:bg-gray-100"
                        >
                            <Plus size={16} />
                        </button>
                        </div>
                    </div>

                    {/* Remove Button */}
                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition ml-4"
                        title="Remove from cart"
                    >
                        <Trash2 size={20} />
                    </button>
                    </div>
                ))}

                {/* Summary */}
                <div className="mt-6 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm text-right space-y-2">
                    <p className="text-md font-semibold">
                    Total Items: {getTotalItems()}
                    </p>
                    <p className="text-lg font-bold">
                    Total Price: $
                    {cartItems
                        .reduce((total, item) => total + item.price * item.quantity, 0)
                        .toFixed(2)}
                    </p>
                </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default Cart;