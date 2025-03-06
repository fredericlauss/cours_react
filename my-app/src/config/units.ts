export interface UnitConfig {
  type: string;
  cost: number;
  productionRate: number;
  productionAmount: number;
}

export const UNITS: Record<string, UnitConfig> = {
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