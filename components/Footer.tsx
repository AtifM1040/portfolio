
import React from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const upworkUrl = "https://www.upwork.com/freelancers/~013f02929f8e0f5ec7";
  const linkedinUrl = "https://www.linkedin.com/in/atif-mustafa-3739093a5/";
  const email = "Atiff.services@gmail.com";

  return (
    <footer id="contact" className="relative pt-32 pb-20 px-6 bg-zinc-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_50%_-20%,#f59e0b,transparent_50%)]" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-16 relative">
          <h2 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none opacity-90">
            CONTACT <br className="md:hidden" /> INFORMATION
          </h2>
          <p 
            className="text-4xl md:text-6xl text-amber-500 absolute left-1/2 -translate-x-1/2 -top-6 md:-top-10 z-10"
            style={{ fontFamily: "'Yellowtail', cursive" }}
          >
            Hire Me
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 mb-32">
          {/* Contact Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full bg-amber-500 rounded-[3rem] p-10 md:p-14 text-zinc-950 shadow-2xl relative overflow-hidden"
          >
            <div className="space-y-10 relative z-10">
              <div className="group">
                <h4 className="text-sm font-black uppercase tracking-widest mb-2 opacity-80 flex items-center gap-2">
                  <Mail size={16} /> E-mail Address
                </h4>
                <a href={`mailto:${email}`} className="text-xl md:text-2xl font-bold hover:underline break-all">
                  {email}
                </a>
              </div>

              <div>
                <h4 className="text-sm font-black uppercase tracking-widest mb-2 opacity-80 flex items-center gap-2">
                  <Linkedin size={16} /> LinkedIn Profile
                </h4>
                <a href={linkedinUrl} target="_blank" rel="noreferrer" className="text-xl md:text-2xl font-bold hover:underline flex items-center gap-2">
                  Atif Mustafa <ExternalLink size={18} />
                </a>
              </div>

              <div>
                <h4 className="text-sm font-black uppercase tracking-widest mb-2 opacity-80 flex items-center gap-2">
                  <span className="font-black">Up</span> Upwork Profile
                </h4>
                <a href={upworkUrl} target="_blank" rel="noreferrer" className="text-xl md:text-2xl font-bold hover:underline flex items-center gap-2">
                  Atif Mustafa <ExternalLink size={18} />
                </a>
              </div>

              <a 
                href={upworkUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-10 py-4 bg-white text-black font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-xl"
              >
                HIRE ME
              </a>
            </div>

            {/* Decorative zig-zag in card */}
            <div className="absolute top-10 right-10 w-20 h-20 opacity-20 text-white">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8">
                <path d="M0,50 L20,30 L40,70 L60,30 L80,70 L100,50" />
              </svg>
            </div>
          </motion.div>

          {/* Laptop Mockup Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 w-full flex justify-center items-center"
          >
            <div className="relative group">
               <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full scale-110 group-hover:scale-125 transition-transform duration-700" />
               <img 
                 src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" 
                 alt="Workspace" 
                 className="relative z-10 w-full max-w-lg rounded-2xl shadow-well drop-shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
               />
            </div>
          </motion.div>
        </div>

        {/* Thank You Section */}
        <div className="text-center pt-20 border-t border-white/5">
          <div className="relative inline-block mb-12">
            <h3 className="text-8xl md:text-[12rem] font-black text-white tracking-tighter uppercase leading-none opacity-90 select-none">
              THANK YOU
            </h3>
            <p 
              className="text-4xl md:text-6xl text-amber-500 absolute left-1/2 -translate-x-1/2 -top-8 md:-top-12 z-10 whitespace-nowrap"
              style={{ fontFamily: "'Yellowtail', cursive" }}
            >
              For Attention
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <a 
              href={upworkUrl}
              target="_blank"
              rel="noreferrer"
              className="px-12 py-5 bg-amber-500 text-zinc-950 font-black uppercase tracking-widest rounded-2xl hover:bg-amber-400 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-amber-500/20"
            >
               HIRE ME NOW
            </a>
          </div>
        </div>

        <div className="mt-32 pb-10 flex flex-col md:flex-row items-center justify-between text-zinc-600 text-[10px] font-bold uppercase tracking-[0.3em] gap-8">
          <p>© 2024 ATIF MUSTAFA — ALL RIGHTS RESERVED.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
