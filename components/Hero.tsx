
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-start">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight max-w-4xl">
            Elevating aesthetics <br />
            <span className="text-zinc-400 dark:text-zinc-600 italic font-light">through simplicity.</span>
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl font-light leading-relaxed">
            KAMI RAINE is a design studio focused on minimalist functionalism and digital craftsmanship. We build experiences that breathe.
          </p>
          <div className="mt-12 flex space-x-6">
            <button className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium tracking-wide hover:scale-105 transition-transform">
              View Projects
            </button>
            <button className="px-8 py-4 border border-zinc-200 dark:border-zinc-800 rounded-full font-medium tracking-wide hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
              Our Ethos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
