import './Hero.css';
import { useStore } from '../store';
import { UNITS } from '../../config/units';
import { useRef } from 'react';

interface HeroProps {
  type: string;
  progress: number;
  id: number;
}

export function Hero({ type, progress, id }: HeroProps) {
  const updateUnitProgress = useStore(state => state.updateUnitProgress);
  const addMoney = useStore(state => state.addMoney);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const newProgress = progress + 1;
    if (newProgress >= 10) {
      const unitConfig = Object.values(UNITS).find(u => u.type === type);
      if (unitConfig) {
        addMoney(unitConfig.productionAmount);
        updateUnitProgress(id, 0);
      }
    } else {
      updateUnitProgress(id, newProgress);
    }
  };

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="hero" data-testid="hero-unit">
      <div 
        className="hero-image" 
        onClick={handleImageClick}
      >
        👑
      </div>
      <input
        ref={inputRef}
        type="text"
        className="hero-name"
        placeholder={`${type} #${id}`}
      />
      <button 
        className="production-button"
        onClick={handleClick}
        data-testid="hero-button"
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