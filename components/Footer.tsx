
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.4em] uppercase text-zinc-300 dark:text-zinc-600 font-bold">
        <p>© 2024 KAMI RAINE</p>
        <div className="mt-4 md:mt-0 flex space-x-12">
          <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Digital Identity</a>
        </div>
        <p className="mt-4 md:mt-0">ESTABLISHED IN SILENCE</p>
      </div>
    </footer>
  );
};

export default Footer;
