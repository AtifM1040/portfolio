import React from 'react';
import { motion } from 'motion/react';

const skillsData = [
  {
    id: '01',
    title: 'UGC Content Creation',
    description: 'Crafting authentic, user-generated content that drives engagement and conversions.'
  },
  {
    id: '02',
    title: 'DTC Video Ads',
    description: 'Specializing in high-converting, scroll-stopping video ads that boost sales for e-commerce brands.'
  },
  {
    id: '03',
    title: 'Creative Strategy',
    description: 'Developing creative strategies that blend brand voice with direct-response principles.'
  },
  {
    id: '04',
    title: 'Social Media Expertise',
    description: 'Expert in creating content for TikTok, Instagram, and Facebook to maximize performance.'
  }
];

const Skills: React.FC = () => {
  return (
    <section className="relative py-24 px-6 bg-zinc-950 overflow-hidden">
       {/* Background accent curves */}
       <div className="absolute top-0 right-0 w-64 h-64 text-amber-500 opacity-20 pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="5">
            <path d="M0,100 Q100,0 200,100 T400,100" />
          </svg>
       </div>
       <div className="absolute bottom-0 left-0 w-64 h-64 text-amber-500 opacity-20 pointer-events-none transform -rotate-12">
          <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="5">
            <path d="M0,100 Q100,0 200,100 T400,100" />
          </svg>
       </div>

      <div className="max-w-6xl mx-auto text-center mb-16 relative">
        <h2 className="text-7xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
          SKILLS & TOOLS
        </h2>
        <p 
          className="text-5xl md:text-6xl text-amber-500 absolute left-1/2 -translate-x-1/2 -bottom-8 md:-bottom-10 z-10"
          style={{ fontFamily: "'Yellowtail', cursive" }}
        >
          Signature
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-12 md:p-20 relative overflow-hidden"
        >
          {/* Decorative orange curves inside box */}
          <div className="absolute -top-10 -right-10 w-40 h-40 text-amber-500 opacity-30">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0,0 Q50,0 50,50 T100,100" />
            </svg>
          </div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 text-amber-500 opacity-30">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0,0 Q50,0 50,50 T100,100" />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16 relative z-10">
            {skillsData.map((skill) => (
              <div key={skill.id} className="flex gap-6 group">
                <div className="text-6xl font-black text-amber-500/80 tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity">
                  {skill.id}
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-amber-500 mb-3 uppercase tracking-wider">
                    {skill.title}
                  </h3>
                  <p className="text-zinc-400 font-light leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
