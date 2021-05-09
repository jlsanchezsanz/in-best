import {
  getCompaniesUrl,
  getCompanyAnnualEPSUrl,
  getCompanyAnnualFreeCashFlowUrl,
  getCompanyAnnualRevenueUrl,
  getCompanyAnnualShareHolderEquityUrl,
  getCompanyAnnualSharesOutstandingUrl,
  getCompanyAnnualROIUrl,
  getCompanyAnalysisUrl,
  getCompanySummaryUrl,
} from '../urls';

describe('Urls utils', () => {
  const company = { n: 'AAPL - Apple', s: 'AAPL/apple' };

  describe('getCompaniesUrl', () => {
    it('should return companies url', () => {
      const result = getCompaniesUrl();

      expect(result).toBe('https://www.macrotrends.net/assets/php/ticker_search_list.php');
    });
  });

  describe('getCompanyAnnualRevenueUrl', () => {
    it('should return revenue url', () => {
      const result = getCompanyAnnualRevenueUrl(company);

      expect(result).toBe('https://www.macrotrends.net/stocks/charts/AAPL/apple/revenue');
    });
  });

  describe('getCompanyAnnualEPSUrl', () => {
    it('should return EPS url', () => {
      const result = getCompanyAnnualEPSUrl(company);

      expect(result).toBe(
        'https://www.macrotrends.net/stocks/charts/AAPL/apple/eps-earnings-per-share-diluted'
      );
    });
  });

  describe('getCompanyAnnualFreeCashFlowUrl', () => {
    it('should return Free Cash Flow url', () => {
      const result = getCompanyAnnualFreeCashFlowUrl(company);

      expect(result).toBe('https://www.macrotrends.net/stocks/charts/AAPL/apple/free-cash-flow');
    });
  });

  describe('getCompanyAnnualShareHolderEquityUrl', () => {
    it('should return Share Holder Equity url', () => {
      const result = getCompanyAnnualShareHolderEquityUrl(company);

      expect(result).toBe(
        'https://www.macrotrends.net/stocks/charts/AAPL/apple/total-share-holder-equity'
      );
    });
  });

  describe('getCompanyAnnualSharesOutstandingUrl', () => {
    it('should return Shares Outstanding url', () => {
      const result = getCompanyAnnualSharesOutstandingUrl(company);

      expect(result).toBe(
        'https://www.macrotrends.net/stocks/charts/AAPL/apple/shares-outstanding'
      );
    });
  });

  describe('getCompanyAnnualROIUrl', () => {
    it('should return Shares Outstanding url', () => {
      const result = getCompanyAnnualROIUrl(company);

      expect(result).toBe('https://www.macrotrends.net/stocks/charts/AAPL/apple/roi');
    });
  });

  describe('getCompanySummaryUrl', () => {
    it('should return summary url', () => {
      const result = getCompanySummaryUrl(company);

      expect(result).toBe('https://finance.yahoo.com/quote/AAPL');
    });
  });

  describe('getCompanyAnalysisUrl', () => {
    it('should return analysis url', () => {
      const result = getCompanyAnalysisUrl(company);

      expect(result).toBe('https://finance.yahoo.com/quote/AAPL/analysis');
    });
  });
});
