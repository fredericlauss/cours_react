import { useEffect, useState } from 'react';

interface StopwatchProps {
  onPauseChange: (isPaused: boolean) => void;
}

export function Stopwatch({ onPauseChange }: StopwatchProps) {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let intervalId: number;

    if (!isPaused) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isPaused]);

  const handlePauseClick = () => {
    setIsPaused(prevState => {
      const newPauseState = !prevState;
      onPauseChange(newPauseState);
      return newPauseState;
    });
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="stopwatch">
      <div className="time">{formatTime(time)}</div>
      <button onClick={handlePauseClick}>
        {isPaused ? 'Reprendre' : 'Pause'}
      </button>
    </div>
  );
} 