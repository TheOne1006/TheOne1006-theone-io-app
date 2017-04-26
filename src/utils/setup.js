import Relay from 'react-relay';
import { serverURL } from '../../env';

import * as snapshot from './snapshot';

// snapshot.clearSnapshot();

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer(`${serverURL}/graphql`, {
    fetchTimeout: 30000,
    retryDelays: [5000, 10000],
  }),
);

global.LOG = (...args) => {
  console.log('/------------------------------\\');
  console.log(...args);
  console.log('\\------------------------------/');
  return args[args.length - 1];
};
