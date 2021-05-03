import { scrapeAnnualValue, scrapeAnnualValueFromQuarterly } from '../scraping';
import { dataRevenue, dataROI, revenue, ROI } from '../../mocks/scrap-data';

describe('scraping utils', () => {
  describe('scrapeAnnualValue', () => {
    it('should return annual value object', () => {
      const result = scrapeAnnualValue(dataRevenue, 10);

      expect(result).toEqual(revenue);
    });
  });

  describe('scrapeAnnualValueFromQuarterly', () => {
    it('should return annual value object', () => {
      const result = scrapeAnnualValueFromQuarterly(dataROI, 10);

      expect(result).toEqual(ROI);
    });
  });
});
