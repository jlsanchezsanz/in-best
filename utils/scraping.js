import cheerio from 'cheerio';

import { toNumber } from './format';

export const scrapeAnnualValue = (data, years) => {
  const $ = cheerio.load(data);
  const table = $('.historical_data_table').first();
  const rows = table.children('tbody').children().slice(0, years);

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
