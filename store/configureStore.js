import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

let middleware = [thunk];

// Load and add logger only in development etc.
if (process.env.NODE_ENV !== 'production') {
  // using require here for conditional, import not allowed
  const createLogger = require('redux-logger');
  middleware = [...middleware, createLogger()];
} else {
  // middleware in production
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState);
  return store;
}
