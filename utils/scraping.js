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
