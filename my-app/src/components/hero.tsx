import { useEffect, useState, useCallback } from 'react';
import './Hero.css';

interface HeroProps {
  onProgressComplete: () => void;
}

export function Hero({ onProgressComplete }: HeroProps) {
  const [progress, setProgress] = useState(0);
  
  // Gestion du clic sur le héros
  const handleClick = useCallback(() => {
    setProgress(prev => {
      const newProgress = prev + 1;
      if (newProgress >= 10) {
        onProgressComplete();
        return 0;
      }
      return newProgress;
    });
  }, [onProgressComplete]);

  // Progression automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 10) {
          onProgressComplete();
          return 0;
        }
        return newProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onProgressComplete]);

  return (
    <div className="hero">
      <img 
        src="/hero-image.png" 
        alt="Hero" 
        onClick={handleClick}
        className="hero-image"
      />
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${(progress / 10) * 100}%` }}
        />
      </div>
    </div>
  );
}