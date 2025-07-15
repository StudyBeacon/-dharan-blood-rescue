
import React from 'react';

interface HealthcareLogoProps {
  size?: number;
  className?: string;
}

const HealthcareLogo = ({ size = 32, className = '' }: HealthcareLogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer shield/circular shape with gradient */}
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3"/>
        </filter>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5f5f5" />
          <stop offset="100%" stopColor="#e0e0e0" />
        </linearGradient>
        <linearGradient id="bloodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E53935" />
          <stop offset="100%" stopColor="#c62828" />
        </linearGradient>
      </defs>
      
      {/* Shield/circular base */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="url(#shieldGradient)"
        stroke="#d0d0d0"
        strokeWidth="1"
        filter="url(#shadow)"
      />
      
      {/* Inner white circle for contrast */}
      <circle
        cx="50"
        cy="50"
        r="42"
        fill="white"
        opacity="0.9"
      />
      
      {/* Central blood drop */}
      <path
        d="M50 25 C45 30, 40 35, 40 42 C40 48, 45 52, 50 52 C55 52, 60 48, 60 42 C60 35, 55 30, 50 25 Z"
        fill="url(#bloodGradient)"
      />
      
      {/* ECG heartbeat line */}
      <path
        d="M15 50 L25 50 L30 40 L35 60 L40 30 L45 65 L50 45 L55 35 L60 70 L65 40 L70 50 L85 50"
        stroke="#E53935"
        strokeWidth="2"
        fill="none"
        opacity="0.8"
      />
      
      {/* Small ambulance icon (top-right) */}
      <g transform="translate(65, 20) scale(0.8)">
        <rect x="0" y="8" width="20" height="8" fill="#E53935" rx="1"/>
        <rect x="2" y="6" width="4" height="4" fill="white"/>
        <circle cx="5" cy="18" r="2" fill="#666"/>
        <circle cx="15" cy="18" r="2" fill="#666"/>
        <path d="M8 10 L12 10 M10 8 L10 12" stroke="white" strokeWidth="1.5"/>
      </g>
      
      {/* GPS location pin (bottom-left) */}
      <g transform="translate(20, 65) scale(0.9)">
        <path
          d="M8 0 C12 0, 16 4, 16 8 C16 12, 8 20, 8 20 S0 12, 0 8 C0 4, 4 0, 8 0 Z"
          fill="#E53935"
        />
        <circle cx="8" cy="8" r="3" fill="white"/>
      </g>
    </svg>
  );
};

export default HealthcareLogo;
