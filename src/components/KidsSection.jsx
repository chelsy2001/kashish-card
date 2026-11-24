import React from 'react';
import { useLang } from '../context/LangContext';
import { weddingData } from '../data/weddingData';
import sectionsStyles from '../styles/sections.json';

const MUSICAL_NOTES = [
  [38, 0, "♪"],
  [52, 0.9, "♫"],
  [45, 1.8, "♪"],
  [58, 2.6, "♬"],
  [42, 3.4, "♫"]
];

export default function KidsSection() {
  const { lang } = useLang();
  const { kids } = weddingData;

  const eyebrow = kids.eyebrow[lang];
  const line = kids.line[lang];

  return (
    <section className={`${sectionsStyles.section} ${sectionsStyles.kids}`} aria-labelledby="lv-kids">
      <p data-r="" className={sectionsStyles.kidsEyebrow}>
        {eyebrow}
      </p>

      <h2 id="lv-kids" data-r="" className={sectionsStyles.kidsLine}>
        {line}
      </h2>

      <div className={sectionsStyles.stage}>
        {/* Spotlight Glow */}
        <div className={sectionsStyles.spotlight} aria-hidden="true" />

        {/* Dancing Kid Left */}
        <div data-r="" className={`${sectionsStyles.kid} ${sectionsStyles.kidLeft}`}>
          <img
            src="/images/kids/kid-left.svg"
            alt="Excited little kid"
            width={260}
            height={380}
            loading="lazy"
          />
        </div>

        {/* Floating Dancing Notes */}
        <div className={sectionsStyles.notes} aria-hidden="true">
          {MUSICAL_NOTES.map(([left, delay, sym], idx) => (
            <span
              key={idx}
              style={{
                left: `${left}%`,
                animationDelay: `${delay}s`
              }}
            >
              {sym}
            </span>
          ))}
        </div>

        {/* Dancing Kid Right */}
        <div data-r="" className={`${sectionsStyles.kid} ${sectionsStyles.kidRight}`}>
          <img
            src="/images/kids/kid-right.svg"
            alt="Excited little kid"
            width={260}
            height={380}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
