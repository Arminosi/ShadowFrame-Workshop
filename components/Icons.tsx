import React from 'react';

// Common props interface
interface IconProps {
  className?: string;
}

export const GifIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* 
      Gif Animation:
      Concept: A stream of blocks that move left-to-right.
      Effect: Blocks scale up when passing the center and scale down at the edges.
      Implementation: 
      - Use `animate-traverse` which moves a block 32px (4 steps of 8px) and scales it up at 50% (16px, center).
      - Use 4 blocks with negative delays (-0s, -1s, -2s, -3s) to create a continuous chain.
      - Use `paused` state by default to show a perfectly aligned static frame, `running` on hover.
    */}

    <defs>
      <linearGradient id="gif-fade-mask" x1="0" y1="0" x2="100%" y2="0">
        <stop offset="0%" stopColor="white" stopOpacity="0.3" />
        <stop offset="20%" stopColor="white" stopOpacity="0.3" />
        <stop offset="50%" stopColor="white" stopOpacity="1" />
        <stop offset="80%" stopColor="white" stopOpacity="0.3" />
        <stop offset="100%" stopColor="white" stopOpacity="0.3" />
      </linearGradient>
      <mask id="gif-scrolling-mask">
        <rect x="0" y="0" width="24" height="24" fill="url(#gif-fade-mask)" />
      </mask>
    </defs>

    {/* The Track Container */}
    <g mask="url(#gif-scrolling-mask)">
      {/* 
          We place 4 identical squares starting at x=-4.
          The 'traverse' animation moves them 0 -> 32px over 4s.
          Center of travel is +16px (x=12), where they scale to 1.25x.
          
          Delay calculation:
          0s:  Start at -4px.
          -1s: Start at 4px.
          -2s: Start at 12px (Center, Large).
          -3s: Start at 20px.
      */}
      {[0, -1, -2, -3].map((delay) => (
        <rect 
          key={delay}
          x="-4" y="9" width="6" height="6" rx="1.5" 
          className="fill-current stroke-none animate-traverse [animation-play-state:paused] group-hover:[animation-play-state:running] origin-center"
          style={{ animationDelay: `${delay}s`, transformBox: 'fill-box' }}
        />
      ))}
    </g>

    {/* Top/Bottom boundary hints */}
    <path d="M7 5h10" className="opacity-20" strokeLinecap="round" />
    <path d="M7 19h10" className="opacity-20" strokeLinecap="round" />
  </svg>
);

export const CollageIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* 
        Collage Animation:
        Default state: Gently scattered/stacked tiles (subtle chaos).
        Hover state: Aligned neatly into a grid (order).
    */}

    {/* Background Grid Hint (fades in) - Added strokeDashoffset="2" to center the dashes on the sides, ensuring corners are solid L-shapes */}
    <rect x="4" y="4" width="16" height="16" strokeDasharray="4 4" strokeDashoffset="2" className="stroke-current opacity-0 group-hover:opacity-20 transition-opacity duration-700" />

    {/* Top Left Tile */}
    <rect 
      x="5" y="5" width="6" height="6" rx="1.5" 
      className="fill-current stroke-none transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) origin-center
                 opacity-60 -translate-x-1 -translate-y-1 -rotate-6
                 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-0" 
    />

    {/* Top Right Tile */}
    <rect 
      x="13" y="5" width="6" height="6" rx="1.5" 
      className="fill-current stroke-none transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) origin-center
                 opacity-50 translate-x-1 -translate-y-1 rotate-6
                 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-0" 
    />

    {/* Bottom Left Tile */}
    <rect 
      x="5" y="13" width="6" height="6" rx="1.5" 
      className="fill-current stroke-none transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) origin-center
                 opacity-50 -translate-x-1 translate-y-1 rotate-6
                 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-0" 
    />

    {/* Bottom Right Tile */}
    <rect 
      x="13" y="13" width="6" height="6" rx="1.5" 
      className="fill-current stroke-none transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) origin-center
                 opacity-60 translate-x-1 translate-y-1 -rotate-6
                 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-0" 
    />
  </svg>
);

