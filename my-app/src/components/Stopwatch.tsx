import { useEffect, useState, useCallback, useMemo } from 'react';

const INTERVAL_DELAY = 1000;
const INITIAL_TIME = 0;

interface StopwatchProps {
  readonly onPauseChange: (isPaused: boolean) => void;
}

export function Stopwatch({ onPauseChange }: StopwatchProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(INITIAL_TIME);
  const [isPaused, setIsPaused] = useState(false);

  const formattedTime = useFormattedTime(elapsedSeconds);

  useEffect(() => {
    if (isPaused) return;

    const intervalId = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, INTERVAL_DELAY);

    return () => clearInterval(intervalId);
  }, [isPaused]);

  const handlePauseClick = useCallback(() => {
    setIsPaused(prevState => {
      const newPauseState = !prevState;
      onPauseChange(newPauseState);
      return newPauseState;
    });
  }, [onPauseChange]);

  return (
    <div className="stopwatch">
      <div className="time">{formattedTime}</div>
      <button 
        onClick={handlePauseClick}
        aria-label={isPaused ? 'Reprendre le chronomètre' : 'Mettre en pause le chronomètre'}
      >
        {isPaused ? 'Reprendre' : 'Pause'}
      </button>
    </div>
  );
}

function useFormattedTime(seconds: number): string {
  return useMemo(() => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, [seconds]);
} 