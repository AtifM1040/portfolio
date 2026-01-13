
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { Project } from '../types';
import { Play, X, Upload, Plus, Trash2, FileVideo, Image as ImageIcon, Loader2, CloudIcon, AlertCircle, RefreshCw, CheckCircle2, Unlock, LogOut, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

// --- SUPABASE CONFIGURATION ---
const SUPABASE_URL: string = 'https://euznogckxiczgwkjxyuk.supabase.co';
const SUPABASE_ANON_KEY: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1em5vZ2NreGljemd3a2p4eXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMzE3OTUsImV4cCI6MjA4MzcwNzc5NX0.BQP4qSG8-yzV4tHIBftxbreIEG2bQdbBY_qyFP5TdG0';

const ADMIN_PASSCODE = "atif2024"; 

const isConfigured = 
  SUPABASE_URL !== 'https://YOUR_PROJECT_REF.supabase.co' && 
  SUPABASE_ANON_KEY !== 'YOUR_ANON_KEY' &&
  SUPABASE_ANON_KEY.length > 50;

const supabase = isConfigured ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const ProjectCard: React.FC<{ 
  project: Project; 
  onDelete: (id: string) => void; 
  isAdmin: boolean;
  onMove: (direction: 'prev' | 'next') => void;
  isFirst: boolean;
  isLast: boolean;
}> = ({ project, onDelete, isAdmin, onMove, isFirst, isLast }) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        type: "spring", 
        stiffness: 350, 
        damping: 35,
        opacity: { duration: 0.2 }
      }}
      className="group relative bg-zinc-900/40 rounded-3xl border border-zinc-800/50 overflow-hidden flex flex-col select-none touch-pan-y"
    >
      <div className="relative aspect-video w-full bg-zinc-950">
        <AnimatePresence mode="wait">
          {!showVideo ? (
            <motion.div
              key="thumb"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 cursor-pointer overflow-hidden"
              onClick={() => setShowVideo(true)}
            >
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100 pointer-events-none"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-xl transform transition-transform group-hover:scale-110">
                  <Play fill="currentColor" size={24} className="ml-1" />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10"
            >
              <video
                src={project.videoUrl}
                className="w-full h-full object-contain bg-black"
                controls
                autoPlay
                playsInline
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowVideo(false);
                }}
                className="absolute top-3 right-3 p-2 bg-black/80 text-white rounded-full hover:bg-white hover:text-black transition-colors z-20 shadow-lg border border-white/10"
              >
                <X size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 md:p-8 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-wrap gap-2">
            {(project.tags || []).map((tag) => (
              <span key={tag} className="px-3 py-1 bg-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-wider rounded-full">
                {tag}
              </span>
            ))}
          </div>
          {isAdmin && (
            <div className="flex items-center gap-1">
               <button 
                onClick={(e) => { e.stopPropagation(); onMove('prev'); }}
                disabled={isFirst}
                className={`p-2 rounded-lg transition-colors ${isFirst ? 'text-zinc-800 cursor-not-allowed' : 'text-zinc-400 hover:text-violet-400 hover:bg-zinc-800'}`}
                title="Move Left/Up"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onMove('next'); }}
                disabled={isLast}
                className={`p-2 rounded-lg transition-colors ${isLast ? 'text-zinc-800 cursor-not-allowed' : 'text-zinc-400 hover:text-violet-400 hover:bg-zinc-800'}`}
                title="Move Right/Down"
              >
                <ChevronRight size={18} />
              </button>
              <div className="w-[1px] h-4 bg-zinc-800 mx-1" />
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(project.id); }}
                className="p-2 text-zinc-600 hover:text-red-500 hover:bg-zinc-800 rounded-lg transition-colors"
                title="Delete Project"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
        <h3 className="text-2xl font-bold mb-2 group-hover:text-violet-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-zinc-500 text-sm font-light leading-relaxed">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};

