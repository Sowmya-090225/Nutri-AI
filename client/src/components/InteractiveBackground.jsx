import React, { useEffect, useState, useRef } from 'react';

// Particle Class for click explosion effect
class PopperParticle {
  constructor(x, y, primaryColor) {
    this.x = x;
    this.y = y;

    // Burst in random directions
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 3; // Burst velocity
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed - (Math.random() * 2.5 + 1); // Upward bias for realistic poppers

    // Friction and gravity
    this.friction = 0.96;
    this.gravity = 0.22;

    // Dimensions and rotation
    this.size = Math.random() * 8 + 4;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 15;

    // Opacity decay
    this.alpha = 1;
    this.decay = Math.random() * 0.02 + 0.015;

    // Particle type selection
    this.isEmoji = Math.random() < 0.25; // 25% chance of emoji particle
    if (this.isEmoji) {
      const emojis = ['🎉', '✨', '💥', '🍬', '🥑', '🍎', '💧', '🌟', '🍒'];
      this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
      this.size = Math.random() * 12 + 10; // larger size for readability
    } else {
      // Sleek vibrant colors
      const colors = [
        '#ff2a74', '#05c46b', '#00d2d3', '#ffc048', '#ff3f34', '#575fcf', '#be2edd',
        primaryColor || '#2ecc71'
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.shape = Math.floor(Math.random() * 3); // 0: circle, 1: square, 2: triangle
    }
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.rotation += this.rotationSpeed;
    this.alpha -= this.decay;
  }

  draw(ctx) {
    if (this.alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);

    if (this.isEmoji) {
      ctx.font = `${this.size}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.emoji, 0, 0);
    } else {
      ctx.fillStyle = this.color;
      if (this.shape === 0) {
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.shape === 1) {
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      } else {
        ctx.beginPath();
        ctx.moveTo(0, -this.size / 2);
        ctx.lineTo(this.size / 2, this.size / 2);
        ctx.lineTo(-this.size / 2, this.size / 2);
        ctx.closePath();
        ctx.fill();
      }
    }
    ctx.restore();
  }
}

const InteractiveBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [bgColor, setBgColor] = useState(
    () => localStorage.getItem('bgColor') || '#f4f7f6'
  );
  
  const canvasRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      animationFrameId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;
        setMousePos({ x, y });
      });
    };

    // Listen for background color changes dispatched by ThemeSettings
    const handleBgChange = (e) => {
      setBgColor(e.detail);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('bgColorChange', handleBgChange);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('bgColorChange', handleBgChange);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Set up particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    let animationId = null;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const drawLoop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (particles.length === 0) {
        animationId = null;
        return;
      }

      particles = particles.filter(p => {
        p.update();
        p.draw(ctx);
        return p.alpha > 0;
      });

      animationId = requestAnimationFrame(drawLoop);
    };

    const handleWindowClick = (e) => {
      let x, y;
      if (e.clientX !== undefined) {
        x = e.clientX;
        y = e.clientY;
      } else if (e.touches && e.touches[0]) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        return;
      }

      const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
      
      // Spawn 15-20 particles at cursor location
      const count = 18;
      for (let i = 0; i < count; i++) {
        particles.push(new PopperParticle(x, y, primaryColor));
      }

      if (!animationId) {
        animationId = requestAnimationFrame(drawLoop);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('click', handleWindowClick);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <div
        className="interactive-bg-container"
        style={{ background: 'var(--background)' }}
      >
        {/* Dual radial gradient tint that follows the primary + secondary colors */}
        <div
          className="bg-gradient-layer"
          style={{
            transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`
          }}
        />

        {/* Floating emoji + bubble layer with stronger parallax */}
        <div
          className="bg-floating-elements"
          style={{
            transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)`
          }}
        >
          <span className="float-icon i1">🍎</span>
          <span className="float-icon i2">🥦</span>
          <span className="float-icon i3">💧</span>
          <span className="float-icon i4">🥗</span>
          <span className="float-icon i5">🥑</span>
          <span className="float-icon i6">🍋</span>

          <span className="bg-bubble b1" />
          <span className="bg-bubble b2" />
          <span className="bg-bubble b3" />
          <span className="bg-bubble b4" />
          <span className="bg-bubble b5" />
          <span className="bg-bubble b6" />
        </div>
      </div>

      {/* Interactive click poppers canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 999999,
        }}
      />
    </>
  );
};

export default InteractiveBackground;
