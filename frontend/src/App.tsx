import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './redux/store';
import LinkShortener from './components/LinkShortener';
import LinkHistory from './components/LinkHistory';
import Footer from './components/Footer';
import Auth from './components/Auth';
import UserProfile from './components/UserProfile';
import NotFound from './components/NotFound';
import { useAppSelector } from './hooks/useRedux';
import './styles/fixes.css';

// Home page component
const Home: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      {/* Header with navigation */}
      <header className="relative z-10 border-b border-slate-800/80">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              LinkSnip
            </h1>
          </div>
          
          {!isAuthenticated ? (
            <button 
              onClick={() => setShowAuth(!showAuth)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {showAuth ? 'Back to Shortener' : 'Sign In / Sign Up'}
            </button>
          ) : null}
        </div>
        
        {isAuthenticated && <UserProfile />}
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-10 max-w-3xl z-10">
        <div className="text-center mb-8">
          <p className="text-slate-400 text-lg">
            Shorten your links, simplify your sharing
          </p>
        </div>
        
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl shadow-xl border border-slate-800 overflow-hidden">
          <div className="p-6 sm:p-8">
            {showAuth && !isAuthenticated ? (
              <Auth onComplete={() => setShowAuth(false)} />
            ) : (
              <LinkShortener />
            )}
          </div>
          
          <LinkHistory />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Root App component with Redux Provider and Router
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