export const SliceIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* 
        Slice Animation:
        Default state: A solid square block.
        Hover state: The blocks separate slightly (cracking open), 
        revealing the space between them.
        Movement is tight (1.5 units) to look like a precise cut.
    */}

    {/* Hidden Cut Lines that appear */}
    <path d="M12 4v16M4 12h16" className="stroke-current opacity-0 scale-75 group-hover:scale-100 group-hover:opacity-40 transition-all duration-500 delay-75 origin-center" strokeDasharray="2 2" strokeDashoffset="1" />

    {/* Top Left */}
    <rect 
      x="7" y="7" width="4.5" height="4.5" rx="1"
      className="fill-current stroke-none transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) origin-center
                 opacity-80
                 group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 group-hover:opacity-100"
    />
    
    {/* Top Right */}
    <rect 
      x="12.5" y="7" width="4.5" height="4.5" rx="1"
      className="fill-current stroke-none transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) origin-center
                 opacity-80
                 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 group-hover:opacity-100"
    />
    
    {/* Bottom Left */}
    <rect 
      x="7" y="12.5" width="4.5" height="4.5" rx="1"
      className="fill-current stroke-none transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) origin-center
                 opacity-80
                 group-hover:-translate-x-1.5 group-hover:translate-y-1.5 group-hover:opacity-100"
    />
    
    {/* Bottom Right */}
    <rect 
      x="12.5" y="12.5" width="4.5" height="4.5" rx="1"
      className="fill-current stroke-none transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) origin-center
                 opacity-80
                 group-hover:translate-x-1.5 group-hover:translate-y-1.5 group-hover:opacity-100"
    />
  </svg>
);

export const ExternalLinkIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const ImageEditIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* 
        Image Edit Animation:
        Default state: A photo frame with mountain/sun scene.
        Hover state: Editing overlay appears with crop corners and adjustment sliders.
    */}

    {/* Main Photo Frame */}
    <rect 
      x="4" y="4" width="16" height="16" rx="2"
      className="stroke-current transition-all duration-500"
    />

    {/* Photo Content - Mountain and Sun */}
    <g className="transition-all duration-500 group-hover:opacity-60 group-hover:scale-75 origin-center" style={{ transformBox: 'fill-box' }}>
      {/* Sun/Circle */}
      <circle cx="9" cy="9" r="2" className="fill-current opacity-40" />
      
      {/* Mountain - simple triangle peaks */}
      <path 
        d="M4 16 L8 10 L12 14 L16 8 L20 16" 
        className="fill-current opacity-30 stroke-none"
      />
      <path 
        d="M4 16 L8 10 L12 14 L16 8 L20 16" 
        className="stroke-current opacity-50"
        strokeWidth="1"
        fill="none"
      />
    </g>

    {/* Edit Overlay - Crop Corners (appear on hover) */}
    <g className="opacity-0 group-hover:opacity-100 transition-all duration-500">
      <path d="M6 8V6h2" className="stroke-current" strokeWidth="2" />
      <path d="M18 6h-2M18 6v2" className="stroke-current" strokeWidth="2" />
      <path d="M6 18v-2M6 18h2" className="stroke-current" strokeWidth="2" />
      <path d="M18 18h-2M18 18v-2" className="stroke-current" strokeWidth="2" />
    </g>
  </svg>
);

export const CompressIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* 
        Compress Animation:
        Default state: A full-size image block.
        Hover state: Arrows press inward, the block shrinks, showing compression effect.
    */}

    {/* Central Block - shrinks on hover */}
    <rect 
      x="7" y="7" width="10" height="10" rx="2"
      className="fill-current opacity-60 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) origin-center
                 group-hover:scale-75 group-hover:opacity-100"
      style={{ transformBox: 'fill-box' }}
    />

    {/* Compression Arrows - appear and move inward on hover */}
    {/* Top Arrow */}
    <path 
      d="M12 2v4M9 4l3 2 3-2" 
      className="opacity-0 translate-y-1 group-hover:opacity-80 group-hover:translate-y-0 transition-all duration-500"
    />
    
    {/* Bottom Arrow */}
    <path 
      d="M12 22v-4M9 20l3-2 3 2" 
      className="opacity-0 -translate-y-1 group-hover:opacity-80 group-hover:translate-y-0 transition-all duration-500"
    />
    
    {/* Left Arrow */}
    <path 
      d="M2 12h4M4 9l2 3-2 3" 
      className="opacity-0 translate-x-1 group-hover:opacity-80 group-hover:translate-x-0 transition-all duration-500"
    />
    
    {/* Right Arrow */}
    <path 
      d="M22 12h-4M20 9l-2 3 2 3" 
      className="opacity-0 -translate-x-1 group-hover:opacity-80 group-hover:translate-x-0 transition-all duration-500"
    />

    {/* Corner hints - subtle decorations */}
    <g className="opacity-20 group-hover:opacity-40 transition-opacity duration-500">
      <path d="M5 5L7 7" />
      <path d="M19 5L17 7" />
      <path d="M5 19L7 17" />
      <path d="M19 19L17 17" />
    </g>
  </svg>
);

export const GithubIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);