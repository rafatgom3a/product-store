import React from 'react';

const AboutUs = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 px-6 py-16">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 dark:text-blue-400">
          About Us
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
          Welcome to <span className="font-semibold text-indigo-600 dark:text-indigo-400">Product Store</span> – your go-to destination for high-quality products and exceptional customer service.
          We aim to make your shopping experience simple, secure, and enjoyable.
        </p>

        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
          Since our founding in <strong>2024</strong>, we’ve been driven by a passion for quality and innovation.
          Whether you're searching for daily essentials or exclusive finds, we work hard to bring the best right to your doorstep.
        </p>

        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
          Thank you for trusting us. Your satisfaction is our top priority. We're always growing, improving, and striving to exceed your expectations.
        </p>

        <div className="mt-10">
          <a
            href="/contact"
            className="inline-block px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full font-medium transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
