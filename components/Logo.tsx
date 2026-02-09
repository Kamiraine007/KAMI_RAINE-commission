
import React from 'react';

interface LogoProps {
  isDarkMode: boolean;
}

const Logo: React.FC<LogoProps> = ({ isDarkMode }) => {
  return (
    <div className="flex items-center space-x-3 group cursor-default">
      <div className="flex flex-col leading-[0.9] font-logo select-none">
        <span 
          className="text-lg tracking-[0.2em] font-weight-transition"
          style={{ 
            fontWeight: isDarkMode ? 200 : 700,
            color: isDarkMode ? '#ffffff' : '#1a1a1a'
          }}
        >
          KAMI
        </span>
        <span 
          className="text-lg tracking-[0.2em] font-weight-transition"
          style={{ 
            fontWeight: isDarkMode ? 700 : 200,
            color: isDarkMode ? '#ffffff' : '#666666'
          }}
        >
          RAINE
        </span>
      </div>
      <div className={`h-6 w-[1px] transition-colors duration-500 ${isDarkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
      <span className={`text-[8px] tracking-[0.3em] uppercase font-bold transition-colors duration-500 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
        Commission
      </span>
    </div>
  );
};

export default Logo;
