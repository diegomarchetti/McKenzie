import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // Exercise state
      currentExerciseIndex: 0,
      isRoutineActive: false,
      isTimerRunning: false,
      isPaused: false,
      
      // Settings
      settings: {
        audioEnabled: true,
        voiceEnabled: true,
        theme: 'auto', // 'light', 'dark', 'auto'
        primaryColor: '#6750A4'
      },

      // Actions
      startRoutine: () => set({ 
        isRoutineActive: true, 
        currentExerciseIndex: 0,
        isTimerRunning: false,
        isPaused: false
      }),
      
      nextExercise: () => {
        const { currentExerciseIndex } = get();
        set({ 
          currentExerciseIndex: currentExerciseIndex + 1,
          isTimerRunning: false,
          isPaused: false
        });
      },
      
      completeRoutine: () => set({ 
        isRoutineActive: false,
        currentExerciseIndex: 0,
        isTimerRunning: false,
        isPaused: false
      }),
      
      resetRoutine: () => set({ 
        isRoutineActive: false,
        currentExerciseIndex: 0,
        isTimerRunning: false,
        isPaused: false
      }),

      startTimer: () => set({ isTimerRunning: true, isPaused: false }),
      
      stopTimer: () => set({ isTimerRunning: false, isPaused: false }),
      
      pauseTimer: () => set({ isPaused: true }),
      
      resumeTimer: () => set({ isPaused: false }),
      
      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),

      // Get current exercise
      getCurrentExercise: () => {
        const { currentExerciseIndex } = get();
        return currentExerciseIndex;
      }
    }),
    {
      name: 'mckenzie-storage',
      partialize: (state) => ({ settings: state.settings })
    }
  )
);

export default useStore;
