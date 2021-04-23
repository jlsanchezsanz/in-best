import { getCompaniesUrl, getCompanyAnnualRevenueUrl } from '../urls';

describe('Urls utils', () => {
  describe('getCompaniesUrl', () => {
    it('should return companies url', () => {
      const result = getCompaniesUrl();

      expect(result).toBe('https://www.macrotrends.net/assets/php/ticker_search_list.php');
    });
  });

  describe('getCompanyAnnualRevenueUrl', () => {
    it('should return revenue url', () => {
      const company = { n: 'AAPL - Apple', s: 'AAPL/apple' };

      const result = getCompanyAnnualRevenueUrl(company);

      expect(result).toBe('https://www.macrotrends.net/stocks/charts/AAPL/apple/revenue');
    });
  });
});
