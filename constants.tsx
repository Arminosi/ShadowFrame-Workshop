import React from 'react';
import { ToolData } from './types';
import { GifIcon, CollageIcon, SliceIcon, ImageEditIcon } from './components/Icons';

export const TOOLS: ToolData[] = [
  {
    id: 'gifbuilder',
    name: {
      en: 'GifBuilder',
      zh: 'GifBuilder 动画制作'
    },
    category: {
      en: 'GIF',
      zh: '动图'
    },
    description: {
      en: 'Create high-quality GIFs from videos or image sequences with precise frame control.',
      zh: '通过视频或图像序列创建高质量 GIF，提供精准的帧控制功能。'
    },
    url: 'https://gif.qwq.team',
    icon: <GifIcon className="w-16 h-16" />,
    color: 'text-fuchsia-400',
    bgHover: 'group-hover:bg-fuchsia-500/10',
    border: 'group-hover:border-fuchsia-500/50',
    gradient: 'from-fuchsia-600 to-purple-600',
    titleGradient: 'from-fuchsia-300 via-purple-300 to-fuchsia-300',
    glowColor: 'rgba(232, 121, 249, 0.15)', // Fuchsia
    activeStyles: '!border-fuchsia-500 bg-gradient-to-r from-fuchsia-500/10 via-fuchsia-500/20 to-fuchsia-500/10 bg-[length:200%_100%] animate-flow-gradient shadow-[0_0_20px_rgba(232,121,249,0.3)]',
  },
  {
    id: 'collagepro',
    name: {
      en: 'CollagePro',
      zh: 'CollagePro 拼图专家'
    },
    category: {
      en: 'Collage',
      zh: '拼图'
    },
    description: {
      en: 'Quickly stitch multiple images together. Ideal for long article images and sprite sheets.',
      zh: '将多个图片快速拼接到一起，适合文章长图拼接和精灵图的制作'
    },
    url: 'https://cp.qwq.team',
    icon: <CollageIcon className="w-16 h-16" />,
    color: 'text-cyan-400',
    bgHover: 'group-hover:bg-cyan-500/10',
    border: 'group-hover:border-cyan-500/50',
    gradient: 'from-cyan-500 to-blue-600',
    titleGradient: 'from-cyan-300 via-blue-300 to-cyan-300',
    glowColor: 'rgba(34, 211, 238, 0.15)', // Cyan
    activeStyles: '!border-cyan-500 bg-gradient-to-r from-cyan-500/10 via-cyan-500/20 to-cyan-500/10 bg-[length:200%_100%] animate-flow-gradient shadow-[0_0_20px_rgba(34,211,238,0.3)]',
  },
  {
    id: 'spriteslicer',
    name: {
      en: 'SpriteSlicer',
      zh: 'SpriteSlicer 精灵切片'
    },
    category: {
      en: 'Slice',
      zh: '切图'
    },
    description: {
      en: 'Quickly slice images into independent blocks and automatically number the sequences.',
      zh: '快速将图片切为独立的小块，同时给切片图排上序号'
    },
    url: 'https://ss.qwq.team',
    icon: <SliceIcon className="w-16 h-16" />,
    color: 'text-emerald-400',
    bgHover: 'group-hover:bg-emerald-500/10',
    border: 'group-hover:border-emerald-500/50',
    gradient: 'from-emerald-500 to-green-600',
    titleGradient: 'from-emerald-300 via-green-300 to-emerald-300',
    glowColor: 'rgba(52, 211, 153, 0.15)', // Emerald
    activeStyles: '!border-emerald-500 bg-gradient-to-r from-emerald-500/10 via-emerald-500/20 to-emerald-500/10 bg-[length:200%_100%] animate-flow-gradient shadow-[0_0_20px_rgba(52,211,153,0.3)]',
  },
  {
    id: 'pconverter',
    name: {
      en: 'PConverter',
      zh: 'PConverter 改图工匠'
    },
    category: {
      en: 'Edit',
      zh: '改图'
    },
    description: {
      en: 'Professional image editing tool with cropping, rotation, watermark, and smart export with format conversion.',
      zh: '专业图片编辑工具，支持裁切、旋转、水印添加和智能导出，轻松实现格式转换和压缩'
    },
    url: 'https://pc.qwq.team',
    icon: <ImageEditIcon className="w-16 h-16" />,
    color: 'text-amber-400',
    bgHover: 'group-hover:bg-amber-500/10',
    border: 'group-hover:border-amber-500/50',
    gradient: 'from-amber-500 to-orange-600',
    titleGradient: 'from-amber-300 via-orange-300 to-amber-300',
    glowColor: 'rgba(251, 191, 36, 0.15)', // Amber
    activeStyles: '!border-amber-500 bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 bg-[length:200%_100%] animate-flow-gradient shadow-[0_0_20px_rgba(251,191,36,0.3)]',
  },
];