import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 px-4 bg-slate-900/80 backdrop-blur-sm border-t border-slate-800 mt-auto z-10">
      <div className="container mx-auto max-w-3xl">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <span className="text-sm text-slate-500">
              © {new Date().getFullYear()} LinkSnip. All rights reserved.
            </span>
          </div>
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-sm text-slate-500 hover:text-blue-400 transition-colors"
            >
              Terms
            </a>
            <a 
              href="#" 
              className="text-sm text-slate-500 hover:text-blue-400 transition-colors"
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="text-sm text-slate-500 hover:text-blue-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 