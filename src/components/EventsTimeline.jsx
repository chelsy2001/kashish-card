import React, { useRef, useState } from 'react';
import { useLang } from '../context/LangContext';
import { weddingData } from '../data/weddingData';
import { PinBadge } from './MandalaAndFlourish';
import sectionsStyles from '../styles/sections.json';
import '../styles/smooth-events.css';

function EventCard({ event, active }) {
  const { lang } = useLang();

  // Split date "5 December 2026"
  const parts = event.date.split(' ');
  const day = parts[0];
  const month = lang === 'hi' ? weddingData.saveTheDate.month.hi : parts[1];
  const weekday = event.dateLabel[lang].split(',')[0];

  const getDirectionsText = lang === 'hi' ? 'रास्ता देखें' : 'Get Directions';
  const dressCodeLabel = lang === 'hi' ? 'परिधान' : 'Dress code';

  return (
    <li className={`${sectionsStyles.panel} ${sectionsStyles.eventCard} ${active ? 'is-active' : ''}`}>
      {/* Event Art / Poster with Image & Sparkles */}
      <div className={`${sectionsStyles.eventArt} ${sectionsStyles.eventPoster} ${event.imageClass || (event.imageFit === 'contain' ? 'is-icon' : '')}`}>
        <img
          src={event.image}
          alt={event.title[lang]}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: event.imageFit || 'cover', ...(event.imagePosition && { objectPosition: event.imagePosition }) }}
        />
        <span className={sectionsStyles.artSparkles} aria-hidden="true">
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <i key={i} />
          ))}
        </span>
        <div className={sectionsStyles.eventHead}>
          <h3 className={sectionsStyles.eventTitle}>
            {event.title[lang]}
          </h3>
        </div>
      </div>

      {/* Event Details Body */}
      <div className={sectionsStyles.eventBody}>
        {/* Date & Time */}
        <div className={sectionsStyles.eventDate}>
          <div className={sectionsStyles.dayHead}>
            <span className={sectionsStyles.dayNum} aria-hidden="true">
              {day}
            </span>
            <span className={sectionsStyles.dayMeta} aria-hidden="true">
              <span className={sectionsStyles.dayMonth}>{month}</span>
              <span className={sectionsStyles.dayWeekday}>{weekday}</span>
            </span>
          </div>
          <p className={sectionsStyles.timeText}>
            {event.time[lang]}
          </p>
        </div>

        {/* Description */}
        {event.description && (
          <p className={sectionsStyles.quote}>
            “{event.description[lang]}”
          </p>
        )}

        {/* Dress Code Swatch */}
        {event.dressCode && (
          <div className={sectionsStyles.dress}>
            <p className={sectionsStyles.dressLabel}>
              {dressCodeLabel}
            </p>
            <p className={sectionsStyles.dressName}>
              {event.dressCodeColor && (
                <i
                  className={sectionsStyles.swatch}
                  style={{ background: event.dressCodeColor }}
                  aria-hidden="true"
                />
              )}
              {event.dressCode[lang]}
            </p>
          </div>
        )}

        {/* Venue Location & Directions Link */}
        <div className={sectionsStyles.eventPlace}>
          <div className={sectionsStyles.eventAddress}>
            <p className={sectionsStyles.eventVenue}>
              {event.venue[lang]}
            </p>
            {event.venueAddress && (
              <p className={sectionsStyles.eventVenueAddress}>
                {event.venueAddress[lang]}
              </p>
            )}
          </div>

          <a
            href={event.mapQuery}
            target="_blank"
            rel="noopener noreferrer"
            className={sectionsStyles.btn}
          >
            <PinBadge />
            {getDirectionsText}
          </a>
        </div>
      </div>
    </li>
  );
}

export default function EventsTimeline() {
  const { lang } = useLang();
  const { events } = weddingData;
  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const eyebrow = lang === 'hi' ? 'उत्सव का क्रम' : 'The celebrations unfold';
  const heading = lang === 'hi' ? 'शुभ प्रसंग' : 'Festivities';
  const days = events.map(ev => parseInt(ev.date, 10));
  const programDates = `${Math.min(...days)} – ${Math.max(...days)} ` + (lang === 'hi' ? 'दिसंबर 2026' : 'December 2026');

  const scrollToIndex = (idx) => {
    setActiveIndex(idx);
    const container = listRef.current;
    if (!container) return;
    const card = container.children[idx];
    if (card) {
      // Scroll only the carousel — never jump the whole page
      container.scrollTo({ left: card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2 });
    }
  };

  return (
    <section className={sectionsStyles.section} aria-labelledby="lv-events">
      {/* Eyebrow */}
      <p data-r="" className={sectionsStyles.eyebrow}>
        {eyebrow}
      </p>

      {/* Heading */}
      <h2 id="lv-events" data-r="" className={sectionsStyles.display}>
        <span className={sectionsStyles.ink}>
          {heading}
        </span>
      </h2>

      {/* Dates subtitle */}
      <p data-r="" className={sectionsStyles.sub}>
        {programDates}
      </p>

      {/* Carousel navigation dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', margin: '14px 0 18px' }}>
        {events.map((ev, i) => (
          <button
            key={ev.id}
            type="button"
            onClick={() => scrollToIndex(i)}
            style={{
              width: activeIndex === i ? '20px' : '8px',
              height: '8px',
              borderRadius: '4px',
              border: 'none',
              background: activeIndex === i ? '#6a51a3' : '#c9bce0',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            aria-label={ev.title[lang]}
          />
        ))}
      </div>

      {/* Horizontal Scrollable Event Cards */}
      <ul
        ref={listRef}
        className={sectionsStyles.events}
        onScroll={e => {
          // Active card = the one whose centre is closest to the track's centre
          const el = e.currentTarget;
          const mid = el.scrollLeft + el.clientWidth / 2;
          let idx = 0, best = Infinity;
          [...el.children].forEach((c, i) => {
            const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
            if (d < best) { best = d; idx = i; }
          });
          if (idx !== activeIndex) setActiveIndex(idx);
        }}
      >
        {events.map((ev, i) => (
          <EventCard key={ev.id} event={ev} active={i === activeIndex} />
        ))}
      </ul>

      {/* Swipe Hint */}
      <p className={sectionsStyles.swipeHint}>
        {lang === 'hi' ? 'सभी कार्यक्रम देखने के लिए स्वाइप करें' : 'Swipe to see every celebration'}
      </p>
    </section>
  );
}
