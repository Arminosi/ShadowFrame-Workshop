import React, { useEffect, useState } from 'react';
import { TOOLS } from './constants';
import ToolCard from './components/ToolCard';
import { Language } from './types';
import { GithubIcon } from './components/Icons';
import InteractiveBackground from './components/InteractiveBackground';

const UI_TEXT = {
  en: {
    badge: 'Creation Suite',
    title: 'PicMaster',
    subtitle: 'A free and powerful toolkit for GIFs, collages, and slicing.',
    footer: 'Author: Arminosi',
  },
  zh: {
    badge: '造图套件',
    title: '制图匠',
    subtitle: '一组用于动图、拼图、切图的免费而又强大的工具包',
    footer: '作者: Arminosi',
  }
};

const GithubLink = () => {
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    let timer: number;
    if (isConfirming) {
      timer = window.setTimeout(() => setIsConfirming(false), 2000);
    }
    return () => clearTimeout(timer);
  }, [isConfirming]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isConfirming) {
      e.preventDefault();
      setIsConfirming(true);
    }
  };

  return (
    <a 
      href="https://github.com/Arminosi"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center justify-center p-1.5 ml-2 rounded-full transition-all duration-300 ${
        isConfirming 
          ? 'bg-slate-100 text-slate-950 scale-110 shadow-[0_0_15px_rgba(255,255,255,0.5)]' 
          : 'text-slate-500 hover:text-white hover:bg-slate-800'
      }`}
      aria-label={isConfirming ? "Click again to visit Github" : "Visit Github"}
    >
      <GithubIcon className="w-4 h-4" />
    </a>
  );
}

const GradientTitle = ({ text, lang, hoveredToolId }: { text: string, lang: string, hoveredToolId: string | null }) => {
  // Base classes for all title layers
  // Added select-none to prevent weird text selection behavior with overlapping layers
  const baseClasses = "text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight drop-shadow-2xl text-transparent bg-clip-text bg-[length:200%_auto] animate-flow-gradient-text pb-2 select-none transition-opacity duration-300";
  const defaultGradient = 'from-indigo-300 via-purple-300 to-indigo-300';

  return (
    <h1 className="relative inline-block text-center">
      {/* Semantic only */}
      <span className="sr-only">{text}</span>
      
      {/* Spacer for layout dimensions */}
      <span aria-hidden="true" className={`${baseClasses} opacity-0 block`}>
        {text}
      </span>

      {/* Default Gradient Layer - faster fade in when returning to default */}
      <span 
        aria-hidden="true" 
        className={`absolute inset-0 ${baseClasses} bg-gradient-to-r ${defaultGradient} ${hoveredToolId === null ? 'opacity-100' : 'opacity-0'}`}
      >
        {text}
      </span>

      {/* Tool-specific Gradient Layers - faster fade in when hovering */}
      {TOOLS.map((tool) => (
        <span
          key={tool.id}
          aria-hidden="true"
          className={`absolute inset-0 ${baseClasses} bg-gradient-to-r ${tool.titleGradient} ${hoveredToolId === tool.id ? 'opacity-100' : 'opacity-0'}`}
        >
          {text}
        </span>
      ))}
    </h1>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [hoveredToolId, setHoveredToolId] = useState<string | null>(null);

  useEffect(() => {
    // Simple language detection
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) {
      setLang('zh');
    } else {
      setLang('en');
    }
    // Ensure the page tab always shows the bilingual title requested
    document.title = '制图匠 | PicMaster';
  }, []);

  const text = UI_TEXT[lang];

  return (
    <div className="min-h-[100dvh] h-full w-full bg-slate-950 text-slate-200 selection:bg-indigo-500/30 font-sans overflow-auto flex flex-col" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
      
      {/* Interactive Particle Background */}
      <InteractiveBackground hoveredToolId={hoveredToolId} />
      
      {/* Background Mesh/Grid pattern for texture */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/50"></div>
      </div>

      {/* Animated Language Switcher */}
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex items-center p-1 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-full shadow-lg">
        {/* The Sliding Background Pill */}
        <div 
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-indigo-500/90 rounded-full shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            lang === 'zh' ? 'translate-x-[100%] left-1' : 'translate-x-0 left-1'
          }`}
        />
        
        {/* EN Option */}
        <button
          onClick={() => setLang('en')}
          className={`relative z-10 w-12 py-1.5 text-[10px] md:text-xs font-bold tracking-wider rounded-full transition-colors duration-300 ${
            lang === 'en' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          EN
        </button>

        {/* ZH Option */}
        <button
          onClick={() => setLang('zh')}
          className={`relative z-10 w-12 py-1.5 text-[10px] md:text-xs font-bold tracking-wider rounded-full transition-colors duration-300 ${
            lang === 'zh' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          中文
        </button>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-between w-full px-4 md:px-6 lg:px-8 py-6 md:py-8 min-h-[100dvh]">
        
        {/* Spacer to push content down slightly */}
        <div className="flex-shrink-0 h-[2vh] md:h-[4vh]"></div>
        
        {/* Header Section */}
        <header className="flex flex-col items-center text-center space-y-2 md:space-y-3 animate-fade-in-down flex-shrink-0">
          <div className="inline-block px-4 py-1.5 text-[10px] md:text-xs font-bold tracking-widest text-indigo-400 uppercase bg-indigo-500/10 rounded-full border border-indigo-500/20 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <span key={lang} className="animate-fade-in inline-block">
              {text.badge}
            </span>
          </div>
          
          {/* Animated Gradient Title */}
          <GradientTitle text={text.title} lang={lang} hoveredToolId={hoveredToolId} />
          
          <p className="max-w-2xl mx-auto text-sm md:text-xl text-slate-400 font-medium px-4">
            <span key={lang} className="animate-fade-in block">
              {text.subtitle}
            </span>
          </p>
        </header>

        {/* Cards Grid - with overflow handling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full max-w-lg md:max-w-7xl mt-6 md:mt-8 flex-shrink-0 mb-auto">
          {TOOLS.map((tool) => (
            <ToolCard 
              key={tool.id} 
              tool={tool} 
              lang={lang} 
              onHover={setHoveredToolId}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="text-slate-600 text-xs md:text-sm font-medium pb-6 md:pb-8 flex-shrink-0" style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}>
          <div className="flex items-center justify-center">
            <span key={lang} className="animate-fade-in inline-block">
              {text.footer}
            </span>
            <GithubLink />
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;