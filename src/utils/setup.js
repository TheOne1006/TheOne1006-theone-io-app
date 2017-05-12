import { serverURL } from '../../env';

import * as snapshot from './snapshot';

snapshot.clearSnapshot();

global.LOG = (...args) => {
  console.log('/------------------------------\\');
  console.log(...args);
  console.log('\\------------------------------/');
  return args[args.length - 1];
};
