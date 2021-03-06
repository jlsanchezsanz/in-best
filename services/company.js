import axios from 'axios';
import PromisePool from '@supercharge/promise-pool';

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
  scrapeCompanyName,
  scrapeNext5YearsGrowthEstimate,
  scrapeTTMEPS,
} from '../utils/scraping';
import {
  getCompanyAverageGrowthRates,
  getCompanyMarginOfSafetyBuyPrice,
  getCompanyScore,
} from '../utils/financials';
import { getTickerSymbol } from '../utils/company';
import { Company } from '../models/Company';

export class CompanyService {
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

  static async getCompanySummary(company) {
    const { data } = await axios.get(getCompanySummaryUrl(company));
    const TTMEPS = scrapeTTMEPS(data);
    const name = scrapeCompanyName(data);

    return { name, TTMEPS };
  }

  static async getCompanyNext5YearsGrowthEstimate(company) {
    const { data } = await axios.get(getCompanyAnalysisUrl(company));

    const next5YearsGrowthEstimate = scrapeNext5YearsGrowthEstimate(data);

    return next5YearsGrowthEstimate;
  }

  static async getCompanyAnalysis(company) {
    const tickerSymbol = getTickerSymbol(company);
    const revenue = await this.getCompanyAnnualRevenue(company);
    const EPS = await this.getCompanyAnnualEPS(company);
    const { name, TTMEPS } = await this.getCompanySummary(company);
    const freeCashFlow = await this.getCompanyAnnualFreeCashFlow(company);
    const shareHolderEquity = await this.getCompanyAnnualShareHolderEquity(company);
    const sharesOutstanding = await this.getCompanyAnnualSharesOutstanding(company);
    const BVPS = this.getCompanyAnnualBVPS(shareHolderEquity, sharesOutstanding);
    const ROI = await this.getCompanyAnnualROI(company);
    const next5YearsGrowthEstimate = await this.getCompanyNext5YearsGrowthEstimate(company);
    const companyData = { BVPS, EPS, freeCashFlow, revenue, ROI };
    const companyAverageGrowthRates = getCompanyAverageGrowthRates(companyData);
    const score = getCompanyScore(companyAverageGrowthRates);
    const marginOfSafetyBuyPrice = getCompanyMarginOfSafetyBuyPrice(
      TTMEPS,
      next5YearsGrowthEstimate
    );

    return {
      tickerSymbol,
      name,
      marginOfSafetyBuyPrice,
      score,
      ...companyAverageGrowthRates,
      ...companyData,
    };
  }

  static async insertCompanyAnalysis(company) {
    try {
      const companyAnalysis = await this.getCompanyAnalysis(company);
      const { tickerSymbol } = companyAnalysis;
      let foundCompany = await Company.findOne({ tickerSymbol });

      if (!foundCompany) {
        foundCompany = new Company();
      }

      Object.keys(companyAnalysis).forEach((key) => {
        foundCompany[key] = companyAnalysis[key];
      });

      await foundCompany.save();
    } catch (error) {
      console.log(`${company} \n ${error}`);
    }
  }

  static async updateAllCompaniesAnalysis() {
    const companies = await this.getCompanies();
    const { results, errors } = await PromisePool.withConcurrency(20)
      .for(companies)
      .process(this.insertCompanyAnalysis.bind(this));

    if (errors) {
      console.log(errors);
      return;
    }

    return results;
  }
}
