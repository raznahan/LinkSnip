import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { createShortLink, clearUrlState, fetchUserUrls } from '../redux/urlSlice';

const LinkShortener: React.FC = () => {
  const [longUrl, setLongUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [showCustomSlug, setShowCustomSlug] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { shortUrl, isLoading, error } = useAppSelector((state) => state.url);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Clear the form when user logs in or out
  useEffect(() => {
    setLongUrl('');
    setCustomSlug('');
    setShowCustomSlug(false);
    setValidationError(null);
    dispatch(clearUrlState());
  }, [isAuthenticated, dispatch]);

  // Validate URL format
  const isValidUrl = (url: string): boolean => {
    try {
      // Check if it's a valid URL format
      const urlObj = new URL(url);
      // Make sure it has http or https protocol
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch (e) {
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setLongUrl(url);
    
    // Clear validation error when input is empty or changed
    if (validationError) {
      setValidationError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate URL before submitting
    if (!longUrl.trim()) {
      setValidationError('Please enter a URL');
      return;
    }
    
    if (!isValidUrl(longUrl)) {
      setValidationError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }
    
    // Clear validation error
    setValidationError(null);
    
    // Proceed with shortening
    await dispatch(createShortLink({ longUrl, customSlug: customSlug.trim() || undefined }));
    
    // If authenticated, refresh the user's URLs list
    if (isAuthenticated) {
      setTimeout(() => {
        dispatch(fetchUserUrls());
      }, 500);
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
    setValidationError(null);
    dispatch(clearUrlState());
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white">Shorten a long link</h2>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
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
              id="longUrl"
              type="text"
              value={longUrl}
              onChange={handleUrlChange}
              placeholder="https://example.com/very/long/url/that/needs/shortening"
              className={`block w-full pl-10 pr-3 py-3 border ${validationError ? 'border-red-500' : 'border-slate-600'} rounded-lg bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 ${validationError ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-transparent`}
              required
            />
          </div>
          {validationError && (
            <p className="mt-2 text-sm text-red-400">
              {validationError}
            </p>
          )}
        </div>
        
        <div className="flex items-center">
          <input
            id="customSlug"
            type="checkbox"
            checked={showCustomSlug}
            onChange={() => setShowCustomSlug(!showCustomSlug)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-600 rounded bg-slate-800"
          />
          <label htmlFor="customSlug" className="ml-2 block text-sm text-slate-300">
            Use custom back-half (optional)
          </label>
        </div>
        
        {showCustomSlug && (
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-slate-300 mb-2">
              Custom back-half
            </label>
            <div className="relative">
              <input
                id="slug"
                type="text"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                placeholder="my-custom-url"
                className="block w-full px-4 py-3 border border-slate-600 rounded-lg bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Only letters, numbers, hyphens, and underscores are allowed.
            </p>
          </div>
        )}
        
        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={isLoading || !longUrl.trim()}
            className="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Shortening...
              </span>
            ) : (
              <span>Shorten URL</span>
            )}
          </button>
          
          {(longUrl || customSlug || shortUrl) && (
            <button
              type="button"
              onClick={handleReset}
              className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              Reset
            </button>
          )}
        </div>
      </form>
      
      {shortUrl && (
        <div className="mt-8 p-4 border border-blue-500/30 bg-blue-500/10 rounded-lg">
          <h3 className="text-lg font-medium text-blue-400 mb-3">Your shortened URL</h3>
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-grow px-4 py-3 border border-slate-600 rounded-l-lg bg-slate-800 text-blue-300 font-medium"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-3 rounded-r-lg border border-l-0 border-slate-600 ${
                copySuccess ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
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
          <p className="mt-2 text-sm text-slate-400">
            Share this link with others, and it will redirect them to your original URL.
          </p>
        </div>
      )}
    </div>
  );
};

export default LinkShortener; 