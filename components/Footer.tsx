
import React from 'react';
import { Github, Twitter, Linkedin, Mail, Instagram, MapPin, Phone, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="pt-32 pb-12 px-6 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
              Let's create something <br />
              <span className="text-zinc-500 italic font-medium">unforgettable.</span>
            </h2>
            <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-md mb-10">
              I am Atif Mustafa, a professional video editor specializing in cinematic storytelling and commercial post-production. Based in the digital world, working globally.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-zinc-300">
                <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center">
                  <Mail size={18} className="text-violet-400" />
                </div>
                <a href="mailto:contact@atifmustafa.com" className="hover:text-white transition-colors">contact@atifmustafa.com</a>
              </div>
              <div className="flex items-center gap-4 text-zinc-300">
                <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center">
                  <MapPin size={18} className="text-violet-400" />
                </div>
                <span>Available for Global Remote Projects</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">Services</h4>
              <ul className="space-y-4 text-zinc-300">
                <li className="flex items-center gap-2 hover:translate-x-1 transition-transform cursor-default">
                  <ArrowUpRight size={14} className="text-violet-500" /> Commercial Editing
                </li>
                <li className="flex items-center gap-2 hover:translate-x-1 transition-transform cursor-default">
                  <ArrowUpRight size={14} className="text-violet-500" /> Social Content Mastery
                </li>
                <li className="flex items-center gap-2 hover:translate-x-1 transition-transform cursor-default">
                  <ArrowUpRight size={14} className="text-violet-500" /> Color Grading
                </li>
                <li className="flex items-center gap-2 hover:translate-x-1 transition-transform cursor-default">
                  <ArrowUpRight size={14} className="text-violet-500" /> Sound Design & Mixing
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">Connect</h4>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: <Instagram size={20} />, label: 'Instagram' },
                  { icon: <Twitter size={20} />, label: 'Twitter' },
                  { icon: <Linkedin size={20} />, label: 'LinkedIn' },
                  { icon: <Github size={20} />, label: 'Behance' }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href="#" 
                    title={social.label}
                    className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-all"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-zinc-900 text-zinc-600 text-[10px] font-bold uppercase tracking-[0.3em] gap-8">
          <p>© 2024 ATIF MUSTAFA — BUILT WITH PRECISION.</p>
          
          <button 
            onClick={scrollToTop}
            className="px-6 py-2 bg-zinc-900 rounded-full hover:text-white transition-colors"
          >
            Back to Top
          </button>
          
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
