/**
 * @flow
 */

import Promise from 'bluebird';
import { fromJS } from 'immutable';
import { loop, Effects } from 'redux-loop-symbol-ponyfill';
import createHelpers from '../../redux/createHelpers';

const { graphqlRequest } = createHelpers();

const cateQuery = `query getCateArticles($cateID: ID!, $skip: Int!, $limit: Int!, $order: String) {
  cate(cateID: $cateID) {
    name,
    _id,
    articlesConnection (skip: $skip, limit: $limit, order: $order){
      pageInfo{
        hasNextPage,
      },
      articles {
        id,
        _id,
        title,
        keyWords,
        thumbnail,
        descript,
        createdAt,
        updatedAt,
      }
    }
  }
}`;

const cateDefaultVariables = {
  order: 'createdAt desc',
  skip: 0,
  limit: 10,
};

// Actions
const RESULTS_REQUEST = 'CateState/RESULTS_REQUEST';
const RESULTS_RESPONSE = 'CateState/RESULTS_RESPONSE';
const RESULTS_RESPONSE_MERGE = 'CateState/RESULTS_RESPONSE_MERGE';
const RESULTS_RELOAD = 'CateState/RESULTS_RELOAD';
const RESULTS_NEXT_PAGE = 'CateState/RESULTS_NEXT_PAGE';
const RESULTS_FAIL = 'CateState/RESULTS_FAIL';

// Action creators
export function resultsRequest(cateID: string) {
  return {
    type: RESULTS_REQUEST,
    payload: { cateID },
  };
}

export function resultsReload(cateID: string) {
  return {
    type: RESULTS_RELOAD,
    payload: { cateID },
  };
}

export function resultsNextPage(cateID: string) {
  return {
    type: RESULTS_NEXT_PAGE,
    payload: { cateID },
  };
}

/**
 * 结果请求
 *
 */
/**
 * 结果请求
 * @param  {string}  cateID
 * @param  {Number} skip 跳过多少数据
 */
function resultsResponse(cateID: string, skip = 0) {
  const catePromise = graphqlRequest(cateQuery, {
    ...cateDefaultVariables,
    cateID,
    skip,
  });

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
      const hasNextPage = data.cate && data.cate.articlesConnection &&
        data.cate.articlesConnection.pageInfo &&
        data.cate.articlesConnection.pageInfo.hasNextPage;

      return {
        type: (skip === 0) ? RESULTS_RESPONSE : RESULTS_RESPONSE_MERGE,
        payload: {
          cateName,
          hasNextPage,
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
  hasNextPage: false,
});

// Reducer
export default function CateStateReducer(state: Object = initialState, action: Object = {}) {
  switch (action.type) {
    case RESULTS_REQUEST:
      return loop(
        state.set('loading', true),
        Effects.promise(() => resultsResponse(action.payload.cateID)),
      );

    case RESULTS_RELOAD:
      return loop(
        state.merge({ loading: true }),
        Effects.promise(() => resultsResponse(action.payload.cateID)),
      );

    case RESULTS_NEXT_PAGE: {
      const curArticlesSize = state.get('articles').size;
      return loop(
        state.merge({ loading: true }),
        Effects.promise(() => resultsResponse(action.payload.cateID, curArticlesSize)),
      );
    }
    case RESULTS_RESPONSE:
      return state.merge({
        loading: false,
        loaded: true,
        articles: fromJS(action.payload.articles),
        cateName: action.payload.cateName,
        hasNextPage: action.payload.hasNextPage,
      });

    case RESULTS_RESPONSE_MERGE:
      return state.merge({
        loading: false,
        loaded: true,
        articles: state.get('articles').concat(action.payload.articles),
        cateName: action.payload.cateName,
        hasNextPage: action.payload.hasNextPage,
      });

    case RESULTS_FAIL:
      return state.set('loading', false);

    default:
      return state;
  }
}
