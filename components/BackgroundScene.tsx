
import React from 'react';

interface BackgroundSceneProps {
  isDarkMode: boolean;
  isRedMode: boolean;
  redBgUrl: string | null;
  isGeneratingBg: boolean;
}

const BackgroundScene: React.FC<BackgroundSceneProps> = ({ isDarkMode, isRedMode, redBgUrl, isGeneratingBg }) => {
  // Ray lines configuration - Denser for the sketch look (matching reference image)
  const rayCount = 128;
  const rays = Array.from({ length: rayCount });

  const getOrbClass = () => {
    if (isRedMode) return 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]';
    if (isDarkMode) return 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]';
    return 'bg-zinc-400 shadow-[0_0_5px_rgba(161,161,170,0.3)]';
  };

  const getSubOrbClass = () => {
    if (isRedMode) return 'bg-red-400 shadow-[0_0_5px_rgba(239,68,68,0.8)]';
    if (isDarkMode) return 'bg-zinc-300 shadow-[0_0_4px_rgba(255,255,255,0.4)]';
    return 'bg-zinc-500 shadow-[0_0_3px_rgba(161,161,170,0.3)]';
  };

  const getIconClass = () => {
    if (isRedMode) return 'fill-red-600/40 group-hover:fill-red-500 transition-all duration-300';
    if (isDarkMode) return 'fill-white/10 group-hover:fill-white/60 transition-all duration-300';
    return 'fill-black/5 group-hover:fill-black/60 transition-all duration-300';
  };

  const getBtnBackdrop = () => {
    if (isRedMode) return 'bg-red-900/10 border-red-900/20 group-hover:bg-red-600/20 group-hover:border-red-500/40';
    if (isDarkMode) return 'bg-white/5 border-white/5 group-hover:bg-white/10 group-hover:border-white/20';
    return 'bg-black/5 border-black/5 group-hover:bg-black/10 group-hover:border-black/10';
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Base Layer */}
      <div className={`absolute inset-0 transition-colors duration-[1200ms] ease-premium ${isRedMode ? 'bg-black' : (isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white')}`}></div>

      {/* Atmospheric Red Haze */}
      <div 
        className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out pointer-events-none ${isRedMode ? 'opacity-40' : 'opacity-0'}`}
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(220, 38, 38, 0.2) 0%, rgba(127, 29, 29, 0.08) 50%, transparent 100%)',
          filter: 'blur(100px)'
        }}
      ></div>

      {/* AI Generated Dynamic Background for Red Mode */}
      <div className={`absolute inset-0 transition-opacity duration-1500 ${isRedMode && redBgUrl ? 'opacity-100' : 'opacity-0'}`}>
        {redBgUrl && (
          <>
            <img 
              src={redBgUrl} 
              alt="Celestial Background" 
              className="w-full h-full object-cover scale-100 animate-slow-breath"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-70"></div>
            <div className="absolute inset-0 bg-red-900/10 mix-blend-screen opacity-30"></div>
            <div className="absolute inset-0 bg-black/50"></div>
          </>
        )}
      </div>

      {/* Main Celestial Composition Container */}
      <div className="absolute top-[35vh] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[1200px] md:h-[1200px] flex items-center justify-center z-10">
        
        {/* Radiating Sketch Rays (From the reference image style) */}
        <div className="absolute inset-0 flex items-center justify-center">
          {rays.map((_, i) => {
            let lengthPercent = 15;
            if (i % 8 === 0) lengthPercent = 45;
            else if (i % 4 === 0) lengthPercent = 30;
            else if (i % 2 === 0) lengthPercent = 20;

            return (
              <div
                key={i}
                className={`absolute top-1/2 left-1/2 h-[0.75px] origin-left transition-all duration-1000 ease-out
                  ${isRedMode ? 'bg-red-500/40' : (isDarkMode ? 'bg-white/30' : 'bg-black/10')}`}
                style={{
                  width: `${lengthPercent}%`,
                  transform: `rotate(${i * (360 / rayCount)}deg) translateX(calc(min(24vw, 240px)))`,
                  opacity: 0.1 + Math.random() * 0.2,
                  animation: `shimmer ${6 + Math.random() * 10}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            );
          })}
        </div>

        {/* INTERACTIVE SOCIAL ICONS BEHIND SUN CORE */}
        <div className="absolute inset-0 flex items-center justify-center z-0 animate-spin-extra-slow-rev">
          {/* X Icon (Orbit 1) */}
          <div className="absolute" style={{ transform: 'rotate(0deg) translateY(-320px) rotate(0deg)' }}>
            <a 
              href="https://x.com/KAMI_RAINE" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group pointer-events-auto block relative"
              title="X / Twitter"
            >
              <div className={`absolute inset-[-12px] rounded-full border transition-all duration-500 ${getBtnBackdrop()}`}></div>
              <svg viewBox="0 0 24 24" className={`w-8 h-8 ${getIconClass()} relative z-10 drop-shadow-sm`}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
          {/* Discord Icon (Orbit 2) */}
          <div className="absolute" style={{ transform: 'rotate(120deg) translateY(-320px) rotate(-120deg)' }}>
            <a 
              href="https://discord.com/users/332918951489044480" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group pointer-events-auto block relative"
              title="Discord"
            >
              <div className={`absolute inset-[-12px] rounded-full border transition-all duration-500 ${getBtnBackdrop()}`}></div>
              <svg viewBox="0 0 24 24" className={`w-9 h-9 ${getIconClass()} relative z-10 drop-shadow-sm`}>
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.125-.094.249-.192.37-.291a.077.077 0 0 1 .08-.01c3.927 1.793 8.18 1.793 12.061 0a.077.077 0 0 1 .08.01c.12.099.245.197.37.291a.077.077 0 0 1-.006.127 12.29 12.29 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
              </svg>
            </a>
          </div>
        </div>

        {/* 4-Pointed Concave Star (Sparkle) */}
        <div className="absolute inset-0 flex items-center justify-center z-0 animate-spin-super-slow">
          <svg 
            viewBox="0 0 100 100" 
            className={`w-[85%] h-[85%] transition-all duration-[1500ms]
              ${isRedMode ? 'fill-red-600/20 blur-[2px] scale-110' : (isDarkMode ? 'fill-white/[0.05] blur-[1px]' : 'fill-black/[0.03]')}`}
          >
            <path d="M50 0 C53 40 60 47 100 50 C60 53 53 60 50 100 C47 60 40 53 0 50 C40 47 47 40 50 0 Z" />
          </svg>
        </div>

        {/* Orbiting Celestial Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className={`absolute rounded-full border transition-all duration-[1500ms] animate-spin-slow-30
              ${isRedMode ? 'border-red-600/20' : (isDarkMode ? 'border-white/10' : 'border-zinc-300/40')}`}
            style={{ width: '115%', height: '115%' }}
          >
            {/* PLANET SYSTEM - Nested Orbit - ENLARGED */}
            <div className="absolute top-1/2 -right-[120px] -translate-y-1/2 w-[240px] h-[240px] flex items-center justify-center">
              
              {/* The Planet (Center Orb) */}
              <div className={`w-4 h-4 rounded-full transition-all duration-1000 relative z-10 ${getOrbClass()}`} />

              {/* The Moon's Orbit Ring */}
              <div className={`absolute inset-0 rounded-full border animate-spin-medium
                ${isRedMode ? 'border-red-500/20' : (isDarkMode ? 'border-white/10' : 'border-black/10')}`}
              >
                {/* The Moon (Sub Orb) */}
                <div className={`absolute top-1/2 -left-[5px] -translate-y-1/2 w-3 h-3 rounded-full ${getSubOrbClass()}`} />
              </div>
            </div>
          </div>
          
          <div 
            className={`absolute rounded-full border border-dashed transition-all duration-[1500ms] animate-spin-slow-rev-45
              ${isRedMode ? 'border-red-500/30' : (isDarkMode ? 'border-white/10' : 'border-zinc-400/20')}`}
            style={{ width: '135%', height: '135%' }}
          >
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-1000 ${getOrbClass()}`} />
          </div>
        </div>

        {/* Primary Inner Glow */}
        <div className={`absolute inset-0 rounded-full transition-all duration-[1200ms] blur-[80px] scale-50
          ${isRedMode ? 'bg-red-500 opacity-50' : (isDarkMode ? 'bg-white opacity-[0.15]' : 'bg-zinc-300 opacity-60')}`} 
        />

        {/* Main Sun Shape */}
        <div className={`relative w-56 h-56 md:w-[480px] md:h-[480px] rounded-full transition-all duration-[1500ms] animate-breathe flex items-center justify-center border z-10
          ${isRedMode 
            ? 'border-red-500 bg-black shadow-[0_0_180px_rgba(239,68,68,0.7)]' 
            : (isDarkMode 
                ? 'border-white/20 bg-white/5 shadow-[0_0_120px_rgba(255,255,255,0.08)]' 
                : 'border-black/5 bg-white shadow-[0_0_100px_rgba(161,161,170,0.15)]')
          }`}
        >
          <div className={`w-[94%] h-[94%] rounded-full border transition-all duration-[1500ms] 
            ${isRedMode ? 'border-red-900/40' : (isDarkMode ? 'border-white/10' : 'border-black/5')}`} 
          />
        </div>

      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.1; transform: rotate(var(--tw-rotate)) translateX(calc(min(24vw, 240px))) scaleX(1); }
          50% { opacity: 0.5; transform: rotate(var(--tw-rotate)) translateX(calc(min(24vw, 240px))) scaleX(1.1); }
        }
        @keyframes slow-breath {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes spin-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-breathe {
          animation: breathe 15s ease-in-out infinite;
        }
        .animate-slow-breath {
          animation: slow-breath 30s ease-in-out infinite;
        }
        .animate-spin-slow-30 {
          animation: spin-slow 30s linear infinite;
        }
        .animate-spin-slow-rev-45 {
          animation: spin-slow-reverse 45s linear infinite;
        }
        .animate-spin-super-slow {
          animation: spin-slow 120s linear infinite;
        }
        .animate-spin-extra-slow-rev {
          animation: spin-slow-reverse 180s linear infinite;
        }
        .animate-spin-fast {
          animation: spin-fast 4s linear infinite;
        }
        .animate-spin-medium {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BackgroundScene;
