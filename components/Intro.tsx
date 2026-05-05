import React from 'react';
import { motion } from 'motion/react';

const Intro: React.FC = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-zinc-950">
      {/* Abstract Shapes */}
      <div className="absolute top-20 right-10 w-32 h-32 text-amber-500 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10,50 Q30,10 50,50 T90,50" />
        </svg>
      </div>
      <div className="absolute bottom-10 left-10 w-24 h-24 text-amber-500 opacity-20 pointer-events-none transform rotate-45">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10,50 Q30,10 50,50 T90,50" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Main Content Box */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-7xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-2">
                HELLO I'M
              </h2>
              <p 
                className="text-5xl md:text-6xl text-amber-500 mb-8"
                style={{ fontFamily: "'Yellowtail', cursive" }}
              >
                Atif Mustafa
              </p>
              
              <div className="space-y-6 text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                <p>
                  My name is Atif Mustafa. This presentation is a collection of some of my most significant works and projects that reflect my skills, creativity, and professional growth.
                </p>
                <p>
                  Throughout this portfolio, you'll find examples of my work across different areas. Each project has been carefully selected to demonstrate my expertise in video editing and creative strategy.
                </p>
              </div>
            </div>
            
            {/* Decorative curve at bottom left */}
            <div className="absolute bottom-[-20px] left-[-20px] w-40 h-40 text-amber-500 opacity-40">
               <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round">
                 <path d="M20,180 Q100,20 180,180" />
               </svg>
            </div>
          </motion.div>

          {/* Profile Image & Stats */}
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-stretch">
            {/* Image Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-2xl h-[450px] aspect-[4/5]"
            >
              <img 
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop" 
                alt="Atif Mustafa"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Stats Column */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center gap-12 px-8 lg:border-l border-white/5"
            >
              <div className="text-center lg:text-left">
                <div className="text-5xl font-black text-white mb-1">2+</div>
                <div className="text-zinc-500 uppercase tracking-widest text-sm font-bold">Years of Experience</div>
              </div>
              
              <div className="h-px bg-white/10 w-full" />

              <div className="text-center lg:text-left">
                <div className="text-5xl font-black text-white mb-1">250+</div>
                <div className="text-zinc-500 uppercase tracking-widest text-sm font-bold">Reels Edited</div>
              </div>

              <div className="h-px bg-white/10 w-full" />

              <div className="text-center lg:text-left">
                <div className="text-5xl font-black text-white mb-1">99%</div>
                <div className="text-zinc-500 uppercase tracking-widest text-sm font-bold">Client Satisfaction</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