const Work: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tags: '',
    videoFile: null as File | null,
    thumbFile: null as File | null,
    previewThumb: ''
  });

  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedAdmin = localStorage.getItem('portfolio_admin_v1');
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }
    if (isConfigured) fetchProjects();
    else setIsLoading(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setClickCount(0), 3000);
    return () => clearTimeout(timer);
  }, [clickCount]);

  const handleTitleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 5) {
      setClickCount(0);
      handleAdminLogin();
    }
  };

  const handleAdminLogin = () => {
    if (isAdmin) {
      if (confirm('Log out of Admin mode?')) {
        setIsAdmin(false);
        localStorage.removeItem('portfolio_admin_v1');
      }
      return;
    }

    const pass = prompt("Enter Secret Passcode:");
    if (pass === ADMIN_PASSCODE) {
      setIsAdmin(true);
      localStorage.setItem('portfolio_admin_v1', 'true');
      alert("Welcome back, Atif.");
    } else if (pass !== null) {
      alert("Access Denied.");
    }
  };

  const fetchProjects = async () => {
    if (!supabase) return;
    setIsLoading(true);
    setErrorMessage(null);
    try {
      // Sort by ID descending = Upload Time Newest First
      const { data, error } = await supabase.from('projects').select('*').order('id', { ascending: false });
      if (error) throw error;
      setProjects((data || []).map(p => ({
        id: String(p.id),
        title: p.title || '',
        description: p.description || '',
        videoUrl: p.video_url || '',
        thumbnail: p.thumb_url || '',
        tags: Array.isArray(p.tags) ? p.tags : []
      })));
    } catch (err: any) {
      setErrorMessage(err.message || 'Connection failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const moveProject = (index: number, direction: 'prev' | 'next') => {
    const newProjects = [...projects];
    const targetIndex = direction === 'prev' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newProjects.length) return;
    
    // Swap items in the local state array
    const temp = newProjects[index];
    newProjects[index] = newProjects[targetIndex];
    newProjects[targetIndex] = temp;
    
    setProjects(newProjects);
  };

  const uploadToStorage = async (file: File, folder: string) => {
    if (!supabase) throw new Error('Client missing');
    const path = `${folder}/${Date.now()}-${file.name.replace(/[^a-z0-9.]/gi, '_')}`;
    const { error } = await supabase.storage.from('videos').upload(path, file);
    if (error) throw new Error(`STORAGE ERROR: ${error.message}`);
    const { data: { publicUrl } } = supabase.storage.from('videos').getPublicUrl(path);
    return publicUrl;
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !newProject.videoFile || !newProject.thumbFile || !newProject.title) return;

    setIsUploading(true);
    setErrorMessage(null);
    try {
      const vUrl = await uploadToStorage(newProject.videoFile, 'raw');
      const tUrl = await uploadToStorage(newProject.thumbFile, 'thumbs');

      const { error } = await supabase.from('projects').insert([{
        title: newProject.title,
        description: newProject.description,
        video_url: vUrl,
        thumb_url: tUrl,
        tags: newProject.tags.split(',').map(t => t.trim()).filter(Boolean)
      }]);

      if (error) throw error;
      await fetchProjects();
      setIsAdding(false);
      setNewProject({ title: '', description: '', tags: '', videoFile: null, thumbFile: null, previewThumb: '' });
    } catch (err: any) {
      setErrorMessage(`DATABASE ERROR: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!supabase || !confirm('Delete permanently?')) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const displayedProjects = isAdmin ? projects : projects.slice(0, visibleCount);

  if (!isConfigured) {
    return (
      <section className="py-24 bg-zinc-950 text-center px-6">
        <div className="max-w-xl mx-auto p-12 bg-zinc-900 border border-zinc-800 rounded-[3rem]">
          <AlertCircle className="mx-auto mb-6 text-amber-500" size={48} />
          <h2 className="text-3xl font-bold mb-4">Keys Missing</h2>
          <p className="text-zinc-500 mb-8">Please add your Supabase credentials to Work.tsx.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-violet-500 text-xs font-bold uppercase tracking-[0.3em]">Showcase</h2>
              <span className="flex items-center gap-1 text-[10px] text-zinc-600 font-bold uppercase tracking-widest bg-zinc-900/50 px-2 py-0.5 rounded border border-zinc-800/50">
                <CloudIcon size={10} /> Vault
              </span>
            </div>
            <div className="flex items-center gap-4">
              <p 
                onClick={handleTitleClick}
                className="text-4xl md:text-6xl font-extrabold tracking-tighter cursor-default select-none active:opacity-80 transition-opacity"
              >
                Portfolio
              </p>
              {isAdmin && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-600/10 border border-violet-500/20 rounded-full text-violet-400 text-[10px] font-bold uppercase tracking-widest">
                  <Unlock size={12} /> Admin Mode
                </div>
              )}
            </div>
          </div>
          
          {isAdmin && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex gap-4">
              <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-violet-600/20">
                <Plus size={20} /> Add Project
              </button>
              <button onClick={handleAdminLogin} className="p-4 bg-zinc-900 text-zinc-400 hover:text-white rounded-2xl border border-zinc-800 transition-colors" title="Logout">
                <LogOut size={20} />
              </button>
            </motion.div>
          )}
        </div>

        {errorMessage && isAdmin && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="p-8 bg-red-500/5 border border-red-500/20 rounded-[2.5rem]">
              <div className="flex items-start gap-4 text-red-400">
                <AlertCircle size={24} className="shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="font-bold text-lg">System Alert</p>
                  <code className="text-xs bg-black/40 p-2 mt-2 rounded block border border-red-500/10">{errorMessage}</code>
                </div>
                <button onClick={fetchProjects} className="p-3 bg-red-500/10 rounded-xl hover:bg-red-500/20 transition-colors"><RefreshCw size={18} /></button>
              </div>
            </div>
          </motion.div>
        )}

        {isLoading ? (
          <div className="py-20 flex flex-col items-center text-zinc-600">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="text-xs font-bold tracking-widest uppercase">Fetching...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-32 text-center border-2 border-dashed border-zinc-900 rounded-[3rem]">
            <CloudIcon className="text-zinc-800 mx-auto mb-6" size={64} />
            <p className="text-zinc-500 text-xl font-light">Your portfolio is empty.</p>
            {isAdmin && <button onClick={() => setIsAdding(true)} className="mt-6 px-8 py-3 bg-zinc-900 border border-zinc-800 text-white rounded-full hover:bg-zinc-800 transition-colors">Create First Project</button>}
          </div>
        ) : (
          <div className="space-y-16">
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
            >
              <AnimatePresence initial={false}>
                {displayedProjects.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onDelete={deleteProject} 
                    isAdmin={isAdmin} 
                    onMove={(dir) => moveProject(index, dir)}
                    isFirst={index === 0}
                    isLast={index === projects.length - 1}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {!isAdmin && projects.length > visibleCount && (
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="flex justify-center"
              >
                <button 
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="group flex flex-col items-center gap-3 text-zinc-500 hover:text-white transition-colors"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em]">View More Work</span>
                  <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-zinc-900 group-hover:border-zinc-700 transition-all">
                    <ChevronDown size={20} className="group-hover:translate-y-0.5 transition-transform" />
                  </div>
                </button>
              </motion.div>
            )}
          </div>
        )}

        <AnimatePresence>
          {isAdding && isAdmin && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-3xl font-bold">New Work</h3>
                  {!isUploading && <button onClick={() => setIsAdding(false)}><X size={24} className="text-zinc-500 hover:text-white" /></button>}
                </div>
                
                <form onSubmit={handleAddProject} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div onClick={() => !isUploading && videoInputRef.current?.click()} className="h-40 border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-violet-500 transition-colors bg-zinc-950">
                      <input type="file" ref={videoInputRef} className="hidden" accept="video/*" onChange={e => setNewProject({...newProject, videoFile: e.target.files?.[0] || null})} />
                      {newProject.videoFile ? <div className="text-center p-2"><FileVideo className="mx-auto mb-2 text-violet-400"/><span className="text-[10px] block truncate px-2">{newProject.videoFile.name}</span></div> : <Upload className="text-zinc-700"/>}
                    </div>
                    <div onClick={() => !isUploading && thumbInputRef.current?.click()} className="h-40 border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-violet-500 transition-colors bg-zinc-950 overflow-hidden">
                      <input type="file" ref={thumbInputRef} className="hidden" accept="image/*" onChange={e => {
                        const f = e.target.files?.[0];
                        if (f) setNewProject({...newProject, thumbFile: f, previewThumb: URL.createObjectURL(f)});
                      }} />
                      {newProject.previewThumb ? <img src={newProject.previewThumb} className="w-full h-full object-cover"/> : <ImageIcon className="text-zinc-700"/>}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <input required disabled={isUploading} placeholder="Title" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-violet-500 outline-none" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} />
                    <textarea disabled={isUploading} placeholder="Description" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 h-24 resize-none outline-none" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} />
                    <input disabled={isUploading} placeholder="Tags (Commercial, AI, VFX)" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none" value={newProject.tags} onChange={e => setNewProject({...newProject, tags: e.target.value})} />
                  </div>

                  <button type="submit" disabled={isUploading} className="w-full py-4 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-500 transition-all flex items-center justify-center gap-3">
                    {isUploading ? <><Loader2 className="animate-spin" size={20} /> Saving...</> : <><CheckCircle2 size={20}/> Publish Project</>}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Work;
