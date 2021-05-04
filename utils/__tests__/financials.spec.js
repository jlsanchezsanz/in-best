import { BVPS, EPS, freeCashFlow, revenue, ROI, missingYearsRevenue } from '../../mocks/scrap-data';
import { getAverageGrowthRate, getCompanyAverageGrowthRates, getCompanyScore } from '../financials';

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

  describe('getCompanyAverageGrowthRates', () => {
    it('should return average growth rates for the given company data', () => {
      const expectedAverageGrowthRates = {
        averageGrowthROIRates: { 10: -7.02, 5: 4.85, 1: 17.45 },
        averageGrowthRevenueRates: { 10: 9.75, 5: 4.95, 1: 5.51 },
        averageGrowthEPSRates: { 10: 12.73, 5: 9.54, 1: 10.44 },
        averageGrowthFreeCashFlowRates: { 10: 8.23, 5: 6.52, 1: 24.57 },
        averageGrowthBVPSRates: { 10: 2.48, 5: -8.54, 1: -23.41 },
      };
      const companyData = { BVPS, EPS, freeCashFlow, revenue, ROI };
      const result = getCompanyAverageGrowthRates(companyData);

      expect(result).toEqual(expectedAverageGrowthRates);
    });
  });

  describe('getCompanyScore', () => {
    it('should return company score', () => {
      const averageGrowthRates = {
        averageGrowthROIRates: { 10: -7.02, 5: 4.85, 1: 17.45 },
        averageGrowthRevenueRates: { 10: 9.75, 5: 4.95, 1: 5.51 },
        averageGrowthEPSRates: { 10: 12.73, 5: 9.54, 1: 10.44 },
        averageGrowthFreeCashFlowRates: { 10: 8.23, 5: 6.52, 1: 24.57 },
        averageGrowthBVPSRates: { 10: 2.48, 5: -8.54, 1: -23.41 },
      };
      const result = getCompanyScore(averageGrowthRates);

      expect(result).toBe(78.05);
    });
  });
});
