import React from 'react';

const Contact = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 px-4 py-12">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-10 transition duration-300 ease-in-out">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 dark:text-blue-400 mb-3">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg mb-8">
          We'd love to hear from you. Let us know how we can help.
        </p>

        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="mt-2 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="mt-2 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Write your message..."
              className="mt-2 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-sm transition duration-200"
          >
            Send Message
          </button>
        </form>

        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-6 text-sm text-center text-gray-500 dark:text-gray-400">
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:support@storehub.com" className="text-blue-600 dark:text-blue-400 hover:underline">
              support@storehub.com
            </a>
          </p>
          <p><strong>Phone:</strong> +20 123 456 7890</p>
          <p><strong>Address:</strong> 123 Main St, Cairo, Egypt</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
