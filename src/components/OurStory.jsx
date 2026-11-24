import React from 'react';
import { useLang } from '../context/LangContext';
import { weddingData } from '../data/weddingData';
import sectionsStyles from '../styles/sections.json';

export default function OurStory() {
  const { lang } = useLang();
  const { story } = weddingData;

  const eyebrow = story.eyebrow[lang];
  const heading = story.heading[lang];
  const subheading = story.subheading[lang];
  const p1 = story.paragraph1[lang];
  const p2 = story.paragraph2[lang];

  return (
    <section className={sectionsStyles.section} aria-labelledby="lv-story">
      {/* Eyebrow */}
      <p data-r="" className={sectionsStyles.eyebrow}>
        {eyebrow}
      </p>

      {/* Heading */}
      <h2 id="lv-story" data-r="" className={sectionsStyles.display}>
        <span className={sectionsStyles.ink}>
          {heading}
        </span>
      </h2>

      {/* Couple Polaroid Presentation */}
      <ul className={sectionsStyles.polaroids}>
        {story.photos.map((item, idx) => (
          <li
            key={idx}
            data-r=""
            className={sectionsStyles.polaroid}
            style={{ '--tilt': `${idx % 2 ? 3 : -3}deg` }}
          >
            <div className={sectionsStyles.polaroidPhoto}>
              <img
                src={item.image}
                alt={item.alt || 'Harsh & Kashish'}
                width={640}
                height={767}
                loading="lazy"
                style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
              />
            </div>
            <p className={sectionsStyles.polaroidCaption}>
              {subheading}
            </p>
          </li>
        ))}
      </ul>

      {/* Romantic Story Text */}
      <div style={{ maxWidth: '480px', margin: '24px auto 0', textAlign: 'center', padding: '0 16px' }}>
        <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#57505f', marginBottom: '14px', fontStyle: 'italic' }}>
          "{p1}"
        </p>
        <p style={{ fontSize: '17px', lineHeight: '1.7', color: '#6c5891' }}>
          {p2}
        </p>
      </div>
    </section>
  );
}
