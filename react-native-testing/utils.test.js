import { add, subtract, multiply, divide, formatDate } from './utils';

describe('Utility Functions', () => {
  describe('add', () => {
    it('adds two positive numbers correctly', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('adds negative numbers correctly', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    it('adds positive and negative numbers correctly', () => {
      expect(add(5, -3)).toBe(2);
    });
  });

  describe('subtract', () => {
    it('subtracts two positive numbers correctly', () => {
      expect(subtract(5, 3)).toBe(2);
    });

    it('subtracts negative numbers correctly', () => {
      expect(subtract(-2, -5)).toBe(3);
    });
  });

  describe('multiply', () => {
    it('multiplies two positive numbers correctly', () => {
      expect(multiply(3, 4)).toBe(12);
    });

    it('multiplies with zero correctly', () => {
      expect(multiply(5, 0)).toBe(0);
    });

    it('multiplies negative numbers correctly', () => {
      expect(multiply(-3, 4)).toBe(-12);
    });
  });

  describe('divide', () => {
    it('divides two positive numbers correctly', () => {
      expect(divide(10, 2)).toBe(5);
    });

    it('throws error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Division by zero');
    });
  });

  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2023-12-25');
      expect(formatDate(date)).toBe('December 25, 2023');
    });
  });
});