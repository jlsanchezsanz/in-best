import React, { Fragment } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

const Filters = ({ onChange, filters }) => {
  const options = [0, 5, 10, 15, 20];
  const { BVPS, EPS, FCF, revenue, ROI } = filters;

  const getOptions = (filterValue) =>
    options.map((value) => {
      return (
        <option selected={value === filterValue} value={value}>
          {value}
        </option>
      );
    });

  return (
    <Fragment>
      <Row>
        <Col>
          <Form.Group controlId="filters.BVPS">
            <Form.Label>BVPS</Form.Label>
            <Form.Control
              onChange={(e) => onChange({ BVPS: +e.target.value })}
              size="sm"
              as="select"
            >
              {getOptions(BVPS)}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="filters.EPS">
            <Form.Label>EPS</Form.Label>
            <Form.Control
              onChange={(e) => onChange({ EPS: +e.target.value })}
              size="sm"
              as="select"
            >
              {getOptions(EPS)}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="filters.FCF">
            <Form.Label>FCF</Form.Label>
            <Form.Control
              onChange={(e) => onChange({ FCF: +e.target.value })}
              size="sm"
              as="select"
            >
              {getOptions(FCF)}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="filters.Revenue">
            <Form.Label>Revenue</Form.Label>
            <Form.Control
              onChange={(e) => onChange({ revenue: +e.target.value })}
              size="sm"
              as="select"
            >
              {getOptions(revenue)}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="filters.ROI">
            <Form.Label>ROI</Form.Label>
            <Form.Control
              onChange={(e) => onChange({ ROI: +e.target.value })}
              size="sm"
              as="select"
            >
              {getOptions(ROI)}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Filters;
