import { scrapeAnnualValue, scrapeAnnualValueFromQuarterly, scrapeTTMEPS } from '../scraping';
import { dataRevenue, dataROI, revenue, ROI } from '../../mocks/scrap-data';
import { dataSummary, TTMEPS } from '../../mocks/yahoo-finance/summary';

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
  });

  describe('scrapeTTMEPS', () => {
    it('should return TTM EPS', () => {
      const result = scrapeTTMEPS(dataSummary);

      expect(result).toEqual(TTMEPS);
    });
  });
});
