import { useCart } from '../contexts/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, getTotalItems } = useCart();

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">🛒 Your Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <p className="text-gray-600 text-center">Your cart is empty.</p>
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