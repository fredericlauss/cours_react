import { useState, useEffect } from 'react';
import './Hero.css';

interface HeroProps {
  type: string;
  onProduction: () => void;
}

export function Hero({ type, onProduction }: HeroProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 10) {
          onProduction();
          return 0;
        }
        return newProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onProduction]);

  const handleClick = () => {
    setProgress(prev => {
      const newProgress = prev + 1;
      if (newProgress >= 10) {
        onProduction();
        return 0;
      }
      return newProgress;
    });
  };

  return (
    <div className="hero">
      <div className="unit-type">{type}</div>
      <button 
        className="production-button"
        onClick={handleClick}
      >
        Produire
      </button>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${(progress / 10) * 100}%` }}
        />
      </div>
    </div>
  );
}