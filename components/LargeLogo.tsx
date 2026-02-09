
import React from 'react';

interface LargeLogoProps {
  isDarkMode: boolean;
  isRedMode: boolean;
  isGeneratingBg?: boolean;
  onOpenCamera?: () => void;
}

const LargeLogo: React.FC<LargeLogoProps> = ({ 
  isDarkMode, 
  isRedMode, 
  isGeneratingBg,
  onOpenCamera
}) => {
  const profileUrl = "https://x.com/KAMI_RAINE";
  const avatarUrl = "https://unavatar.io/twitter/KAMI_RAINE";

  const isFaded = isGeneratingBg;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className={`flex flex-col items-center justify-center leading-none font-logo select-none text-center mt-32 md:mt-40 relative transition-all duration-1000 
        ${isFaded ? 'opacity-30 blur-sm pointer-events-none' : 'opacity-100 scale-100 translate-y-0 pointer-events-auto'}
      `}
    >
      
      {/* Profile & Quote Container */}
      <div className="mb-14 relative flex items-center justify-center">
        
        {/* Profile Image Section */}
        <a 
          href={profileUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`group relative z-10 transition-all duration-1000 ${isRedMode ? 'scale-75 opacity-50 grayscale' : 'scale-100 opacity-100'}`}
        >
          <div className={`absolute -inset-1 rounded-full blur transition-opacity duration-500 ${isRedMode ? 'bg-red-600 opacity-20' : 'bg-black dark:bg-white opacity-0 group-hover:opacity-10'}`}></div>
          <div className={`relative w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-2 transition-[border-color,transform,box-shadow] duration-500 group-hover:scale-105 shadow-2xl ${isRedMode ? 'border-zinc-900 dark:border-white' : 'border-zinc-900 dark:border-white'}`}>
            <img 
              src={avatarUrl} 
              alt="KAMI RAINE Profile" 
              className={`w-full h-full object-cover transition-[filter] duration-700 ${isRedMode ? 'grayscale contrast-125 brightness-75' : (isDarkMode ? 'grayscale contrast-125' : '')}`}
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=KR&background=${isRedMode ? '600' : (isDarkMode ? '000' : 'ddd')}&color=${isRedMode ? '000' : (isDarkMode ? 'fff' : '000')}`;
              }}
            />
          </div>
        </a>

        {/* Quote Bubble - Positioned to the RIGHT of Profile Pic */}
        {!isRedMode && (
          <div className="absolute left-[calc(100%+1.5rem)] md:left-[calc(100%+2.5rem)] top-1/2 -translate-y-1/2 animate-float z-20 hidden md:block">
            <div className={`bg-white dark:bg-black border-2 px-6 py-4 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] border-zinc-900 dark:border-white relative whitespace-nowrap`}>
              <p className={`text-sm md:text-base font-bold tracking-tight italic text-zinc-900 dark:text-white`}>
                "Sell my soul to work, sell my life to art."
              </p>
              
              <div className="absolute -left-[1.15rem] top-1/2 -translate-y-1/2 w-5 h-5 z-10">
                <svg viewBox="0 0 40 40" fill="none" className="w-full h-full overflow-visible">
                  <path 
                    d="M45 5 L5 20 L45 35" 
                    className={`transition-colors duration-500 fill-white dark:fill-black`} 
                  />
                  <path 
                    d="M40 5 L5 20 L40 35" 
                    className={`transition-colors duration-500 stroke-zinc-900 dark:stroke-white`} 
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Quote Bubble */}
        {!isRedMode && (
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 animate-float z-20 md:hidden whitespace-nowrap">
            <div className="bg-white dark:bg-black border-2 px-4 py-2 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-zinc-900 dark:border-white relative">
               <p className="text-xs font-bold tracking-tight italic text-zinc-900 dark:text-white">"Sell my soul to work..."</p>
               <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-5">
                 <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                    <path d="M0 0C5 10 2 30 0 40C10 35 25 15 30 0" className="fill-white dark:fill-black stroke-zinc-900 dark:stroke-white" strokeWidth="2.5" />
                 </svg>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Brand Name Text Container with Scenic Action Buttons */}
      <div className={`relative transition-all duration-1000 ${isRedMode ? 'opacity-20 blur-md pointer-events-none' : 'opacity-90'}`}>
        
        {/* NEW LEFT SIDE: Work / Portfolio Button - Positioned further left (shifted from -320px to -480px) */}
        <div className="absolute left-[-60px] md:left-[-480px] top-[15%] -translate-y-1/2 flex items-center flex-row-reverse group/scenic-work z-0 hidden lg:flex">
          <div className={`h-[1px] w-[80px] md:w-[440px] transition-all duration-1000 origin-right scale-x-100 group-hover/scenic-work:scale-x-110 
            ${isDarkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
          
          <div className="relative flex items-center flex-row-reverse">
            <button 
              onClick={() => scrollToSection('work')}
              className={`relative w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center backdrop-blur-md transition-all duration-500 hover:scale-110 active:scale-95
                ${isDarkMode 
                  ? 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                  : 'bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20 shadow-[0_0_20px_rgba(0,0,0,0.05)]'}`}
            >
              <span className={`absolute inset-0 rounded-full animate-ping opacity-20 ${isDarkMode ? 'bg-white' : 'bg-black'}`}></span>
              <div className={`w-1 h-1 rounded-full transition-all duration-300 opacity-0 group-hover/scenic-work:opacity-40 ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
            </button>

            <span className={`absolute right-[calc(100%+1.25rem)] text-[10px] tracking-[0.4em] uppercase font-bold transition-all duration-500 opacity-40 group-hover/scenic-work:opacity-100 whitespace-nowrap
              ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Work / Portfolio
            </span>
          </div>
        </div>

        {/* LEFT SIDE: About ME Button - Staying at 85% */}
        <div className="absolute left-[-40px] md:left-[-320px] top-[85%] -translate-y-1/2 flex items-center flex-row-reverse group/scenic-left z-0 hidden lg:flex">
          {/* Connecting Line */}
          <div className={`h-[1px] w-[60px] md:w-[280px] transition-all duration-1000 origin-right scale-x-100 group-hover/scenic-left:scale-x-110 
            ${isDarkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
          
          {/* Wrapper for button and hover text */}
          <div className="relative flex items-center flex-row-reverse">
            {/* The Circular Button */}
            <button 
              onClick={() => scrollToSection('about')}
              className={`relative w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center backdrop-blur-md transition-all duration-500 hover:scale-110 active:scale-95
                ${isDarkMode 
                  ? 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                  : 'bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20 shadow-[0_0_20px_rgba(0,0,0,0.05)]'}`}
            >
              <span className={`absolute inset-0 rounded-full animate-ping opacity-20 ${isDarkMode ? 'bg-white' : 'bg-black'}`}></span>
              <div className={`w-1 h-1 rounded-full transition-all duration-300 opacity-0 group-hover/scenic-left:opacity-40 ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
            </button>

            {/* "About ME" text */}
            <span className={`absolute right-[calc(100%+1.25rem)] text-[10px] tracking-[0.4em] uppercase font-bold transition-all duration-500 opacity-40 group-hover/scenic-left:opacity-100 whitespace-nowrap
              ${isDarkMode ? 'text-white' : 'text-black'}`}>
              About ME
            </span>
          </div>
        </div>

        {/* CENTER: Brand Name */}
        <div className="flex flex-col">
          <span 
            className="text-7xl md:text-[11rem] tracking-[0.25em] font-weight-transition relative z-10"
            style={{ 
              fontWeight: isDarkMode ? 100 : 900,
              color: isDarkMode ? '#ffffff' : '#1a1a1a'
            }}
          >
            KAMI
          </span>
          <span 
            className="text-7xl md:text-[11rem] tracking-[0.25em] font-weight-transition -mt-4 md:-mt-10 relative z-10"
            style={{ 
              fontWeight: isDarkMode ? 900 : 100,
              color: isDarkMode ? '#888888' : '#4a4a4a'
            }}
          >
            RAINE
          </span>
        </div>

        {/* RIGHT SIDE: Camera Button - MOVED DOWN DRAMATICALLY (260%) */}
        <div className="absolute right-[-40px] md:right-[-320px] top-[260%] -translate-y-1/2 flex items-center group/scenic-right z-0 hidden lg:flex">
          {/* Connecting Line */}
          <div className={`h-[1px] w-[60px] md:w-[280px] transition-all duration-1000 origin-left scale-x-100 group-hover/scenic-right:scale-x-110 
            ${isDarkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
          
          {/* Wrapper for button and hover text */}
          <div className="relative flex items-center">
            {/* The Circular Button */}
            <button 
              onClick={onOpenCamera}
              className={`relative w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center backdrop-blur-md transition-all duration-500 hover:scale-110 active:scale-95
                ${isDarkMode 
                  ? 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                  : 'bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20 shadow-[0_0_20px_rgba(0,0,0,0.05)]'}`}
            >
              {/* Ping animation */}
              <span className={`absolute inset-0 rounded-full animate-ping opacity-20 ${isDarkMode ? 'bg-white' : 'bg-black'}`}></span>
              
              {/* Minimal Inner Dot */}
              <div className={`w-1 h-1 rounded-full transition-all duration-300 opacity-0 group-hover/scenic-right:opacity-40 ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
            </button>

            {/* "camera" text */}
            <span className={`absolute left-[calc(100%+1.25rem)] text-[10px] tracking-[0.4em] uppercase font-bold transition-all duration-500 opacity-0 -translate-x-4 group-hover/scenic-right:opacity-40 group-hover/scenic-right:translate-x-0
              ${isDarkMode ? 'text-white' : 'text-black'}`}>
              camera
            </span>
          </div>
        </div>
      </div>
      
      {/* Horizontal Line Separator (Center) */}
      <div className={`h-[2px] w-24 mt-10 md:mt-16 mb-8 transition-all duration-700 ${isRedMode ? 'bg-red-600 w-48' : (isDarkMode ? 'bg-white' : 'bg-black')}`}></div>

      {/* FIXED Commission Status */}
      <div className="relative flex flex-col items-center mb-12 z-20 pointer-events-auto">
        <span className={`text-[12px] md:text-[14px] tracking-[0.6em] uppercase font-black mb-6 transition-colors duration-500 ${isRedMode ? 'text-red-500' : 'text-zinc-400 dark:text-zinc-500'}`}>
          Commission Status
        </span>
        <div 
          className="flex items-center space-x-10 transition-all duration-300 cursor-default"
        >
          <div className="flex items-center space-x-8 md:space-x-12">
            {/* OPEN: Bold and Active */}
            <span className={`text-4xl md:text-6xl tracking-[0.1em] font-black transition-all duration-500 ${
              isRedMode ? 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'text-zinc-900 dark:text-white'
            }`}>
              OPEN
            </span>
            <div className={`w-[2px] h-12 md:h-16 transition-colors duration-500 ${isRedMode ? 'bg-red-600' : 'bg-zinc-200 dark:bg-zinc-800'}`}></div>
            {/* CLOSE: Faded and Blurred */}
            <span className={`text-4xl md:text-6xl tracking-[0.1em] font-black transition-all duration-500 opacity-20 grayscale blur-[1px]`}>
              CLOSE
            </span>
          </div>
        </div>

        {/* QUEUE BUTTON - Styled like Scenic Buttons */}
        <div className="absolute left-[calc(100%+2rem)] top-[70%] -translate-y-1/2 flex items-center group/queue hidden md:flex">
          {/* Connecting Line */}
          <div className={`h-[1px] w-[30px] md:w-[60px] transition-all duration-1000 origin-left scale-x-100 group-hover/queue:scale-x-110 
            ${isRedMode ? 'bg-red-500/30' : (isDarkMode ? 'bg-white/20' : 'bg-black/10')}`}></div>
          
          {/* Wrapper for button and hover text */}
          <div className="relative flex items-center">
            <a 
              href="https://trello.com/b/your-queue-link" 
              target="_blank"
              rel="noopener noreferrer"
              className={`relative w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center backdrop-blur-md transition-all duration-500 hover:scale-110 active:scale-95
                ${isRedMode 
                  ? 'bg-red-900/10 border-red-500/30 hover:bg-red-900/30 hover:border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                  : (isDarkMode 
                      ? 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                      : 'bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20 shadow-[0_0_20px_rgba(0,0,0,0.05)]')}`}
            >
              <span className={`absolute inset-0 rounded-full animate-ping opacity-20 ${isRedMode ? 'bg-red-500' : (isDarkMode ? 'bg-white' : 'bg-black')}`}></span>
              <div className={`w-1 h-1 rounded-full transition-all duration-300 opacity-0 group-hover/queue:opacity-40 ${isRedMode ? 'bg-red-500' : (isDarkMode ? 'bg-white' : 'bg-black')}`}></div>
            </a>

            <span className={`absolute left-[calc(100%+1.25rem)] text-[10px] tracking-[0.4em] uppercase font-bold transition-all duration-500 opacity-40 group-hover/queue:opacity-100 whitespace-nowrap
              ${isRedMode ? 'text-red-500' : (isDarkMode ? 'text-white' : 'text-black')}`}>
              Queue
            </span>
          </div>
        </div>
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
