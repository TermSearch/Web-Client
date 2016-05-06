import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

// const createStoreWithMiddleware = applyMiddleware(
//   thunk,
//   createLogger() /* TODO: Disable logging in production */
// )(createStore);

let middleware = [thunk];

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
