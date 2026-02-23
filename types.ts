// Added React import to define the React namespace for React.ReactNode
import React from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  tags: string[];
  sortOrder?: number;
}

export interface Tool {
  id: string;
  name: string;
  icon: React.ReactNode;
}
