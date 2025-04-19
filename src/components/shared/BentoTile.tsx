'use client';

import { useState } from 'react';

interface BentoTileProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoTile({ children, className = '' }: BentoTileProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    // Calculate position relative to element center
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  // Calculate transform based on mouse position
  const transform = `
    perspective(1000px)
    rotateX(${position.y * 4}deg)
    rotateY(${position.x * -4}deg)
    translateZ(10px)
  `;

  return (
    <div
      className={`relative transition-transform duration-200 ease-out ${className}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
