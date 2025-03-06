import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Hero.css';

interface HeroProps {
  type: string;
  onProduction: () => void;
}

export function Hero({ type, onProduction }: HeroProps) {
  const { t } = useTranslation();
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
      <div className="unit-type">{t(`units.${type}`)}</div>
      <button 
        className="production-button"
        onClick={handleClick}
      >
        {t('produce')}
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