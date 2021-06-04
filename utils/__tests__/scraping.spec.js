import {
  scrapeAnnualValue,
  scrapeAnnualValueFromQuarterly,
  scrapeCompanyName,
  scrapeNext5YearsGrowthEstimate,
  scrapeTTMEPS,
} from '../scraping';
import {
  dataRevenue,
  dataROI,
  dataROIMissingInfo,
  revenue,
  ROI,
  ROIMissingInfo,
} from '../../mocks/scrap-data';
import { companyName, dataSummary, TTMEPS } from '../../mocks/yahoo-finance/summary';
import { dataAnalysis, next5YearsGrowthEstimate } from '../../mocks/yahoo-finance/analysis';

describe('scraping utils', () => {
  describe('scrapeAnnualValue', () => {
    it('should return annual value object', () => {
      const result = scrapeAnnualValue(dataRevenue);

      expect(result).toEqual(revenue);
    });
  });

  describe('scrapeAnnualValueFromQuarterly', () => {
    it('should return annual value object', () => {
      const result = scrapeAnnualValueFromQuarterly(dataROI);

      expect(result).toEqual(ROI);
    });

    it('should return annual value object - missing info', () => {
      const result = scrapeAnnualValueFromQuarterly(dataROIMissingInfo);

      expect(result).toEqual(ROIMissingInfo);
    });
  });

  describe('scrapeTTMEPS', () => {
    it('should return TTM EPS', () => {
      const result = scrapeTTMEPS(dataSummary);

      expect(result).toEqual(TTMEPS);
    });
  });

  describe('scrapeCompanyName', () => {
    it('should return company name', () => {
      const result = scrapeCompanyName(dataSummary);

      expect(result).toEqual(companyName);
    });
  });

  describe('scrapeNext5YearsGrowthEstimate', () => {
    it('should return TTM EPS', () => {
      const result = scrapeNext5YearsGrowthEstimate(dataAnalysis);

      expect(result).toEqual(next5YearsGrowthEstimate);
    });
  });
});
