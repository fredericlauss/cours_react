import { canPurchase } from './purchase';
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
    const money = useStore(state => state.money);
    const isAvailable = canPurchase(money, item.cost);

    return (
        <button 
            className={`factory-button ${!isAvailable ? 'disabled' : ''}`}
            onClick={onPurchase}
            disabled={!isAvailable}
        >
            Acheter {item.type} ({item.cost} pièces)
        </button>
    );
}