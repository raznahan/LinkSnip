import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900/80 border-t border-slate-800/80 py-6 mt-10 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-slate-500 text-sm">
              © {currentYear} LinkSnip. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
              Terms
            </a>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
              Privacy
            </a>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 