import axios from 'axios';

import {
  getCompaniesUrl,
  getCompanyAnnualEPSUrl,
  getCompanyAnnualFreeCashFlowUrl,
  getCompanyAnnualRevenueUrl,
} from '../utils/urls';
import { scrapeEPS, scrapeFreeCashFlow, scrapeRevenue } from '../utils/scraping';

export default class CompanyService {
  static async getCompanies() {
    const { data } = await axios.get(getCompaniesUrl());

    return data;
  }

  static async getCompanyAnnualRevenue(company, years) {
    const { data } = await axios.get(getCompanyAnnualRevenueUrl(company));

    const annualRevenue = scrapeRevenue(data, years);

    return annualRevenue;
  }

  static async getCompanyAnnualEPS(company, years) {
    const { data } = await axios.get(getCompanyAnnualEPSUrl(company));

    const annualEPS = scrapeEPS(data, years);

    return annualEPS;
  }

  static async getCompanyAnnualFreeCashFlow(company, years) {
    const { data } = await axios.get(getCompanyAnnualFreeCashFlowUrl(company));

    const annualFreeCashFlow = scrapeFreeCashFlow(data, years);

    return annualFreeCashFlow;
  }
}
