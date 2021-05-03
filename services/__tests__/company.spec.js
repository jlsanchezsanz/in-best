import axios from 'axios';

import CompanyService from '../company';
import {
  getCompanyAnnualEPSUrl,
  getCompanyAnnualFreeCashFlowUrl,
  getCompanyAnnualRevenueUrl,
  getCompanyAnnualROIUrl,
  getCompanyAnnualShareHolderEquityUrl,
  getCompanyAnnualSharesOutstandingUrl,
} from '../../utils/urls';
import {
  dataRevenue,
  dataEPS,
  dataFreeCashFlow,
  dataShareHolderEquity,
  dataSharesOutstanding,
  dataROI,
  companies,
  revenue,
  EPS,
  freeCashFlow,
  shareHolderEquity,
  sharesOutstanding,
  BVPS,
  ROI,
} from '../../mocks/scrap-data';

jest.mock('axios');

afterEach(() => {
  jest.clearAllMocks();
});

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

      expect(result).toEqual(revenue);
    });
  });

  describe('getCompanyAnnualEPS', () => {
    it('should return EPS values for the last given years', async () => {
      axios.get.mockResolvedValueOnce({ data: dataEPS });
      const result = await CompanyService.getCompanyAnnualEPS(companies[0], 10);

      expect(result).toEqual(EPS);
    });
  });

  describe('getCompanyAnnualFreeCashFlow', () => {
    it('should return Free Cash Flow values for the last given years', async () => {
      axios.get.mockResolvedValueOnce({ data: dataFreeCashFlow });
      const result = await CompanyService.getCompanyAnnualFreeCashFlow(companies[0], 10);

      expect(result).toEqual(freeCashFlow);
    });
  });

  describe('getCompanyAnnualShareHolderEquity', () => {
    it('should return Share Holder Equity values for the last given years', async () => {
      axios.get.mockResolvedValueOnce({ data: dataShareHolderEquity });
      const result = await CompanyService.getCompanyAnnualShareHolderEquity(companies[0], 10);

      expect(result).toEqual(shareHolderEquity);
    });
  });

  describe('getCompanyAnnualSharesOutstanding', () => {
    it('should return Shares Outstanding values for the last given years', async () => {
      axios.get.mockResolvedValueOnce({ data: dataSharesOutstanding });
      const result = await CompanyService.getCompanyAnnualSharesOutstanding(companies[0], 10);

      expect(result).toEqual(sharesOutstanding);
    });
  });

  describe('getCompanyAnnualBVPS', () => {
    it('should return Book Value Per Share values for the last given years', async () => {
      const result = CompanyService.getCompanyAnnualBVPS(shareHolderEquity, sharesOutstanding);

      expect(result).toEqual(BVPS);
    });
  });

  describe('getCompanyAnnualROI', () => {
    it('should return ROI values for the last given years', async () => {
      axios.get.mockResolvedValueOnce({ data: dataROI });
      const result = await CompanyService.getCompanyAnnualROI(companies[0], 10);

      expect(result).toEqual(ROI);
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
      [getCompanyAnnualROIUrl(company)]: dataROI,
    };
    const expectedCompanyAnalysis = {
      revenue,
      EPS,
      freeCashFlow,
      BVPS,
      ROI,
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
