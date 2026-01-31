import React, { useRef, useState, useEffect } from 'react';
import { ToolData, Language, Source } from '../types';
import { ExternalLinkIcon } from './Icons';

interface ToolCardProps {
  tool: ToolData;
  lang: Language;
  source?: Source;
  githubUrl?: string;
  onHover?: (id: string | null) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, lang, source = 'main', githubUrl, onHover }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const rafRef = useRef<number>();

  // Determine the actual URL based on source
  const actualUrl = source === 'github' && githubUrl ? githubUrl : tool.url;

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

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;

    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Use requestAnimationFrame for smooth updates
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty('--mouse-x', `${x}px`);
      cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    });
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
  // When confirming, keep the card scaled up; otherwise use hover effects
  const animationClasses = isConfirming
    ? 'scale-[1.02] -translate-y-1 md:-translate-y-2 shadow-2xl'
    : 'hover:scale-[1.02] hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-2xl';

  // Text logic
  const ctaTextDesktop = isConfirming
    ? (lang === 'en' ? 'Click to Confirm' : '再次点击以打开')
    : (lang === 'en' ? 'Open Tool' : '打开工具');

  const ctaTextMobile = lang === 'en' ? 'Click to Go' : '点击前往';

  return (
    <a
      ref={cardRef}
      href={actualUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onMouseEnter={() => onHover && onHover(tool.id)}
      onMouseLeave={() => onHover && onHover(null)}
      // Mobile: flex-row, fixed short height (h-24), small padding. Desktop: flex-col, optimized height, balanced padding.
      className={`group relative flex flex-row md:flex-col items-center md:items-stretch md:justify-between h-24 md:h-[20rem] p-4 md:p-5 rounded-2xl md:rounded-2xl bg-slate-900/80 backdrop-blur-sm overflow-hidden transition-all duration-500 ease-out ${borderClasses} ${animationClasses}`}
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      } as React.CSSProperties}
    >
      {/* Tracking Spotlight Glow - visible on hover and when confirming */}
      <div
        className={`pointer-events-none absolute -inset-px transition-opacity duration-300 ease-out z-0 ${isConfirming ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), ${tool.glowColor.replace('0.15', isConfirming ? '0.4' : '0.15')}, transparent 40%)`,
          willChange: 'opacity'
        }}
        aria-hidden="true"
      />

      {/* Tracking Border Highlight - follows mouse cursor on edges */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 ease-out z-20 opacity-0 group-hover:opacity-70 ${isConfirming ? '!opacity-100' : ''}`}
        style={{
          background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), ${tool.color.includes('fuchsia') ? 'rgba(232, 121, 249, 0.8)' :
            tool.color.includes('cyan') ? 'rgba(34, 211, 238, 0.8)' :
              tool.color.includes('emerald') ? 'rgba(52, 211, 153, 0.8)' :
                tool.color.includes('amber') ? 'rgba(251, 191, 36, 0.8)' :
                  'rgba(251, 113, 133, 0.8)'}, transparent 50%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor',
          padding: '2px',
        }}
        aria-hidden="true"
      />

      {/* Background Glow Effect */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${tool.gradient} z-0`}
      />

      {/* Active/Confirming State Overlay - uses opacity for smooth transition */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} transition-opacity duration-500 ease-out z-0 ${isConfirming ? 'opacity-15' : 'opacity-0'}`}
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="relative z-10 flex md:flex-col flex-row items-center md:items-start w-full h-full md:h-auto">

        {/* Top Section: Icon & Category */}
        <div className="flex md:flex-row flex-col md:justify-between md:items-start w-auto md:w-full mr-4 md:mr-0 md:mb-4 shrink-0">
          <div className="flex items-center gap-2 md:gap-3">
            {/* Icon Wrapper */}
            <div className={`p-2 rounded-xl bg-slate-950/50 border border-slate-800 transition-colors duration-300 ${tool.color} ${tool.bgHover} ${tool.border}`}>
              {/* Clone icon to modify className for size adjustment */}
              {React.cloneElement(tool.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8 md:w-10 md:h-10" })}
            </div>

            {/* Category Title: Only visible in header row on Desktop. On mobile, it sits next to icon. */}
            <span className={`hidden md:block text-xl lg:text-2xl font-extrabold tracking-tight opacity-90 ${tool.color}`}>
              <span key={lang} className="animate-fade-in inline-block">
                {tool.category[lang]}
              </span>
            </span>
          </div>

          {/* Desktop External Link Icon (Hidden on mobile here, moved to right) */}
          <div className={`hidden md:block opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 ${tool.color}`}>
            <ExternalLinkIcon className="w-5 h-5" />
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
            <h2 className={`text-xs md:text-lg lg:text-xl font-bold tracking-tight transition-opacity duration-200 md:group-hover:opacity-0 truncate ${tool.color}`}>
              <span key={lang} className="animate-fade-in inline-block">
                {tool.name[lang]}
              </span>
            </h2>
            {/* Hover Gradient Layer (Desktop only effect) */}
            <h2
              className={`hidden md:block absolute inset-0 text-lg lg:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${tool.gradient} tracking-tight opacity-0 group-hover:opacity-100 transition-opacity duration-200 select-none pointer-events-none`}
              aria-hidden="true"
            >
              <span key={lang} className="animate-fade-in block truncate">
                {tool.name[lang]}
              </span>
            </h2>
          </div>

          {/* Description: Hidden on Mobile */}
          <p className="hidden md:block mt-2 text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors line-clamp-3">
            <span key={lang} className="animate-fade-in block">
              {tool.description[lang]}
            </span>
          </p>

          {/* Desktop CTA: Hidden on Mobile */}
          <div className={`hidden md:flex mt-auto pt-4 items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 ${isConfirming ? '!opacity-100 !translate-y-0' : ''}`}>
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