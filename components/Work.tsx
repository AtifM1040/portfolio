
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Reorder, useDragControls } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { Project } from '../types';
import { Play, X, Upload, Plus, Trash2, FileVideo, Image as ImageIcon, Loader2, CloudIcon, AlertCircle, ExternalLink, RefreshCw } from 'lucide-react';

// --- SUPABASE CONFIGURATION ---
const SUPABASE_URL: string = 'https://euznogckxiczgwkjxyuk.supabase.co';
const SUPABASE_ANON_KEY: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1em5vZ2NreGljemd3a2p4eXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMzE3OTUsImV4cCI6MjA4MzcwNzc5NX0.BQP4qSG8-yzV4tHIBftxbreIEG2bQdbBY_qyFP5TdG0';

const isConfigured = 
  SUPABASE_URL !== 'https://YOUR_PROJECT_REF.supabase.co' && 
  SUPABASE_ANON_KEY !== 'YOUR_ANON_KEY' &&
  SUPABASE_ANON_KEY.length > 50;

const supabase = isConfigured ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const ProjectCard: React.FC<{ project: Project; onDelete: (id: string) => void }> = ({ project, onDelete }) => {
  const [showVideo, setShowVideo] = useState(false);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={project}
      id={project.id}
      dragControls={dragControls}
      dragListener={!showVideo}
      className="group relative bg-zinc-900/40 rounded-3xl border border-zinc-800/50 overflow-hidden flex flex-col select-none touch-none"
      whileDrag={{ 
        scale: 1.02, 
        boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        zIndex: 50
      }}
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
              
              <div className="absolute top-4 left-4 p-2 bg-black/60 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
                <div className="grid grid-cols-2 gap-0.5">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-white/40 rounded-full" />
                  ))}
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
          <button 
            onClick={() => onDelete(project.id)}
            className="p-2 text-zinc-600 hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
        <h3 className="text-2xl font-bold mb-2 group-hover:text-violet-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-zinc-500 text-sm font-light leading-relaxed">
          {project.description}
        </p>
      </div>
    </Reorder.Item>
  );
};

