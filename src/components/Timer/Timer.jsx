import { useState, useEffect } from 'react';
import './Timer.css';

export default function Timer({ duration, isRunning, isPaused = false, onComplete, onTimeUpdate }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isRunning || isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        
        // Notifica il componente padre del tempo aggiornato
        if (onTimeUpdate) {
          onTimeUpdate(newTime);
        }
        
        if (newTime <= 0) {
          clearInterval(interval);
          onComplete?.();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isPaused, onComplete, onTimeUpdate]);

  // Notifica anche il tempo corrente quando cambia isPaused
  useEffect(() => {
    if (onTimeUpdate) {
      onTimeUpdate(timeLeft);
    }
  }, [timeLeft, onTimeUpdate]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = ((duration - timeLeft) / duration) * 100;

  return (
    <div className="timer">
      <div className="timer__display">
        <svg className="timer__circle" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="var(--color-surface-variant)"
            strokeWidth="12"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={534.07}
            strokeDashoffset={534.07 - (534.07 * percentage) / 100}
            transform="rotate(-90 100 100)"
            className="timer__progress"
          />
        </svg>
        <div className="timer__time">
          <span className="timer__digits">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}
