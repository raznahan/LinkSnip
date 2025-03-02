import React, { useState } from 'react';
import { useAppSelector } from '../hooks/useRedux';

const LinkHistory: React.FC = () => {
  const { history } = useAppSelector((state) => state.url);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (history.length === 0) {
    return null;
  }

  const handleCopy = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="border-t border-slate-700 p-6 sm:p-8 bg-slate-900/30">
      <h2 className="text-xl font-bold mb-5 text-white">Your Recent Links</h2>
      
      <div className="space-y-4 max-w-2xl mx-auto">
        {history.map((item, index) => (
          <div 
            key={index} 
            className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:bg-slate-800/90 transition-all"
          >
            <div className="text-sm text-slate-500 truncate mb-3" title={item.longUrl}>
              <span className="text-xs text-slate-600 mr-1">Original:</span> {item.longUrl}
            </div>
            <div className="flex items-center">
              <input
                type="text"
                readOnly
                value={item.shortUrl}
                className="flex-grow px-3 py-2 border border-slate-700 rounded-l-lg bg-slate-800 text-blue-300 text-sm font-medium"
              />
              <button
                onClick={() => handleCopy(item.shortUrl, index)}
                className={`px-3 py-2 rounded-r-lg border border-l-0 border-slate-700 text-sm ${
                  copiedIndex === index 
                    ? 'bg-green-600 text-white' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } transition-colors`}
              >
                {copiedIndex === index ? (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Copied!
                  </span>
                ) : (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"></path>
                      <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                    </svg>
                    Copy
                  </span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkHistory; 