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

  describe('getCompanyAnnualEPS', () => {
    const company = { n: 'AAPL - Apple', s: 'AAPL/apple' };
    const data = `
      <table class="historical_data_table table">					
        <tbody>      
          <tr><td>2020</td><td>$3.28</td></tr>
          <tr><td>2019</td><td>$2.97</td></tr>
          <tr><td>2018</td><td>$2.98</td></tr>
          <tr><td>2017</td><td>$2.30</td></tr>
          <tr><td>2016</td><td>$2.08</td></tr>
          <tr><td>2015</td><td>$2.31</td></tr>
          <tr><td>2014</td><td>$1.61</td></tr>
          <tr><td>2013</td><td>$1.42</td></tr>
          <tr><td>2012</td><td>$1.58</td></tr>
          <tr><td>2011</td><td>$0.99</td></tr>
          <tr><td>2010</td><td>$0.54</td></tr>
          <tr><td>2009</td><td>$0.32</td></tr>
          <tr><td>2008</td><td>$0.24</td></tr>
          <tr><td>2007</td><td>$0.14</td></tr>
          <tr><td>2006</td><td>$0.08</td></tr>
          <tr><td>2005</td><td>$0.06</td></tr>
        </tbody>
      </table> 
    `;

    it('should return EPS values for the last given years', async () => {
      const expectedEPS = {
        2020: 3.28,
        2019: 2.97,
        2018: 2.98,
        2017: 2.3,
        2016: 2.08,
        2015: 2.31,
        2014: 1.61,
        2013: 1.42,
        2012: 1.58,
        2011: 0.99,
      };
      axios.get.mockResolvedValueOnce({ data });
      const result = await CompanyService.getCompanyAnnualEPS(company, 10);

      expect(result).toEqual(expectedEPS);
    });
  });

  describe('getCompanyAnnualFreeCashFlow', () => {
    const company = { n: 'AAPL - Apple', s: 'AAPL/apple' };
    const data = `
      <table class="historical_data_table table">
        <tbody>
          <tr><td>2020</td><td>73,365.00</td></tr>
          <tr><td>2019</td><td>58,896.00</td></tr>
          <tr><td>2018</td><td>64,121.00</td></tr>
          <tr><td>2017</td><td>51,774.00</td></tr>
          <tr><td>2016</td><td>53,497.00</td></tr>
          <tr><td>2015</td><td>70,019.00</td></tr>
          <tr><td>2014</td><td>50,142.00</td></tr>
          <tr><td>2013</td><td>45,501.00</td></tr>
          <tr><td>2012</td><td>42,561.00</td></tr>
          <tr><td>2011</td><td>33,269.00</td></tr>
          <tr><td>2010</td><td>16,590.00</td></tr>
          <tr><td>2009</td><td>9,015.00</td></tr>
          <tr><td>2008</td><td>8,505.00</td></tr>
          <tr><td>2007</td><td>4,735.00</td></tr>
          <tr><td>2006</td><td>1,563.00</td></tr>
          <tr><td>2005</td><td>2,275.00</td></tr>
      </table>  
    `;

    it('should return Free Cash Flow values for the last given years', async () => {
      const expectedFreeCashFlow = {
        2020: 73365,
        2019: 58896,
        2018: 64121,
        2017: 51774,
        2016: 53497,
        2015: 70019,
        2014: 50142,
        2013: 45501,
        2012: 42561,
        2011: 33269,
      };
      axios.get.mockResolvedValueOnce({ data });
      const result = await CompanyService.getCompanyAnnualFreeCashFlow(company, 10);

      expect(result).toEqual(expectedFreeCashFlow);
    });
  });
});
