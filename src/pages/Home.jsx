import React, { useState, useEffect } from "react";
import { ShoppingCart, Star, Truck, Shield, Headphones } from "lucide-react";
import { fetchFeaturedProducts } from "./../services/fetchFeaturedProducts ";
import { useCart } from '../contexts/CartContext';

const testimonials = [
  {
    id: 1,  
    name: "Alex Rodriguez",
    rating: 5,
    comment: "Exceptional quality and service! The products arrived exactly as described and the customer support was outstanding.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Mike Chen",
    rating: 5,
    comment: "Outstanding quality and customer service. Will definitely shop again!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Emily Davis",
    rating: 5,
    comment: "Best online shopping experience I've had. Products exceeded expectations!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
  }
];

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const { addToCart } = useCart();
  

  useEffect(() => {
    fetchFeaturedProducts()
      .then(products => {
        setFeaturedProducts(products);
      })
      .catch(err => console.error("Failed to fetch products:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating) => (
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  );

    const handleStartShopping = () => {
      window.location.href = '/products';
    };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 text-gray-800 dark:text-gray-200">

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen px-4 text-center py-16">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-tr from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-6 border border-indigo-200/60 dark:border-indigo-700/60 shadow-md">
            <span className="mr-2">✨</span>
            New Collection Available
            <span className="ml-2">✨</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Discover Amazing
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">
              Products
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Experience quality and innovation with our carefully curated collection of premium products
          </p>
          
          {/* CTA Button */}
          <button 
            onClick={handleStartShopping}
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <span className="mr-3">Start Shopping</span>
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products" className="px-6 py-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              FEATURED COLLECTION
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Featured Products
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Handpicked items that combine innovation with exceptional value
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-indigo-200 dark:border-indigo-800 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/60 dark:border-gray-700/60 overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discountPercentage && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      -{product.discountPercentage.toFixed(0)}%
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-3">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-500 ml-2">
                      ({product.rating.toFixed(1)})
                    </span>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white line-clamp-2">
                    {product.title}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      ${product.price}
                    </span>
                    {product.discountPercentage && (
                      <span className="text-sm text-gray-500 line-through">
                        ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(product);
                    }}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
                    <span className="flex items-center justify-center space-x-2">
                      <span>Add to Cart</span>
                      <ShoppingCart className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Customer Testimonials */}
      <section className="px-6 py-16 bg-gray-50/80 dark:bg-gray-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              CUSTOMER REVIEWS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              What Our Customers Say
            </span>
          </h2>
          
          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200/60 dark:border-gray-700/60">
              <div className="flex items-center justify-center mb-4">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 italic">
                "{testimonials[currentTestimonial].comment}"
              </p>
              
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-12 h-12 rounded-full border-2 border-indigo-200 dark:border-indigo-700"
                />
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400">Verified Customer</p>
                </div>
              </div>
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-indigo-600 scale-110' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                WHY CHOOSE US
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Why Choose StoreHub?
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're committed to providing exceptional shopping experiences
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Fast Delivery</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Free same-day delivery on orders over $50. Track your package in real-time.
              </p>
            </div>
            
            <div className="group text-center p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Quality Guarantee</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Every product undergoes quality testing. 30-day money-back guarantee.
              </p>
            </div>
            
            <div className="group text-center p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">24/7 Support</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Our support team is available around the clock via chat, phone, or email.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Ready to Start Shopping?
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Join thousands of satisfied customers who've discovered quality products
          </p>
          
          <button 
            onClick={handleStartShopping}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <span className="mr-3">Shop Now</span>
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </section>

    </div>
  );
}

export default Home;