import { useState } from 'react';
import useStore from '../store/useStore';
import Button from '../components/Button/Button';
import Settings from '../components/Settings/Settings';
import './Welcome.css';

export default function Welcome() {
  const [showSettings, setShowSettings] = useState(false);
  const startRoutine = useStore((state) => state.startRoutine);

  return (
    <div className="welcome">
      <button 
        className="welcome__settings-btn"
        onClick={() => setShowSettings(true)}
        aria-label="Apri impostazioni"
      >
        ⚙️
      </button>

      <div className="welcome__content">
        <div className="welcome__hero">
          <h1 className="welcome__title">McKenzie @ Home</h1>
          <p className="welcome__subtitle">
            La tua guida interattiva per gli esercizi McKenzie
          </p>
        </div>

        <div className="welcome__info">
          <div className="welcome__info-card">
            <span className="welcome__info-icon">🧘‍♂️</span>
            <div>
              <div className="welcome__info-label">7 esercizi</div>
              <div className="welcome__info-desc">Routine completa</div>
            </div>
          </div>

          <div className="welcome__info-card">
            <span className="welcome__info-icon">⏱️</span>
            <div>
              <div className="welcome__info-label">~8-9 minuti</div>
              <div className="welcome__info-desc">Durata stimata</div>
            </div>
          </div>

          <div className="welcome__info-card">
            <span className="welcome__info-icon">🎯</span>
            <div>
              <div className="welcome__info-label">Passo passo</div>
              <div className="welcome__info-desc">Guida vocale</div>
            </div>
          </div>
        </div>

        <div className="welcome__description">
          <p>
            Segui gli esercizi McKenzie per alleviare il dolore lombare e 
            migliorare la salute della tua schiena. Ogni esercizio è guidato 
            con immagini chiare e istruzioni vocali.
          </p>
          <br></br>
          <p>
            Desidero ringraziare il <strong>Dott. Bissolotti</strong> per il suo prezioso 
            aiuto e per avermi fatto conoscere il metodo McKenzie, che ha 
            migliorato la mia qualità di vita.
            Questa applicazione è dedicata a lui, in segno di riconoscenza.
          </p>
        </div>

        <div className="welcome__cta">
          <Button 
            onClick={startRoutine}
            fullWidth
            icon="▶️"
          >
            Inizia Routine
          </Button>
        </div>
      </div>

      <Settings 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </div>
  );
}
