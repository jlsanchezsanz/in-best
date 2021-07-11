import { connect } from 'react-redux';
import React, { Fragment, useEffect } from 'react';
import { ProgressBar, Table } from 'react-bootstrap';

import { getCompanies } from '../actions/company';

const CompaniesList = ({ getCompanies, company: { companies, loading, error } }) => {
  useEffect(() => {
    getCompanies(1, 10);
  }, [getCompanies]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <Fragment>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Company</th>
            <th>BVPS</th>
            <th>EPS</th>
            <th>FCF</th>
            <th>Revenue</th>
            <th>ROI</th>
            <th>MOS Price</th>
            <th>Current Price</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(
            ({
              averageGrowthBVPSRates,
              averageGrowthEPSRates,
              averageGrowthFreeCashFlowRates,
              averageGrowthRevenueRates,
              averageGrowthROIRates,
              marginOfSafetyBuyPrice,
              name,
              tickerSymbol,
            }) => (
              <tr>
                <td>{name || tickerSymbol}</td>
                <td>
                  <ProgressBar
                    now={averageGrowthBVPSRates[10]}
                    label={`${averageGrowthBVPSRates[10]}%`}
                  />
                </td>
                <td>
                  <ProgressBar
                    now={averageGrowthEPSRates[10]}
                    label={`${averageGrowthEPSRates[10]}%`}
                  />
                </td>
                <td>
                  <ProgressBar
                    now={averageGrowthFreeCashFlowRates[10]}
                    label={`${averageGrowthFreeCashFlowRates[10]}%`}
                  />
                </td>
                <td>
                  <ProgressBar
                    now={averageGrowthRevenueRates[10]}
                    label={`${averageGrowthRevenueRates[10]}%`}
                  />
                </td>
                <td>
                  <ProgressBar
                    now={averageGrowthROIRates[10]}
                    label={`${averageGrowthROIRates[10]}%`}
                  />
                </td>
                <td>
                  {marginOfSafetyBuyPrice}
                </td>
                <td>
                  {marginOfSafetyBuyPrice}
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  company: state.company,
});

export default connect(mapStateToProps, { getCompanies })(CompaniesList);

/* <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{name || tickerSymbol}</h5>
                  BVPS: <ProgressBar
                    now={averageGrowthBVPSRates[10]}
                    label={`${averageGrowthBVPSRates[10]}%`}
                  />
                  EPS: <ProgressBar
                    now={averageGrowthEPSRates[10]}
                    label={`${averageGrowthEPSRates[10]}%`}
                  />
                  FCF: <ProgressBar
                    now={averageGrowthFreeCashFlowRates[10]}
                    label={`${averageGrowthFreeCashFlowRates[10]}%`}
                  />
                  Revenue: <ProgressBar
                    now={averageGrowthRevenueRates[10]}
                    label={`${averageGrowthRevenueRates[10]}%`}
                  />
                  ROI: <ProgressBar
                    now={averageGrowthROIRates[10]}
                    label={`${averageGrowthROIRates[10]}%`}
                  />
                  <p className="card-text">
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </p>
                </div>
              </div>
            </div>
          </div> */
