import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import CompaniesList from './CompaniesList/CompaniesList';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Route exact path="/" component={CompaniesList} />
      </Fragment>
    </Router>
  </Provider>
);

export default App;
