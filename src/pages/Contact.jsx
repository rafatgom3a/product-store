import React from 'react';

const Contact = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-6">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-900 shadow-md rounded-xl p-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          We'd love to hear from you! Whether you have a question, suggestion, or just want to say hello.
        </p>

        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="mt-1 w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="mt-1 w-full px-4 py-2 border rounded-md h-32 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md font-medium transition duration-200"
          >
            Send Message
          </button>
        </form>

        {/* Optional: Add Contact Info */}
        <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Email: <a href="mailto:support@productstore.com" className="text-blue-600 hover:underline">support@productstore.com</a></p>
          <p>Phone: +20 123 456 7890</p>
          <p>Address: 123 Main St, Cairo, Egypt</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
