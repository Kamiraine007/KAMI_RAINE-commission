
import React from 'react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
  toggleRedMode: () => void;
  isRedMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDarkMode, toggleRedMode, isRedMode }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        {/* Logo Section with Red Moon Button moved to the front */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleRedMode}
            className={`group relative p-2 rounded-full transition-all duration-500 ${isRedMode ? 'bg-red-500/10' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            title="Blood Moon Mode"
          >
            <svg 
              className={`w-5 h-5 transition-all duration-500 transform ${isRedMode ? 'text-red-600 scale-110 drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]' : 'text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200'}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            {isRedMode && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
            )}
          </button>
          
          <Logo isDarkMode={isDarkMode} />
        </div>

        {/* Navigation and Theme Toggle Section */}
        <div className="flex items-center space-x-8">
          <div className="hidden md:flex items-center space-x-10 text-[11px] font-bold tracking-[0.25em] uppercase text-zinc-900 dark:text-zinc-100">
            <a href="#work" className="hover:opacity-50 transition-opacity">Work</a>
            <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
          </div>
          
          <div className="flex items-center">
            <ThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
