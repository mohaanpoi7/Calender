import React from 'react';

function Search() {
  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-5">
      <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Search</h2>
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
        />
      </div>
    </div>
  );
}

export default Search;