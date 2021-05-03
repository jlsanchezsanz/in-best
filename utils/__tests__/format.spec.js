import { toNumber } from '../format';

describe('Format utils', () => {
  describe('toNumber', () => {
    it('should convert a string of the type "$274,515" into a number', () => {
      const result = toNumber('$274,515');
      expect(result).toBe(274515);
    });

    it('should convert a string of the type "44.32%" into a number', () => {
      const result = toNumber('44.32%');
      expect(result).toBe(44.32);
    });
  });
});
