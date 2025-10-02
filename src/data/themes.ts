export interface Theme {
  id: string
  name: string
  icon: string
  primary: string
  secondary: string
  description: string
  bgMain: string
  bgSidebar: string
  bgCard: string
  textOnPrimary: string
  textMain: string
  border: string
}

export const themes: Theme[] = [
  {
    id: 'orange-flame',
    name: 'Orange Flame',
    icon: 'Flame',
    primary: '#ff9b7d',
    secondary: '#ffcbb3',
    bgMain: '#fff5f0',
    bgSidebar: '#ffd4c4',
    bgCard: '#ffe8de',
    textOnPrimary: '#2d2220',
    textMain: '#2d2220',
    border: 'rgba(45, 34, 32, 0.15)',
    description: 'Energia dinamica per sessioni di visione attive',
  },
  {
    id: 'sakura-pink',
    name: 'Sakura Pink',
    icon: 'Flower2',
    primary: '#ffb3d9',
    secondary: '#ffd6ed',
    bgMain: '#fff5fb',
    bgSidebar: '#ffd9f0',
    bgCard: '#ffe8f5',
    textOnPrimary: '#2d2028',
    textMain: '#2d2028',
    border: 'rgba(45, 32, 40, 0.15)',
    description: 'Romantica e delicata, perfetta per anime shojo',
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    icon: 'Waves',
    primary: '#7dc4ff',
    secondary: '#b3deff',
    bgMain: '#f0f8ff',
    bgSidebar: '#c4e5ff',
    bgCard: '#ddf0ff',
    textOnPrimary: '#1e2528',
    textMain: '#1e2528',
    border: 'rgba(30, 37, 40, 0.15)',
    description: 'Fresca e avventurosa, ideale per anime d\'azione',
  },
  {
    id: 'cream-elegance',
    name: 'Cream Elegance',
    icon: 'Lightbulb',
    primary: '#e8d4b8',
    secondary: '#f5e8d6',
    bgMain: '#fffbf5',
    bgSidebar: '#f0e4d0',
    bgCard: '#f8f0e5',
    textOnPrimary: '#2d2820',
    textMain: '#2d2820',
    border: 'rgba(45, 40, 32, 0.15)',
    description: 'Minimalista e rilassante per sessioni prolungate',
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    icon: 'Crown',
    primary: '#c49fff',
    secondary: '#ddc4ff',
    bgMain: '#f9f5ff',
    bgSidebar: '#e0d0ff',
    bgCard: '#ede5ff',
    textOnPrimary: '#28232d',
    textMain: '#28232d',
    border: 'rgba(40, 35, 45, 0.15)',
    description: 'Mistica e affascinante per anime fantasy',
  },
  {
    id: 'sunset-gold',
    name: 'Sunset Gold',
    icon: 'Sun',
    primary: '#ffd97d',
    secondary: '#ffe8b3',
    bgMain: '#fffcf0',
    bgSidebar: '#ffecc4',
    bgCard: '#fff5dd',
    textOnPrimary: '#2d2820',
    textMain: '#2d2820',
    border: 'rgba(45, 40, 32, 0.15)',
    description: 'Calda e nostalgica per momenti di riflessione',
  },
]