const Work: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
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
    if (isConfigured) {
      fetchProjects();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Cleanup effect for preview URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (newProject.previewThumb) {
        URL.revokeObjectURL(newProject.previewThumb);
      }
    };
  }, [newProject.previewThumb]);

  const fetchProjects = async () => {
    if (!supabase) {
      setErrorMessage("Supabase client not initialized.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      
      const mapped = (data || []).map(p => ({
        id: String(p.id),
        title: p.title || 'Untitled',
        description: p.description || '',
        videoUrl: p.video_url || '',
        thumbnail: p.thumb_url || '',
        tags: Array.isArray(p.tags) ? p.tags : []
      }));
      
      setProjects(mapped);
    } catch (err: any) {
      console.error('Supabase Sync Error:', err);
      const msg = err.message || err.details || JSON.stringify(err);
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'video' | 'thumb') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'video') {
        setNewProject(prev => ({ ...prev, videoFile: file }));
      } else {
        if (newProject.previewThumb) URL.revokeObjectURL(newProject.previewThumb);
        setNewProject(prev => ({ 
          ...prev, 
          thumbFile: file, 
          previewThumb: URL.createObjectURL(file) 
        }));
      }
    }
  };

  const uploadToStorage = async (file: File, folder: string) => {
    if (!supabase) throw new Error('Supabase client missing.');
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('videos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw new Error(`Upload to "videos" bucket failed: ${error.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from('videos')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    if (!newProject.videoFile || !newProject.thumbFile || !newProject.title) return;

    setIsUploading(true);
    try {
      const videoUrl = await uploadToStorage(newProject.videoFile, 'raw_videos');
      const thumbUrl = await uploadToStorage(newProject.thumbFile, 'thumbnails');

      const { error } = await supabase
        .from('projects')
        .insert([{
          title: newProject.title,
          description: newProject.description,
          video_url: videoUrl,
          thumb_url: thumbUrl,
          tags: newProject.tags.split(',').map(t => t.trim()).filter(t => t !== '')
        }]);

      if (error) throw error;

      await fetchProjects();
      setIsAdding(false);
      setNewProject({ title: '', description: '', tags: '', videoFile: null, thumbFile: null, previewThumb: '' });
    } catch (err: any) {
      console.error('Save Error:', err);
      alert(`Save failed: ${err.message || 'Check RLS Policies for the projects table.'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!supabase) return;
    if (!confirm('Permanently delete this project?')) return;
    
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      console.error('Delete error:', err);
      alert(`Delete failed: ${err.message}`);
    }
  };

  if (!isConfigured) {
    return (
      <section id="work" className="py-24 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-[3rem] p-12 md:p-20">
            <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <AlertCircle className="text-amber-500" size={40} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Database Connection Required</h2>
            <p className="text-zinc-400 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
              Supabase keys are missing or invalid. Check the <code>SUPABASE_ANON_KEY</code> at the top of <code>Work.tsx</code>.
            </p>
            <a href="https://supabase.com/dashboard" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all">
              Go to Supabase Dashboard <ExternalLink size={18} />
            </a>
          </div>
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
              <h2 className="text-violet-500 text-xs font-bold uppercase tracking-[0.3em]">
                Live Portfolio
              </h2>
              <span className="flex items-center gap-1 text-[10px] text-green-500 font-bold uppercase tracking-widest bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                <CloudIcon size={10} /> Cloud Active
              </span>
            </div>
            <p className="text-4xl md:text-6xl font-extrabold tracking-tighter">
              Featured Work
            </p>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-2xl transition-all transform hover:scale-105 shadow-lg shadow-violet-600/20"
          >
            <Plus size={20} /> Add New Project
          </button>
        </div>

        {errorMessage && (
          <div className="mb-10 p-8 bg-red-500/5 border border-red-500/20 rounded-3xl">
            <div className="flex items-start gap-4 text-red-400 mb-6">
              <AlertCircle size={24} className="shrink-0 mt-1" />
              <div className="flex-1 overflow-hidden">
                <p className="font-bold text-lg mb-1">Sync Failed</p>
                <code className="text-xs opacity-80 break-words block bg-red-500/10 p-3 rounded-lg border border-red-500/10">{errorMessage}</code>
              </div>
              <button onClick={fetchProjects} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-red-500/20 px-5 py-3 rounded-xl hover:bg-red-500/30 transition-colors shrink-0">
                <RefreshCw size={14} /> Retry
              </button>
            </div>
            
            <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 text-sm">
              <p className="text-zinc-300 font-bold mb-3 uppercase text-xs tracking-widest">Helpful Guide:</p>
              <p className="text-zinc-500 mb-4 leading-relaxed">
                If the error mentions permissions, you must enable <b>Row Level Security (RLS)</b> policies in Supabase for the <code>projects</code> table and the <code>videos</code> storage bucket.
              </p>
            </div>
          </div>
        )}

        <AnimatePresence>
          {isAdding && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] w-full max-w-2xl shadow-2xl relative overflow-y-auto max-h-[90vh]"
              >
                {!isUploading && (
                  <button onClick={() => setIsAdding(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"><X size={24} /></button>
                )}
                <h3 className="text-3xl font-bold mb-8 tracking-tight">New Project</h3>
                
                <form onSubmit={handleAddProject} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div onClick={() => !isUploading && videoInputRef.current?.click()} className={`h-40 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all ${newProject.videoFile ? 'border-violet-500 bg-violet-500/10' : 'border-zinc-800 hover:border-zinc-600 bg-zinc-950'}`}>
                      <input type="file" ref={videoInputRef} className="hidden" accept="video/*" onChange={(e) => handleFileUpload(e, 'video')} disabled={isUploading} />
                      {newProject.videoFile ? (
                        <div className="text-center p-4 overflow-hidden">
                          <FileVideo className="mx-auto mb-2 text-violet-400" />
                          <span className="text-xs text-violet-300 font-bold truncate block">{newProject.videoFile.name}</span>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto mb-2 text-zinc-600" />
                          <span className="text-xs text-zinc-500 font-bold">Upload Video</span>
                        </div>
                      )}
                    </div>

                    <div onClick={() => !isUploading && thumbInputRef.current?.click()} className={`h-40 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all ${newProject.previewThumb ? 'border-violet-500 bg-violet-500/10' : 'border-zinc-800 hover:border-zinc-600 bg-zinc-950'}`}>
                      <input type="file" ref={thumbInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'thumb')} disabled={isUploading} />
                      {newProject.previewThumb ? (
                        <img src={newProject.previewThumb} className="w-full h-full object-cover rounded-2xl" />
                      ) : (
                        <div className="text-center">
                          <ImageIcon className="mx-auto mb-2 text-zinc-600" />
                          <span className="text-xs text-zinc-500 font-bold">Upload Thumbnail</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <input required disabled={isUploading} type="text" placeholder="Title" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500 transition-colors disabled:opacity-50" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} />
                    <textarea disabled={isUploading} placeholder="Description" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500 transition-colors h-24 resize-none disabled:opacity-50" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} />
                    <input disabled={isUploading} type="text" placeholder="Tags (comma separated)" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500 transition-colors disabled:opacity-50" value={newProject.tags} onChange={e => setNewProject({...newProject, tags: e.target.value})} />
                  </div>

                  <button type="submit" className="w-full py-4 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-3" disabled={isUploading || !newProject.videoFile || !newProject.thumbFile || !newProject.title}>
                    {isUploading ? (
                      <><Loader2 className="animate-spin" size={20} /> Uploading Assets...</>
                    ) : 'Save Project'}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-zinc-600">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="font-bold tracking-widest uppercase text-xs">Connecting to Supabase...</p>
          </div>
        ) : projects.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center border-2 border-dashed border-zinc-900 rounded-[3rem]">
            <CloudIcon className="text-zinc-800 mx-auto mb-6" size={48} />
            <p className="text-zinc-500 text-lg mb-8 font-light">Your portfolio is currently empty.</p>
            <button onClick={() => setIsAdding(true)} className="px-10 py-4 bg-zinc-900 text-white rounded-full font-bold hover:bg-zinc-800 transition-all border border-zinc-800">Start Uploading</button>
          </motion.div>
        ) : (
          <Reorder.Group axis="y" values={projects} onReorder={setProjects} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onDelete={deleteProject} />
            ))}
          </Reorder.Group>
        )}
      </div>
    </section>
  );
};

export default Work;
