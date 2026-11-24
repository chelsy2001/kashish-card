import React, { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import { weddingData } from '../data/weddingData';
import sectionsStyles from '../styles/sections.json';

const UNIT_LABELS = {
  hi: ["दिन", "घंटे", "मिनट", "सेकंड"],
  en: ["Days", "Hours", "Minutes", "Seconds"]
};

export default function CountdownTimer() {
  const { lang } = useLang();
  const { countdown, weddingDate } = weddingData;

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(weddingDate));

  function calculateTimeLeft(targetStr) {
    const target = new Date(targetStr).getTime();
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isDone: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds, isDone: false };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(weddingDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  const units = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds];
  const unitNames = UNIT_LABELS[lang] || UNIT_LABELS.en;

  return (
    <section className={sectionsStyles.countdown} aria-labelledby="lv-countdown">
      <div className={sectionsStyles.band}>
        {/* Decorative Floral Sprigs Left & Right */}
        <div className={`${sectionsStyles.bandFlorals} ${sectionsStyles.bandFloralsLeft}`} aria-hidden="true" />
        <div className={`${sectionsStyles.bandFlorals} ${sectionsStyles.bandFloralsRight}`} aria-hidden="true" />

        <div className={sectionsStyles.bandInner}>
          {countdown.eyebrow && (
            <p data-r="" className={sectionsStyles.bandEyebrow}>
              {countdown.eyebrow[lang]}
            </p>
          )}

          <h2 id="lv-countdown" data-r="" className={sectionsStyles.bandHeading}>
            {countdown.heading[lang]}
          </h2>

          <p data-r="" className={sectionsStyles.bandWhen}>
            {countdown.when[lang]}
          </p>

          {timeLeft.isDone ? (
            <p data-r="" className={sectionsStyles.today}>
              {countdown.finished[lang]}
            </p>
          ) : (
            <div data-r="" className={sectionsStyles.tiles} role="timer" aria-live="off">
              {units.map((val, idx) => (
                <div key={idx} className={sectionsStyles.tile}>
                  <span className={sectionsStyles.tileValue}>
                    {String(val).padStart(2, '0')}
                  </span>
                  <span className={sectionsStyles.tileLabel}>
                    {unitNames[idx]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
