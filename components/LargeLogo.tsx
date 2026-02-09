
import React from 'react';

interface LargeLogoProps {
  isDarkMode: boolean;
  isRedMode: boolean;
  isGeneratingBg?: boolean;
  isCommissionOpen?: boolean;
  onToggleCommission?: () => void;
}

const LargeLogo: React.FC<LargeLogoProps> = ({ 
  isDarkMode, 
  isRedMode, 
  isGeneratingBg,
  isCommissionOpen = true,
  onToggleCommission
}) => {
  const profileUrl = "https://x.com/KAMI_RAINE";
  const avatarUrl = "https://unavatar.io/twitter/KAMI_RAINE";

  // Combine states for visibility. 
  // If isRedMode is true, we hide the UI logo to show the cinematic background clearly.
  const isHidden = isRedMode;
  const isFaded = isGeneratingBg && !isHidden;

  return (
    <div 
      className={`flex flex-col items-center justify-center leading-none font-logo select-none text-center mt-32 md:mt-40 relative transition-[opacity,transform] duration-1000 
        ${isHidden ? 'opacity-0 scale-95 pointer-events-none translate-y-4' : 'opacity-100 scale-100 translate-y-0'}
        ${isFaded ? 'opacity-30 blur-sm' : ''}
      `}
    >
      {/* Floating Quote Bubble - Restored to original single position */}
      <div className="relative w-full flex justify-center items-center h-0">
        <div className="absolute animate-float md:translate-x-56 translate-x-24 md:-top-32 -top-24 z-20">
          <div className={`bg-white dark:bg-black border-2 px-6 py-4 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] transition-[background-color,border-color,shadow,color] duration-500 ${isRedMode ? 'border-red-600 shadow-[8px_8px_0px_0px_rgba(220,38,38,0.5)]' : 'border-zinc-900 dark:border-white'}`}>
            <p className={`text-sm md:text-base font-bold tracking-tight italic transition-colors duration-500 ${isRedMode ? 'text-red-500' : 'text-zinc-900 dark:text-white'}`}>
              "Sell my soul to work, sell my life to art."
            </p>
          </div>
          {/* Tail for Quote Bubble */}
          <div className="absolute -bottom-5 left-8 w-10 h-8">
            <svg viewBox="0 0 40 40" fill="none" className="w-full h-full drop-shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
              <path 
                d="M0 0C5 10 2 30 0 40C10 35 25 15 30 0" 
                className={`transition-[fill,stroke] duration-500 ${isRedMode ? 'fill-black stroke-red-600' : 'fill-white dark:fill-black stroke-zinc-900 dark:stroke-white'}`} 
                strokeWidth="2.5"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Profile Image Section */}
      <a 
        href={profileUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="mb-14 group relative z-10"
      >
        <div className={`absolute -inset-1 rounded-full blur transition-opacity duration-500 ${isRedMode ? 'bg-red-600 opacity-20 group-hover:opacity-40' : 'bg-black dark:bg-white opacity-0 group-hover:opacity-10'}`}></div>
        <div className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 transition-[border-color,transform,box-shadow] duration-500 group-hover:scale-105 shadow-2xl ${isRedMode ? 'border-red-600 shadow-red-900/40' : 'border-zinc-900 dark:border-white'}`}>
          <img 
            src={avatarUrl} 
            alt="KAMI RAINE Profile" 
            className={`w-full h-full object-cover transition-[filter] duration-700 ${isRedMode ? 'grayscale contrast-125 brightness-75 sepia-[0.3] hue-rotate-[320deg]' : (isDarkMode ? 'grayscale contrast-125' : '')}`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=KR&background=${isRedMode ? '600' : (isDarkMode ? '000' : 'ddd')}&color=${isRedMode ? '000' : (isDarkMode ? 'fff' : '000')}`;
            }}
          />
        </div>
      </a>

      <span 
        className="text-7xl md:text-[11rem] tracking-[0.25em] font-weight-transition opacity-90 relative"
        style={{ 
          fontWeight: isDarkMode || isRedMode ? 100 : 900,
          color: isRedMode ? '#ffffff' : (isDarkMode ? '#ffffff' : '#1a1a1a')
        }}
      >
        KAMI
      </span>
      <span 
        className="text-7xl md:text-[11rem] tracking-[0.25em] font-weight-transition -mt-4 md:-mt-10 relative"
        style={{ 
          fontWeight: isDarkMode || isRedMode ? 900 : 100,
          color: isRedMode ? '#dc2626' : (isDarkMode ? '#888888' : '#4a4a4a')
        }}
      >
        RAINE
      </span>
      
      {/* Horizontal Line Separator */}
      <div className={`h-[2px] w-24 mt-10 md:mt-16 mb-8 transition-colors duration-700 ${isRedMode ? 'bg-red-600' : (isDarkMode ? 'bg-white' : 'bg-black')}`}></div>

      {/* ENLARGED: Commission Status */}
      <div className="flex flex-col items-center mb-12 z-20">
        <span className={`text-[12px] md:text-[14px] tracking-[0.6em] uppercase font-black mb-6 transition-colors duration-500 ${isRedMode ? 'text-red-900/60' : 'text-zinc-400 dark:text-zinc-500'}`}>
          Commission Status
        </span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleCommission?.();
          }}
          className="flex items-center space-x-10 group/status transition-all duration-300 focus:outline-none hover:scale-105"
        >
          <div className="flex items-center space-x-8 md:space-x-12">
            <span className={`text-4xl md:text-6xl tracking-[0.1em] font-black transition-all duration-500 ${
              isCommissionOpen 
                ? (isRedMode ? 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'text-zinc-900 dark:text-white') 
                : 'opacity-5 grayscale blur-[1px]'
            }`}>
              OPEN
            </span>
            <div className={`w-[2px] h-12 md:h-16 transition-colors duration-500 ${isRedMode ? 'bg-red-900/40' : 'bg-zinc-200 dark:bg-zinc-800'}`}></div>
            <span className={`text-4xl md:text-6xl tracking-[0.1em] font-black transition-all duration-500 ${
              !isCommissionOpen 
                ? (isRedMode ? 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'text-zinc-900 dark:text-white') 
                : 'opacity-5 grayscale blur-[1px]'
            }`}>
              CLOSE
            </span>
          </div>
        </button>
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LargeLogo;
