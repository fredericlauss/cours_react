import { useState, useEffect } from 'react';
import { Factory } from './factory';
import { Hero } from './hero';
import './Game.css';

// Définition des types d'unités disponibles
const UNITS = {
  HERO: {
    type: 'Hero',
    cost: 5,
    productionRate: 1,
    productionAmount: 1
  },
  KNIGHT: {
    type: 'Knight',
    cost: 15,
    productionRate: 0.8,
    productionAmount: 2
  },
  BARRACK: {
    type: 'Barrack',
    cost: 50,
    productionRate: 0.5,
    productionAmount: 5
  },
  CASTLE: {
    type: 'Castle',
    cost: 200,
    productionRate: 0.3,
    productionAmount: 20
  }
};

export function Game() {
  const [money, setMoney] = useState(0);
  const [units, setUnits] = useState<Array<{ type: string; id: number }>>([
    { type: 'Hero', id: 0 }
  ]);
  const [nextId, setNextId] = useState(1);
  const [progress, setProgress] = useState(0);

  // Production automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 10) {
          // Quand la barre est pleine, on ajoute l'argent pour chaque unité
          units.forEach(unit => {
            // Trouver le type d'unité correspondant dans UNITS
            const unitConfig = Object.values(UNITS).find(u => u.type === unit.type);
            if (unitConfig) {
              setMoney(prevMoney => prevMoney + unitConfig.productionAmount);
            }
          });
          return 0;
        }
        return newProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [units]);

  const handleProduction = () => {
    setProgress(prev => {
      const newProgress = prev + 1;
      if (newProgress >= 10) {
        // Quand la barre est pleine, on ajoute l'argent pour chaque unité
        units.forEach(unit => {
          const unitConfig = Object.values(UNITS).find(u => u.type === unit.type);
          if (unitConfig) {
            setMoney(prevMoney => prevMoney + unitConfig.productionAmount);
          }
        });
        return 0;
      }
      return newProgress;
    });
  };

  const handlePurchase = (unitType: keyof typeof UNITS) => {
    const unit = UNITS[unitType];
    setMoney(prev => prev - unit.cost);
    setUnits(prev => [...prev, { type: unit.type, id: nextId }]);
    setNextId(prev => prev + 1);
  };

  return (
    <div className="game">
      <div className="money-display">
        💰 {money} pièces
      </div>
      
      <div className="factories">
        {Object.entries(UNITS).map(([key, unit]) => (
          <Factory 
            key={key}
            item={unit}
            money={money}
            onPurchase={() => handlePurchase(key as keyof typeof UNITS)}
          />
        ))}
      </div>

      <div className="production-section">
        <button 
          className="production-button"
          onClick={handleProduction}
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
      <div className="units-container">
        {units.map(unit => (
          <Hero 
            key={unit.id}
            type={unit.type}
          />
        ))}
      </div>
    </div>
  );
}