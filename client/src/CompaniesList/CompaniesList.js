import { connect } from 'react-redux';
import React, { Fragment, useEffect } from 'react';

import { getCompanies } from '../actions/company';

const CompaniesList = ({ getCompanies, company: { companies, loading, error } }) => {
  useEffect(() => {
    getCompanies(1, 10);
  }, [getCompanies]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <Fragment>
      {companies.map(
        ({
          averageGrowthBVPSRates,
          averageGrowthEPSRates,
          averageGrowthFreeCashFlowRates,
          averageGrowthRevenueRates,
          averageGrowthROIRates,
          name,
          tickerSymbol,
        }) => (
          <div key={tickerSymbol}>
            <h2>{`${name || tickerSymbol} `}</h2>
            <div className="company__info">
              <div>BVPS: {averageGrowthBVPSRates[10]}</div>
              <div>ROI: {averageGrowthROIRates[10]}</div>
              <div>FCF: {averageGrowthFreeCashFlowRates[10]}</div>
              <div>EPS: {averageGrowthEPSRates[10]}</div>
              <div>Revenue: {averageGrowthRevenueRates[10]}</div>
            </div>
          </div>
        )
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  company: state.company,
});

export default connect(mapStateToProps, { getCompanies })(CompaniesList);
