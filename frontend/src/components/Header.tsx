import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg 
              className="h-8 w-8 text-blue-500" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656L13.07 5.272" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <div className="ml-3">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                LinkSnip
              </h1>
            </div>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
            <a href="#resources" className="text-slate-300 hover:text-white transition-colors">Resources</a>
          </div>
          <div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
              Sign Up Free
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 