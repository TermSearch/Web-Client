import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import './main.css';

import configureStore from '../store/configureStore';
import TermSearchView from '../containers/TermSearchView';

const store = configureStore();

// Add root div to DOM
const element = document.createElement('div');
element.id = 'root';
document.body.appendChild(element);

// Get root element from DOM
const root = document.getElementById('root');

// Render app to this element
if (root) {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/">
          <Route path="search-client" component={TermSearchView} />
        </Route>
      </Router>
    </Provider>,
    root
  );
}
