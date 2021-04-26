import axios from 'axios';

import { getCompaniesUrl, getCompanyAnnualEPSUrl, getCompanyAnnualRevenueUrl } from '../utils/urls';
import { scrapEPS, scrapRevenue } from '../utils/scrapping';

export default class CompanyService {
  static async getCompanies() {
    const { data } = await axios.get(getCompaniesUrl());

    return data;
  }

  static async getCompanyAnnualRevenue(company, years) {
    const { data } = await axios.get(getCompanyAnnualRevenueUrl(company));

    const annualRevenue = scrapRevenue(data, years);

    return annualRevenue;
  }

  static async getCompanyAnnualEPS(company, years) {
    const { data } = await axios.get(getCompanyAnnualEPSUrl(company));

    const annualEPS = scrapEPS(data, years);

    return annualEPS;
  }
}
