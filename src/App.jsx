import { useEffect } from 'react';
import useStore from './store/useStore';
import Welcome from './views/Welcome';
import Exercise from './views/Exercise';
import Completion from './views/Completion';

function App() {
  const isRoutineActive = useStore((state) => state.isRoutineActive);
  const currentExerciseIndex = useStore((state) => state.currentExerciseIndex);
  const settings = useStore((state) => state.settings);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    if (settings.theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else if (settings.theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme'); // Auto mode
    }
  }, [settings.theme]);

  // Determine which view to show
  const routineCompleted = !isRoutineActive && currentExerciseIndex > 0;

  if (routineCompleted) {
    return <Completion />;
  }

  if (isRoutineActive) {
    return <Exercise />;
  }

  return <Welcome />;
}

export default App;
