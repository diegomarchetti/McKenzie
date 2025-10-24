import { useState, useEffect } from 'react';
import './BreathingCircle.css';

export default function BreathingCircle({ isActive }) {
  const [breathPhase, setBreathPhase] = useState('inhale'); // 'inhale' or 'exhale'

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setBreathPhase((prev) => (prev === 'inhale' ? 'exhale' : 'inhale'));
    }, 3000); // Cambia fase ogni 3 secondi

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="breathing">
      <div className="breathing__circle" aria-hidden="true" />
      <p className="breathing__text" aria-live="polite">
        {breathPhase === 'inhale' ? 'Inspira...' : 'Espira...'}
      </p>
    </div>
  );
}
