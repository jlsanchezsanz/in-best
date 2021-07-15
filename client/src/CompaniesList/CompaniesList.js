import { connect } from 'react-redux';
import React, { Fragment, useEffect } from 'react';
import { Pagination, ProgressBar, Table } from 'react-bootstrap';

import { changePage, getCompanies } from '../actions/company';
import { changeFilters } from '../actions/filters';
import Filters from './Filters';

const CompaniesList = ({
  changeFilters,
  changePage,
  getCompanies,
  company: { companies, currentPage, loading, pages },
  filters,
}) => {
  const { BVPS, EPS, FCF, revenue, ROI } = filters;

  useEffect(() => {
    getCompanies(currentPage, 10, BVPS, EPS, FCF, revenue, ROI);
  }, [currentPage, getCompanies, BVPS, EPS, FCF, revenue, ROI]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <Fragment>
      <Filters onChange={changeFilters} filters={filters} />
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
              <tr key={tickerSymbol}>
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
                <td>${marginOfSafetyBuyPrice}</td>
                <td>${marginOfSafetyBuyPrice}</td>
              </tr>
            )
          )}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)} />
        <Pagination.Item active={currentPage === 1} onClick={() => changePage(1)}>
          1
        </Pagination.Item>
        {currentPage > 2 && <Pagination.Ellipsis disabled />}
        {currentPage !== 1 && currentPage !== pages && (
          <Pagination.Item active>{currentPage}</Pagination.Item>
        )}
        {currentPage < pages - 1 && <Pagination.Ellipsis disabled />}
        {pages > 1 && <Pagination.Item active={currentPage === pages} onClick={() => changePage(pages)}>
          {pages}
        </Pagination.Item>}
        <Pagination.Next
          disabled={currentPage === pages}
          onClick={() => changePage(currentPage + 1)}
        />
      </Pagination>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  company: state.company,
  filters: state.filters,
});

export default connect(mapStateToProps, { changeFilters, changePage, getCompanies })(CompaniesList);

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
