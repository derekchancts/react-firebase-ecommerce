import {createStore, applyMiddleware, compose} from 'redux';
import logger from 'redux-logger';

import rootReducer from './rootReducer';

export const middlewares = [logger];

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;