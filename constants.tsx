
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

// Starting with an empty array so the user can upload their own work from their device
export const PROJECTS: Project[] = [];

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
