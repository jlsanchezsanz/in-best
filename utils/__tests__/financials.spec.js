import { getAverageGrowthRate } from '../financials';
import { revenue, missingYearsRevenue } from '../../mocks/scrap-data';

describe('Financials utils', () => {
  describe('getAverageGrowthRate', () => {
    it('should return average growth rate per year - 10 years', () => {
      const result = getAverageGrowthRate(revenue, 10);

      expect(result).toBe(9.75);
    });

    it('should return average growth rate per year - 5 years', () => {
      const result = getAverageGrowthRate(revenue, 5);

      expect(result).toBe(4.95);
    });

    it('should return average growth rate per year - 1 year', () => {
      const result = getAverageGrowthRate(revenue, 1);

      expect(result).toBe(5.51);
    });

    it('should return average growth rate per year - missing years', () => {
      const result = getAverageGrowthRate(missingYearsRevenue, 10);

      expect(result).toBe(6.44);
    });
  });
});
