import { describe, it, expect } from 'vitest';
import { canPurchase, validatePurchase } from '../components/purchase';

describe('canPurchase', () => {
  it('should return true when player has enough money', () => {
    expect(canPurchase(100, 50)).toBe(true);
    expect(canPurchase(50, 50)).toBe(true);
  });

  it('should return false when player does not have enough money', () => {
    expect(canPurchase(49, 50)).toBe(false);
    expect(canPurchase(0, 50)).toBe(false);
  });

  it('should handle zero cost items', () => {
    expect(canPurchase(0, 0)).toBe(true);
    expect(canPurchase(100, 0)).toBe(true);
  });

  it('should handle negative money cases', () => {
    expect(canPurchase(-50, 50)).toBe(false);
  });
});

describe('validatePurchase', () => {
  it('should return correct status and remaining money when can buy', () => {
    const result = validatePurchase(100, { cost: 60 });
    expect(result.canBuy).toBe(true);
    expect(result.remainingMoney).toBe(40);
  });

  it('should return correct status and unchanged money when cannot buy', () => {
    const result = validatePurchase(50, { cost: 60 });
    expect(result.canBuy).toBe(false);
    expect(result.remainingMoney).toBe(50);
  });

  it('should handle exact amount purchases', () => {
    const result = validatePurchase(100, { cost: 100 });
    expect(result.canBuy).toBe(true);
    expect(result.remainingMoney).toBe(0);
  });

  it('should handle zero cost items', () => {
    const result = validatePurchase(50, { cost: 0 });
    expect(result.canBuy).toBe(true);
    expect(result.remainingMoney).toBe(50);
  });
}); 