import React from 'react';

const Contact = () => {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-6">
      <div className="max-w-xl w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          Contact Us
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
          Got a question or feedback? We'd love to hear from you!
        </p>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <textarea
              placeholder="Your Message"
              className="w-full px-4 py-2 h-32 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
