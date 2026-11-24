import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useLang } from '../context/LangContext';
import { weddingData } from '../data/weddingData';
import { BackdropMandala, FloralSprig, Flourish } from './MandalaAndFlourish';
import '../styles/smooth-envelope.css';

const GOLD_SPARKLE_COLORS = ["#d9b46a", "#f3dc9a", "#c99a3f", "#fbe7a9", "#ffffff"];

export default function EnvelopeModal({ onTap, onOpened }) {
  const { lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const openedRef = useRef(false);

  const startOpenSequence = () => {
    if (openedRef.current) return;
    openedRef.current = true;

    // Trigger music & tap feedback
    if (onTap) {
      onTap();
    }

    // Sparkle burst right at the center of the wax seal
    try {
      confetti({
        particleCount: 32,
        spread: 60,
        startVelocity: 18,
        origin: { x: 0.5, y: 0.52 },
        colors: GOLD_SPARKLE_COLORS,
        ticks: 80,
        disableForReducedMotion: true
      });
    } catch {
      // safe fallback
    }

    const reduce = typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    // Phase 1: seal lifts off → flap swings open → card glides out (CSS-staged)
    setIsOpen(true);

    // Phase 2: once the card is out, dissolve the envelope into the page
    setTimeout(() => {
      setIsClosing(true);
    }, reduce ? 150 : 1850);

    // Phase 3: unmount after the fade has fully finished
    setTimeout(() => {
      onOpened();
    }, reduce ? 300 : 2550);
  };

  const hintText = lang === 'hi' 
    ? 'खोलने के लिए सील पर टैप करें' 
    : 'Tap the seal to open';

  const groomName = weddingData.groom[lang];
  const brideName = weddingData.bride[lang];

  return (
    <div
      className={`smooth-stage ${isClosing ? 'is-closing' : ''}`}
      onClick={startOpenSequence}
      role="button"
      tabIndex={0}
      aria-label={lang === 'hi' ? 'विवाह निमंत्रण खोलें' : 'Open the wedding invitation'}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          startOpenSequence();
        }
      }}
    >
      {/* Background Rotating Mandala */}
      <BackdropMandala className="smooth-mandala" />

      {/* Watercolor Corner Florals */}
      <div className="smooth-corner-floral smooth-corner-tl" aria-hidden="true" />
      <div className="smooth-corner-floral smooth-corner-br" aria-hidden="true" />

      {/* 3D Envelope Scene */}
      <div className={`smooth-scene ${isOpen ? 'scene-rising' : ''}`} aria-hidden="true">
        <div className={`smooth-envelope-box ${isOpen ? 'is-still' : ''}`}>
          {/* Envelope Back Paper */}
          <div className="smooth-envelope-back" />

          {/* Inner Invitation Card (Lightweight, High-Fidelity Preview) */}
          <div className={`smooth-inner-card ${isOpen ? 'card-up' : ''}`}>
            {/* Lord Ganesha Small */}
            <div style={{ marginBottom: '6px' }}>
              <img
                src="/images/ganesha-red.webp"
                alt="Lord Ganesha"
                width={52}
                height={52}
                style={{ margin: '0 auto', display: 'block' }}
              />
            </div>

            {/* Shloka */}
            <p style={{ fontSize: '11px', color: '#6a51a3', margin: '0 0 6px', fontWeight: 600, fontStyle: 'italic' }}>
              ॥ श्री गणेशाय नमः ॥
            </p>

            <div style={{ width: '80px', margin: '2px auto 6px' }}>
              <Flourish />
            </div>

            {/* Names */}
            <h3 style={{ fontFamily: 'var(--font-script)', fontSize: '26px', color: '#4a2477', margin: '2px 0' }}>
              {brideName}
            </h3>
            <span style={{ fontSize: '14px', fontFamily: 'var(--font-script)', color: '#c99a3f', margin: '1px 0' }}>
              {lang === 'hi' ? 'संग' : 'with'}
            </span>
            <h3 style={{ fontFamily: 'var(--font-script)', fontSize: '26px', color: '#4a2477', margin: '2px 0' }}>
              {groomName}
            </h3>

            {/* Date Tag */}
            <div style={{ marginTop: '8px', padding: '4px 10px', background: 'rgba(201, 164, 92, 0.15)', borderRadius: '12px', border: '1px solid rgba(201, 164, 92, 0.3)' }}>
              <span style={{ fontSize: '11px', letterSpacing: '0.08em', color: '#4a2477', fontWeight: 700 }}>
                {weddingData.saveTheDate.weekday[lang]} · {weddingData.dateShort}
              </span>
            </div>
          </div>

          {/* Pocket with Folds & Gold Foil Borders */}
          <div className="smooth-pocket">
            <span className="smooth-fold-left" />
            <span className="smooth-fold-right" />
            <span className="smooth-fold-bottom" />

            {/* Creases & Gold Foil SVG */}
            <svg className="smooth-foil-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect x="3.5" y="2" width="93" height="96" />
              <rect x="5.5" y="4" width="89" height="92" stroke="#f0d696" strokeWidth="0.6" strokeDasharray="3 3" />
            </svg>

            {/* Hashtag on Envelope */}
            <p className="smooth-hashtag-label">
              {weddingData.hashtag}
            </p>
          </div>

          {/* Flap with 3D RotateX */}
          <div className={`smooth-flap-wrap ${isOpen ? 'flap-opened' : ''}`}>
            <span className="smooth-flap-front">
              <svg className="smooth-foil-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon points="9.5,3.6 90.5,3.6 50,91.5" />
                <polygon points="12.5,5.2 87.5,5.2 50,86.5" stroke="#f0d696" strokeWidth="0.6" />
              </svg>
            </span>
            <span className="smooth-flap-back" />
          </div>

          {/* Floral Sprigs */}
          <FloralSprig className={`smooth-sprig smooth-sprig-a ${isOpen ? 'sprig-hidden' : ''}`} />
          <FloralSprig className={`smooth-sprig smooth-sprig-b ${isOpen ? 'sprig-hidden' : ''}`} />

          {/* Golden Wax Seal */}
          <div className={`smooth-seal-container ${isOpen ? 'seal-popped' : ''}`}>
            <img
              className={`smooth-seal-img ${!isOpen ? 'smooth-seal-breathe' : ''}`}
              src="/assets/wax-seal-gold.webp"
              alt="Royal Gold Wax Seal"
              width={240}
              height={240}
              loading="eager"
            />
          </div>
        </div>

        {/* Ground Soft Shadow */}
        <span className="smooth-ground-shadow" />
      </div>

      {/* Tap Hint */}
      <p className={`smooth-hint ${isOpen ? 'hint-hidden' : ''}`} aria-hidden="true">
        {hintText}
      </p>
    </div>
  );
}
