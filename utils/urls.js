const BASE_URL = 'https://www.macrotrends.net/';
const COMPANIES_URL = 'assets/php/ticker_search_list.php';

export const getCompaniesUrl = () => `${BASE_URL}${COMPANIES_URL}`;
