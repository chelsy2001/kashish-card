import React from 'react';
import { useLang } from '../context/LangContext';
import { weddingData } from '../data/weddingData';
import { PinBadge } from './MandalaAndFlourish';
import sectionsStyles from '../styles/sections.json';

export default function VenuesSection() {
  const { lang } = useLang();
  const { venues } = weddingData;

  const eyebrow = lang === 'hi' ? 'कहाँ' : 'Where';
  const heading = lang === 'hi' ? 'विवाह स्थल' : 'The Venue';
  const viewOnMapText = lang === 'hi' ? 'मानचित्र देखें' : 'View on Map';

  return (
    <section className={sectionsStyles.section} aria-labelledby="lv-venue">
      {/* Eyebrow */}
      <p data-r="" className={sectionsStyles.eyebrow}>
        {eyebrow}
      </p>

      {/* Heading */}
      <h2 id="lv-venue" data-r="" className={sectionsStyles.display}>
        <span className={sectionsStyles.ink}>
          {heading}
        </span>
      </h2>

      {/* Venue Cards */}
      <div className={sectionsStyles.venues}>
        {venues.map(v => (
          <div
            key={v.id}
            data-r=""
            className={`${sectionsStyles.panel} ${sectionsStyles.venueCard}`}
          >
            {/* Venue Photo */}
            <div className={sectionsStyles.venueArt}>
              <img
                src={v.image}
                alt={v.name[lang]}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Venue Details */}
            <div className={sectionsStyles.venueText}>
              <h3 className={sectionsStyles.venueName}>
                {v.name[lang]}
              </h3>
              <p className={sectionsStyles.venueAddress}>
                {v.address[lang]}
              </p>
              {v.event && (
                <p
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    alignSelf: 'flex-start',
                    margin: '10px 0 4px',
                    padding: '5px 12px',
                    borderRadius: '999px',
                    background: 'rgba(201, 164, 92, 0.15)',
                    border: '1px solid rgba(201, 164, 92, 0.45)',
                    color: '#4a2477',
                    fontWeight: 700,
                    fontSize: '15px'
                  }}
                >
                  <span aria-hidden="true">🎶</span>
                  {v.event[lang]}
                </p>
              )}
              <p className={sectionsStyles.venueWhen}>
                {v.when[lang]}
              </p>
              <a
                href={v.mapQuery}
                target="_blank"
                rel="noopener noreferrer"
                className={`${sectionsStyles.btn} ${sectionsStyles.btnSmall}`}
              >
                <PinBadge />
                {viewOnMapText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
