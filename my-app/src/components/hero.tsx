import { useTranslation } from 'react-i18next';
import { useStore } from '../store';
import { UNITS } from '../config/units';
import './Hero.css';

interface HeroProps {
  type: string;
  progress: number;
  id: number;
}

export function Hero({ type, progress, id }: HeroProps) {
  const { t } = useTranslation();
  const updateUnitProgress = useStore(state => state.updateUnitProgress);
  const addMoney = useStore(state => state.addMoney);

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

  return (
    <div className="hero" data-testid="hero-unit">
      <div className="unit-type">{t(`units.${type}`)}</div>
      <button 
        className="production-button"
        onClick={handleClick}
        data-testid="hero-button"
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