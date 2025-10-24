import './LinearProgressTimer.css';

export default function LinearProgressTimer({ 
  duration, 
  timeLeft, 
  isRunning, 
  isIndeterminate = false 
}) {
  const percentage = duration > 0 ? ((duration - timeLeft) / duration) * 100 : 0;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="linear-progress">
      <div className="linear-progress__container">
        <div className="linear-progress__track">
          {isIndeterminate ? (
            <div className="linear-progress__bar linear-progress__bar--indeterminate" />
          ) : (
            <div 
              className="linear-progress__bar"
              style={{ width: `${percentage}%` }}
            />
          )}
        </div>
        {!isIndeterminate && (
          <span className="linear-progress__time">
            {formatTime(timeLeft)}
          </span>
        )}
      </div>
    </div>
  );
}
