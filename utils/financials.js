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
