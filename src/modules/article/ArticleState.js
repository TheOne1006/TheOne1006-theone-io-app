/**
 * @flow
 */

import Promise from 'bluebird';
import { fromJS } from 'immutable';
import { loop, Effects } from 'redux-loop-symbol-ponyfill';
import createHelpers from '../../redux/createHelpers';

const { graphqlRequest } = createHelpers();

const articleQuery = `query getArticleInfo($articleID: ID!) {
  article(articleID: $articleID) {
    id,
    _id,
    title,
    thumbnail,
    content,
    keyWords,
    descript,
    createdAt,
    updatedAt,
  }
}`;


// Actions
const RESULTS_REQUEST = 'ArticleState/RESULTS_REQUEST';
const RESULTS_RESPONSE = 'ArticleState/RESULTS_RESPONSE';
const RESULTS_RELOAD = 'ArticleState/RESULTS_RELOAD';
const RESULTS_NEXT_PAGE = 'ArticleState/RESULTS_NEXT_PAGE';
const RESULTS_FAIL = 'ArticleState/RESULTS_FAIL';

// Action creators
export function resultsRequest(articleID: string) {
  return {
    type: RESULTS_REQUEST,
    payload: { articleID },
  };
}

export function resultsReload(articleID: string) {
  return {
    type: RESULTS_RELOAD,
    payload: { articleID },
  };
}

export function resultsNextPage(articleID: string) {
  return {
    type: RESULTS_NEXT_PAGE,
    payload: { articleID },
  };
}

/**
 * 结果请求
 * @param  {string}  articleID
 */
function resultsResponse(articleID: string) {
  const articlePromise = graphqlRequest(articleQuery, {
    articleID,
  });

  return Promise.all([articlePromise])
    .then(([articleResult]) => {
      const reqError = articleResult.error;
      if (reqError) {
        return {
          type: RESULTS_FAIL,
        };
      }

      const data = articleResult.data;
      const article = data && data.article;

      return {
        type: RESULTS_RESPONSE,
        payload: {
          article,
        },
      };
    })
    .catch(() => ({
      type: RESULTS_FAIL,
    }));
}

// Initial state
const initialState = fromJS({
  article: fromJS({}),
  loading: false,
  loaded: false,
  currentArticleID: '',
});

// Reducer
export default function ArticleStateReducer(state: Object = initialState, action: Object = {}) {
  switch (action.type) {
    case RESULTS_REQUEST:
      return loop(
        state.set('loading', true),
        Effects.promise(() => resultsResponse(action.payload.articleID)),
      );

    case RESULTS_RELOAD:
      return loop(
        state.merge({ loading: true }),
        Effects.promise(() => resultsResponse(action.payload.articleID)),
      );

    case RESULTS_RESPONSE:
      return state.merge({
        loading: false,
        loaded: true,
        article: fromJS(action.payload.article),
        currentArticleID: action.payload.article._id,
      });

    case RESULTS_FAIL:
      return state.set('loading', false);

    default:
      return state;
  }
}
