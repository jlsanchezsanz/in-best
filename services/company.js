import axios from 'axios';

import {
  getCompaniesUrl,
  getCompanyAnalysisUrl,
  getCompanyAnnualEPSUrl,
  getCompanyAnnualFreeCashFlowUrl,
  getCompanyAnnualRevenueUrl,
  getCompanyAnnualROIUrl,
  getCompanyAnnualShareHolderEquityUrl,
  getCompanyAnnualSharesOutstandingUrl,
  getCompanySummaryUrl,
} from '../utils/urls';
import {
  scrapeAnnualValue,
  scrapeAnnualValueFromQuarterly,
  scrapeNext5YearsGrowthEstimate,
  scrapeTTMEPS,
} from '../utils/scraping';
import { getCompanyAverageGrowthRates, getCompanyScore } from '../utils/financials';

export default class CompanyService {
  static async getCompanies() {
    const { data } = await axios.get(getCompaniesUrl());

    return data;
  }

  static async getCompanyAnnualRevenue(company) {
    const { data } = await axios.get(getCompanyAnnualRevenueUrl(company));

    const annualRevenue = scrapeAnnualValue(data);

    return annualRevenue;
  }

  static async getCompanyAnnualEPS(company) {
    const { data } = await axios.get(getCompanyAnnualEPSUrl(company));

    const annualEPS = scrapeAnnualValue(data);

    return annualEPS;
  }

  static async getCompanyAnnualFreeCashFlow(company) {
    const { data } = await axios.get(getCompanyAnnualFreeCashFlowUrl(company));

    const annualFreeCashFlow = scrapeAnnualValue(data);

    return annualFreeCashFlow;
  }

  static async getCompanyAnnualShareHolderEquity(company) {
    const { data } = await axios.get(getCompanyAnnualShareHolderEquityUrl(company));

    const annualShareHolderEquity = scrapeAnnualValue(data);

    return annualShareHolderEquity;
  }

  static async getCompanyAnnualSharesOutstanding(company) {
    const { data } = await axios.get(getCompanyAnnualSharesOutstandingUrl(company));

    const annualSharesOutstanding = scrapeAnnualValue(data);

    return annualSharesOutstanding;
  }

  static getCompanyAnnualBVPS(shareHolderEquity, sharesOutstanding) {
    const annualBVPS = Object.keys(shareHolderEquity).reduce(
      (acc, year) => ({
        ...acc,
        [year]: +(shareHolderEquity[year] / sharesOutstanding[year]).toFixed(2),
      }),
      {}
    );

    return annualBVPS;
  }

  static async getCompanyAnnualROI(company) {
    const { data } = await axios.get(getCompanyAnnualROIUrl(company));

    const annualSharesOutstanding = scrapeAnnualValueFromQuarterly(data);

    return annualSharesOutstanding;
  }

  static async getCompanyTTMEPS(company) {
    const { data } = await axios.get(getCompanySummaryUrl(company));

    const TTMEPS = scrapeTTMEPS(data);

    return TTMEPS;
  }

  static async getCompanyNext5YearsGrowthEstimate(company) {
    const { data } = await axios.get(getCompanyAnalysisUrl(company));

    const next5YearsGrowthEstimate = scrapeNext5YearsGrowthEstimate(data);

    return next5YearsGrowthEstimate;
  }

  static async getCompanyAnalysis(company) {
    const revenue = await this.getCompanyAnnualRevenue(company);
    const EPS = await this.getCompanyAnnualEPS(company);
    const TTMEPS = await this.getCompanyTTMEPS(company);
    const freeCashFlow = await this.getCompanyAnnualFreeCashFlow(company);
    const shareHolderEquity = await this.getCompanyAnnualShareHolderEquity(company);
    const sharesOutstanding = await this.getCompanyAnnualSharesOutstanding(company);
    const BVPS = this.getCompanyAnnualBVPS(shareHolderEquity, sharesOutstanding);
    const ROI = await this.getCompanyAnnualROI(company);
    const next5YearsGrowthEstimate = await this.getCompanyNext5YearsGrowthEstimate(company);
    const companyData = { BVPS, EPS, freeCashFlow, revenue, ROI };
    const companyAverageGrowthRates = getCompanyAverageGrowthRates(companyData);
    const score = getCompanyScore(companyAverageGrowthRates);

    return {
      score,
      TTMEPS,
      next5YearsGrowthEstimate,
      ...companyAverageGrowthRates,
      ...companyData,
    };
  }
}
