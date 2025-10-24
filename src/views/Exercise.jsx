import { useEffect, useState } from 'react';
import useStore from '../store/useStore';
import audioManager from '../lib/audioManager';
import exercisesData from '../data/exercises.json';
import Button from '../components/Button/Button';
import Timer from '../components/Timer/Timer';
import LinearProgressTimer from '../components/LinearProgressTimer/LinearProgressTimer';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import ConfirmModal from '../components/ConfirmModal/ConfirmModal';
import './Exercise.css';

export default function Exercise() {
  const { 
    currentExerciseIndex, 
    isTimerRunning,
    isPaused,
    settings,
    nextExercise, 
    startTimer,
    pauseTimer,
    resumeTimer,
    completeRoutine
  } = useStore();

  const [timeLeft, setTimeLeft] = useState(0);
  const [showSkipModal, setShowSkipModal] = useState(false);
  
  const exercise = exercisesData.exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === exercisesData.exercises.length - 1;

  // Inizializza timeLeft quando cambia esercizio
  useEffect(() => {
    if (exercise.type === 'HOLD') {
      setTimeLeft(exercise.duration);
    }
  }, [exercise]);

  // Annuncio vocale all'inizio di ogni esercizio
  useEffect(() => {
    if (exercise && !isTimerRunning) {
      setTimeout(() => {
        audioManager.speak(exercise.voiceText, settings);
      }, 500);
    }
  }, [exercise.id]); // Usa exercise.id per triggerare solo al cambio esercizio

  const handleStart = () => {
    startTimer();
  };

  const handlePause = () => {
    pauseTimer();
  };

  const handleResume = () => {
    resumeTimer();
  };

  const handleComplete = () => {
    audioManager.playBeep(settings);
    
    setTimeout(() => {
      if (isLastExercise) {
        audioManager.playCompletionSound(settings);
        audioManager.speak('Complimenti! Routine completata', settings);
        setTimeout(() => {
          completeRoutine();
        }, 1500);
      } else {
        const nextEx = exercisesData.exercises[currentExerciseIndex + 1];
        audioManager.speak(nextEx.voiceText, settings);
        setTimeout(() => {
          nextExercise();
        }, 1500);
      }
    }, 300);
  };

  const handleTimerComplete = () => {
    handleComplete();
  };

  const handleSkipClick = () => {
    setShowSkipModal(true);
  };

  const handleSkipConfirm = () => {
    setShowSkipModal(false);
    audioManager.playBeep(settings);
    
    if (isLastExercise) {
      completeRoutine();
    } else {
      const nextEx = exercisesData.exercises[currentExerciseIndex + 1];
      audioManager.speak(nextEx.voiceText, settings);
      setTimeout(() => {
        nextExercise();
      }, 800);
    }
  };

  const handleSkipCancel = () => {
    setShowSkipModal(false);
  };

  const handleTimeUpdate = (newTime) => {
    setTimeLeft(newTime);
  };

  return (
    <div className="exercise">
      {/* 1. Progress Bar Esercizi */}
      <div className="exercise__header">
        <ProgressBar 
          current={currentExerciseIndex + 1} 
          total={exercisesData.exercises.length} 
        />
      </div>

      {/* 2. Linear Progress Timer */}
      <LinearProgressTimer 
        duration={exercise.type === 'HOLD' ? exercise.duration : 0}
        timeLeft={timeLeft}
        isRunning={isTimerRunning && !isPaused}
        isIndeterminate={exercise.type === 'REPS'}
      />

      {/* 3. Pulsanti Azione */}
      <div className="exercise__actions">
        {exercise.type === 'HOLD' ? (
          <>
            {!isTimerRunning && !isPaused && (
              <Button onClick={handleStart} fullWidth>
                Inizia
              </Button>
            )}
            {isTimerRunning && !isPaused && (
              <Button onClick={handlePause} fullWidth>
                Pausa
              </Button>
            )}
            {isPaused && (
              <Button onClick={handleResume} fullWidth>
                Riprendi
              </Button>
            )}
            <Button onClick={handleSkipClick} variant="secondary" fullWidth>
              Salta
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleComplete} fullWidth>
              Completato
            </Button>
            <Button onClick={handleSkipClick} variant="secondary" fullWidth>
              Salta
            </Button>
          </>
        )}
      </div>

      {/* 4. Contenuto Principale */}
      <div className="exercise__content">
        {/* Immagine */}
        <div className="exercise__image-container">
          <img 
            src={`/McKenzie/assets/${exercise.image}`}
            alt={exercise.title}
            className="exercise__image"
          />
        </div>

        {/* Info Esercizio */}
        <div className="exercise__info">
          <h1 className="exercise__title">{exercise.title}</h1>
          <p className="exercise__subtitle">{exercise.subtitle}</p>
          
          <div className="exercise__description">
            <p>{exercise.description}</p>
          </div>

          {exercise.type === 'REPS' && (
            <div className="exercise__reps-info">
              <span className="exercise__reps-number">{exercise.reps}</span>
              <span className="exercise__reps-label">ripetizioni</span>
            </div>
          )}
        </div>
      </div>

      {/* Timer nascosto per gestire il countdown (solo per HOLD) */}
      {exercise.type === 'HOLD' && (
        <div style={{ display: 'none' }}>
          <Timer 
            duration={exercise.duration}
            isRunning={isTimerRunning}
            isPaused={isPaused}
            onComplete={handleTimerComplete}
            onTimeUpdate={handleTimeUpdate}
          />
        </div>
      )}

      {/* Modal Conferma Skip */}
      <ConfirmModal 
        isOpen={showSkipModal}
        onConfirm={handleSkipConfirm}
        onCancel={handleSkipCancel}
        title="Saltare esercizio?"
        message="Sei sicuro di voler saltare questo esercizio e passare al successivo?"
      />
    </div>
  );
}
