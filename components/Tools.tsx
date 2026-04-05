
import React from 'react';
import { motion } from 'framer-motion';
import { TOOLS } from '../constants.tsx';

const Tools: React.FC = () => {
  return (
    <section id="tools" className="py-24 px-6 border-y border-zinc-900 bg-zinc-950/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">Post-Production Stack</h2>
          <p className="text-3xl font-medium">Industry-standard software I master</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {TOOLS.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ 
                y: -5,
                backgroundColor: 'rgba(39, 39, 42, 0.6)' 
              }}
              className="flex flex-col items-center justify-center p-6 bg-zinc-900/40 rounded-3xl border border-zinc-800/50 cursor-default transition-all duration-300"
            >
              <div className="text-violet-400 mb-3 transition-transform duration-300 group-hover:scale-110">
                {tool.icon}
              </div>
              <span className="text-sm font-medium text-zinc-300 tracking-wide">{tool.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
