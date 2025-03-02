import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { register, login, clearError } from '../redux/authSlice';

interface AuthProps {
  onComplete?: () => void;
}

const Auth: React.FC<AuthProps> = ({ onComplete }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  // Inline styles to force narrow width
  const inputStyle = {
    width: '220px !important',
    maxWidth: '220px !important'
  };
  
  // Button container style with explicit margin
  const buttonContainerStyle = {
    marginTop: '40px !important'
  };

  useEffect(() => {
    if (isAuthenticated && onComplete) {
      onComplete();
    }
  }, [isAuthenticated, onComplete]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      dispatch(login({ email, password }));
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    dispatch(clearError());
  };

  if (isAuthenticated) {
    return (
      <div className="p-6 text-center">
        <p className="text-green-400 mb-4">You are logged in!</p>
        <p className="text-slate-400">You can now create and manage your shortened URLs.</p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8">
      <h2 className="text-2xl font-bold mb-8 text-white text-center">
        {isLogin ? 'Login to your account' : 'Create an account'}
      </h2>
      
      {error && (
        <div style={{ maxWidth: '220px' }} className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded mb-6 mx-auto">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{ maxWidth: '220px' }} className="space-y-5 mx-auto">
        {!isLogin && (
          <div className="flex flex-col">
            <label htmlFor="name" className="text-base font-medium text-slate-300 mb-1.5">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
              className="px-2 py-1.5 rounded-md border border-slate-600 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        )}
        
        <div className="flex flex-col">
          <label htmlFor="email" className="text-base font-medium text-slate-300 mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            className="px-2 py-1.5 rounded-md border border-slate-600 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="password" className="text-base font-medium text-slate-300 mb-1.5">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            className="px-2 py-1.5 rounded-md border border-slate-600 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div style={buttonContainerStyle}>
          <button
            type="submit"
            disabled={isLoading}
            style={inputStyle}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 px-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isLogin ? 'Logging in...' : 'Registering...'}
              </span>
            ) : (
              <span>{isLogin ? 'Login' : 'Register'}</span>
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <button
          onClick={toggleForm}
          className="text-blue-400 hover:text-blue-300 text-sm font-medium focus:outline-none"
        >
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default Auth; 