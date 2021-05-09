import axios from 'axios';

import CompanyService from '../company';
import {
  getCompanyAnalysisUrl,
  getCompanyAnnualEPSUrl,
  getCompanyAnnualFreeCashFlowUrl,
  getCompanyAnnualRevenueUrl,
  getCompanyAnnualROIUrl,
  getCompanyAnnualShareHolderEquityUrl,
  getCompanyAnnualSharesOutstandingUrl,
  getCompanySummaryUrl,
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
import { dataSummary, TTMEPS } from '../../mocks/yahoo-finance/summary';
import { dataAnalysis, next5YearsGrowthEstimate } from '../../mocks/yahoo-finance/analysis';

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
    it('should return annual revenue values', async () => {
      axios.get.mockResolvedValueOnce({ data: dataRevenue });
      const result = await CompanyService.getCompanyAnnualRevenue(companies[0]);

      expect(result).toEqual(revenue);
    });
  });

  describe('getCompanyAnnualEPS', () => {
    it('should return annual EPS values', async () => {
      axios.get.mockResolvedValueOnce({ data: dataEPS });
      const result = await CompanyService.getCompanyAnnualEPS(companies[0]);

      expect(result).toEqual(EPS);
    });
  });

  describe('getCompanyAnnualFreeCashFlow', () => {
    it('should return annual Free Cash Flow values', async () => {
      axios.get.mockResolvedValueOnce({ data: dataFreeCashFlow });
      const result = await CompanyService.getCompanyAnnualFreeCashFlow(companies[0]);

      expect(result).toEqual(freeCashFlow);
    });
  });

  describe('getCompanyAnnualShareHolderEquity', () => {
    it('should return annual Share Holder Equity values', async () => {
      axios.get.mockResolvedValueOnce({ data: dataShareHolderEquity });
      const result = await CompanyService.getCompanyAnnualShareHolderEquity(companies[0]);

      expect(result).toEqual(shareHolderEquity);
    });
  });

  describe('getCompanyAnnualSharesOutstanding', () => {
    it('should return annual Shares Outstanding values', async () => {
      axios.get.mockResolvedValueOnce({ data: dataSharesOutstanding });
      const result = await CompanyService.getCompanyAnnualSharesOutstanding(companies[0]);

      expect(result).toEqual(sharesOutstanding);
    });
  });

  describe('getCompanyAnnualBVPS', () => {
    it('should return annual Book Value Per Share values', async () => {
      const result = CompanyService.getCompanyAnnualBVPS(shareHolderEquity, sharesOutstanding);

      expect(result).toEqual(BVPS);
    });
  });

  describe('getCompanyAnnualROI', () => {
    it('should return annual ROI values', async () => {
      axios.get.mockResolvedValueOnce({ data: dataROI });
      const result = await CompanyService.getCompanyAnnualROI(companies[0]);

      expect(result).toEqual(ROI);
    });
  });

  describe('getCompanyTTMEPS', () => {
    it('should return TTM EPS value', async () => {
      axios.get.mockResolvedValueOnce({ data: dataSummary });
      const result = await CompanyService.getCompanyTTMEPS(companies[0]);

      expect(result).toEqual(TTMEPS);
    });
  });

  describe('getCompanyNext5YearsGrowthEstimate', () => {
    it('should return TTM EPS value', async () => {
      axios.get.mockResolvedValueOnce({ data: dataAnalysis });
      const result = await CompanyService.getCompanyNext5YearsGrowthEstimate(companies[0]);

      expect(result).toEqual(next5YearsGrowthEstimate);
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
      [getCompanySummaryUrl(company)]: dataSummary,
      [getCompanyAnalysisUrl(company)]: dataAnalysis,
    };
    const expectedCompanyAnalysis = {
      revenue,
      EPS,
      TTMEPS,
      freeCashFlow,
      BVPS,
      ROI,
      next5YearsGrowthEstimate,
      averageGrowthROIRates: { 10: -7.02, 5: 4.85, 1: 17.45 },
      averageGrowthRevenueRates: { 10: 9.75, 5: 4.95, 1: 5.51 },
      averageGrowthEPSRates: { 10: 12.73, 5: 9.54, 1: 10.44 },
      averageGrowthFreeCashFlowRates: { 10: 8.23, 5: 6.52, 1: 24.57 },
      averageGrowthBVPSRates: { 10: 2.48, 5: -8.54, 1: -23.41 },
      score: 78.05,
    };

    it('should return company analysis', async () => {
      axios.get.mockImplementation((url) => ({
        data: dataMap[url],
      }));
      const result = await CompanyService.getCompanyAnalysis(company);

      expect(result).toEqual(expectedCompanyAnalysis);
    });
  });
});
