const BASE_URL = 'https://www.macrotrends.net';
const COMPANIES_URL = 'assets/php/ticker_search_list.php';
const CHARTS_URL = 'stocks/charts';
const REVENUE_SUFFIX = 'revenue';
const EPS_SUFFIX = 'eps-earnings-per-share-diluted';

export const getCompaniesUrl = () => `${BASE_URL}/${COMPANIES_URL}`;

export const getCompanyAnnualRevenueUrl = (company) =>
  `${BASE_URL}/${CHARTS_URL}/${company.s}/${REVENUE_SUFFIX}`;

export const getCompanyAnnualEPSUrl = (company) =>
  `${BASE_URL}/${CHARTS_URL}/${company.s}/${EPS_SUFFIX}`;
