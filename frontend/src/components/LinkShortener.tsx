import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { createShortLink, clearUrlState } from '../redux/urlSlice';

const LinkShortener: React.FC = () => {
  const [longUrl, setLongUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [showCustomSlug, setShowCustomSlug] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const dispatch = useAppDispatch();
  const { shortUrl, isLoading, error } = useAppSelector((state) => state.url);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (longUrl.trim()) {
      dispatch(createShortLink({ longUrl, customSlug: customSlug.trim() || undefined }));
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleReset = () => {
    setLongUrl('');
    setCustomSlug('');
    setShowCustomSlug(false);
    dispatch(clearUrlState());
  };

  return (
    <div className="p-6 sm:p-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Shorten a long link</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        <div>
          <label htmlFor="longUrl" className="block text-sm font-medium text-slate-300 mb-2">
            Paste your long link here
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="url"
              id="longUrl"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://example.com/my-long-url"
              className="w-full pl-10 pr-10 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
              required
            />
            {longUrl && (
              <button
                type="button"
                onClick={() => setLongUrl('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                aria-label="Clear input"
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="customSlugToggle"
            checked={showCustomSlug}
            onChange={() => setShowCustomSlug(!showCustomSlug)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-600 rounded bg-slate-800"
          />
          <label htmlFor="customSlugToggle" className="ml-2 block text-sm text-slate-300">
            Customize your link
          </label>
        </div>
        
        {showCustomSlug && (
          <div className="pl-6 border-l-2 border-slate-700">
            <label htmlFor="customSlug" className="block text-sm font-medium text-slate-300 mb-2">
              Custom back-half
            </label>
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-slate-800 px-3 py-2 rounded-l-lg border border-r-0 border-slate-700 text-slate-400">
                linksnip.com/
              </div>
              <div className="relative flex-grow">
                <input
                  type="text"
                  id="customSlug"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
                  placeholder="my-brand"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                />
                {customSlug && (
                  <button
                    type="button"
                    onClick={() => setCustomSlug('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                    aria-label="Clear custom slug"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div>
          <button
            type="submit"
            disabled={isLoading || !longUrl.trim()}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-base font-medium text-white transition-all duration-200 ${
              isLoading 
                ? 'bg-blue-700 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            } ${!longUrl.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Shortening...
              </span>
            ) : (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                </svg>
                Get your link for free
              </span>
            )}
          </button>
        </div>
      </form>
      
      {error && (
        <div className="mt-6 p-4 bg-red-900/30 border border-red-800 text-red-200 rounded-lg text-sm max-w-2xl mx-auto">
          <div className="flex items-start">
            <svg className="w-4 h-4 mr-2 flex-shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <p className="font-medium mb-1">Error shortening URL</p>
              <p>{error.includes('Server error') 
                ? 'The server is currently unavailable. Please try again later or check your connection.' 
                : error}
              </p>
              {error.includes('Server error') && (
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-2 text-blue-400 hover:text-blue-300 transition-colors text-sm inline-flex items-center"
                >
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Refresh page
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      {shortUrl && (
        <div className="mt-8 p-6 bg-slate-800 border border-slate-700 rounded-lg max-w-2xl mx-auto">
          <h3 className="text-lg font-medium text-white mb-4">Your shortened URL:</h3>
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-grow px-4 py-3 border border-slate-700 rounded-l-lg bg-slate-800 text-blue-300 font-medium"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-3 rounded-r-lg border border-l-0 border-slate-700 ${
                copySuccess 
                  ? 'bg-green-600 text-white' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } transition-colors`}
            >
              {copySuccess ? (
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Copied!
                </span>
              ) : (
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"></path>
                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                  </svg>
                  Copy
                </span>
              )}
            </button>
          </div>
          <button
            onClick={handleReset}
            className="mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Shorten another URL
          </button>
        </div>
      )}
    </div>
  );
};

export default LinkShortener; 