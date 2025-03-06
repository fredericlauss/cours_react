export interface PurchaseItem {
  cost: number;
}

export function canPurchase(playerMoney: number, itemCost: number): boolean {
  return playerMoney >= itemCost;
}

// Version plus complète si nécessaire
export function validatePurchase(playerMoney: number, item: PurchaseItem): {
  canBuy: boolean;
  remainingMoney: number;
} {
  const canBuy = playerMoney >= item.cost;
  const remainingMoney = canBuy ? playerMoney - item.cost : playerMoney;
  
  return {
    canBuy,
    remainingMoney
  };
} 