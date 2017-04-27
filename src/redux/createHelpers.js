/**
 * @flow
 */
import { createGraphqlRequest } from '../utils/api';
import { serverURL } from '../../env';

export default function createHelpers() {
  return {
    graphqlRequest: createGraphqlRequest(true, serverURL),
  };
}
