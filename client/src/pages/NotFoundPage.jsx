import React from "react";
import { Link } from "react-router-dom"; // Add this import

const NotFoundPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-light mt-2 text-gray-600">
          Oops Page Not Found.
        </h2>
        <p className="mt-4 text-gray-500">
          We're sorry, but the page you were looking for does not exist.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-block px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
