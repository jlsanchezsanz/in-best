import express from 'express';
import { check, validationResult } from 'express-validator';

import { Company } from '../../models/Company';

export const companiesRouter = express.Router();

// @route   GET api/companies
// @desc    Get companies
// @access  Public
companiesRouter.get('/:page/:limit', async (req, res) => {
  try {
    const page = +req.params.page;
    const limit = +req.params.limit;
    const count = await Company.countDocuments();
    const pages = count / limit;
    const offset = (page - 1) * limit;

    if (page > pages) {
      return res.json(`Page ${page} not found. There's only ${pages} pages.`);
    }

    const companies = await Company.find({
      'averageGrowthBVPSRates.10': { $gt: 5 },
      'averageGrowthEPSRates.10': { $gt: 5 },
      'averageGrowthFreeCashFlowRates.10': { $gt: 5 },
      'averageGrowthRevenueRates.10': { $gt: 5 },
      'averageGrowthROIRates.10': { $gt: 5 },
    })
      .sort([['score', 'desc']])
      .skip(offset)
      .limit(limit);

    const response = {
      companies,
      count,
      currentPage: page,
      pages,
    };

    return res.json(response);
  } catch (error) {
    console.error(error.message);

    return res.status(500).send('Server Error');
  }
});

// @route   POST api/companies
// @desc    Add company
// @access  Public
companiesRouter.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('tickerSymbol', 'Ticker symbol is required').not().isEmpty(),
    check('marginOfSafetyBuyPrice', 'marginOfSafetyBuyPrice is required').not().isEmpty(),
    check('score', 'score is required').not().isEmpty(),
    check('averageGrowthROIRates', 'averageGrowthROIRates is required').not().isEmpty(),
    check('averageGrowthRevenueRates', 'averageGrowthRevenueRates is required').not().isEmpty(),
    check('averageGrowthEPSRates', 'averageGrowthEPSRates is required').not().isEmpty(),
    check('averageGrowthFreeCashFlowRates', 'averageGrowthFreeCashFlowRates is required')
      .not()
      .isEmpty(),
    check('averageGrowthBVPSRates', 'averageGrowthBVPSRates is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      tickerSymbol,
      marginOfSafetyBuyPrice,
      score,
      averageGrowthROIRates,
      averageGrowthRevenueRates,
      averageGrowthEPSRates,
      averageGrowthFreeCashFlowRates,
      averageGrowthBVPSRates,
    } = req.body;

    try {
      const company = {
        name,
        tickerSymbol,
        marginOfSafetyBuyPrice,
        score,
        averageGrowthROIRates,
        averageGrowthRevenueRates,
        averageGrowthEPSRates,
        averageGrowthFreeCashFlowRates,
        averageGrowthBVPSRates,
      };

      await Company.findOneAndUpdate({ tickerSymbol }, company);

      res.json(company);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);
