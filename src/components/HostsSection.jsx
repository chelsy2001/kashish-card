import React from 'react';
import { useLang } from '../context/LangContext';
import { weddingData } from '../data/weddingData';
import { Flourish } from './MandalaAndFlourish';
import sectionsStyles from '../styles/sections.json';

function HostColumn({ title, names, id }) {
  return (
    <div className={sectionsStyles.hostColumn}>
      <h3 id={id} className={sectionsStyles.hostTitle}>
        {title}
      </h3>
      <span className={sectionsStyles.hostFlourish} aria-hidden="true" />
      <ul className={sectionsStyles.hostNames} aria-labelledby={id}>
        {names.map((name, idx) => (
          <li key={idx} style={{ '--i': idx }}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HostsSection() {
  const { lang } = useLang();
  const { hosts, closing } = weddingData;

  const invFrom = hosts.invitationFrom;
  const welcomedBy = hosts.welcomedBy;
  const withRegards = hosts.compliments;
  const awaiting = hosts.awaiting;

  return (
    <section className={`${sectionsStyles.section} ${sectionsStyles.hosts}`} aria-label="Family Invitations and Blessings">
      {/* Thank you note */}
      <p data-r="" className={sectionsStyles.thanks} style={{ fontStyle: 'italic', fontWeight: 600 }}>
        {closing.message[lang]}
      </p>

      {/* Presence Note */}
      <p data-r="" className={sectionsStyles.thanks}>
        {closing.presenceNote[lang]}
      </p>

      {/* Primary Invitation Box From Mr. Ajay Yadav */}
      <div
        data-r=""
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1.5px solid #d9b46a',
          borderRadius: '16px',
          padding: '20px 16px',
          maxWidth: '440px',
          margin: '20px auto 24px',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(106, 81, 163, 0.07)'
        }}
      >
        <span style={{ fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8a6bb1', fontWeight: 700 }}>
          {invFrom.title[lang]}
        </span>
        <h3 style={{ fontFamily: 'var(--font-script)', fontSize: '32px', color: '#4a2477', margin: '4px 0 6px' }}>
          {invFrom.name[lang]}
        </h3>
        <p style={{ fontSize: '13.5px', color: '#57505f', margin: '0 0 6px', lineHeight: '1.4' }}>
          {invFrom.address[lang]}
        </p>
        <p style={{ fontSize: '13px', color: '#c99a3f', margin: 0, fontWeight: 600 }}>
          📞 {invFrom.contacts}
        </p>
      </div>

      {/* Flourish */}
      <div data-r="">
        <Flourish />
      </div>

      {/* Three Family Columns */}
      <div data-r="" className={sectionsStyles.hostColumns} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {/* Welcome Host */}
        <HostColumn
          title={welcomedBy.title[lang]}
          names={welcomedBy.names[lang]}
          id="lv-welcomed"
        />

        {/* With Regards */}
        <HostColumn
          title={withRegards.title[lang]}
          names={withRegards.names[lang]}
          id="lv-regards"
        />

        {/* Awaiting Your Presence */}
        <HostColumn
          title={awaiting.title[lang]}
          names={awaiting.names[lang]}
          id="lv-awaiting"
        />
      </div>
    </section>
  );
}
