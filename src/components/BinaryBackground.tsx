import React, { useEffect, useRef } from 'react';

interface BinaryBackgroundProps {
  opacity?: number;
}

export default function BinaryBackground({ opacity = 0.4 }: BinaryBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set full screen dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters: Binary 0 and 1
    const chars = ['0', '1'];
    const fontSize = 14;
    
    // Columns calculated based on screen width and font size
    let columns = Math.floor(canvas.width / fontSize);
    let drops: number[] = Array(columns).fill(1).map(() => Math.floor(Math.random() * -30));

    // Monitor screen resize to recalculate columns
    const handleResize = () => {
      resizeCanvas();
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1).map(() => Math.floor(Math.random() * -30));
    };
    window.addEventListener('resize', handleResize);

    // Animation function
    let animationFrameId: number;
    const draw = () => {
      // Semi-transparent black background to create trail effect
      ctx.fillStyle = 'rgba(22, 28, 44, 0.08)'; // #161c2c matches user's theme
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Low opacity green text
      ctx.fillStyle = 'rgba(159, 239, 0, 0.15)'; // Low opacity neon-green #9fef00
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random binary digit
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Calculate x and y coordinates
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Occasional highlighted bright glowing drops at the bottom of streams
        if (Math.random() > 0.98) {
          ctx.fillStyle = 'rgba(159, 239, 0, 0.85)';
        } else {
          ctx.fillStyle = 'rgba(159, 239, 0, 0.12)';
        }

        ctx.fillText(text, x, y);

        // Reset drop position back to top after it leaves screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment drop index
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none select-none z-0"
      style={{ opacity, transition: 'opacity 1s ease-in-out' }}
      id="binary-background-canvas"
    />
  );
}
