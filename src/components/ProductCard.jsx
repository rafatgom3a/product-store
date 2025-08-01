import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition hover:shadow-lg">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          {product.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
          {product.description}
        </p>
        <p className="text-blue-800 dark:text-blue-200 font-semibold mt-2">
          ${product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;