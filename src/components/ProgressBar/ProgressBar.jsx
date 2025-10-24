import './ProgressBar.css';

export default function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="progress-bar">
      <div className="progress-bar__info">
        <span className="progress-bar__text">
          Esercizio {current} di {total}
        </span>
      </div>
      <div className="progress-bar__track">
        <div 
          className="progress-bar__fill" 
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin="1"
          aria-valuemax={total}
        />
      </div>
    </div>
  );
}
