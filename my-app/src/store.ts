import { create } from 'zustand'
import { UnitConfig } from './config/units'

interface Unit {
  type: UnitConfig['type'];
  id: number;
  progress: number;
}

interface GameState {
  money: number;
  units: Unit[];
  nextId: number;
  setMoney: (money: number) => void;
  addMoney: (amount: number) => void;
  removeMoney: (amount: number) => void;
  addUnit: (type: UnitConfig['type']) => void;
  updateUnitProgress: (id: number, progress: number) => void;
}

export const useStore = create<GameState>((set) => ({
  money: 0,
  units: [{ type: 'Hero', id: 0, progress: 0 }],
  nextId: 1,
  
  setMoney: (money) => set({ money }),
  addMoney: (amount) => set((state) => ({ money: state.money + amount })),
  removeMoney: (amount) => set((state) => ({ money: state.money - amount })),
  addUnit: (type) => set((state) => ({
    units: [...state.units, { 
      type, 
      id: state.nextId, 
      progress: 0 
    }],
    nextId: state.nextId + 1
  })),
  updateUnitProgress: (id, progress) => set((state) => ({
    units: state.units.map(unit => 
      unit.id === id ? { ...unit, progress } : unit
    )
  }))
})) 