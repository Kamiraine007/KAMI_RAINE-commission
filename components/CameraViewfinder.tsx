import React, { useState, useEffect } from 'react';

interface CameraViewfinderProps {
  onClose: () => void;
  isDarkMode: boolean;
  isRedMode: boolean;
}

const CameraViewfinder: React.FC<CameraViewfinderProps> = ({
  onClose,
  isDarkMode,
  isRedMode
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getTransform = (intensity: number) => ({
    transform: `translate(${mousePos.x * intensity}px, ${mousePos.y * intensity}px)`,
    transition: 'transform 0.1s ease-out'
  });

  const colorClass = isRedMode
    ? 'text-red-500 border-red-500'
    : isDarkMode
    ? 'text-white border-white'
    : 'text-black border-black';

  const lineColor = isRedMode
    ? 'bg-red-500'
    : isDarkMode
    ? 'bg-white'
    : 'bg-black';

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-[4px] overflow-hidden">

      <div className="relative w-full h-full p-8 md:p-16 flex flex-col justify-between select-none">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 md:top-12 md:right-12 z-[110] p-4 group active:scale-90"
        >
          <div className="w-8 h-8 relative">
            <span className={`absolute w-full h-[1.5px] rotate-45 ${lineColor}`} />
            <span className={`absolute w-full h-[1.5px] -rotate-45 ${lineColor}`} />
          </div>
          <span
            className={`absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.3em] font-bold uppercase opacity-0 group-hover:opacity-60 ${isRedMode ? 'text-red-500' : isDarkMode ? 'text-white' : 'text-black'}`}
          >
            EXIT
          </span>
        </button>

        {/* TOP HUD */}
        <div className="flex justify-between opacity-60" style={getTransform(12)}>
          <span className="text-xs tracking-widest font-bold">ISO 100</span>
          <span className="text-xs tracking-widest font-bold">F3.5</span>
        </div>

        {/* ================= CENTER LOCK ================= */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

          {/* ================= PARALLAX LAYER ================= */}
          <div
            className="w-56 h-56 md:w-96 md:h-96 relative"
            style={getTransform(35)}
          >
            {/* Corner brackets */}
            <div className={`absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 opacity-30 ${colorClass}`} />
            <div className={`absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 opacity-30 ${colorClass}`} />
            <div className={`absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 opacity-30 ${colorClass}`} />
            <div className={`absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 opacity-30 ${colorClass}`} />

            {/* Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-full h-[0.5px] opacity-20 ${lineColor}`} />
              <div className={`absolute h-full w-[0.5px] opacity-20 ${lineColor}`} />

              <div className={`absolute w-12 h-[1px] opacity-60 ${lineColor}`} />
              <div className={`absolute h-12 w-[1px] opacity-60 ${lineColor}`} />

              <div className={`w-1.5 h-1.5 rounded-full ${lineColor}`} />
            </div>

            {/* Focus marks */}
            <div className={`absolute top-1/2 left-0 w-2 h-[1px] opacity-30 ${lineColor}`} />
            <div className={`absolute top-1/2 right-0 w-2 h-[1px] opacity-30 ${lineColor}`} />
            <div className={`absolute top-0 left-1/2 h-2 w-[1px] opacity-30 ${lineColor}`} />
            <div className={`absolute bottom-0 left-1/2 h-2 w-[1px] opacity-30 ${lineColor}`} />
          </div>
        </div>

        {/* BOTTOM HUD */}
        <div className="flex justify-between opacity-60" style={getTransform(16)}>
          <span className="text-xs tracking-widest font-bold">AF-S</span>
          <span className="text-xs tracking-widest font-bold">EXPOSURE</span>
        </div>

      </div>
    </div>
  );
};

export default CameraViewfinder;
