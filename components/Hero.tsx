
import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-violet-400 font-medium tracking-widest uppercase text-sm mb-6"
        >
          Professional Video Editor & Content Creator
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight mb-8 leading-none"
        >
          Atif Mustafa<br />
          <span className="text-zinc-500 text-5xl md:text-7xl block mt-4 font-medium italic">Visual Storyteller</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed"
        >
          Transforming raw footage into high-impact narratives. Expert in cinematic editing, dynamic transitions, and immersive sound design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={() => scrollToSection('work')}
            className="px-8 py-4 bg-zinc-100 text-zinc-950 font-bold rounded-full hover:bg-white transition-all transform hover:scale-105 active:scale-95 duration-200"
          >
            View My Portfolio
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="px-8 py-4 bg-zinc-900 border border-zinc-800 text-zinc-100 font-bold rounded-full hover:bg-zinc-800 transition-all duration-200"
          >
            Work with Me
          </button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection('tools')}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-zinc-700 to-transparent flex items-center justify-center overflow-hidden">
          <motion.div 
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-1/2 bg-zinc-400"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
