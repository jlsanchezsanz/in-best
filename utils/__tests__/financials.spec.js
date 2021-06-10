import {
  BVPS,
  EPS,
  freeCashFlow,
  revenue,
  ROI,
  missingYearsRevenue,
  ROIMissingInfo,
  ROINegativeValues,
  freeCashFlowStartWithZero,
  EPSStartingWithZeroAndNegativeValues,
} from '../../mocks/scrap-data';
import {
  getAverageGrowthRate,
  getCompanyAverageGrowthRates,
  getCompanyScore,
  getCompanyMarginOfSafetyBuyPrice,
} from '../financials';
import { next5YearsGrowthEstimate } from '../../mocks/yahoo-finance/analysis';
import { TTMEPS } from '../../mocks/yahoo-finance/summary';

describe('Financials utils', () => {
  describe('getAverageGrowthRate', () => {
    it('should return average growth rate per year - 10 years', () => {
      const result = getAverageGrowthRate(revenue, 10);

      expect(result).toBe(9.75);
    });

    it('should return average growth rate per year - 10 years - missing info', () => {
      const result = getAverageGrowthRate(ROIMissingInfo, 10);

      expect(result).toBe(-10.7);
    });

    it('should return average growth rate per year - 10 years - negative values', () => {
      const result = getAverageGrowthRate(ROINegativeValues, 10);

      expect(result).toBe(7.91);
    });

    it('should return average growth rate per year - 10 years - start value is 0', () => {
      const result = getAverageGrowthRate(freeCashFlowStartWithZero, 10);

      expect(result).toBe(37.73);
    });

    it('should return average growth rate per year - 5 years', () => {
      const result = getAverageGrowthRate(revenue, 5);

      expect(result).toBe(4.95);
    });

    it('should return average growth rate per year - 5 years - missing info', () => {
      const result = getAverageGrowthRate(ROIMissingInfo, 5);

      expect(result).toBe(51.42);
    });

    it('should return average growth rate per year - 5 years - negative values', () => {
      const result = getAverageGrowthRate(ROINegativeValues, 5);

      expect(result).toBe(20.26);
    });

    it('should return average growth rate per year - 1 year', () => {
      const result = getAverageGrowthRate(revenue, 1);

      expect(result).toBe(5.51);
    });

    it('should return 0 if there is no info for the last 2 years', () => {
      const result = getAverageGrowthRate(ROIMissingInfo, 1);

      expect(result).toBe(0);
    });

    it('should return average growth rate per year - 1 year - negative values', () => {
      const result = getAverageGrowthRate(ROINegativeValues, 1);

      expect(result).toBe(10137.5);
    });

    it('should return average growth rate per year - missing years', () => {
      const result = getAverageGrowthRate(missingYearsRevenue, 10);

      expect(result).toBe(6.44);
    });

    it('should return zero if average growth rate is NaN', () => {
      const result = getAverageGrowthRate({ 2020: -3.86, 2016: -0.9 }, 5);

      expect(result).toBe(0);
    });

    it('should return zero if average growth rate is NaN', () => {
      const result = getAverageGrowthRate({ 2020: -3.86, 2016: -0.9 }, 5);

      expect(result).toBe(0);
    });

    it('should return average growth rate - start value is 0 - negative values', () => {
      const result = getAverageGrowthRate(EPSStartingWithZeroAndNegativeValues, 10);

      expect(result).toBe(0);
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

      expect(result).toBe(26.17);
    });
  });

  describe('getCompanyMarginOfSafetyBuyPrice', () => {
    it('should return company margin of safety buy price', () => {
      const result = getCompanyMarginOfSafetyBuyPrice(TTMEPS, next5YearsGrowthEstimate);

      expect(result).toBe(102.61);
    });

    it('should return 0 if margin of safety buy price is NaN', () => {
      const result = getCompanyMarginOfSafetyBuyPrice(isNaN, next5YearsGrowthEstimate);

      expect(result).toBe(0);
    });
  });
});
