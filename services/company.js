import axios from 'axios';

import {
  getCompaniesUrl,
  getCompanyAnnualEPSUrl,
  getCompanyAnnualFreeCashFlowUrl,
  getCompanyAnnualRevenueUrl,
  getCompanyAnnualShareHolderEquityUrl,
  getCompanyAnnualSharesOutstandingUrl,
} from '../utils/urls';
import { scrapeAnnualValue } from '../utils/scraping';

export default class CompanyService {
  static async getCompanies() {
    const { data } = await axios.get(getCompaniesUrl());

    return data;
  }

  static async getCompanyAnnualRevenue(company, years) {
    const { data } = await axios.get(getCompanyAnnualRevenueUrl(company));

    const annualRevenue = scrapeAnnualValue(data, years);

    return annualRevenue;
  }

  static async getCompanyAnnualEPS(company, years) {
    const { data } = await axios.get(getCompanyAnnualEPSUrl(company));

    const annualEPS = scrapeAnnualValue(data, years);

    return annualEPS;
  }

  static async getCompanyAnnualFreeCashFlow(company, years) {
    const { data } = await axios.get(getCompanyAnnualFreeCashFlowUrl(company));

    const annualFreeCashFlow = scrapeAnnualValue(data, years);

    return annualFreeCashFlow;
  }

  static async getCompanyAnnualShareHolderEquity(company, years) {
    const { data } = await axios.get(getCompanyAnnualShareHolderEquityUrl(company));

    const annualShareHolderEquity = scrapeAnnualValue(data, years);

    return annualShareHolderEquity;
  }

  static async getCompanyAnnualSharesOutstanding(company, years) {
    const { data } = await axios.get(getCompanyAnnualSharesOutstandingUrl(company));

    const annualSharesOutstanding = scrapeAnnualValue(data, years);

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

  static async getCompanyAnalysis(company, years) {
    const revenue = await this.getCompanyAnnualRevenue(company, years);
    const EPS = await this.getCompanyAnnualEPS(company, years);
    const freeCashFlow = await this.getCompanyAnnualFreeCashFlow(company, years);
    const shareHolderEquity = await this.getCompanyAnnualShareHolderEquity(company, years);
    const sharesOutstanding = await this.getCompanyAnnualSharesOutstanding(company, years);
    const BVPS = this.getCompanyAnnualBVPS(shareHolderEquity, sharesOutstanding, years);

    return {
      BVPS,
      EPS,
      freeCashFlow,
      revenue,
      shareHolderEquity,
      sharesOutstanding,
    };
  }
}
