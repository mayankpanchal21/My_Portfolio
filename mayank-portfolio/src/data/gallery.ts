import type { GalleryItem } from '../types';

/*
 * PLACEHOLDERS: these are empty photo slots, not real photos.
 * To add a photo: put the file in /public/gallery/, then set `src`, a descriptive
 * `alt`, its pixel `width` / `height`, and remove `isPlaceholder`.
 * Categories are free text; the filter chips are generated from them.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: 'workspace',
    category: 'Workspace',
    caption: '',
    aspect: 'landscape',
    isPlaceholder: true,
    src:'/src/images/g1.jpg'
  },
  {
    id: 'project-screen',
    category: 'Projects',
    caption: '',
    aspect: 'portrait',
    isPlaceholder: true,
    src:'/src/images/g2.jpg'
  },
  {
    id: 'event',
    category: 'Events',
    caption: '',
    aspect: 'square',
    isPlaceholder: true,
    src:'/src/images/g3.jpg'
  },
  {
    id: 'whiteboard',
    category: 'Projects',
    caption: '',
    aspect: 'landscape',
    isPlaceholder: true,
    src:'/src/images/g4.jpg'
  },
  {
    id: 'team',
    category: 'Events',
    caption: '',
    aspect: 'landscape',
    isPlaceholder: true,
    src:'/src/images/g5.jpg'
  },
  {
    id: 'graduation',
    category: 'Milestones',
    caption: '',
    aspect: 'portrait',
    isPlaceholder: true,
    src:'/src/images/g6.jpg'
  },
  {
    id: 'graduation',
    category: 'Milestones',
    caption: '',
    aspect: 'portrait',
    isPlaceholder: true,
    src:'/src/images/g6.jpg'
  },
  {
    id: 'graduation',
    category: 'Milestones',
    caption: '',
    aspect: 'portrait',
    isPlaceholder: true,
    src:'/src/images/g6.jpg'
  },
  {
    id: 'graduation',
    category: 'Milestones',
    caption: '',
    aspect: 'portrait',
    isPlaceholder: true,
    src:'/src/images/g6.jpg'
  },
];
