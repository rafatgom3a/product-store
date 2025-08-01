import React, { useState, useEffect } from "react";
import { ShoppingCart, Star, Truck, Shield, Headphones } from "lucide-react";
import { fetchFeaturedProducts } from "./../services/fetchFeaturedProducts ";

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

  useEffect(() => {
    fetchFeaturedProducts()
      .then(products => {
        setFeaturedProducts(products);
      })
      .catch(err => console.error("Failed to fetch products:", err))
      .finally(() => setLoading(false));
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
    document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 text-gray-800 dark:text-gray-200 transition-all duration-500">

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen px-4 text-center pt-24 pb-12">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-indigo-400/20 to-purple-600/20 rounded-full transform rotate-12 blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-400/20 to-cyan-600/20 rounded-full transform -rotate-12 blur-3xl"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-yellow-400/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-l from-green-400/10 to-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Enhanced Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-100/90 to-purple-100/90 dark:from-indigo-900/40 dark:to-purple-900/40 backdrop-blur-sm rounded-full text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-10 border border-indigo-200/60 dark:border-indigo-700/60 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <span className="animate-pulse mr-2">✨</span>
            New Collection Available Now
            <span className="animate-pulse ml-2">✨</span>
          </div>
          
          {/* Enhanced Main Heading */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
              Discover
            </span>
            <br />
            <span className="text-gray-900 dark:text-white drop-shadow-sm">
              Premium Products
            </span>
          </h1>
          
          {/* Enhanced Description */}
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Experience the perfect blend of innovation, quality, and style. From cutting-edge technology to everyday essentials.
          </p>
          
          {/* Enhanced CTA Button */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={handleStartShopping}
              className="group relative px-12 py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-4xl transform hover:-translate-y-3 transition-all duration-700 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative flex items-center justify-center space-x-4">
                <span>Start Shopping Now</span>
                <ShoppingCart className="w-7 h-7 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            </button>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-1/4 left-8 w-4 h-4 bg-indigo-400/30 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-1/3 right-12 w-6 h-6 bg-purple-400/30 rounded-full animate-bounce delay-700"></div>
          <div className="absolute bottom-1/4 left-16 w-3 h-3 bg-pink-400/30 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-1/3 right-8 w-5 h-5 bg-cyan-400/30 rounded-full animate-bounce delay-500"></div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products" className="px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block p-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6">
            <div className="bg-white dark:bg-gray-900 rounded-full px-6 py-2">
              <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                FEATURED COLLECTION
              </span>
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Featured Products
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Handpicked items that combine innovation with exceptional value, curated especially for our discerning customers
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-indigo-200 dark:border-indigo-800 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl border border-gray-200/60 dark:border-gray-700/60 overflow-hidden transform hover:-translate-y-4 transition-all duration-700"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-t-3xl">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {product.discountPercentage && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      -{product.discountPercentage.toFixed(0)}%
                    </div>
                  )}
                </div>

                <div className="p-8">
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-500 ml-3 font-medium">
                      ({product.rating.toFixed(1)})
                    </span>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 line-clamp-2">
                    {product.title}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                      ${product.price}
                    </span>
                    {product.discountPercentage && (
                      <span className="text-lg text-gray-500 line-through font-medium">
                        ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button className="w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-2xl transform hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center justify-center space-x-3">
                      <span>Add to Cart</span>
                      <ShoppingCart className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Customer Testimonials */}
      <section className="px-6 py-24 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-gray-800/60 dark:to-indigo-900/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block p-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6">
            <div className="bg-white dark:bg-gray-900 rounded-full px-6 py-2">
              <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                CUSTOMER REVIEWS
              </span>
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-16">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              What Our Customers Say
            </span>
          </h2>
          
          <div className="relative">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-gray-200/60 dark:border-gray-700/60 transform hover:scale-105 transition-all duration-500">
              {/* Quote Icon */}
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-3xl text-white">"</span>
              </div>
              
              <div className="flex items-center justify-center mb-8">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>
              
              <p className="text-2xl text-gray-700 dark:text-gray-300 mb-10 italic font-medium leading-relaxed">
                "{testimonials[currentTestimonial].comment}"
              </p>
              
              <div className="flex items-center justify-center space-x-6">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full border-4 border-indigo-200 dark:border-indigo-700 shadow-lg"
                />
                <div className="text-left">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">Verified Customer</p>
                </div>
              </div>
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center space-x-3 mt-10">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 scale-125 shadow-lg' 
                      : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block p-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6">
              <div className="bg-white dark:bg-gray-900 rounded-full px-6 py-2">
                <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  WHY CHOOSE US
                </span>
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Why Choose StoreHub?
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're committed to providing you with the best shopping experience through innovation, quality, and exceptional service
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="group text-center p-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl border border-gray-200/60 dark:border-gray-700/60 hover:shadow-2xl transform hover:-translate-y-6 transition-all duration-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Truck className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Lightning Fast Delivery</h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  Free same-day delivery on orders over $50. Track your package in real-time with our advanced logistics system.
                </p>
              </div>
            </div>
            
            <div className="group text-center p-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl border border-gray-200/60 dark:border-gray-700/60 hover:shadow-2xl transform hover:-translate-y-6 transition-all duration-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Premium Quality Guarantee</h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  Every product undergoes rigorous quality testing. 30-day money-back guarantee if you're not completely satisfied.
                </p>
              </div>
            </div>
            
            <div className="group text-center p-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl border border-gray-200/60 dark:border-gray-700/60 hover:shadow-2xl transform hover:-translate-y-6 transition-all duration-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Headphones className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Expert Support 24/7</h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  Our dedicated support team is available around the clock. Get instant help via chat, phone, or email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Ready to Transform Your Experience?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've discovered the perfect blend of quality, style, and innovation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleStartShopping}
              className="group px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500"
            >
              <span className="flex items-center justify-center space-x-3">
                <span>Start Shopping Now</span>
                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;