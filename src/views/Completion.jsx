import useStore from '../store/useStore';
import Button from '../components/Button/Button';
import './Completion.css';

export default function Completion() {
  const { resetRoutine, startRoutine } = useStore();

  const handleRestart = () => {
    startRoutine();
  };

  const handleHome = () => {
    resetRoutine();
  };

  return (
    <div className="completion">
      <div className="completion__content">
        <div className="completion__confetti" aria-hidden="true">
          ✨🎉✨
        </div>
        
        <h1 className="completion__title">Complimenti!</h1>
        <p className="completion__subtitle">Routine completata</p>

        <div className="completion__message">
          <p>
            Hai completato tutti e 7 gli esercizi McKenzie. 
            Ottimo lavoro! Continua a prenderti cura della tua schiena.
          </p>
        </div>

        <div className="completion__stats">
          <div className="completion__stat">
            <span className="completion__stat-icon">✅</span>
            <div>
              <div className="completion__stat-value">7/7</div>
              <div className="completion__stat-label">Esercizi completati</div>
            </div>
          </div>
        </div>

        <div className="completion__actions">
          <Button onClick={handleRestart} fullWidth icon="🔄">
            Riparti
          </Button>
          <Button onClick={handleHome} variant="secondary" fullWidth>
            Torna alla Home
          </Button>
        </div>
      </div>
    </div>
  );
}
