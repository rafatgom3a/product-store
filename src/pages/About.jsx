import React from 'react';

const AboutUs = () => {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          About Us
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          Welcome to our Product Store! We’re committed to offering quality products at competitive prices.
          Our goal is to provide you with a smooth, enjoyable, and trustworthy shopping experience.
        </p>
        <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg">
          Since our founding in 2024, we’ve been working hard to bring you the best. Thanks for choosing us!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
