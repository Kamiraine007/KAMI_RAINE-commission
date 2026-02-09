
import React from 'react';

interface ActionButtonsProps {
  isDarkMode: boolean;
  isRedMode: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ isDarkMode, isRedMode }) => {
  const buttons = [
    { 
      label: 'X', 
      href: 'https://x.com/KAMI_RAINE',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    { 
      label: 'YouTube', 
      href: 'https://youtube.com/@KAMI_RAINE',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    },
    { 
      label: 'Discord', 
      href: 'https://discord.com/users/332918951489044480',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.125-.094.249-.192.37-.291a.077.077 0 0 1 .08-.01c3.927 1.793 8.18 1.793 12.061 0a.077.077 0 0 1 .08.01c.12.099.245.197.37.291a.077.077 0 0 1-.006.127 12.29 12.29 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
        </svg>
      )
    }
  ];

  const getButtonStyles = () => {
    if (isRedMode) {
      return "border-red-600 text-red-500 hover:bg-red-600/20 hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] hover:scale-110";
    }
    if (isDarkMode) {
      return "border-white/10 text-white hover:border-white/40 hover:bg-white/5 hover:scale-110";
    }
    return "border-zinc-200 text-zinc-900 hover:bg-zinc-900 hover:text-white hover:scale-110";
  };

  const getLabelStyles = () => {
    if (isRedMode) return "text-red-600/60";
    if (isDarkMode) return "text-zinc-500";
    return "text-zinc-400";
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-12 z-20 relative pointer-events-auto">
      <span className={`text-[10px] tracking-[0.5em] uppercase font-bold transition-colors duration-500 ${getLabelStyles()}`}>
        contact.
      </span>
      <div className="flex items-center justify-center gap-6">
        {buttons.map((btn, idx) => (
          <a
            key={idx}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            title={btn.label}
            className={`
              w-14 h-14 flex items-center justify-center border rounded-full
              transition-all duration-500 ease-premium transform active:scale-90
              ${getButtonStyles()}
            `}
          >
            {btn.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ActionButtons;
