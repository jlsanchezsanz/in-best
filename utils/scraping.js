import cheerio from 'cheerio';

import { toNumber } from './format';

export const scrapeAnnualValue = (data) => {
  const $ = cheerio.load(data);
  const table = $('.historical_data_table').first();
  const rows = table.children('tbody').children();

  let annualValue = {};

  rows.each((_, el) => {
    const year = $(el).children().first().text();
    const value = toNumber($(el).children().last().text());

    if (!isNaN(value)) {
      annualValue = { ...annualValue, [year]: value };
    }
  });

  return annualValue;
};

export const scrapeAnnualValueFromQuarterly = (data) => {
  const $ = cheerio.load(data);
  const table = $('.table').first();
  const rows = table.children('tbody').children();

  let annualValue = {};

  rows.each((_, el) => {
    const date = $(el).children().first().text();
    const isSeptember = date.includes('-09-');

    if (!isSeptember) {
      return;
    }

    const year = date.split('-')[0];
    const value = toNumber($(el).children().last().text());

    if (!isNaN(value)) {
      annualValue = { ...annualValue, [year]: value };
    }
  });

  return annualValue;
};

export const scrapeTTMEPS = (data) => {
  const $ = cheerio.load(data);
  const table = $('[data-test="right-summary-table"] > table');
  const rows = table.children('tbody').children();
  let TTMEPS;

  rows.each((_, el) => {
    const text = $(el).children().first().text();
    if (text === 'EPS (TTM)') {
      TTMEPS = $(el).children().last().text();
    }
  });

  return TTMEPS && toNumber(TTMEPS);
};

export const scrapeCompanyName = (data) => {
  const $ = cheerio.load(data);
  const companyName = $('h1').text();

  return companyName;
};

export const scrapeNext5YearsGrowthEstimate = (data) => {
  const $ = cheerio.load(data);
  const tables = $('table');
  let growthEstimateTable;

  tables.each((_, el) => {
    const headerText = $(el).children('thead').children('tr').children('th').first().text();

    if (headerText === 'Growth Estimates') {
      growthEstimateTable = el;
    }
  });

  if (!growthEstimateTable) {
    return;
  }

  const rows = $(growthEstimateTable).children('tbody').children();
  let next5YearsGrowthEstimate;

  rows.each((_, el) => {
    const text = $(el).children().first().text();
    if (text === 'Next 5 Years (per annum)') {
      next5YearsGrowthEstimate = $(el).children(':nth-child(2)').text();
    }
  });

  return next5YearsGrowthEstimate && toNumber(next5YearsGrowthEstimate);
};
