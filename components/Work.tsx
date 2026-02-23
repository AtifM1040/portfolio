
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants.tsx';
import { Project } from '../types';
import { Play, X, Loader2 } from 'lucide-react';

const ProjectCard: React.FC<{ project: Project; autoPlay?: boolean }> = ({ project, autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative bg-zinc-900/40 rounded-3xl border border-zinc-800/50 overflow-hidden backdrop-blur-sm hover:border-amber-500/50 transition-all duration-500 shadow-2xl"
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-zinc-950">
        <AnimatePresence mode="wait">
          {!isPlaying ? (
            <motion.div 
              key="thumbnail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="relative h-full w-full cursor-pointer"
              onClick={() => setIsPlaying(true)}
            >
              <img 
                src={project.thumbnail} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-white flex items-center justify-center transform transition-all duration-300 shadow-2xl group-hover:bg-amber-500 group-hover:text-black group-hover:border-amber-400"
                >
                  <Play fill="currentColor" size={24} className="ml-1" />
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-10 bg-black"
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <Loader2 className="animate-spin text-amber-500" size={40} />
                </div>
              )}
              <video 
                src={project.videoUrl} 
                className="w-full h-full object-cover"
                autoPlay 
                muted={autoPlay} // Mute if auto-playing to comply with browser policies
                loop
                playsInline
                onCanPlay={() => setIsLoading(false)}
              />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(false);
                }}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-zinc-950/80 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 shadow-xl border border-white/10"
              >
                <X size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Work: React.FC = () => {
  return (
    <section id="work" className="py-32 px-6 bg-zinc-950 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-[1600px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center relative"
        >
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none">
            Project Showcase
          </h2>
          <p 
            className="text-4xl md:text-6xl text-amber-500 font-normal absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-[-10%] md:-translate-y-[-20%] z-10"
            style={{ fontFamily: "'Yellowtail', cursive" }}
          >
            Stop Scroll Ads
          </p>
        </motion.div>

        <div className="p-4 md:p-8 rounded-[3rem] border border-white/10 bg-zinc-900/20 backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {PROJECTS.map((project, index) => (
              <div key={project.id}>
                <ProjectCard project={project} autoPlay={index === 0} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
