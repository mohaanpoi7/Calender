import React from 'react';

// About component
function About() {
  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-5">
      {/* Container for the About page */}
      <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6 max-w-md w-full">
        {/* Title of the About page */}
        <h2 className="text-2xl font-bold text-center mb-6">About</h2>
        {/* Description or content of the About page */}
        <p className="text-center">This is the About Page</p>
      </div>
    </div>
  );
}

export default About;
