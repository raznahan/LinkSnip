import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import LinkShortener from './components/LinkShortener';
import LinkHistory from './components/LinkHistory';
import Footer from './components/Footer';
import './styles/fixes.css';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-slate-950 text-white flex flex-col overflow-hidden relative">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <main className="flex-grow container mx-auto px-4 py-8 sm:py-12 max-w-3xl z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              LinkSnip
            </h1>
            <p className="text-slate-400 text-lg">
              Shorten your links, simplify your sharing
            </p>
          </div>
          
          <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl shadow-xl border border-slate-800 overflow-hidden">
            <div className="p-6 sm:p-8">
              <LinkShortener />
            </div>
            <LinkHistory />
          </div>
        </main>
        
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
