import {
  getCompaniesUrl,
  getCompanyAnnualEPSUrl,
  getCompanyAnnualFreeCashFlowUrl,
  getCompanyAnnualRevenueUrl,
  getCompanyAnnualShareHolderEquityUrl,
  getCompanyAnnualSharesOutstandingUrl,
} from '../urls';

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

  describe('getCompanyAnnualEPSUrl', () => {
    it('should return EPS url', () => {
      const company = { n: 'AAPL - Apple', s: 'AAPL/apple' };

      const result = getCompanyAnnualEPSUrl(company);

      expect(result).toBe(
        'https://www.macrotrends.net/stocks/charts/AAPL/apple/eps-earnings-per-share-diluted'
      );
    });
  });

  describe('getCompanyAnnualFreeCashFlowUrl', () => {
    it('should return Free Cash Flow url', () => {
      const company = { n: 'AAPL - Apple', s: 'AAPL/apple' };

      const result = getCompanyAnnualFreeCashFlowUrl(company);

      expect(result).toBe('https://www.macrotrends.net/stocks/charts/AAPL/apple/free-cash-flow');
    });
  });

  describe('getCompanyAnnualShareHolderEquityUrl', () => {
    it('should return Share Holder Equity url', () => {
      const company = { n: 'AAPL - Apple', s: 'AAPL/apple' };

      const result = getCompanyAnnualShareHolderEquityUrl(company);

      expect(result).toBe(
        'https://www.macrotrends.net/stocks/charts/AAPL/apple/total-share-holder-equity'
      );
    });
  });

  describe('getCompanyAnnualSharesOutstandingUrl', () => {
    it('should return Shares Outstanding url', () => {
      const company = { n: 'AAPL - Apple', s: 'AAPL/apple' };

      const result = getCompanyAnnualSharesOutstandingUrl(company);

      expect(result).toBe(
        'https://www.macrotrends.net/stocks/charts/AAPL/apple/shares-outstanding'
      );
    });
  });
});
