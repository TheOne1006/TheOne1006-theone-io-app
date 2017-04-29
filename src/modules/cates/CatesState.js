/**
 * @flow
 */

import Promise from 'bluebird';
import { fromJS } from 'immutable';
import { loop, Effects } from 'redux-loop-symbol-ponyfill';
import createHelpers from '../../redux/createHelpers';

const { graphqlRequest } = createHelpers();

const cateQuery = `query getCateArticles($cateID: ID!) {
  cate(cateID: $cateID) {
    name,
    _id,
    articlesConnection {
      articles {
        _id,
        title,
      }
    }
  }
}`;

// const recommendVariables = {
//   limit: 10,
// };

// Actions
const RESULTS_REQUEST = 'CateState/RESULTS_REQUEST';
const RESULTS_RESPONSE = 'CateState/RESULTS_RESPONSE';
const RESULTS_FAIL = 'CateState/RESULTS_FAIL';

// Action creators
export function resultsRequest() {
  return { type: RESULTS_REQUEST };
}

export function resultsResponse(cateID: string) {
  const catePromise = graphqlRequest(cateQuery, { cateID });

  return Promise.all([catePromise])
    .then(([recommendResults]) => {
      const reqError = recommendResults.error;
      if (reqError) {
        return {
          type: RESULTS_FAIL,
        };
      }

      const data = recommendResults.data;
      const cateName = data.cate && data.cate.name;

      const cateArticles = data.cate && data.cate.articlesConnection &&
        data.cate.articlesConnection.articles;

      return {
        type: RESULTS_RESPONSE,
        payload: {
          cateName,
          articles: cateArticles,
        },
      };
    })
    .catch(() => ({
      type: RESULTS_FAIL,
    }));
}

// Initial state
const initialState = fromJS({
  articles: fromJS([]),
  cateName: '',
  loading: false,
  loaded: false,
});

// Reducer
export default function CateStateReducer(state: Object = initialState, action: Object = {}) {
  switch (action.type) {
    case RESULTS_REQUEST:
      return loop(
        state.set('loading', true),
        Effects.promise(resultsResponse),
      );

    case RESULTS_RESPONSE:
      return state.merge({
        loading: false,
        loaded: true,
        results: fromJS(action.payload.articles),
        cateName: action.payload.cateName,
      });

    case RESULTS_FAIL:
      return state.set('loading', false);

    default:
      return state;
  }
}
