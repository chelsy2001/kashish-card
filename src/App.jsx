import React, { useState, useRef, useEffect, useCallback } from 'react';
import { LangProvider, useLang } from './context/LangContext';
import { weddingData } from './data/weddingData';
import TopBar, { NazarAmulet } from './components/TopBar';
import EnvelopeModal from './components/EnvelopeModal';
import HeroSection from './components/HeroSection';
import ScratchCard from './components/ScratchCard';
import CountdownTimer from './components/CountdownTimer';
import OurStory from './components/OurStory';
import VenuesSection from './components/VenuesSection';
import EventsTimeline from './components/EventsTimeline';
import KidsSection from './components/KidsSection';
import HostsSection from './components/HostsSection';
import Footer from './components/Footer';
import SectionArrow from './components/SectionArrow';
import FallingPetals from './components/FallingPetals';

import lavenderStyles from './styles/lavender.json';

function MainApp() {
  const { lang } = useLang();
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const mainRef = useRef(null);
  const userMutedRef = useRef(false);

  // Play audio safely
  const playAudio = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !userMutedRef.current && audio.paused) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay may be restricted until interaction
      });
    }
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      userMutedRef.current = false;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      userMutedRef.current = true;
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleEnvelopeTap = () => {
    playAudio();
  };

  const handleEnvelopeOpened = () => {
    setIsOpened(true);
    playAudio();
  };

  // Prevent scroll when locked in envelope modal
  useEffect(() => {
    if (isOpened) {
      document.documentElement.classList.remove('is-locked');
    } else {
      document.documentElement.classList.add('is-locked');
    }
  }, [isOpened]);

  // Scroll reveal observer for elements with data-r
  useEffect(() => {
    const container = mainRef.current;
    if (!container || !isOpened) return;

    const items = container.querySelectorAll('[data-r]');
    if (typeof IntersectionObserver === 'undefined') {
      items.forEach(el => el.setAttribute('data-shown', ''));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-shown', '');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [isOpened]);

  return (
    <>
      {/* Background Music Element */}
      <audio
        ref={audioRef}
        src={weddingData.music.src}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={e => {
          e.currentTarget.volume = weddingData.music.volume;
        }}
      />

      {/* Floating Ambient Falling Petals */}
      <FallingPetals count={20} />

      {/* Swaying Nazar Amulet */}
      <NazarAmulet shown={isOpened} />

      {/* Floating Top Bar (Language switcher & Audio toggle) */}
      <TopBar
        isPlaying={isPlaying}
        toggleMusic={toggleMusic}
        audioRef={audioRef}
      />

      {/* Main Wedding Invitation Document */}
      <main ref={mainRef} className={lavenderStyles.page} inert={!isOpened ? "" : undefined}>
        {/* 1. Hero Ganesha & Couple Card */}
        <HeroSection play={isOpened} />

        {/* 2. Save The Date & Interactive Scratch Card */}
        <ScratchCard />
        <SectionArrow />

        {/* 3. Live Countdown Timer */}
        <CountdownTimer />
        <SectionArrow />

        {/* 4. Our Love Story */}
        <OurStory />
        <SectionArrow />

        {/* 5. Venues & Google Maps Navigation */}
        <VenuesSection />
        <SectionArrow />

        {/* 6. Wedding Festivities Itinerary */}
        <EventsTimeline />
        <SectionArrow />

        {/* 7. Kids Dancing Section */}
        <KidsSection />
        <SectionArrow />

        {/* 8. Welcomed By & Compliments From */}
        <HostsSection />
        <SectionArrow />

        {/* 10. Monogram Crest & Footer */}
        <Footer />
      </main>

      {/* 3D Envelope Modal Experience */}
      {!isOpened && (
        <EnvelopeModal
          onTap={handleEnvelopeTap}
          onOpened={handleEnvelopeOpened}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <MainApp />
    </LangProvider>
  );
}
