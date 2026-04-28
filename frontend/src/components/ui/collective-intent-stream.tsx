"use client";

import React, { useRef, useEffect } from "react";

export function CollectiveIntentStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      speed: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.speed = Math.random() * 3 + 1;
        this.size = Math.random() * 2 + 0.5;
        const colors = ["#00f2ff", "#7000ff", "#ffffff", "#34d399"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y -= this.speed;
        if (this.y < -10) {
          this.y = canvas.height + 10;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      for (let i = 0; i < 200; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full h-[300px] bg-black rounded-2xl overflow-hidden border border-white/5 relative">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="bg-black/40 backdrop-blur-xl px-8 py-4 rounded-full border border-white/10">
           <h3 className="text-xs font-bold text-white tracking-[0.5em] uppercase">
             Collective Intent Stream [P-194]
           </h3>
           <div className="flex items-center gap-4 mt-2 justify-center">
              <span className="text-[8px] font-mono text-cyan-500 uppercase tracking-widest">Flow: 4.2e9 bits/s</span>
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" />
           </div>
        </div>
      </div>
      
      <div className="absolute top-4 left-4 text-[7px] font-mono text-zinc-800 uppercase tracking-widest">
         Real-time network harmonization active
      </div>
    </div>
  );
}
