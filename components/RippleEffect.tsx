
import React, { useState, useEffect } from 'react';

interface RippleEffectProps {
  isDarkMode: boolean;
  isRedMode: boolean;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const RippleEffect: React.FC<RippleEffectProps> = ({ isDarkMode, isRedMode }) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      // Create a unique ID for each ripple
      const newRipple = {
        id: Date.now() + Math.random(), 
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev, newRipple]);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  const handleAnimationEnd = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  const getRippleStyle = () => {
    if (isRedMode) return 'border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.2)] bg-red-500/5';
    if (isDarkMode) return 'border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.1)] bg-white/5';
    return 'border-zinc-900/20 shadow-[0_0_15px_rgba(0,0,0,0.05)] bg-black/5';
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className={`absolute rounded-full border-[1px] animate-ripple ${getRippleStyle()}`}
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
          }}
          onAnimationEnd={() => handleAnimationEnd(ripple.id)}
        />
      ))}
      <style>{`
        @keyframes ripple {
          0% {
            width: 0px;
            height: 0px;
            opacity: 0.6;
            border-width: 2px;
          }
          100% {
            width: 600px;
            height: 600px;
            opacity: 0;
            border-width: 0px;
          }
        }
        .animate-ripple {
          animation: ripple 1.0s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default RippleEffect;
