
import React, { useState, useEffect, useRef } from 'react';

interface PlayerBarProps {
  isDarkMode: boolean;
  isRedMode: boolean;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const PlayerBar: React.FC<PlayerBarProps> = ({ isDarkMode, isRedMode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(300); // Default to 5:00
  const playerRef = useRef<any>(null);
  const videoId = '4WiXNOUaMzQ'; // M83 - Midnight City

  // Initialize YouTube Player
  useEffect(() => {
    // Load the IFrame Player API code asynchronously.
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player-hidden', {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: {
          'playsinline': 1,
          'controls': 0,
          'disablekb': 1,
          'modestbranding': 1,
          'rel': 0,
          'showinfo': 0,
          'origin': window.location.origin
        },
        events: {
          onReady: (event: any) => {
            setDuration(event.target.getDuration());
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else {
              setIsPlaying(false);
            }
          }
        }
      });
    };

    // If API is already loaded (from a previous session or hot-reload)
    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady();
    }
  }, []);

  // Sync UI timer with actual YouTube player time
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isPlaying && playerRef.current) {
      interval = setInterval(() => {
        if (playerRef.current && playerRef.current.getCurrentTime) {
          const time = playerRef.current.getCurrentTime();
          setCurrentTime(time);
          
          const d = playerRef.current.getDuration();
          if (d > 0 && d !== duration) setDuration(d);
        }
      }, 500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, duration]);

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / duration) * 100;

  const getThemeClasses = () => {
    if (isRedMode) return "bg-black/60 border-red-900/30 text-red-500 shadow-[0_-10px_30px_rgba(153,27,27,0.2)]";
    if (isDarkMode) return "bg-black/60 border-white/5 text-white/70 shadow-[0_-10px_30px_rgba(0,0,0,0.4)]";
    return "bg-white/60 border-black/5 text-black/60 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]";
  };

  const getProgressClasses = () => {
    if (isRedMode) return "bg-red-600";
    if (isDarkMode) return "bg-white";
    return "bg-black";
  };

  const getIconColor = () => {
    if (isRedMode) return "text-red-500/80 group-hover:text-red-400";
    if (isDarkMode) return "text-white/40 group-hover:text-white/90";
    return "text-black/30 group-hover:text-black/80";
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickedPercent = Math.max(0, Math.min(1, x / rect.width));
    const newTime = clickedPercent * duration;
    playerRef.current.seekTo(newTime, true);
    setCurrentTime(newTime);
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-[60] backdrop-blur-2xl border-t transition-all duration-700 ${getThemeClasses()}`}>
      {/* Hidden YouTube Container */}
      <div id="youtube-player-hidden" className="absolute top-0 left-0 w-0 h-0 pointer-events-none opacity-0"></div>

      <div className="max-w-7xl mx-auto px-6 h-14 md:h-16 flex items-center gap-6 md:gap-10">
        
        {/* Left Side: Play/Pause & Time */}
        <div className="flex items-center space-x-4 md:space-x-6 shrink-0">
          <button 
            onClick={togglePlay}
            className="group flex items-center justify-center p-1 transition-transform hover:scale-110 active:scale-95 outline-none"
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" className={`w-5 h-5 fill-current ${getIconColor()}`}>
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className={`w-5 h-5 fill-current ${getIconColor()}`}>
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] opacity-80 whitespace-nowrap w-24 tabular-nums">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Center: Progress Bar */}
        <div 
          className="flex-grow group relative cursor-pointer py-4"
          onClick={handleScrub}
        >
          <div className={`h-[2px] w-full rounded-full transition-colors duration-500 ${isDarkMode || isRedMode ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
            <div 
              className={`h-full rounded-full relative transition-all duration-300 ease-linear ${getProgressClasses()}`} 
              style={{ width: `${progressPercentage}%` }}
            >
              {/* Subtle Glow on head */}
              <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full blur-[2px] transition-opacity duration-300 ${getProgressClasses()} ${isPlaying ? 'opacity-100' : 'opacity-0'}`} />
            </div>
          </div>
        </div>

        {/* Right Side: Utilities */}
        <div className="flex items-center space-x-4 md:space-x-6 shrink-0">
          <button className="group hidden sm:flex items-center transition-transform hover:scale-110">
            <svg viewBox="0 0 24 24" className={`w-4 h-4 fill-current ${getIconColor()}`}>
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          </button>
          
          <button className="group flex items-center transition-transform hover:scale-110">
            <svg viewBox="0 0 24 24" className={`w-4 h-4 stroke-current fill-none ${getIconColor()}`} strokeWidth="2.5" strokeLinecap="round">
              <path d="M7 2H2v5M17 2h5v5M2 17v5h5M22 17v5h-5" />
            </svg>
          </button>

          <button className="group flex items-center transition-transform hover:rotate-90 duration-500">
            <svg viewBox="0 0 24 24" className={`w-4 h-4 fill-current ${getIconColor()}`}>
              <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.81,11.69,4.81,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
