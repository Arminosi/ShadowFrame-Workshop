import React, { useRef, useState, useEffect } from 'react';
import { ToolData, Language } from '../types';
import { ExternalLinkIcon } from './Icons';

interface ToolCardProps {
  tool: ToolData;
  lang: Language;
  onHover?: (id: string | null) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, lang, onHover }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  // Auto-reset confirmation state after 2 seconds
  useEffect(() => {
    let timer: number;
    if (isConfirming) {
      timer = window.setTimeout(() => {
        setIsConfirming(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isConfirming]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isConfirming) {
      e.preventDefault();
      setIsConfirming(true);
    }
    // If isConfirming is true, allow default browser navigation
  };

  // Styles based on state
  const borderClasses = isConfirming ? tool.activeStyles : `${tool.border} border-slate-800`;
  const animationClasses = isConfirming ? '' : 'hover:scale-[1.02] hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-2xl';
  
  // Text logic
  const ctaTextDesktop = isConfirming 
    ? (lang === 'en' ? 'Click to Confirm' : '再次点击以打开')
    : (lang === 'en' ? 'Open Tool' : '打开工具');

  const ctaTextMobile = lang === 'en' ? 'Click to Go' : '点击前往';

  return (
    <a
      ref={cardRef}
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onMouseEnter={() => onHover && onHover(tool.id)}
      onMouseLeave={() => onHover && onHover(null)}
      // Mobile: flex-row, fixed short height (h-24), small padding. Desktop: flex-col, tall height (h-28rem), large padding.
      className={`group relative flex flex-row md:flex-col items-center md:items-stretch md:justify-between h-24 md:h-[28rem] p-4 md:p-8 rounded-2xl md:rounded-3xl bg-slate-900/80 backdrop-blur-sm overflow-hidden transition-all duration-300 ${borderClasses} ${animationClasses}`}
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      } as React.CSSProperties}
    >
      {/* Tracking Spotlight Glow */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${tool.glowColor}, transparent 40%)`
        }}
        aria-hidden="true"
      />

      {/* Background Glow Effect */}
      <div 
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${tool.gradient} z-0`} 
      />
      
      {/* Gradient Borders - Only show when NOT confirming to avoid clash with solid active border */}
      {!isConfirming && (
        <>
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${tool.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10`} />
          <div className={`absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r ${tool.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right z-10`} />
        </>
      )}

      {/* Content Container */}
      <div className="relative z-10 flex md:flex-col flex-row items-center md:items-start w-full h-full md:h-auto">
        
        {/* Top Section: Icon & Category */}
        <div className="flex md:flex-row flex-col md:justify-between md:items-start w-auto md:w-full mr-4 md:mr-0 md:mb-8 shrink-0">
          <div className="flex items-center gap-3 md:gap-5">
            {/* Icon Wrapper: Smaller on mobile */}
            <div className={`p-2 md:p-4 rounded-xl md:rounded-2xl bg-slate-950/50 border border-slate-800 transition-colors duration-500 ${tool.color} ${tool.bgHover} ${tool.border}`}>
              {/* Clone icon to modify className for size adjustment */}
              {React.cloneElement(tool.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8 md:w-16 md:h-16" })}
            </div>
            
            {/* Category Title: Only visible in header row on Desktop. On mobile, it sits next to icon. */}
            <span className={`hidden md:block text-4xl font-extrabold tracking-tight opacity-90 ${tool.color}`}>
              <span key={lang} className="animate-fade-in inline-block">
                {tool.category[lang]}
              </span>
            </span>
          </div>
          
          {/* Desktop External Link Icon (Hidden on mobile here, moved to right) */}
          <div className={`hidden md:block opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 ${tool.color}`}>
             <ExternalLinkIcon className="w-6 h-6" />
          </div>
        </div>

        {/* Middle/Right Section: Texts */}
        <div className="flex flex-col flex-1 min-w-0 justify-center md:justify-start h-full md:h-auto">
          {/* Mobile Category Title (Shows here on mobile) */}
          <span className={`md:hidden text-lg font-bold tracking-tight mb-0.5 ${tool.color}`}>
              <span key={lang} className="animate-fade-in inline-block">
                {tool.category[lang]}
              </span>
          </span>

          <div className="relative">
             {/* Static Base Layer */}
            <h2 className="text-xs text-slate-400 md:text-slate-100 md:text-3xl font-bold tracking-tight transition-opacity duration-300 md:group-hover:opacity-0 truncate">
              <span key={lang} className="animate-fade-in inline-block">
                {tool.name[lang]}
              </span>
            </h2>
            {/* Hover Gradient Layer (Desktop only effect) */}
            <h2 
              className={`hidden md:block absolute inset-0 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${tool.gradient} tracking-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none pointer-events-none`}
              aria-hidden="true"
            >
              <span key={lang} className="animate-fade-in block truncate">
                {tool.name[lang]}
              </span>
            </h2>
          </div>

          {/* Description: Hidden on Mobile */}
          <p className="hidden md:block mt-4 text-slate-400 text-lg leading-relaxed group-hover:text-slate-300 transition-colors">
            <span key={lang} className="animate-fade-in block">
              {tool.description[lang]}
            </span>
          </p>

          {/* Desktop CTA: Hidden on Mobile */}
          <div className={`hidden md:flex mt-auto pt-8 items-center gap-2 text-sm font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 ${isConfirming ? '!opacity-100 !translate-y-0' : ''}`}>
              <span className={`${tool.color}`}>
                <span key={ctaTextDesktop} className="animate-fade-in inline-block">
                  {ctaTextDesktop}
                </span>
              </span>
              <span className={`${tool.color}`}>&rarr;</span>
          </div>
        </div>

        {/* Mobile Right Action (Visible only on mobile) */}
        <div className="md:hidden ml-auto pl-2 shrink-0">
            {isConfirming ? (
               <span className={`text-xs font-bold whitespace-nowrap px-2 py-1 rounded bg-slate-950/50 ${tool.color} animate-pulse`}>
                 <span key={ctaTextMobile} className="animate-fade-in inline-block">
                    {ctaTextMobile}
                 </span>
               </span>
            ) : (
               <ExternalLinkIcon className={`w-5 h-5 opacity-50 ${tool.color}`} />
            )}
        </div>
      </div>
      
      {/* Decorative Blob: Hidden on mobile to save rendering/visual noise */}
      <div className={`hidden md:block absolute -bottom-16 -right-16 w-40 h-40 rounded-full blur-[80px] opacity-20 bg-gradient-to-r ${tool.gradient} group-hover:opacity-40 transition-opacity duration-500 z-0`} />
    </a>
  );
};

export default ToolCard;