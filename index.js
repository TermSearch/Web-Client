import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import configureStore from './store/configureStore';
import TermSearchView from './containers/TermSearchView';

const store = configureStore();

const root = document.getElementById('root');

// Only render when root element found
if (root) {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/search-client/">
          <IndexRoute component={TermSearchView} />
        </Route>
      </Router>
    </Provider>,
    root
  );
}
