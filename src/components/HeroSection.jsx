import React from 'react';
import { useLang } from '../context/LangContext';
import { weddingData } from '../data/weddingData';
import { Mandala, Flourish } from './MandalaAndFlourish';
import sectionsStyles from '../styles/sections.json';

export function HeroCardContent({ copy = false }) {
  const { lang } = useLang();
  const { blessing, groom, bride, hashtag } = weddingData;

  const groomName = groom[lang];
  const brideName = bride[lang];
  const groomDesig = groom[`designation${lang === 'hi' ? 'Hi' : 'En'}`];
  const brideDesig = bride[`designation${lang === 'hi' ? 'Hi' : 'En'}`];
  const blessingMsg = blessing.message[lang];

  return (
    <>
      {/* Sacred Ganesha with Mandala & Glowing Halo */}
      <div className={sectionsStyles.ganeshaWrap}>
        <Mandala className={sectionsStyles.mandala} />
        <span className={sectionsStyles.halo} aria-hidden="true" />
        <div className={sectionsStyles.ganesha}>
          <img
            src="/images/ganesha-red.webp"
            alt={lang === 'hi' ? 'श्री गणेश' : 'Lord Ganesha'}
            width={287}
            height={283}
            loading="eager"
          />
        </div>
      </div>

      {/* Invocation */}
      <p lang="hi" className={sectionsStyles.invocation}>
        {blessing.invocation}
      </p>

      {/* Sanskrit Shloka from Card */}
      <p lang="hi" className={sectionsStyles.shloka}>
        {blessing.shloka.map((line, idx) => (
          <span key={idx} style={{ display: 'block', fontWeight: 600 }}>{line}</span>
        ))}
      </p>

      {/* Golden Ornamental Flourish */}
      <Flourish />

      {/* Invitation preface */}
      <p style={{ fontSize: '15px', color: '#57505f', maxWidth: '380px', margin: '8px auto', fontStyle: 'italic', lineHeight: '1.6' }}>
        {blessingMsg}
      </p>

      {/* Couple Presentation */}
      <div className={sectionsStyles.names} style={{ marginTop: '14px', marginBottom: '14px' }}>
        {/* Bride Card */}
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <h2 style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(38px, 9vw, 48px)', color: '#4a2477', margin: '0 0 2px', fontWeight: 700 }}>
            {brideName}
          </h2>
          <span style={{ fontSize: '13px', letterSpacing: '0.12em', color: '#8a6bb1', textTransform: 'uppercase', fontWeight: 600 }}>
            ({brideDesig})
          </span>
          <div style={{ fontSize: '13px', color: '#6c5891', marginTop: '4px', lineHeight: '1.4' }}>
            <p style={{ margin: '2px 0' }}>{bride[`family${lang === 'hi' ? 'Hi' : 'En'}`][0].label}: {bride[`family${lang === 'hi' ? 'Hi' : 'En'}`][0].names}</p>
            <p style={{ margin: '2px 0' }}>{bride[`family${lang === 'hi' ? 'Hi' : 'En'}`][1].label}: {bride[`family${lang === 'hi' ? 'Hi' : 'En'}`][1].names}</p>
          </div>
        </div>

        {/* Auspicious "संग / With" Heart Ring */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '6px 0' }}>
          <span style={{ height: '1px', width: '40px', background: 'linear-gradient(to right, transparent, #c9a45c)' }} />
          <span style={{ padding: '0 12px', fontFamily: 'var(--font-script)', fontSize: '24px', color: '#c99a3f' }}>
            {lang === 'hi' ? 'संग' : 'with'}
          </span>
          <span style={{ height: '1px', width: '40px', background: 'linear-gradient(to left, transparent, #c9a45c)' }} />
        </div>

        {/* Groom Card */}
        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <h2 style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(38px, 9vw, 48px)', color: '#4a2477', margin: '0 0 2px', fontWeight: 700 }}>
            {groomName}
          </h2>
          <span style={{ fontSize: '13px', letterSpacing: '0.12em', color: '#8a6bb1', textTransform: 'uppercase', fontWeight: 600 }}>
            ({groomDesig})
          </span>
          <div style={{ fontSize: '13px', color: '#6c5891', marginTop: '4px', lineHeight: '1.4' }}>
            <p style={{ margin: '2px 0' }}>{groom[`family${lang === 'hi' ? 'Hi' : 'En'}`][0].label}: {groom[`family${lang === 'hi' ? 'Hi' : 'En'}`][0].names}</p>
            <p style={{ margin: '2px 0' }}>{groom[`family${lang === 'hi' ? 'Hi' : 'En'}`][1].label}: {groom[`family${lang === 'hi' ? 'Hi' : 'En'}`][1].names}</p>
          </div>
        </div>
      </div>

      {/* Golden Ornamental Flourish */}
      <Flourish />

      {/* Second Sanskrit Shloka from Card */}
      <p lang="hi" style={{ fontSize: '13.5px', color: '#7a58b6', margin: '10px 0 6px', fontWeight: 600, fontStyle: 'italic' }}>
        {blessing.secondaryShloka[0]}<br />
        {blessing.secondaryShloka[1]}
      </p>

      {/* Wedding Hashtag Badge */}
      <p className={sectionsStyles.cardHashtag}>
        {hashtag}
      </p>
    </>
  );
}

export default function HeroSection({ play = false }) {
  const { lang } = useLang();

  const handleScrollDown = () => {
    const dateEl = document.getElementById('lv-date');
    if (dateEl) {
      dateEl.closest('section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      className={`${sectionsStyles.section} ${sectionsStyles.first} ${play ? sectionsStyles.play : ''}`} 
      aria-labelledby="lv-title"
    >
      <div id="lv-card" className={`${sectionsStyles.panel} ${sectionsStyles.inviteCard}`}>
        <HeroCardContent />
      </div>

      {/* Scroll Down Prompt */}
      <button 
        type="button" 
        className={sectionsStyles.scrollHint} 
        onClick={handleScrollDown}
      >
        <span>{lang === 'hi' ? 'विवाह कार्यक्रम देखने के लिए स्क्रॉल करें' : 'Scroll to see wedding events'}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="20" height="20">
          <path d="M12 5v14M6 13l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  );
}
