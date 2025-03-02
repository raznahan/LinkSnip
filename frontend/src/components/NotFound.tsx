import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
      {}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="text-center z-10 max-w-md w-full bg-slate-900/60 backdrop-blur-sm rounded-xl shadow-xl border border-slate-800 p-8">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Page Not Found
        </h2>
        <p className="text-slate-400 mb-6">
          The link you're looking for doesn't exist or has been removed.
        </p>
        <Link 
          to="/" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 