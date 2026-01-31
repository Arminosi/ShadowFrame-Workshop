import { ReactNode } from 'react';

export type Language = 'en' | 'zh';
export type Source = 'main' | 'github';

export interface LocalizedString {
  en: string;
  zh: string;
}

export interface ToolData {
  id: string;
  name: LocalizedString;
  category: LocalizedString;
  description: LocalizedString;
  url: string;
  icon: ReactNode;
  color: string; // Tailwind text color class (e.g., 'text-fuchsia-400')
  bgHover: string; // Tailwind background color for hover states
  gradient: string; // CSS gradient string for cards
  titleGradient: string; // Tailwind gradient classes for the main title text
  border: string; // Tailwind border color class
  glowColor: string; // RGBA color string for the hover glow effect
  activeStyles: string; // Tailwind classes for the confirmed/active state
}