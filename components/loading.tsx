// components/Loading.js

import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      {/* Use a loading spinner component from Tailwind CSS */}
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 border-t-blue-500"></div>

      {/* Optional: Add text to indicate loading */}
      <div className="ml-4 text-xl font-semibold text-gray-700">Loading...</div>
    </div>
  );
};

export default Loading;
