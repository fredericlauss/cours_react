import { useTranslation } from 'react-i18next';
import { Factory } from './factory';
import { Hero } from './hero';
import { useStore } from '../store';
import { UNITS } from '../config/units';
import { useEffect } from 'react';
import './Game.css';

export function Game() {
  const { t } = useTranslation();
  const { money, units, addMoney, removeMoney, addUnit } = useStore();

  // Gestion globale de l'animation
  useEffect(() => {
    let lastTime = performance.now();
    let animationFrameId: number;

    function updateGame(currentTime: number) {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      units.forEach(unit => {
        const unitConfig = UNITS[unit.type.toUpperCase() as keyof typeof UNITS];
        if (unitConfig) {
          const progressIncrement = (deltaTime / 1000) * unitConfig.productionRate;
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
    return () => cancelAnimationFrame(animationFrameId);
  }, [units, addMoney]);

  const handlePurchase = (unitType: keyof typeof UNITS) => {
    const unit = UNITS[unitType];
    if (money >= unit.cost) {
      removeMoney(unit.cost);
      addUnit(unit.type);
    }
  };

  return (
    <div className="game">
      <div className="money-display">
        💰 {money} {t('money')}
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