import React from 'react';
import { useLang } from '../context/LangContext';
import sectionsStyles from '../styles/sections.json';

export default function SectionArrow() {
  const { lang } = useLang();

  return (
    <button
      type="button"
      className={sectionsStyles.nextArrow}
      aria-label={lang === 'hi' ? 'आगे' : 'Next'}
      onClick={e => {
        const next = e.currentTarget.nextElementSibling;
        if (next) {
          next.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="20" height="20">
        <path d="M12 5v14M6 13l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
