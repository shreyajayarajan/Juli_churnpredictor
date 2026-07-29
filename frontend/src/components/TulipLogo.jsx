import React from 'react';

export const TulipLogo = ({ className = "w-9 h-9", size = 36 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 36 36" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Oval White Pearl Background */}
      <ellipse 
        cx="18" 
        cy="18" 
        rx="17" 
        ry="15" 
        fill="url(#pearl-gradient)" 
        stroke="#E8E5DF" 
        strokeWidth="1.2"
      />
      
      {/* Stem & Leaves (Burgundy Dark Stem) */}
      <path 
        d="M18 19C18 24 16 27 15 30" 
        stroke="#800020" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <path 
        d="M18 22C21 21 23 19.5 24 18" 
        stroke="#800020" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
      />
      <path 
        d="M18 24C14 23 12 21 11 19" 
        stroke="#800020" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
      />
      
      {/* Left Petal (Burgundy) */}
      <path 
        d="M18 19C13 19 9.5 15 10.5 9C14.5 9 17 12 18 15Z" 
        fill="#800020" 
      />
      
      {/* Right Petal (Gold / Warm Yellow) */}
      <path 
        d="M18 19C23 19 26.5 15 25.5 9C21.5 9 19 12 18 15Z" 
        fill="#FFCE1B" 
      />
      
      {/* Center Main Petal (Gradient Terracotta to Rust) */}
      <path 
        d="M18 20C14.5 20 13 14 18 5C23 14 21.5 20 18 20Z" 
        fill="url(#center-petal-grad)" 
      />

      <defs>
        {/* White Pearl Soft Gradient */}
        <radialGradient id="pearl-gradient" cx="30%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#FDFBF7" />
          <stop offset="100%" stopColor="#E8E5DF" />
        </radialGradient>
        
        {/* Center Petal Gradient */}
        <linearGradient id="center-petal-grad" x1="18" y1="5" x2="18" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#BE5103" />
          <stop offset="60%" stopColor="#A52A2A" />
          <stop offset="100%" stopColor="#800020" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default TulipLogo;
