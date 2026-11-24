import React, { useRef, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { useLang } from '../context/LangContext';
import { weddingData } from '../data/weddingData';
import sectionsStyles from '../styles/sections.json';

const CONFETTI_COLORS = ["#d9b46a", "#c99a3f", "#f3dc9a", "#e4d8f6", "#b39ddf", "#f0c9d8"];

export default function ScratchCard() {
  const { lang } = useLang();
  const { saveTheDate, city } = weddingData;
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const [showHandPrompt, setShowHandPrompt] = useState(false);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const strokeCountRef = useRef(0);

  const eyebrow = saveTheDate.eyebrow[lang];
  const heading = saveTheDate.heading[lang];
  const hint = saveTheDate.hint[lang];
  const scratchLabel = saveTheDate.scratchPrompt[lang];

  // Confetti burst on celebration
  const triggerCelebration = useCallback(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: CONFETTI_COLORS
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0.1, y: 0.65 },
          colors: CONFETTI_COLORS
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 0.9, y: 0.65 },
          colors: CONFETTI_COLORS
        });
      }, 250);
    } catch {
      // safe fallback
    }
  }, []);

  const completeScratch = useCallback(() => {
    if (isScratched) return;
    setIsScratched(true);
    setShowHandPrompt(false);
    triggerCelebration();
  }, [isScratched, triggerCelebration]);

  // Draw golden foil canvas
  const drawFoil = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    if (!width || !height) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // Rich metallic gold gradient
    const goldGrad = ctx.createLinearGradient(0, 0, width, height);
    goldGrad.addColorStop(0, '#b8862e');
    goldGrad.addColorStop(0.22, '#f3dc9a');
    goldGrad.addColorStop(0.4, '#c99a3f');
    goldGrad.addColorStop(0.58, '#f7e6b0');
    goldGrad.addColorStop(0.78, '#b98a33');
    goldGrad.addColorStop(1, '#e6c879');

    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle sheen overlay
    const sheen = ctx.createLinearGradient(0, 0, 0, height);
    sheen.addColorStop(0, 'rgba(255, 255, 255, 0.32)');
    sheen.addColorStop(0.45, 'rgba(255, 255, 255, 0)');
    sheen.addColorStop(1, 'rgba(90, 60, 10, 0.15)');
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, width, height);

    // Golden sparkles / dust specks
    for (let e = 0; e < 90; e++) {
      ctx.fillStyle = e % 4 ? 'rgba(255, 250, 225, 0.65)' : 'rgba(120, 80, 20, 0.28)';
      ctx.beginPath();
      ctx.arc((37 * e % 97) / 97 * width, (53 * e % 89) / 89 * height, 0.6 + (e % 3) * 0.7, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Delicate inner border
    ctx.strokeStyle = 'rgba(255, 248, 225, 0.88)';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(10.5, 10.5, width - 21, height - 21);

    // Text: SCRATCH HERE / यहाँ स्क्रैच करें
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const isDevanagari = lang === 'hi';
    const fontSize = Math.round(Math.min(18, Math.max(14, width / 18))) + (isDevanagari ? 3 : 0);
    const fontFace = isDevanagari ? 'Tiro Devanagari Hindi, Rozha One, serif' : 'Cinzel, Georgia, serif';

    ctx.font = `700 ${fontSize}px ${fontFace}`;
    // Shadow text
    ctx.fillStyle = 'rgba(255, 248, 222, 0.85)';
    ctx.fillText(scratchLabel, width / 2 + 1, height / 2 - 11);
    // Main text
    ctx.fillStyle = '#4a2477';
    ctx.fillText(scratchLabel, width / 2, height / 2 - 12);

    // Diamond star
    ctx.font = `${fontSize + 8}px serif`;
    ctx.fillStyle = '#4a2477';
    ctx.fillText('✦', width / 2, height / 2 + 18);
  }, [isScratched, lang, scratchLabel]);

  // Redraw when dimensions or language change
  useEffect(() => {
    if (strokeCountRef.current === 0) {
      drawFoil();
    }
  }, [drawFoil]);

  // Show prompt hand after 3.5 seconds if user hasn't scratched
  useEffect(() => {
    if (isScratched) return;
    const timer = setTimeout(() => {
      if (strokeCountRef.current === 0) {
        setShowHandPrompt(true);
      }
    }, 3500);
    return () => clearTimeout(timer);
  }, [isScratched]);

  // Scratch progress check
  const checkScratchProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let cleared = 0;
      let total = 0;
      for (let i = 3; i < data.length; i += 64) {
        total++;
        if (data[i] === 0) cleared++;
      }
      if (cleared / total >= 0.45) {
        completeScratch();
      }
    } catch {
      // ignore
    }
  };

  const scratchAt = (pos) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.strokeStyle = '#000';
    ctx.lineCap = 'round';
    ctx.lineWidth = 54;

    ctx.beginPath();
    const prev = lastPointRef.current || pos;
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    lastPointRef.current = pos;
    strokeCountRef.current++;
    if (strokeCountRef.current % 5 === 0) {
      checkScratchProgress();
    }
  };

  const handlePointerDown = (e) => {
    isDrawingRef.current = true;
    lastPointRef.current = null;
    setShowHandPrompt(false);
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = e.currentTarget.getBoundingClientRect();
    scratchAt({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handlePointerMove = (e) => {
    if (!isDrawingRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    scratchAt({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
    checkScratchProgress();
  };

  return (
    <section className={sectionsStyles.section} aria-labelledby="lv-date">
      {/* Eyebrow */}
      <p data-r="" className={sectionsStyles.eyebrow}>
        {eyebrow}
      </p>

      {/* Heading */}
      <h2 id="lv-date" data-r="" className={`${sectionsStyles.display} ${isScratched ? sectionsStyles.glowText : ''}`}>
        <span className={sectionsStyles.ink}>
          {heading}
        </span>
      </h2>

      {/* Hint */}
      <p data-r="" className={`${sectionsStyles.sub} ${isScratched ? sectionsStyles.hintDone : ''}`}>
        {hint}
      </p>

      {/* Scratch Card Outer Wrapper */}
      <div data-r="">
        <div
          ref={containerRef}
          className={`${sectionsStyles.scratchCard} ${isScratched ? sectionsStyles.scratchDone : ''}`}
        >
          {/* Revealed Date Content Underneath */}
          <div className={sectionsStyles.scratchDate}>
            <span className={sectionsStyles.scratchWhen}>
              <span>{saveTheDate.weekday[lang]}</span>
              <i> | </i>
              <span>
                {Number(saveTheDate.day)}
                <i> | </i>
                {saveTheDate.month[lang]} {saveTheDate.year}
              </span>
            </span>
            <span className={sectionsStyles.scratchTime}>
              {saveTheDate.time[lang]}
            </span>
            <span className={sectionsStyles.scratchCity}>
              {city[lang]}
            </span>
          </div>

          {/* Interactive Golden Canvas Foil */}
          {!isScratched && (
            <canvas
              ref={canvasRef}
              className={sectionsStyles.scratchFoil}
              role="button"
              tabIndex={0}
              aria-label={hint}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => (isDrawingRef.current = false)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  completeScratch();
                }
              }}
            />
          )}

          {/* Guiding Hand Prompt */}
          {showHandPrompt && !isScratched && (
            <span className={sectionsStyles.scratchHand} aria-hidden="true">
              <svg viewBox="0 0 56 70" width="46" height="58">
                <path
                  d="M22 6a5 5 0 0 1 10 0v22h1.5a4.5 4.5 0 0 1 4.5 4.5V34a4.5 4.5 0 0 1 9 0v4a4.5 4.5 0 0 1 9 0v10c0 11-8 20-19 20h-3c-7 0-11-3-15-9L10 47a4.6 4.6 0 0 1 7-5.8l5 5V6z"
                  fill="#fff"
                  stroke="#4a2477"
                  strokeWidth="2"
                />
              </svg>
            </span>
          )}
        </div>
      </div>

      {/* Quick Reveal Helper Button */}
      {!isScratched && (
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <button
            type="button"
            onClick={completeScratch}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#8b7fa3',
              fontSize: '13px',
              textDecoration: 'underline',
              cursor: 'pointer',
              padding: '6px 12px'
            }}
          >
            {lang === 'hi' ? 'कार्ड तुरंत खोलें' : 'Click to reveal date'}
          </button>
        </div>
      )}
    </section>
  );
}
