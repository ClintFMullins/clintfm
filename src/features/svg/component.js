import React from 'react';

export function tutorialSVG() {
  return (
    <svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
      <radialGradient id="Gradient"
            cx="0.5" cy="0.5" r="0.5" fx="0.75" fy="0.25" spreadMethod="reflect">
        <stop offset="0%" stop-color="red"/>
        <stop offset="100%" stop-color="blue"/>
      </radialGradient>
    </defs>
    <rect x="10" y="10"  width="100" height="100" fill="url(#Gradient)" />
    <text x="60" y="60" textAnchor="middle">Hello World!</text>
</svg>
  );  
}