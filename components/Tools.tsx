
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
          <h2 className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">High-Performance Workflow</h2>
          <p className="text-3xl font-medium tracking-tight">Equipped with the best industry tools</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {TOOLS.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ 
                y: -8,
                backgroundColor: 'rgba(39, 39, 42, 0.8)',
                borderColor: 'rgba(139, 92, 246, 0.3)'
              }}
              className="group flex flex-col items-center justify-center p-8 bg-zinc-900/40 rounded-3xl border border-zinc-800/50 cursor-default transition-all duration-300"
            >
              <div className="text-violet-400 mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                {tool.icon}
              </div>
              <span className="text-sm font-bold text-zinc-200 tracking-wide uppercase group-hover:text-white transition-colors">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
