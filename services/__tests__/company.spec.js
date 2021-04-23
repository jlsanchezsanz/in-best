import axios from 'axios';

import CompanyService from '../company';

jest.mock('axios');

afterEach(() => {
  jest.clearAllMocks();
});

describe('CompanyService', () => {
  describe('getCompanies', () => {
    it('should return a list of companies', async () => {
      const data = [
        { n: 'AAPL - Apple', s: 'AAPL/apple' },
        { n: 'MSFT - Microsoft', s: 'MSFT/microsoft' },
        { n: 'AMZN - Amazon', s: 'AMZN/amazon' },
      ];
      axios.get.mockResolvedValueOnce({ data });

      const companies = await CompanyService.getCompanies();

      expect(companies).toEqual(data);
    });

    it('should catch error', async () => {
      const error = new Error('some error');
      axios.get.mockRejectedValueOnce(error);

      await expect(CompanyService.getCompanies()).rejects.toThrow(error);
    });
  });

  describe('getCompanyAnnualRevenue', () => {
    const company = { n: 'AAPL - Apple', s: 'AAPL/apple' };
    const data = `
      <table class="historical_data_table table">
        <tbody>
          <tr><td>2020</td><td>$274,515</td></tr>
          <tr><td>2019</td><td>$260,174</td></tr>
          <tr><td>2018</td><td>$265,595</td></tr>
          <tr><td>2017</td><td>$229,234</td></tr>
          <tr><td>2016</td><td>$215,639</td></tr>
          <tr><td>2015</td><td>$233,715</td></tr>
          <tr><td>2014</td><td>$182,795</td></tr>
          <tr><td>2013</td><td>$170,910</td></tr>
          <tr><td>2012</td><td>$156,508</td></tr>
          <tr><td>2011</td><td>$108,249</td></tr>
          <tr><td>2010</td><td>$65,225</td></tr>
        </tbody>
      </table>
    `;

    it('should return revenue values for the last given years', async () => {
      const expectedRevenue = {
        2011: 108249,
        2012: 156508,
        2013: 170910,
        2014: 182795,
        2015: 233715,
        2016: 215639,
        2017: 229234,
        2018: 265595,
        2019: 260174,
        2020: 274515,
      };
      axios.get.mockResolvedValueOnce({ data });
      const result = await CompanyService.getCompanyAnnualRevenue(company, 10);

      expect(result).toEqual(expectedRevenue);
    });
  });
});
