
import React from 'react';

const Features: React.FC = () => {
  const focusAreas = [
    { title: "Visual Identity", description: "Crafting timeless brands that command attention through restraint." },
    { title: "Digital Design", description: "Creating intuitive interfaces that prioritize user clarity and flow." },
    { title: "Strategic Minimalism", description: "Stripping away the noise to find the core message of your product." }
  ];

  return (
    <section id="work" className="py-32 px-6 bg-zinc-50 dark:bg-[#080808] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {focusAreas.map((area, index) => (
            <div key={index} className="group cursor-default">
              <span className="block text-xs font-bold tracking-widest text-zinc-400 mb-4">0{index + 1}</span>
              <h3 className="text-2xl font-bold mb-4 group-hover:translate-x-2 transition-transform duration-300">{area.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
