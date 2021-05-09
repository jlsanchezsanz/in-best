import { getTickerSymbol } from '../company';

describe('Company utils', () => {
  const company = { n: 'AAPL - Apple', s: 'AAPL/apple' };

  describe('getTickerSymbol', () => {
    it('should return ticker symbol for the given company', () => {
      const result = getTickerSymbol(company);

      expect(result).toBe('AAPL');
    });
  });
});
