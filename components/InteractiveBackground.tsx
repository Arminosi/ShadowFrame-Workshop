import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  pulsePhase: number;
}

interface InteractiveBackgroundProps {
  hoveredToolId: string | null;
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ hoveredToolId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const [mounted, setMounted] = useState(false);

  // 根据悬停的卡片改变颜色主题
  const getColorScheme = () => {
    if (!hoveredToolId) {
      return {
        primary: 'rgba(99, 102, 241, 0.15)',    // indigo
        secondary: 'rgba(139, 92, 246, 0.12)',  // purple
        accent: 'rgba(168, 85, 247, 0.1)'       // violet
      };
    }
    
    // 根据不同工具返回不同颜色
    const colorMap: Record<string, any> = {
      'gif-maker': {
        primary: 'rgba(251, 146, 60, 0.15)',   // orange
        secondary: 'rgba(249, 115, 22, 0.12)',
        accent: 'rgba(234, 88, 12, 0.1)'
      },
      'collage-maker': {
        primary: 'rgba(34, 211, 238, 0.15)',   // cyan
        secondary: 'rgba(6, 182, 212, 0.12)',
        accent: 'rgba(14, 165, 233, 0.1)'
      },
      'image-slicer': {
        primary: 'rgba(244, 114, 182, 0.15)',  // pink
        secondary: 'rgba(236, 72, 153, 0.12)',
        accent: 'rgba(219, 39, 119, 0.1)'
      }
    };
    
    return colorMap[hoveredToolId] || colorMap['gif-maker'];
  };

  // 初始化粒子
  const initParticles = (width: number, height: number) => {
    const particles: Particle[] = [];
    const particleCount = Math.floor((width * height) / 15000); // 根据屏幕大小调整粒子数量
    
    const colors = Object.values(getColorScheme()) as string[];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
    
    particlesRef.current = particles;
  };

  // 动画循环
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { width, height } = canvas;
    const mouse = mouseRef.current;
    const particles = particlesRef.current;
    const colors = getColorScheme();
    
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    
    // 更新和绘制粒子
    particles.forEach((particle, i) => {
      // 粒子移动
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // 边界检测
      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;
      
      // 鼠标交互 - 粒子被吸引或排斥
      if (mouse.active) {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;
        
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          // 排斥效果
          particle.vx -= (dx / distance) * force * 0.5;
          particle.vy -= (dy / distance) * force * 0.5;
          
          // 增加靠近鼠标的粒子亮度
          particle.opacity = Math.min(0.8, particle.opacity + force * 0.3);
        } else {
          // 恢复原始透明度
          particle.opacity = Math.max(0.2, particle.opacity - 0.02);
        }
      }
      
      // 限制速度
      const maxSpeed = 1;
      const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
      if (speed > maxSpeed) {
        particle.vx = (particle.vx / speed) * maxSpeed;
        particle.vy = (particle.vy / speed) * maxSpeed;
      }
      
      // 脉动效果
      particle.pulsePhase += 0.02;
      const pulse = Math.sin(particle.pulsePhase) * 0.3 + 1;
      
      // 根据悬停状态更新颜色
      const colorValues = Object.values(colors);
      particle.color = colorValues[i % colorValues.length];
      
      // 绘制粒子
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * pulse, 0, Math.PI * 2);
      ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${particle.opacity})`);
      ctx.fill();
      
      // 连接附近的粒子
      particles.slice(i + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          const opacity = (1 - distance / 120) * 0.15;
          ctx.strokeStyle = particle.color.replace(/[\d.]+\)$/, `${opacity})`);
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
      
      // 连接到鼠标
      if (mouse.active) {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouse.x, mouse.y);
          const opacity = (1 - distance / 150) * 0.3;
          ctx.strokeStyle = particle.color.replace(/[\d.]+\)$/, `${opacity})`);
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    });
    
    // 在鼠标位置绘制光晕
    if (mouse.active) {
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100);
      gradient.addColorStop(0, colors.primary.replace(/[\d.]+\)$/, '0.2)'));
      gradient.addColorStop(0.5, colors.secondary.replace(/[\d.]+\)$/, '0.1)'));
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(mouse.x - 100, mouse.y - 100, 200, 200);
    }
    
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // 处理窗口大小变化
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    initParticles(canvas.width, canvas.height);
  };

  // 鼠标移动处理
  const handleMouseMove = (e: MouseEvent) => {
    mouseRef.current = {
      x: e.clientX,
      y: e.clientY,
      active: true
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // 初始化画布
    handleResize();
    
    // 添加事件监听
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // 开始动画
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // 当悬停工具改变时，更新粒子颜色（通过动画循环自然过渡）
  useEffect(() => {
    if (!mounted) return;
    // 颜色会在下一帧动画中自动更新
  }, [hoveredToolId, mounted]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

export default InteractiveBackground;
