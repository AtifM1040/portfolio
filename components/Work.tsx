
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { createClient } from '@supabase/supabase-js';
import { Project } from '../types';
import { 
  Pause,
  Volume2,
  VolumeX,
  Settings2,
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
const ADMIN_PASSCODE = "ATIF2000";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const categories = ["Stop Scroll Ads", "Beauty Product Ads", "UGC / VSL"];

const ProjectCard: React.FC<{ 
  project: Project; 
  autoPlay?: boolean;
  onDelete?: (id: string) => void; 
  isAdmin: boolean;
  onMove?: (direction: 'up' | 'down' | 'left' | 'right') => void;
  isFirst?: boolean;
  isLast?: boolean;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  isHero?: boolean;
  onChangeHero?: (categoryId: string) => void;
  activeId: string | null;
  onPlay: (id: string) => void;
}> = ({ 
  project, 
  autoPlay = false, 
  onDelete, 
  isAdmin, 
  onMove, 
  isFirst = false, 
  isLast = false, 
  canMoveUp = false, 
  canMoveDown = false,
  isHero = false,
  onChangeHero,
  activeId,
  onPlay
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isCurrentlyActive = activeId === project.id;

  useEffect(() => {
    if (isCurrentlyActive && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If unmuted autoplay is blocked, mute and try again to ensure it's "always running"
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(e => console.error("Autoplay failed even when muted:", e));
          }
        });
      }
    } else if (!isCurrentlyActive && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isCurrentlyActive]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isCurrentlyActive) {
      onPlay(project.id);
      setIsPaused(false);
    } else {
      if (videoRef.current?.paused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current?.pause();
        setIsPaused(true);
      }
    }
  };

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`group relative bg-zinc-900/40 rounded-3xl border ${isHero ? 'border-amber-500/30' : 'border-zinc-800/50'} overflow-hidden backdrop-blur-sm hover:border-amber-500/50 transition-all duration-500 shadow-2xl`}
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-zinc-950">
        <AnimatePresence mode="wait">
          {!isCurrentlyActive ? (
            <motion.div 
              key="thumbnail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="relative h-full w-full cursor-pointer"
              onClick={() => {
                onPlay(project.id);
                setIsPaused(false);
              }}
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
              {isAdmin && !isHero && onDelete && onMove && (
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

              {isAdmin && isHero && onChangeHero && (
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onChangeHero(project.category || categories[0]); }}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-all shadow-lg"
                  >
                    <Settings2 size={16} /> Change Hero
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-10 bg-black cursor-pointer"
              onClick={togglePlay}
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <Loader2 className="animate-spin text-amber-500" size={40} />
                </div>
              )}
              <video 
                ref={videoRef}
                src={project.videoUrl} 
                className="w-full h-full object-cover"
                autoPlay 
                muted={isMuted}
                loop
                playsInline
                onCanPlay={() => setIsLoading(false)}
              />

              {/* Pause Overlay */}
              {isPaused && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center">
                    <Play fill="white" size={32} className="ml-1" />
                  </div>
                </div>
              )}

              <div className="absolute top-4 right-4 z-30 flex gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                  className="w-10 h-10 rounded-full bg-zinc-950/80 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 shadow-xl border border-white/10"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlay(''); // Stop this video
                  }}
                  className="w-10 h-10 rounded-full bg-zinc-950/80 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 shadow-xl border border-white/10"
                >
                  <X size={18} />
                </button>
              </div>

              {isAdmin && isHero && onChangeHero && (
                <div className="absolute top-4 left-4 z-30">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onChangeHero(project.category || categories[0]); }}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-all shadow-lg"
                  >
                    <Settings2 size={16} /> Change Hero
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Work: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [heroProject, setHeroProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [isChangingHero, setIsChangingHero] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [enteredPass, setEnteredPass] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tags: '',
    category: categories[0],
    videoFile: null as File | null,
    thumbFile: null as (File | Blob | null),
    previewThumb: ''
  });

  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);
  const loginInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProjects();

    const handleLoginTrigger = () => {
      if (isAdmin) {
        if (confirm('Log out of Admin mode?')) {
          setIsAdmin(false);
        }
      } else {
        setIsLoginModalOpen(true);
      }
    };

    window.addEventListener('trigger-admin-login', handleLoginTrigger);
    return () => window.removeEventListener('trigger-admin-login', handleLoginTrigger);
  }, [isAdmin]);

  useEffect(() => {
    if (isLoginModalOpen) {
      setTimeout(() => loginInputRef.current?.focus(), 150);
    }
  }, [isLoginModalOpen]);

  const handleLoginSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (enteredPass === ADMIN_PASSCODE) {
      setIsAdmin(true);
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
      
      const allProjects = (data || []).map(p => ({
        id: String(p.id),
        title: p.title || '',
        description: p.description || '',
        videoUrl: p.video_url || '',
        thumbnail: p.thumb_url || '',
        tags: Array.isArray(p.tags) ? p.tags : [],
        sortOrder: p.sort_order ?? 0,
        isHero: p.is_hero || false,
        category: p.category || categories[0]
      }));

      setProjects(allProjects);
      
      const firstHero = allProjects.find(p => p.isHero);
      if (firstHero) setActiveVideoId(firstHero.id);
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

  const generateVideoThumbnail = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        video.currentTime = 1; // Capture at 1 second
      };
      video.onseeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Failed to generate thumbnail'));
        }, 'image/jpeg', 0.8);
        URL.revokeObjectURL(video.src);
      };
      video.onerror = reject;
      video.src = URL.createObjectURL(file);
    });
  };

  const uploadToStorage = async (file: File | Blob, folder: string, originalName?: string) => {
    const fileName = originalName || (file instanceof File ? file.name : 'thumbnail.jpg');
    const path = `${folder}/${Date.now()}-${fileName.replace(/[^a-z0-9.]/gi, '_')}`;
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
      const tUrl = await uploadToStorage(newProject.thumbFile, 'thumbs', 'thumb.jpg');

      const maxSort = projects.length > 0 ? Math.max(...projects.map(p => p.sortOrder || 0)) : 0;

      const { error } = await supabase.from('projects').insert([{
        title: newProject.title,
        description: newProject.description,
        video_url: vUrl,
        thumb_url: tUrl,
        tags: newProject.tags.split(',').map(t => t.trim()).filter(Boolean),
        sort_order: maxSort + 1,
        is_hero: isChangingHero,
        category: isChangingHero ? activeCategory : newProject.category
      }]);

      if (error) throw error;

      // If we were changing hero, we should unset the previous hero for THIS category
      if (isChangingHero && projects.length > 0) {
        const oldHero = projects.find(p => p.isHero && p.category === activeCategory);
        if (oldHero) {
          await supabase.from('projects').update({ 
            is_hero: false,
            sort_order: maxSort 
          }).eq('id', oldHero.id);
        }
      }

      await fetchProjects();
      setIsAdding(false);
      setIsChangingHero(false);
      setNewProject({ title: '', description: '', tags: '', category: categories[0], videoFile: null, thumbFile: null, previewThumb: '' });
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

  const renderShowcase = (category: string) => {
    const categoryProjects = projects.filter(p => p.category === category);
    // Sort category projects by sortOrder ascending to find the oldest/default fallback
    const sortedForFallback = [...categoryProjects].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    const hero = categoryProjects.find(p => p.isHero) || sortedForFallback[0];
    const others = categoryProjects.filter(p => p.id !== hero?.id);

    return (
      <div key={category} className="mb-24 last:mb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center relative"
        >
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none select-none">
            Project Showcase
          </h2>
          <p 
            className="text-4xl md:text-6xl text-amber-500 font-normal absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-[-10%] md:-translate-y-[-20%] z-10 pointer-events-none whitespace-nowrap"
            style={{ fontFamily: "'Yellowtail', cursive" }}
          >
            {category}
          </p>
        </motion.div>

        <div className="p-4 md:p-8 rounded-[3rem] border border-white/10 bg-zinc-900/20 backdrop-blur-sm">
          {categoryProjects.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-zinc-500 text-lg">No projects in this category yet.</p>
              {isAdmin && (
                <button 
                  onClick={() => { setActiveCategory(category); setIsChangingHero(false); setIsAdding(true); }} 
                  className="mt-4 px-6 py-2 bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition"
                >
                  Add Your First Project
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <AnimatePresence initial={false}>
                {hero && (
                  <ProjectCard 
                    key={hero.id} 
                    project={hero} 
                    autoPlay={true}
                    isAdmin={isAdmin} 
                    isHero={true}
                    onChangeHero={(cat) => { setActiveCategory(cat); setIsChangingHero(true); setIsAdding(true); }}
                    activeId={activeVideoId}
                    onPlay={(id) => setActiveVideoId(id)}
                  />
                )}
                {others.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    autoPlay={false}
                    onDelete={deleteProject} 
                    isAdmin={isAdmin} 
                    onMove={(dir) => moveProject(projects.indexOf(project), dir)}
                    isFirst={index === 0}
                    isLast={index === others.length - 1}
                    canMoveUp={index >= 4}
                    canMoveDown={index < others.length - 4}
                    activeId={activeVideoId}
                    onPlay={(id) => setActiveVideoId(id)}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="work" className="py-32 px-6 bg-zinc-950 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-[1600px] mx-auto relative z-10">
        {isAdmin && (
          <div className="mb-12 flex justify-center">
            <button 
              onClick={() => { setIsChangingHero(false); setIsAdding(true); }} 
              className="flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-2xl transition-all shadow-lg shadow-amber-500/20"
            >
              <Plus size={20} /> Add Project
            </button>
          </div>
        )}

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

        {isLoading ? (
          <div className="py-32 flex flex-col items-center text-zinc-600">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="text-xs font-bold tracking-widest uppercase">Fetching Projects...</p>
          </div>
        ) : (
          categories.map(renderShowcase)
        )}
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
                    <input type="file" ref={videoInputRef} className="hidden" accept="video/*" onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (f) {
                        setNewProject(prev => ({...prev, videoFile: f}));
                        try {
                          const thumbBlob = await generateVideoThumbnail(f);
                          setNewProject(prev => ({
                            ...prev, 
                            thumbFile: thumbBlob, 
                            previewThumb: URL.createObjectURL(thumbBlob)
                          }));
                        } catch (err) {
                          console.error("Auto-thumb failed:", err);
                        }
                      }
                    }} />
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
                  <select 
                    disabled={isUploading}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-amber-500 outline-none"
                    value={newProject.category}
                    onChange={e => setNewProject({...newProject, category: e.target.value})}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
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
