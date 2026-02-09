
import React, { useMemo } from 'react';

interface FallingEffectProps {
  isDarkMode: boolean;
  isRedMode: boolean;
}

const FallingEffect: React.FC<FallingEffectProps> = ({ isDarkMode, isRedMode }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * -25}s`,
      duration: `${25 + Math.random() * 25}s`,
      width: `${25 + Math.random() * 35}px`,
      height: `${35 + Math.random() * 45}px`,
      opacity: 0.02 + Math.random() * 0.06,
      rotate: `${Math.random() * 360}deg`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-fall transition-colors duration-[1200ms] ease-premium"
          style={{
            left: p.left,
            top: '-100px',
            width: p.width,
            height: p.height,
            backgroundColor: isRedMode ? '#991b1b' : (isDarkMode ? '#ffffff' : '#000000'),
            opacity: isRedMode ? p.opacity * 2 : p.opacity,
            transform: `rotate(${p.rotate})`,
            animation: `fall ${p.duration} linear infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-100px) rotate(0deg) translateX(0px);
            opacity: 0;
          }
          10% { opacity: var(--opacity); }
          90% { opacity: var(--opacity); }
          100% {
            transform: translateY(110vh) rotate(360deg) translateX(-20px);
            opacity: 0;
          }
        }
        .animate-fall {
          --opacity: inherit;
        }
      `}</style>
    </div>
  );
};

export default FallingEffect;
