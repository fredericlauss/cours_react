import { useTranslation } from 'react-i18next';
import { Factory } from './factory';
import { Hero } from './hero';
import { useStore } from '../store';
import { UNITS } from '../config/units';
import { useEffect } from 'react';
import './Game.css';

export function Game() {
  const { t } = useTranslation();
  const { 
    money, 
    units, 
    addMoney, 
    removeMoney, 
    addUnit, 
    speedMultiplier,
    setSpeedMultiplier 
  } = useStore();

  useEffect(() => {
    let lastTime = performance.now();
    let animationFrameId: number;

    function updateGame(currentTime: number) {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      units.forEach(unit => {
        const unitConfig = UNITS[unit.type.toUpperCase()];
        if (unitConfig) {
          const progressIncrement = (deltaTime / 1000) * unitConfig.productionRate * speedMultiplier;
          const newProgress = unit.progress + progressIncrement;
          
          if (newProgress >= 10) {
            addMoney(unitConfig.productionAmount);
            useStore.getState().updateUnitProgress(unit.id, 0);
          } else {
            useStore.getState().updateUnitProgress(unit.id, newProgress);
          }
        }
      });

      animationFrameId = requestAnimationFrame(updateGame);
    }

    animationFrameId = requestAnimationFrame(updateGame);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [units, addMoney, speedMultiplier]);

  const handlePurchase = (unitType: keyof typeof UNITS) => {
    const unit = UNITS[unitType];
    if (money >= unit.cost) {
      removeMoney(unit.cost);
      addUnit(unit.type);
    }
  };

  return (
    <div className="game">
      <div className="controls">
        <div className="money-display">
          💰 {money} {t('money')}
        </div>
        <div className="speed-controls">
          <button 
            className={`speed-button speed-1 ${speedMultiplier === 1 ? 'active' : ''}`}
            onClick={() => setSpeedMultiplier(1)}
          >
            ⏸ x1
          </button>
          <button 
            className={`speed-button speed-2 ${speedMultiplier === 2 ? 'active' : ''}`}
            onClick={() => setSpeedMultiplier(2)}
          >
            ⏩ x2
          </button>
          <button 
            className={`speed-button speed-4 ${speedMultiplier === 4 ? 'active' : ''}`}
            onClick={() => setSpeedMultiplier(4)}
          >
            🏃 x4
          </button>
        </div>
      </div>
      
      <div className="factories">
        {Object.entries(UNITS).map(([key, unit]) => (
          <Factory 
            key={key}
            item={unit}
            onPurchase={() => handlePurchase(key as keyof typeof UNITS)}
          />
        ))}
      </div>

      <div className="units-container">
        {units.map(unit => (
          <Hero 
            key={unit.id}
            id={unit.id}
            type={unit.type}
            progress={unit.progress}
          />
        ))}
      </div>
    </div>
  );
}