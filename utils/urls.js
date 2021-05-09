import { getTickerSymbol } from './company';

const MACROTRENDS_BASE_URL = 'https://www.macrotrends.net';
const YAHOO_FINANCE_BASE_URL = 'https://finance.yahoo.com/quote';
const COMPANIES_URL = 'assets/php/ticker_search_list.php';
const CHARTS_URL = 'stocks/charts';
const REVENUE_SUFFIX = 'revenue';
const EPS_SUFFIX = 'eps-earnings-per-share-diluted';
const FREE_CASH_FLOW_SUFFIX = 'free-cash-flow';
const SHARE_HOLDER_EQUITY_SUFFIX = 'total-share-holder-equity';
const SHARES_OUTSTANDING_SUFFIX = 'shares-outstanding';
const ROI_SUFFIX = 'roi';
const ANALYSIS_SUFFIX = 'analysis';

export const getCompaniesUrl = () => `${MACROTRENDS_BASE_URL}/${COMPANIES_URL}`;

export const getCompanyAnnualRevenueUrl = (company) =>
  `${MACROTRENDS_BASE_URL}/${CHARTS_URL}/${company.s}/${REVENUE_SUFFIX}`;

export const getCompanyAnnualEPSUrl = (company) =>
  `${MACROTRENDS_BASE_URL}/${CHARTS_URL}/${company.s}/${EPS_SUFFIX}`;

export const getCompanyAnnualFreeCashFlowUrl = (company) =>
  `${MACROTRENDS_BASE_URL}/${CHARTS_URL}/${company.s}/${FREE_CASH_FLOW_SUFFIX}`;

export const getCompanyAnnualShareHolderEquityUrl = (company) =>
  `${MACROTRENDS_BASE_URL}/${CHARTS_URL}/${company.s}/${SHARE_HOLDER_EQUITY_SUFFIX}`;

export const getCompanyAnnualSharesOutstandingUrl = (company) =>
  `${MACROTRENDS_BASE_URL}/${CHARTS_URL}/${company.s}/${SHARES_OUTSTANDING_SUFFIX}`;

export const getCompanyAnnualROIUrl = (company) =>
  `${MACROTRENDS_BASE_URL}/${CHARTS_URL}/${company.s}/${ROI_SUFFIX}`;

export const getCompanySummaryUrl = (company) =>
  `${YAHOO_FINANCE_BASE_URL}/${getTickerSymbol(company)}`;

export const getCompanyAnalysisUrl = (company) =>
  `${YAHOO_FINANCE_BASE_URL}/${getTickerSymbol(company)}/${ANALYSIS_SUFFIX}`;
