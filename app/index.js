import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import './main.css';

import configureStore from '../store/configureStore';
import TermSearchView from '../containers/TermSearchView';

const store = configureStore();

// For production
const element = document.createElement('div');
element.id = 'root';
document.body.appendChild(element);

const root = document.getElementById('root');

// Only render when root element found
if (root) {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/">
          <IndexRoute component={TermSearchView} />
        </Route>
      </Router>
    </Provider>,
    root
  );
}
