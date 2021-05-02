const BASE_URL = 'https://www.macrotrends.net';
const COMPANIES_URL = 'assets/php/ticker_search_list.php';
const CHARTS_URL = 'stocks/charts';
const REVENUE_SUFFIX = 'revenue';
const EPS_SUFFIX = 'eps-earnings-per-share-diluted';
const FREE_CASH_FLOW_SUFFIX = 'free-cash-flow';
const SHARE_HOLDER_EQUITY_SUFFIX = 'total-share-holder-equity';
const SHARES_OUTSTANDING_SUFFIX = 'shares-outstanding';

export const getCompaniesUrl = () => `${BASE_URL}/${COMPANIES_URL}`;

export const getCompanyAnnualRevenueUrl = (company) =>
  `${BASE_URL}/${CHARTS_URL}/${company.s}/${REVENUE_SUFFIX}`;

export const getCompanyAnnualEPSUrl = (company) =>
  `${BASE_URL}/${CHARTS_URL}/${company.s}/${EPS_SUFFIX}`;

export const getCompanyAnnualFreeCashFlowUrl = (company) =>
  `${BASE_URL}/${CHARTS_URL}/${company.s}/${FREE_CASH_FLOW_SUFFIX}`;

export const getCompanyAnnualShareHolderEquityUrl = (company) =>
  `${BASE_URL}/${CHARTS_URL}/${company.s}/${SHARE_HOLDER_EQUITY_SUFFIX}`;

export const getCompanyAnnualSharesOutstandingUrl = (company) =>
  `${BASE_URL}/${CHARTS_URL}/${company.s}/${SHARES_OUTSTANDING_SUFFIX}`;
