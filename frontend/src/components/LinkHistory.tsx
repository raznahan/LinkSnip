import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { fetchUserUrls, UrlItem } from '../redux/urlSlice';

const LinkHistory: React.FC = () => {
  const { history, userUrls, isLoading, error } = useAppSelector((state) => state.url);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(fetchUserUrls());
    }
  }, [isAuthenticated, user, dispatch]);

  const handleCopy = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // If authenticated, show user's URLs from the database
  // Otherwise, show URLs from the local history
  const urlsToDisplay = isAuthenticated ? userUrls : history;

  if (urlsToDisplay.length === 0 && !isLoading) {
    if (isAuthenticated && error) {
      return (
        <div className="border-t border-slate-700 p-6 sm:p-8 bg-slate-900/30">
          <div className="text-red-400 text-center p-4">
            {error}
          </div>
        </div>
      );
    }
    
    return (
      <div className="border-t border-slate-700 p-6 sm:p-8 bg-slate-900/30">
        <div className="text-center text-slate-500 py-6">
          {isAuthenticated 
            ? "You haven't created any shortened links yet." 
            : "Your shortened links will appear here."}
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-slate-700 p-6 sm:p-8 bg-slate-900/30">
      <h2 className="text-xl font-bold mb-5 text-white">
        {isAuthenticated ? 'Your Saved Links' : 'Your Recent Links'}
      </h2>
      
      {isLoading ? (
        <div className="flex justify-center p-6">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        <div className="space-y-4 max-w-2xl mx-auto">
          {urlsToDisplay.map((item, index) => (
            <div 
              key={item._id || index} 
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
              {isAuthenticated && item.createdAt && (
                <div className="mt-2 text-xs text-slate-500">
                  Created: {new Date(item.createdAt).toLocaleString()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkHistory; 