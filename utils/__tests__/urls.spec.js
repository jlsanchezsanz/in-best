import { getCompaniesUrl } from '../urls';

describe('Urls utils', () => {
  describe('getCompaniesUrl', () => {
    it('should return companies url', () => {
      const result = getCompaniesUrl();
      expect(result).toBe('https://www.macrotrends.net/assets/php/ticker_search_list.php');
    });
  });
});
