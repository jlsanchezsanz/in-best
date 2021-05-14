import mongoose from 'mongoose';

const AverageGrowthRates = {
  1: {
    type: Number,
    required: true,
  },
  5: {
    type: Number,
    required: true,
  },
  10: {
    type: Number,
    required: true,
  },
};

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tickerSymbol: {
    type: String,
    required: true,
    unique: true,
  },
  marginOfSafetyBuyPrice: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  averageGrowthROIRates: AverageGrowthRates,
  averageGrowthRevenueRates: AverageGrowthRates,
  averageGrowthEPSRates: AverageGrowthRates,
  averageGrowthFreeCashFlowRates: AverageGrowthRates,
  averageGrowthBVPSRates: AverageGrowthRates,
});

export const Company = mongoose.model('company', CompanySchema);
