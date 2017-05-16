/**
 * @flow
 */
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './middleware/loggerMiddleware';
import createHelpers from './createHelpers';

const helpers = createHelpers();
// define store middlewares as an array
export default [
  thunkMiddleware.withExtraArgument(helpers),
  promiseMiddleware,
  // thunkMiddleware,
  loggerMiddleware,
];
