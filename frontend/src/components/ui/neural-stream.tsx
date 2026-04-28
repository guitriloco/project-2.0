"use client";

import React, { useRef, useEffect } from "react";

export function NeuralStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = new Array(columns).fill(1);

    const chars = "01ABCDEFあいうえおかきくけこサシスセソ0123456789";

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = "12px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Color based on "neural intensity"
        const intensity = Math.random();
        if (intensity > 0.95) {
          ctx.fillStyle = "#fff"; // Bright flash
        } else if (intensity > 0.8) {
          ctx.fillStyle = "#00f2ff"; // Cyan pulse
        } else {
          ctx.fillStyle = "#0a3c42"; // Dim teal
        }

        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden border border-cyan-500/20">
      <canvas ref={canvasRef} className="w-full h-full opacity-40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded border border-cyan-500/30">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
            <span className="text-[10px] font-bold text-cyan-400 tracking-[0.3em] uppercase">
              Neural Stream [P-72]
            </span>
          </div>
          <div className="text-[9px] text-gray-500 font-mono">
            BANDWIDTH: 4.8 TB/s // SYNC: STABLE
          </div>
        </div>
      </div>
    </div>
  );
}
