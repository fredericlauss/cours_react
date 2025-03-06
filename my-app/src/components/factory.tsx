import { useTranslation } from 'react-i18next';
import { useStore } from '../store';

interface FactoryItem {
    type: string;
    cost: number;
    productionRate: number; 
    productionAmount: number; 
  }
  
  interface FactoryProps {
    item: FactoryItem;
    onPurchase: () => void;
  }
  
  export function Factory({ item, onPurchase }: FactoryProps) {
    const { t } = useTranslation();
    const money = useStore(state => state.money);
    const canBuy = money >= item.cost;
  
    return (
      <button 
        className={`factory-button ${!canBuy ? 'disabled' : ''}`}
        onClick={onPurchase}
        disabled={!canBuy}
      >
        {t('buy')} {t(`units.${item.type}`)} ({item.cost} {t('money')})
      </button>
    );
  }