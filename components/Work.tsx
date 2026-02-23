
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { Project } from '../types';
import { 
  Play, 
  X, 
  Upload, 
  Plus, 
  Trash2, 
  FileVideo, 
  Image as ImageIcon, 
  Loader2, 
  CloudIcon, 
  AlertCircle, 
  RefreshCw, 
  CheckCircle2, 
  Unlock, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp,
  ChevronDown,
  Lock, 
  KeyRound 
} from 'lucide-react';

// --- SUPABASE CONFIGURATION ---
const SUPABASE_URL = 'https://euznogckxiczgwkjxyuk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1em5vZ2NreGljemd3a2p4eXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMzE3OTUsImV4cCI6MjA4MzcwNzc5NX0.BQP4qSG8-yzV4tHIBftxbreIEG2bQdbBY_qyFP5TdG0';
const ADMIN_PASSCODE = "atif2024";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const ProjectCard: React.FC<{ 
  project: Project; 
  autoPlay?: boolean;
  onDelete: (id: string) => void; 
  isAdmin: boolean;
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
  isFirst: boolean;
  isLast: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
}> = ({ project, autoPlay = false, onDelete, isAdmin, onMove, isFirst, isLast, canMoveUp, canMoveDown }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
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

              {/* Admin Controls Overlay */}
              {isAdmin && (
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="grid grid-cols-3 gap-1 bg-black/60 backdrop-blur-md p-1.5 rounded-xl border border-white/10">
                    <div />
                    <button 
                      onClick={(e) => { e.stopPropagation(); onMove('up'); }}
                      disabled={!canMoveUp}
                      className={`p-1.5 rounded-md transition-colors ${!canMoveUp ? 'text-zinc-600 cursor-not-allowed' : 'text-white hover:text-amber-400'}`}
                      title="Move Up"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <div />
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); onMove('left'); }}
                      disabled={isFirst}
                      className={`p-1.5 rounded-md transition-colors ${isFirst ? 'text-zinc-600 cursor-not-allowed' : 'text-white hover:text-amber-400'}`}
                      title="Move Left"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onMove('down'); }}
                      disabled={!canMoveDown}
                      className={`p-1.5 rounded-md transition-colors ${!canMoveDown ? 'text-zinc-600 cursor-not-allowed' : 'text-white hover:text-amber-400'}`}
                      title="Move Down"
                    >
                      <ChevronDown size={14} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onMove('right'); }}
                      disabled={isLast}
                      className={`p-1.5 rounded-md transition-colors ${isLast ? 'text-zinc-600 cursor-not-allowed' : 'text-white hover:text-amber-400'}`}
                      title="Move Right"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(project.id); }}
                    className="p-2 rounded-lg bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    title="Delete Project"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
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
                muted={autoPlay}
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
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [enteredPass, setEnteredPass] = useState('');
  const [loginError, setLoginError] = useState(false);

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
  const loginInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedAdmin = localStorage.getItem('portfolio_admin_v1');
    if (savedAdmin === 'true') setIsAdmin(true);
    fetchProjects();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setClickCount(0), 3000);
    return () => clearTimeout(timer);
  }, [clickCount]);

  useEffect(() => {
    if (isLoginModalOpen) {
      setTimeout(() => loginInputRef.current?.focus(), 150);
    }
  }, [isLoginModalOpen]);

  const handleTitleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 5) {
      setClickCount(0);
      if (isAdmin) {
        if (confirm('Log out of Admin mode?')) {
          setIsAdmin(false);
          localStorage.removeItem('portfolio_admin_v1');
        }
      } else {
        setIsLoginModalOpen(true);
      }
    }
  };

  const handleLoginSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (enteredPass === ADMIN_PASSCODE) {
      setIsAdmin(true);
      localStorage.setItem('portfolio_admin_v1', 'true');
      setIsLoginModalOpen(false);
      setEnteredPass('');
      setLoginError(false);
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 500);
    }
  };

  const fetchProjects = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: false });
      
      if (error) throw error;
      
      setProjects((data || []).map(p => ({
        id: String(p.id),
        title: p.title || '',
        description: p.description || '',
        videoUrl: p.video_url || '',
        thumbnail: p.thumb_url || '',
        tags: Array.isArray(p.tags) ? p.tags : [],
        sortOrder: p.sort_order ?? 0
      })));
    } catch (err: any) {
      setErrorMessage(err.message || 'Connection failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const saveOrderToDb = async (updatedProjects: Project[]) => {
    try {
      const updates = updatedProjects.map((p, idx) => ({
        id: p.id,
        sort_order: updatedProjects.length - idx
      }));

      for (const update of updates) {
        await supabase.from('projects').update({ sort_order: update.sort_order }).eq('id', update.id);
      }
    } catch (err) {
      console.error("Failed to save order:", err);
    }
  };

  const moveProject = async (index: number, direction: 'up' | 'down' | 'left' | 'right') => {
    const newProjects = [...projects];
    let targetIndex = index;
    
    if (direction === 'left') targetIndex = index - 1;
    else if (direction === 'right') targetIndex = index + 1;
    else if (direction === 'up') targetIndex = index - 4;
    else if (direction === 'down') targetIndex = index + 4;

    if (targetIndex < 0 || targetIndex >= newProjects.length) return;
    
    const temp = newProjects[index];
    newProjects[index] = newProjects[targetIndex];
    newProjects[targetIndex] = temp;
    
    setProjects(newProjects);
    await saveOrderToDb(newProjects);
  };

  const uploadToStorage = async (file: File, folder: string) => {
    const path = `${folder}/${Date.now()}-${file.name.replace(/[^a-z0-9.]/gi, '_')}`;
    const { error } = await supabase.storage.from('videos').upload(path, file);
    if (error) throw new Error(`STORAGE ERROR: ${error.message}`);
    const { data: { publicUrl } } = supabase.storage.from('videos').getPublicUrl(path);
    return publicUrl;
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.videoFile || !newProject.thumbFile || !newProject.title) return;

    setIsUploading(true);
    setErrorMessage(null);
    try {
      const vUrl = await uploadToStorage(newProject.videoFile, 'raw');
      const tUrl = await uploadToStorage(newProject.thumbFile, 'thumbs');

      const maxSort = projects.length > 0 ? Math.max(...projects.map(p => p.sortOrder || 0)) : 0;

      const { error } = await supabase.from('projects').insert([{
        title: newProject.title,
        description: newProject.description,
        video_url: vUrl,
        thumb_url: tUrl,
        tags: newProject.tags.split(',').map(t => t.trim()).filter(Boolean),
        sort_order: maxSort + 1
      }]);

      if (error) throw error;

      await fetchProjects();
      setIsAdding(false);
      setNewProject({ title: '', description: '', tags: '', videoFile: null, thumbFile: null, previewThumb: '' });
    } catch (err: any) {
      setErrorMessage(`ACTION FAILED: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Delete permanently?')) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

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
          <h2 
            onClick={handleTitleClick}
            className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none cursor-pointer select-none active:opacity-80 transition-opacity"
          >
            Atif Mustafa
          </h2>
          <p 
            className="text-4xl md:text-6xl text-amber-500 font-normal absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-[-10%] md:-translate-y-[-20%] z-10"
            style={{ fontFamily: "'Yellowtail', cursive" }}
          >
            Stop Scroll Ads
          </p>
          
          {isAdmin && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="mt-12 flex justify-center gap-4"
            >
              <button 
                onClick={() => setIsAdding(true)} 
                className="flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-2xl transition-all shadow-lg shadow-amber-500/20"
              >
                <Plus size={20} /> Add Project
              </button>
              <button 
                onClick={() => { setIsAdmin(false); localStorage.removeItem('portfolio_admin_v1'); }} 
                className="p-4 bg-zinc-900 text-zinc-400 hover:text-white rounded-2xl border border-zinc-800 transition-colors" 
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </motion.div>
          )}
        </motion.div>

        {errorMessage && isAdmin && (
          <div className="mb-12 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle size={20} />
              <p>{errorMessage}</p>
            </div>
            <button onClick={fetchProjects} className="p-2 hover:bg-red-500/20 rounded-lg transition-colors">
              <RefreshCw size={18} />
            </button>
          </div>
        )}

        <div className="p-4 md:p-8 rounded-[3rem] border border-white/10 bg-zinc-900/20 backdrop-blur-sm">
          {isLoading ? (
            <div className="py-32 flex flex-col items-center text-zinc-600">
              <Loader2 className="animate-spin mb-4" size={40} />
              <p className="text-xs font-bold tracking-widest uppercase">Fetching Projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="py-32 text-center">
              <CloudIcon className="text-zinc-800 mx-auto mb-6" size={64} />
              <p className="text-zinc-500 text-xl font-light">Your portfolio is empty.</p>
              {isAdmin && (
                <button 
                  onClick={() => setIsAdding(true)} 
                  className="mt-6 px-8 py-3 bg-zinc-900 border border-zinc-800 text-white rounded-full hover:bg-zinc-800 transition-colors"
                >
                  Create First Project
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <AnimatePresence initial={false}>
                {projects.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    autoPlay={index === 0}
                    onDelete={deleteProject} 
                    isAdmin={isAdmin} 
                    onMove={(dir) => moveProject(index, dir)}
                    isFirst={index === 0}
                    isLast={index === projects.length - 1}
                    canMoveUp={index >= 4}
                    canMoveDown={index < projects.length - 4}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {/* Admin Login Modal */}
        {isLoginModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setIsLoginModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }} 
              animate={{ 
                scale: 1, 
                y: 0, 
                opacity: 1,
                x: loginError ? [0, -10, 10, -10, 10, 0] : 0 
              }} 
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] w-full max-w-sm shadow-2xl relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-50" />
              
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                    <Lock size={18} />
                  </div>
                  <h3 className="text-xl font-bold">Vault Access</h3>
                </div>
                <button onClick={() => setIsLoginModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
                Enter the secret passcode to unlock the vault.
              </p>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-amber-500 transition-colors">
                    <KeyRound size={16} />
                  </div>
                  <input 
                    ref={loginInputRef}
                    type="password"
                    placeholder="Passcode"
                    className={`w-full bg-zinc-950 border ${loginError ? 'border-red-500/50 focus:border-red-500' : 'border-zinc-800 focus:border-amber-500'} rounded-xl pl-12 pr-4 py-3.5 outline-none transition-all`}
                    value={enteredPass}
                    onChange={e => setEnteredPass(e.target.value)}
                  />
                </div>
                
                {loginError && (
                  <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">
                    Incorrect Passcode
                  </p>
                )}

                <button 
                  type="submit"
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-95"
                >
                  Authorize
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Add Project Modal */}
        {isAdding && isAdmin && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-bold">New Work</h3>
                {!isUploading && <button onClick={() => setIsAdding(false)}><X size={24} className="text-zinc-500 hover:text-white" /></button>}
              </div>
              
              <form onSubmit={handleAddProject} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div onClick={() => !isUploading && videoInputRef.current?.click()} className="h-40 border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 transition-colors bg-zinc-950">
                    <input type="file" ref={videoInputRef} className="hidden" accept="video/*" onChange={e => setNewProject({...newProject, videoFile: e.target.files?.[0] || null})} />
                    {newProject.videoFile ? <div className="text-center p-2"><FileVideo className="mx-auto mb-2 text-amber-400"/><span className="text-[10px] block truncate px-2">{newProject.videoFile.name}</span></div> : <Upload className="text-zinc-700"/>}
                  </div>
                  <div onClick={() => !isUploading && thumbInputRef.current?.click()} className="h-40 border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 transition-colors bg-zinc-950 overflow-hidden">
                    <input type="file" ref={thumbInputRef} className="hidden" accept="image/*" onChange={e => {
                      const f = e.target.files?.[0];
                      if (f) setNewProject({...newProject, thumbFile: f, previewThumb: URL.createObjectURL(f)});
                    }} />
                    {newProject.previewThumb ? <img src={newProject.previewThumb} className="w-full h-full object-cover" alt="Preview"/> : <ImageIcon className="text-zinc-700"/>}
                  </div>
                </div>

                <div className="space-y-4">
                  <input required disabled={isUploading} placeholder="Title" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-amber-500 outline-none" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} />
                  <textarea disabled={isUploading} placeholder="Description" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 h-24 resize-none outline-none" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} />
                  <input disabled={isUploading} placeholder="Tags (Commercial, AI, VFX)" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none" value={newProject.tags} onChange={e => setNewProject({...newProject, tags: e.target.value})} />
                </div>

                <button type="submit" disabled={isUploading} className="w-full py-4 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isUploading ? <><Loader2 className="animate-spin" size={20} /> Publishing...</> : <><CheckCircle2 size={20}/> Publish Project</>}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Work;
