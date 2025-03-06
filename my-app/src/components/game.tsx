import { useTranslation } from 'react-i18next';
import { Factory } from './factory';
import { Hero } from './hero';
import { useStore } from '../store';
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
  const { t } = useTranslation();
  const { money, units, addMoney, removeMoney, addUnit } = useStore();

  const handleProduction = (unitType: string) => {
    const unitConfig = Object.values(UNITS).find(u => u.type === unitType);
    if (unitConfig) {
      addMoney(unitConfig.productionAmount);
    }
  };

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
            type={unit.type}
            onProduction={() => handleProduction(unit.type)}
          />
        ))}
      </div>
    </div>
  );
}