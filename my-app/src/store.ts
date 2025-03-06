import { create } from 'zustand'

interface Unit {
  type: string;
  id: number;
}

interface GameState {
  money: number;
  units: Unit[];
  nextId: number;
  setMoney: (money: number) => void;
  addMoney: (amount: number) => void;
  removeMoney: (amount: number) => void;
  addUnit: (type: string) => void;
}

export const useStore = create<GameState>((set) => ({
  money: 0,
  units: [{ type: 'Hero', id: 0 }],
  nextId: 1,
  
  setMoney: (money) => set({ money }),
  addMoney: (amount) => set((state) => ({ money: state.money + amount })),
  removeMoney: (amount) => set((state) => ({ money: state.money - amount })),
  addUnit: (type) => set((state) => ({
    units: [...state.units, { type, id: state.nextId }],
    nextId: state.nextId + 1
  }))
})) 