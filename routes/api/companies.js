import express from 'express';
import { check, validationResult } from 'express-validator';

import { Company } from '../../models/Company';

export const companiesRouter = express.Router();

// @route   GET api/companies
// @desc    Get companies
// @access  Public
companiesRouter.get('/:page/:limit/:bvps/:eps/:fcf/:revenue/:roi', async (req, res) => {
  try {
    const page = +req.params.page;
    const limit = +req.params.limit;
    const BVPS = +req.params.bvps;
    const EPS = +req.params.eps;
    const FCF = +req.params.fcf;
    const revenue = +req.params.revenue;
    const ROI = +req.params.roi;
    const offset = (page - 1) * limit;

    const companies = await Company.find({
      'averageGrowthBVPSRates.10': { $gt: BVPS },
      'averageGrowthEPSRates.10': { $gt: EPS },
      'averageGrowthFreeCashFlowRates.10': { $gt: FCF },
      'averageGrowthRevenueRates.10': { $gt: revenue },
      'averageGrowthROIRates.10': { $gt: ROI },
    }).sort([
      ['averageGrowthBVPSRates.10', 'desc'],
      ['averageGrowthEPSRates.10', 'desc'],
      ['averageGrowthFreeCashFlowRates.10', 'desc'],
      ['averageGrowthRevenueRates.10', 'desc'],
      ['averageGrowthROIRates.10', 'desc'],
    ]);

    const count = companies.length;
    const pages = Math.ceil(count / limit);

    if (page > pages) {
      return res.json(`Page ${page} not found. There's only ${pages} pages.`);
    }

    const response = {
      companies: companies.splice(offset, limit),
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
