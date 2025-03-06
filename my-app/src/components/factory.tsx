interface FactoryItem {
    type: string;
    cost: number;
    productionRate: number; 
    productionAmount: number; 
  }
  
  interface FactoryProps {
    item: FactoryItem;
    money: number;
    onPurchase: () => void;
  }
  
  export function Factory({ item, money, onPurchase }: FactoryProps) {
    const canBuy = money >= item.cost;
  
    const handlePurchase = () => {
      if (canBuy) {
        onPurchase();
      }
    };
  
    return (
      <button 
        className={`factory-button ${!canBuy ? 'disabled' : ''}`}
        onClick={handlePurchase}
        disabled={!canBuy}
      >
        Acheter {item.type} ({item.cost} pièces)
      </button>
    );
  }