import { MARGIN_OF_SAFETY, MARR, YEARS } from '../constants/estimate';

const _getFirstYear = (data, years) => {
  const dataYears = Object.keys(data);
  const lastYear = Math.max(...dataYears);
  let firstYear = lastYear - years + 1;

  if (dataYears.length < years) {
    firstYear = Math.min(...dataYears);
  } else if (years === 1) {
    firstYear = lastYear - 1;
  }

  if (data[firstYear] === 0) {
    for (let newFirstYear = firstYear; newFirstYear < lastYear; newFirstYear++) {
      if (data[newFirstYear] > 0) {
        return newFirstYear;
      }
    }
  }

  return firstYear;
};

export const getAverageGrowthRate = (data, years) => {
  const dataYears = Object.keys(data);
  const lastYear = Math.max(...dataYears);
  const firstYear = _getFirstYear(data, years);

  if (dataYears.indexOf(firstYear.toString()) < 0) {
    return 0;
  }

  const updatedYears = Math.min(years, lastYear - firstYear + 1);

  const averageGrowthRate =
    (((data[lastYear] - data[firstYear] + Math.abs(data[firstYear])) / Math.abs(data[firstYear])) **
      (1 / updatedYears) -
      1) *
    100;

  const twoDecimalsAverageGrowthRate = +averageGrowthRate.toFixed(2);

  return isNaN(twoDecimalsAverageGrowthRate) ? 0 : twoDecimalsAverageGrowthRate;
};

export const getCompanyAverageGrowthRates = (companyData) => {
  const { BVPS, EPS, freeCashFlow, revenue, ROI } = companyData;
  const averageGrowthROIRates = {
    10: getAverageGrowthRate(ROI, 10),
    5: getAverageGrowthRate(ROI, 5),
    1: getAverageGrowthRate(ROI, 1),
  };
  const averageGrowthRevenueRates = {
    10: getAverageGrowthRate(revenue, 10),
    5: getAverageGrowthRate(revenue, 5),
    1: getAverageGrowthRate(revenue, 1),
  };
  const averageGrowthEPSRates = {
    10: getAverageGrowthRate(EPS, 10),
    5: getAverageGrowthRate(EPS, 5),
    1: getAverageGrowthRate(EPS, 1),
  };
  const averageGrowthFreeCashFlowRates = {
    10: getAverageGrowthRate(freeCashFlow, 10),
    5: getAverageGrowthRate(freeCashFlow, 5),
    1: getAverageGrowthRate(freeCashFlow, 1),
  };
  const averageGrowthBVPSRates = {
    10: getAverageGrowthRate(BVPS, 10),
    5: getAverageGrowthRate(BVPS, 5),
    1: getAverageGrowthRate(BVPS, 1),
  };

  return {
    averageGrowthROIRates,
    averageGrowthRevenueRates,
    averageGrowthEPSRates,
    averageGrowthFreeCashFlowRates,
    averageGrowthBVPSRates,
  };
};

export const getCompanyScore = (averageGrowthRates) => {
  const score = Object.keys(averageGrowthRates).reduce(
    (acc, rate) =>
      acc +
      averageGrowthRates[rate]['10'] +
      averageGrowthRates[rate]['5'] +
      averageGrowthRates[rate]['1'],
    0
  );

  return +score.toFixed(2);
};

export const getCompanyMarginOfSafetyBuyPrice = (EPS, growthRate) => {
  const estimatedFuturePE = (2 * growthRate) / 100;
  const future10YearsEPS = EPS * (1 + growthRate / 100) ** YEARS;
  const future10YearsSharePrice = future10YearsEPS * estimatedFuturePE * 100;
  const stickerPrice = future10YearsSharePrice / (1 + MARR / 100) ** YEARS;
  const marginOfSafetyBuyPrice = +((stickerPrice * MARGIN_OF_SAFETY) / 100).toFixed(2);

  return isNaN(marginOfSafetyBuyPrice) ? 0 : marginOfSafetyBuyPrice;
};
