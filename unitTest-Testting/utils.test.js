const { sum, isEven, getMax, formatName } = require('./utils');

describe('Utility Functions', () => {
  describe('sum function', () => {
    test('adds two positive numbers correctly', () => {
      expect(sum(2, 3)).toBe(5);
    });

    test('adds negative and positive numbers correctly', () => {
      expect(sum(-1, 5)).toBe(4);
    });

    test('adds two negative numbers correctly', () => {
      expect(sum(-3, -2)).toBe(-5);
    });

    test('adds zero correctly', () => {
      expect(sum(0, 5)).toBe(5);
      expect(sum(5, 0)).toBe(5);
    });
  });

  describe('isEven function', () => {
    test('returns true for even numbers', () => {
      expect(isEven(2)).toBe(true);
      expect(isEven(0)).toBe(true);
      expect(isEven(-4)).toBe(true);
    });

    test('returns false for odd numbers', () => {
      expect(isEven(3)).toBe(false);
      expect(isEven(-1)).toBe(false);
    });
  });

  describe('getMax function', () => {
    test('returns the maximum value from an array', () => {
      expect(getMax([1, 5, 3, 9, 2])).toBe(9);
      expect(getMax([-1, -5, -3])).toBe(-1);
    });

    test('returns null for empty array', () => {
      expect(getMax([])).toBeNull();
    });

    test('returns null for undefined input', () => {
      expect(getMax(undefined)).toBeNull();
    });

    test('returns the only element for single-element array', () => {
      expect(getMax([42])).toBe(42);
    });
  });

  describe('formatName function', () => {
    test('capitalizes first letter of each word', () => {
      expect(formatName('john doe')).toBe('John Doe');
      expect(formatName('MARY JOHNSON')).toBe('Mary Johnson');
    });

    test('handles single names', () => {
      expect(formatName('alice')).toBe('Alice');
    });

    test('handles empty or null input', () => {
      expect(formatName('')).toBe('');
      expect(formatName(null)).toBe('');
      expect(formatName(undefined)).toBe('');
    });

    test('handles multiple spaces', () => {
      expect(formatName('john  doe')).toBe('John  Doe');
    });
  });
});