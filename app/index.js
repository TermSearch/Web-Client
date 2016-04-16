import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import './main.css';

import configureStore from '../store/configureStore';
import TermSearchView from '../containers/TermSearchView';

const store = configureStore();

const TARGET = process.env.npm_lifecycle_event;

console.log(process.env.NODE_ENV);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/">
        <IndexRoute component={TermSearchView} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
