export const getAverageGrowthRate = (data, years) => {
  const dataYears = Object.keys(data);
  const lastYear = new Date().getFullYear() - 1;
  let firstYear = lastYear - years + 1;
  let updatedYears = years;

  if (dataYears.length < years) {
    firstYear = Math.min(...dataYears);
    updatedYears = dataYears.length;
  } else if (years === 1) {
    firstYear = lastYear - 1;
  }

  const averageGrowthRate = ((data[lastYear] / data[firstYear]) ** (1 / updatedYears) - 1) * 100;
  const twoDecimalsAverageGrowthRate = +averageGrowthRate.toFixed(2);

  return twoDecimalsAverageGrowthRate;
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
