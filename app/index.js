import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import './main.scss';

import configureStore from '../store/configureStore';
import TermSearchView from '../containers/TermSearchView';
import LiveSearch from '../components/LiveSearch';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/">
        <IndexRoute component={TermSearchView} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
