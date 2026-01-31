import React, { useEffect, useState } from 'react';
import { TOOLS, GITHUB_URLS } from './constants';
import ToolCard from './components/ToolCard';
import { Language, Source } from './types';
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
      className={`inline-flex items-center justify-center p-1.5 ml-2 rounded-full transition-all duration-300 ${isConfirming
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
  const [lang, setLang] = useState<Language>(() => {
    // Try to get saved language from localStorage
    const savedLang = localStorage.getItem('picmaster-lang');
    if (savedLang === 'en' || savedLang === 'zh') {
      return savedLang;
    }
    // First visit: detect browser language
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('zh') ? 'zh' : 'en';
  });
  const [source, setSource] = useState<Source>('github');
  const [hoveredToolId, setHoveredToolId] = useState<string | null>(null);
  const [isCheckingSource, setIsCheckingSource] = useState(true);
  const [checkResult, setCheckResult] = useState<'success' | 'failed' | null>(null);

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem('picmaster-lang', lang);
    // Ensure the page tab always shows the bilingual title requested
    document.title = '制图匠 | PicMaster';
  }, [lang]);

  // Auto-detect if main source is accessible
  useEffect(() => {
    const checkMainSource = async () => {
      try {
        // Try to fetch from main source with a timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        await fetch('https://gif.qwq.team', {
          method: 'HEAD',
          mode: 'no-cors', // Use no-cors to avoid CORS issues
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        // If we get here without error, main source is accessible
        setSource('main');
        setCheckResult('success');
      } catch (error) {
        // Main source is not accessible, switch to GitHub
        console.log('Main source not accessible, switching to GitHub');
        setSource('github');
        setCheckResult('failed');
      } finally {
        setIsCheckingSource(false);
        // Hide result after 1.5 seconds
        setTimeout(() => {
          setCheckResult(null);
        }, 1500);
      }
    };

    checkMainSource();
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6 w-full max-w-lg md:max-w-[90rem] mt-10 md:mt-16 mb-10 md:mb-16 flex-shrink-0">
          {TOOLS.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              lang={lang}
              source={source}
              githubUrl={GITHUB_URLS[tool.id]}
              onHover={setHoveredToolId}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="w-full text-slate-600 text-xs md:text-sm font-medium pb-6 md:pb-8 flex-shrink-0 flex flex-col items-center gap-6" style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}>

          {/* Controls Row */}
          <div className="flex flex-row items-center gap-3 md:gap-6 scale-90 md:scale-100 origin-bottom">
            {/* Source Switcher */}
            <div className="relative flex items-center p-1 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-full shadow-lg overflow-hidden">
              {/* The Sliding Background Pill - hidden during checking and result display */}
              <div
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-emerald-500/90 rounded-full shadow-sm transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${(isCheckingSource || checkResult) ? 'opacity-0' : 'opacity-100'
                  } ${source === 'github' ? 'translate-x-[100%] left-1' : 'translate-x-0 left-1'}`}
              />

              {/* Checking State Overlay */}
              {(isCheckingSource || checkResult) && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 z-20">
                  <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold">
                    {isCheckingSource ? (
                      <>
                        <div className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                        <span className="text-slate-400">{lang === 'en' ? 'Checking...' : '检测中...'}</span>
                      </>
                    ) : checkResult === 'success' ? (
                      <>
                        <span className="text-emerald-400">✓</span>
                        <span className="text-emerald-400">{lang === 'en' ? 'Main OK' : '主线可用'}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-amber-400">!</span>
                        <span className="text-amber-400">{lang === 'en' ? 'Use GitHub' : '使用备用'}</span>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Main Option */}
              <button
                onClick={() => setSource('main')}
                disabled={isCheckingSource || checkResult !== null}
                className={`relative z-10 w-14 py-1.5 text-[10px] md:text-xs font-bold tracking-wider rounded-full transition-all duration-300 text-center ${(isCheckingSource || checkResult) ? 'opacity-0' : 'opacity-100'
                  } ${source === 'main' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                title={lang === 'en' ? 'Main Server' : '主线服务器'}
              >
                {lang === 'en' ? 'Main' : '主线'}
              </button>

              {/* GitHub Option */}
              <button
                onClick={() => setSource('github')}
                disabled={isCheckingSource || checkResult !== null}
                className={`relative z-10 w-14 py-1.5 text-[10px] md:text-xs font-bold tracking-wider rounded-full transition-all duration-300 text-center ${(isCheckingSource || checkResult) ? 'opacity-0' : 'opacity-100'
                  } ${source === 'github' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                title="GitHub Pages"
              >
                GitHub
              </button>
            </div>

            {/* Language Switcher */}
            <div className="relative flex items-center p-1 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-full shadow-lg">
              {/* The Sliding Background Pill */}
              <div
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-indigo-500/90 rounded-full shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${lang === 'zh' ? 'translate-x-[100%] left-1' : 'translate-x-0 left-1'
                  }`}
              />

              {/* EN Option */}
              <button
                onClick={() => setLang('en')}
                className={`relative z-10 w-12 py-1.5 text-[10px] md:text-xs font-bold tracking-wider rounded-full transition-colors duration-300 ${lang === 'en' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
              >
                EN
              </button>

              {/* ZH Option */}
              <button
                onClick={() => setLang('zh')}
                className={`relative z-10 w-12 py-1.5 text-[10px] md:text-xs font-bold tracking-wider rounded-full transition-colors duration-300 ${lang === 'zh' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
              >
                中文
              </button>
            </div>
          </div>

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