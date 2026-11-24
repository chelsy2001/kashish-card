import React from 'react';
import sectionsStyles from '../styles/sections.json';

export function Mandala({ className }) {
  return (
    <svg className={className} viewBox="-100 -100 200 200" aria-hidden="true" focusable="false">
      <circle r="96" />
      <circle r="90" strokeDasharray="1 4" />
      {Array.from({ length: 24 }, (_, t) => (
        <path key={`o${t}`} transform={`rotate(${15 * t})`} d="M0 -62 C9 -70 9 -80 0 -88 C-9 -80 -9 -70 0 -62Z" />
      ))}
      {Array.from({ length: 12 }, (_, t) => (
        <path key={`i${t}`} transform={`rotate(${30 * t + 15})`} d="M0 -50 C7 -54 7 -58 0 -62 C-7 -58 -7 -54 0 -50Z" />
      ))}
      <circle r="50" />
    </svg>
  );
}

export function BackdropMandala({ className }) {
  return (
    <svg className={className} viewBox="-100 -100 200 200" aria-hidden="true" focusable="false">
      <circle r="98" />
      <circle r="94" strokeDasharray="0.6 3" />
      {Array.from({ length: 32 }, (_, t) => (
        <path key={`a${t}`} transform={`rotate(${11.25 * t})`} d="M0 -72 C5 -78 5 -86 0 -92 C-5 -86 -5 -78 0 -72Z" />
      ))}
      <circle r="70" />
      {Array.from({ length: 16 }, (_, t) => (
        <path key={`b${t}`} transform={`rotate(${22.5 * t + 11.25})`} d="M0 -46 C10 -52 10 -62 0 -68 C-10 -62 -10 -52 0 -46Z" />
      ))}
      <circle r="44" strokeDasharray="0.6 2.4" />
      {Array.from({ length: 8 }, (_, t) => (
        <path key={`c${t}`} transform={`rotate(${45 * t})`} d="M0 -18 C12 -24 12 -36 0 -42 C-12 -36 -12 -24 0 -18Z" />
      ))}
      <circle r="16" />
    </svg>
  );
}

export function Flourish({ className }) {
  return (
    <svg className={className || sectionsStyles.flourish} viewBox="0 0 220 18" aria-hidden="true" focusable="false">
      <path d="M4 9 H88" />
      <path d="M132 9 H216" />
      <path d="M92 9 q9 -8 18 0 q9 8 18 0" />
      <circle className={sectionsStyles.gem} cx="88" cy="9" r="1.8" />
      <circle className={sectionsStyles.gem} cx="132" cy="9" r="1.8" />
      <path className={sectionsStyles.gem} d="M110 3 l4 6 -4 6 -4 -6z" />
    </svg>
  );
}

export function PinBadge() {
  return (
    <span className={sectionsStyles.pinBadge} aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false" className={sectionsStyles.pin} width="16" height="16">
        <path d="M12 22s-7-6.6-7-12a7 7 0 0 1 14 0c0 5.4-7 12-7 12z" fill="currentColor" />
        <circle cx="12" cy="10" r="2.6" fill="#fff" />
      </svg>
    </span>
  );
}

export function CameraIcon() {
  return (
    <svg className={sectionsStyles.camera} viewBox="0 0 48 48" aria-hidden="true" focusable="false" width="48" height="48">
      <rect x="5" y="14" width="38" height="27" rx="6" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M17 14l3-5h8l3 5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="24" cy="27.5" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="27.5" r="3.6" className={sectionsStyles.cameraLens} fill="currentColor" />
      <circle cx="36.5" cy="20" r="1.8" fill="currentColor" />
    </svg>
  );
}

export function FloralSprig({ className }) {
  const sprigPoints = Array.from({ length: 16 }, (_, a) => {
    const t = a % 2 ? -1 : 1;
    const s = 1 - a / 22;
    return {
      x: 58 + 3.6 * a,
      y: 20 + 2.6 * t * s,
      r: 7 * a * t,
      rx: 2.6 * s + 0.6,
      ry: 4.2 * s + 0.8
    };
  });

  return (
    <svg className={className} viewBox="0 0 124 40" aria-hidden="true" focusable="false">
      <path d="M2 21 C40 20 80 19 121 19" fill="none" stroke="#6f7f4f" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M30 20.6 C36 12 44 10 50 11 C45 15 38 19 30 20.6Z" fill="#8a9a64" />
      {sprigPoints.map((pt, idx) => (
        <ellipse
          key={idx}
          cx={pt.x}
          cy={pt.y}
          rx={pt.rx}
          ry={pt.ry}
          transform={`rotate(${pt.r + 90} ${pt.x} ${pt.y})`}
          fill={idx % 3 === 0 ? "#d9c8f3" : idx % 3 === 1 ? "#a98ad8" : "#7a58b6"}
        />
      ))}
    </svg>
  );
}
