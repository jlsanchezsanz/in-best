import cheerio from 'cheerio';

import { toNumber } from './format';

export const scrapRevenue = (data, years) => {
  const $ = cheerio.load(data);
  const annualRevenueTable = $('.historical_data_table').first();
  const annualRevenueTableRows = annualRevenueTable.children('tbody').children().slice(0, years);

  let annualRevenue = {};

  annualRevenueTableRows.each((_, el) => {
    const year = $(el).children().first().text();
    const value = toNumber($(el).children().last().text());
    annualRevenue = { ...annualRevenue, [year]: value };
  });

  return annualRevenue;
};

export const scrapEPS = (data, years) => {
  const $ = cheerio.load(data);
  const annualEPSTable = $('.historical_data_table').first();
  const annualEPSTableRows = annualEPSTable.children('tbody').children().slice(0, years);

  let annualEPS = {};

  annualEPSTableRows.each((_, el) => {
    const year = $(el).children().first().text();
    const value = toNumber($(el).children().last().text());

    if (!isNaN(value)) {
      annualEPS = { ...annualEPS, [year]: value };
    }
  });

  return annualEPS;
};
