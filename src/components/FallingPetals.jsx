import React, { useMemo } from 'react';
import petalsStyles from '../styles/petals.json';

const PETAL_COLORS = ["#c9b6ea", "#b39ddf", "#e4d8f6", "#d9b46a", "#f0c9d8", "#f7d6e0"];

export default function FallingPetals({ count = 24 }) {
  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, a) => {
      const t = e => ((9301 * a + 49297 * e) % 233280) / 233280;
      return {
        id: a,
        left: `${(100 * t(1)).toFixed(1)}%`,
        width: `${(14 + 10 * t(2)).toFixed(0)}px`,
        height: `${(18 + 12 * t(3)).toFixed(0)}px`,
        animationDuration: `${(9 + 7 * t(4)).toFixed(1)}s`,
        animationDelay: `${(-16 * t(5)).toFixed(1)}s`,
        backgroundColor: PETAL_COLORS[a % PETAL_COLORS.length],
        transform: `rotate(${(360 * t(6)).toFixed(0)}deg)`
      };
    });
  }, [count]);

  return (
    <div className={petalsStyles.layer} aria-hidden="true">
      {petals.map(p => (
        <span
          key={p.id}
          className={petalsStyles.petal}
          style={{
            left: p.left,
            width: p.width,
            height: p.height,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            backgroundColor: p.backgroundColor,
            transform: p.transform
          }}
        />
      ))}
    </div>
  );
}
