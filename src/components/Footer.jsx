import React, { useState } from 'react';
import { useLang } from '../context/LangContext';
import { weddingData } from '../data/weddingData';
import sectionsStyles from '../styles/sections.json';

export default function Footer() {
  const { lang } = useLang();
  const { groom, bride, dateShort, hashtag } = weddingData;
  const [copied, setCopied] = useState(false);

  const groomName = groom[lang];
  const brideName = bride[lang];
  const shareLine = lang === 'hi' 
    ? 'अपने यादगार पल हमारे साथ साझा करें' 
    : 'Share your moments with us';

  const handleCopyHashtag = async () => {
    try {
      await navigator.clipboard.writeText(hashtag);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <footer className={sectionsStyles.closing} aria-label={lang === 'hi' ? 'समापन' : 'Closing'}>
      <div className={sectionsStyles.band}>
        {/* Band Florals */}
        <div className={`${sectionsStyles.bandFlorals} ${sectionsStyles.bandFloralsLeft}`} aria-hidden="true" />
        <div className={`${sectionsStyles.bandFlorals} ${sectionsStyles.bandFloralsRight}`} aria-hidden="true" />

        <div className={sectionsStyles.bandInner}>
          {/* Couple Names */}
          <p data-r="" className={sectionsStyles.closingNames}>
            {groomName}{' '}
            <span className={sectionsStyles.nowrap}>
              <span className={sectionsStyles.closingAmp}>&</span> {brideName}
            </span>
          </p>

          {/* Date */}
          <p data-r="" className={sectionsStyles.closingDate}>
            {dateShort}
          </p>

          {/* Share Line */}
          <p data-r="" className={sectionsStyles.shareLine}>
            {shareLine}
          </p>

          {/* Copy Hashtag Button */}
          <button
            data-r=""
            type="button"
            className={sectionsStyles.hashtag}
            onClick={handleCopyHashtag}
            aria-label={`Copy ${hashtag}`}
          >
            {hashtag}
          </button>

          {/* Copied Feedback Alert */}
          <span className={sectionsStyles.copied} role="status" aria-live="polite">
            {copied ? (lang === 'hi' ? 'कॉपी हो गया!' : 'Copied!') : ''}
          </span>
        </div>
      </div>
    </footer>
  );
}
