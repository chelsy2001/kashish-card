import React from 'react';
import { useLang } from '../context/LangContext';
import lavenderStyles from '../styles/lavender.json';
import langToggleStyles from '../styles/langToggle.json';
import sectionsStyles from '../styles/sections.json';

const LANG_OPTIONS = [
  { lang: "hi", label: "हिं", name: "हिंदी" },
  { lang: "en", label: "EN", name: "English" }
];

export function NazarAmulet({ shown = true }) {
  return (
    <span 
      className={`${sectionsStyles.nazar || 'nazar'} ${shown ? (sectionsStyles.nazarShown || 'nazarShown') : ''}`} 
      aria-hidden="true"
    >
      <svg viewBox="0 0 40 46" focusable="false" style={{ width: 36, height: 42 }}>
        <defs>
          <radialGradient id="lv-nazar-gold" cx="35%" cy="30%" r="80%">
            <stop offset="0" stopColor="#fbecbb" />
            <stop offset="0.55" stopColor="#d6aa4f" />
            <stop offset="1" stopColor="#9a6f1f" />
          </radialGradient>
        </defs>
        <circle cx="20" cy="5" r="3.4" fill="none" stroke="#c99a3f" strokeWidth="1.8" />
        <circle cx="20" cy="26" r="18" fill="url(#lv-nazar-gold)" />
        <circle cx="20" cy="26" r="15.4" fill="#1f4fae" />
        <circle cx="20" cy="26" r="11" fill="#fdfcf8" />
        <circle cx="20" cy="26" r="7.8" fill="#5fb6e6" />
        <circle cx="20" cy="26" r="4.3" fill="#141428" />
        <circle cx="17.6" cy="23.4" r="1.7" fill="#fff" opacity=".9" />
        <ellipse cx="13.5" cy="17.5" rx="5" ry="2.4" fill="#fff" opacity=".28" transform="rotate(-35 13.5 17.5)" />
      </svg>
    </span>
  );
}

export default function TopBar({ isPlaying, toggleMusic, audioRef }) {
  const { lang, setLang } = useLang();

  return (
    <div className={lavenderStyles.topBar}>
      {/* Language Switcher */}
      <div className={langToggleStyles.toggle} role="group" aria-label="Language / भाषा">
        {LANG_OPTIONS.map(opt => (
          <button
            key={opt.lang}
            type="button"
            className={lang === opt.lang ? langToggleStyles.on : ''}
            aria-pressed={lang === opt.lang}
            aria-label={opt.name}
            onClick={() => setLang(opt.lang)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Music Toggle */}
      <button
        type="button"
        data-music=""
        className={`${lavenderStyles.music} ${isPlaying ? lavenderStyles.musicOn : ''}`}
        onClick={toggleMusic}
        aria-label={isPlaying ? (lang === 'hi' ? 'संगीत रोकें' : 'Pause Music') : (lang === 'hi' ? 'संगीत चलाएँ' : 'Play Music')}
        aria-pressed={isPlaying}
        title={isPlaying ? "Music On" : "Music Paused"}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="22" height="22">
            <path d="M4 9.5v5h3.5L12 19V5L7.5 9.5H4z" fill="currentColor" />
            <path
              d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="22" height="22">
            <path d="M4 9.5v5h3.5L12 19V5L7.5 9.5H4z" fill="currentColor" />
            <path
              d="M16 9.5l5 5m0-5l-5 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
