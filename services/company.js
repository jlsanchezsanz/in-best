import axios from 'axios';

import {
  getCompaniesUrl,
  getCompanyAnnualEPSUrl,
  getCompanyAnnualFreeCashFlowUrl,
  getCompanyAnnualRevenueUrl,
  getCompanyAnnualShareHolderEquityUrl,
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
}
