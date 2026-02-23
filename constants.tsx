
import React from 'react';
import { 
  Scissors, 
  Sparkles, 
  Film, 
  Mic2,
  Video,
  AudioLines,
  MonitorPlay,
  Layers
} from 'lucide-react';
import { Project, Tool } from './types';

/**
 * PROJECTS UPDATED WITH YOUR GOOGLE DRIVE LINKS
 * Note: Drive links converted to direct stream format (uc?id=)
 */
export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Modern Brand Identity',
    description: 'A dynamic commercial showcasing modern aesthetics and fast-paced editing techniques.',
    videoUrl: 'https://drive.google.com/uc?id=1e9RqXBnVdYolToJmds_xDlG5MQUPuxOf',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
    tags: ['Commercial', 'Branding', '4K']
  },
  {
    id: '2',
    title: 'Product Showcase Reel',
    description: 'Clean, elegant product presentation with focus on lighting and smooth camera movements.',
    videoUrl: 'https://drive.google.com/uc?id=12IwZiwd-OG2ejTibpxOje9BMy3GZhb2R',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    tags: ['Product Ad', 'VFX', 'Cinematic']
  },
  {
    id: '3',
    title: 'Social Media Campaign',
    description: 'High-energy content designed for maximum engagement on social platforms.',
    videoUrl: 'https://drive.google.com/uc?id=1BFdgHwYRXPUVCjvXwCFyRLcHWlA0xQhM',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200',
    tags: ['Social', 'Mobile', 'Viral']
  },
  {
    id: '4',
    title: 'Corporate Narrative',
    description: 'Professional storytelling that communicates brand values through interview and B-roll.',
    videoUrl: 'https://drive.google.com/uc?id=1642K6d1CapwmzA4U-WNUrDDXkhjWTcb9',
    thumbnail: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200',
    tags: ['Corporate', 'Interview', 'Professional']
  },
  {
    id: '5',
    title: 'Creative Motion Promo',
    description: 'Advanced motion graphics and experimental editing styles for creative projects.',
    videoUrl: 'https://drive.google.com/uc?id=1k79IXWFGEkOyINARkE-p3B9MjrEcarxY',
    thumbnail: 'https://images.unsplash.com/photo-1492691523567-6170c24dac0a?auto=format&fit=crop&q=80&w=1200',
    tags: ['Motion Graphics', 'Promo', 'VFX']
  },
  {
    id: '6',
    title: 'Health & Wellness',
    description: 'Engaging health content with clean aesthetics.',
    videoUrl: 'https://drive.google.com/uc?id=1e9RqXBnVdYolToJmds_xDlG5MQUPuxOf',
    thumbnail: 'https://images.unsplash.com/photo-1505751172177-51bd1825790b?auto=format&fit=crop&q=80&w=1200',
    tags: ['Health', 'Wellness']
  },
  {
    id: '7',
    title: 'Tech Review',
    description: 'Fast-paced tech review with dynamic transitions.',
    videoUrl: 'https://drive.google.com/uc?id=12IwZiwd-OG2ejTibpxOje9BMy3GZhb2R',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200',
    tags: ['Tech', 'Review']
  },
  {
    id: '8',
    title: 'Fashion Reel',
    description: 'Stylish fashion showcase with cinematic lighting.',
    videoUrl: 'https://drive.google.com/uc?id=1BFdgHwYRXPUVCjvXwCFyRLcHWlA0xQhM',
    thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200',
    tags: ['Fashion', 'Style']
  }
];

export const TOOLS: Tool[] = [
  { id: '1', name: 'Capcut Pro', icon: <Scissors size={24} /> },
  { id: '2', name: 'AI Platforms', icon: <Sparkles size={24} /> },
  { id: '3', name: 'Adobe Premiere', icon: <Film size={24} /> },
  { id: '4', name: 'Eleven Labs', icon: <Mic2 size={24} /> },
  { id: '5', name: 'DaVinci Resolve', icon: <Video size={24} /> },
  { id: '6', name: 'After Effects', icon: <Layers size={24} /> },
  { id: '7', name: 'Adobe Audition', icon: <AudioLines size={24} /> },
  { id: '8', name: 'Frame.io', icon: <MonitorPlay size={24} /> },
];
