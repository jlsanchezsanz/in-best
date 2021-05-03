import axios from 'axios';

import CompanyService from '../company';
import {
  getCompanyAnnualEPSUrl,
  getCompanyAnnualFreeCashFlowUrl,
  getCompanyAnnualRevenueUrl,
  getCompanyAnnualShareHolderEquityUrl,
  getCompanyAnnualSharesOutstandingUrl,
} from '../../utils/urls';

jest.mock('axios');

afterEach(() => {
  jest.clearAllMocks();
});

const companies = [
  { n: 'AAPL - Apple', s: 'AAPL/apple' },
  { n: 'MSFT - Microsoft', s: 'MSFT/microsoft' },
  { n: 'AMZN - Amazon', s: 'AMZN/amazon' },
];

const dataRevenue = `
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

const dataEPS = `
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

const dataFreeCashFlow = `
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

const dataShareHolderEquity = `
  <table class="historical_data_table table">
    <tbody>
      <tr><td>2020</td><td>$65,339</td></tr>
      <tr><td>2019</td><td>$90,488</td></tr>
      <tr><td>2018</td><td>$107,147</td></tr>
      <tr><td>2017</td><td>$134,047</td></tr>
      <tr><td>2016</td><td>$128,249</td></tr>
      <tr><td>2015</td><td>$119,355</td></tr>
      <tr><td>2014</td><td>$111,547</td></tr>
      <tr><td>2013</td><td>$123,549</td></tr>
      <tr><td>2012</td><td>$118,210</td></tr>
      <tr><td>2011</td><td>$76,615</td></tr>
      <tr><td>2010</td><td>$47,791</td></tr>
      <tr><td>2009</td><td>$31,640</td></tr>
      <tr><td>2008</td><td>$22,297</td></tr>
      <tr><td>2007</td><td>$14,532</td></tr>
      <tr><td>2006</td><td>$9,984</td></tr>
      <tr><td>2005</td><td>$7,428</td></tr>
    </tbody>
  </table>  
`;

const dataSharesOutstanding = `
  <table class="historical_data_table table">
    <tbody>
      <tr><td>2020</td><td>17,528</td></tr>
      <tr><td>2019</td><td>18,596</td></tr>
      <tr><td>2018</td><td>20,000</td></tr>
      <tr><td>2017</td><td>21,007</td></tr>
      <tr><td>2016</td><td>22,001</td></tr>
      <tr><td>2015</td><td>23,172</td></tr>
      <tr><td>2014</td><td>24,491</td></tr>
      <tr><td>2013</td><td>26,087</td></tr>
      <tr><td>2012</td><td>26,470</td></tr>
      <tr><td>2011</td><td>26,226</td></tr>
      <tr><td>2010</td><td>25,892</td></tr>
      <tr><td>2009</td><td>25,396</td></tr>
      <tr><td>2008</td><td>25,260</td></tr>
      <tr><td>2007</td><td>24,900</td></tr>
      <tr><td>2006</td><td>24,571</td></tr>
      <tr><td>2005</td><td>23,993</td></tr>
    </tbody>
  </table>  
`;

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
const expectedShareHolderEquity = {
  2020: 65339,
  2019: 90488,
  2018: 107147,
  2017: 134047,
  2016: 128249,
  2015: 119355,
  2014: 111547,
  2013: 123549,
  2012: 118210,
  2011: 76615,
};
const expectedSharesOutstanding = {
  2020: 17528,
  2019: 18596,
  2018: 20000,
  2017: 21007,
  2016: 22001,
  2015: 23172,
  2014: 24491,
  2013: 26087,
  2012: 26470,
  2011: 26226,
};
const expectedBVPS = {
  2020: 3.73,
  2019: 4.87,
  2018: 5.36,
  2017: 6.38,
  2016: 5.83,
  2015: 5.15,
  2014: 4.55,
  2013: 4.74,
  2012: 4.47,
  2011: 2.92,
};

const expectedCompanyAnalysis = {
  revenue: expectedRevenue,
  EPS: expectedEPS,
  freeCashFlow: expectedFreeCashFlow,
  shareHolderEquity: expectedShareHolderEquity,
  sharesOutstanding: expectedSharesOutstanding,
  BVPS: expectedBVPS,
};

describe('CompanyService', () => {
  describe('getCompanies', () => {
    it('should return a list of companies', async () => {
      axios.get.mockResolvedValueOnce({ data: companies });

      const result = await CompanyService.getCompanies();

      expect(result).toEqual(companies);
    });

    it('should catch error', async () => {
      const error = new Error('some error');
      axios.get.mockRejectedValueOnce(error);

      await expect(CompanyService.getCompanies()).rejects.toThrow(error);
    });
  });

  describe('getCompanyAnnualRevenue', () => {
    it('should return revenue values for the last given years', async () => {
      axios.get.mockResolvedValueOnce({ data: dataRevenue });
      const result = await CompanyService.getCompanyAnnualRevenue(companies[0], 10);

      expect(result).toEqual(expectedRevenue);
    });
  });

  describe('getCompanyAnnualEPS', () => {
    it('should return EPS values for the last given years', async () => {
      axios.get.mockResolvedValueOnce({ data: dataEPS });
      const result = await CompanyService.getCompanyAnnualEPS(companies[0], 10);

      expect(result).toEqual(expectedEPS);
    });
  });

  describe('getCompanyAnnualFreeCashFlow', () => {
    it('should return Free Cash Flow values for the last given years', async () => {
      axios.get.mockResolvedValueOnce({ data: dataFreeCashFlow });
      const result = await CompanyService.getCompanyAnnualFreeCashFlow(companies[0], 10);

      expect(result).toEqual(expectedFreeCashFlow);
    });
  });

  describe('getCompanyAnnualShareHolderEquity', () => {
    it('should return Share Holder Equity values for the last given years', async () => {
      axios.get.mockResolvedValueOnce({ data: dataShareHolderEquity });
      const result = await CompanyService.getCompanyAnnualShareHolderEquity(companies[0], 10);

      expect(result).toEqual(expectedShareHolderEquity);
    });
  });

  describe('getCompanyAnnualSharesOutstanding', () => {
    it('should return Shares Outstanding values for the last given years', async () => {
      axios.get.mockResolvedValueOnce({ data: dataSharesOutstanding });
      const result = await CompanyService.getCompanyAnnualSharesOutstanding(companies[0], 10);

      expect(result).toEqual(expectedSharesOutstanding);
    });
  });

  describe('getCompanyAnnualBVPS', () => {
    it('should return Book Value Per Share values for the last given years', async () => {
      const result = CompanyService.getCompanyAnnualBVPS(
        expectedShareHolderEquity,
        expectedSharesOutstanding
      );

      expect(result).toEqual(expectedBVPS);
    });
  });

  describe('getCompanyAnalysis', () => {
    const company = companies[0];
    const dataMap = {
      [getCompanyAnnualRevenueUrl(company)]: dataRevenue,
      [getCompanyAnnualEPSUrl(company)]: dataEPS,
      [getCompanyAnnualFreeCashFlowUrl(company)]: dataFreeCashFlow,
      [getCompanyAnnualShareHolderEquityUrl(company)]: dataShareHolderEquity,
      [getCompanyAnnualSharesOutstandingUrl(company)]: dataSharesOutstanding,
    };

    it('should return company analysis', async () => {
      axios.get.mockImplementation((url) => ({
        data: dataMap[url],
      }));
      const result = await CompanyService.getCompanyAnalysis(company, 10);

      expect(result).toEqual(expectedCompanyAnalysis);
    });
  });
});
