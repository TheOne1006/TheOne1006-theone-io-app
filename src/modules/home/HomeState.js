import Promise from 'bluebird';
import { fromJS } from 'immutable';
import { loop, Effects } from 'redux-loop-symbol-ponyfill';
import createHelpers from '../../redux/createHelpers';

const { graphqlRequest } = createHelpers();
// Initial state
const initialState = fromJS({
  results: fromJS([]),
  loading: false,
});

const recommendQuery = `query getRecommendArticles($limit: Int!){
          allArticles(order: "isRecommend desc", limit: $limit) {
            articles {
              id,
              _id,
              title,
              keyWords,
              thumbnail,
              content,
              contentText,
              descript,
              createdAt,
              updatedAt,
            }
          }
        }`;

const recommendVariables = {
  limit: 10,
};

const allCatesArticlesQuery = `query getAllCatesArticle($limit: Int!) {
  allCates {
    cates {
      _id,
      name,
      articlesConnection(limit: $limit) {
        articles {
          _id,
          title,
        }
      }
    }
  }
}`;

const allCatesArticlesVariables = {
  limit: 10,
};

// Actions
const RESULTS_REQUEST = 'HomeState/RESULTS_REQUEST';
const RESULTS_RESPONSE = 'HomeState/RESULTS_RESPONSE';
const RESULTS_FAIL = 'HomeState/RESULTS_FAIL';

// Action creators
export function resultsRequest() {
  return { type: RESULTS_REQUEST };
}

export function resultsResponse() {
  const recommendPromise = graphqlRequest(recommendQuery, recommendVariables);
  const catesArticlesPromise = graphqlRequest(allCatesArticlesQuery, allCatesArticlesVariables);

  return new Promise.all([recommendPromise, catesArticlesPromise])
    .then((recommendResults, atesArticlesResults) => {
      // TODO: coding
    });
}

// Reducer
export default function HomeStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESULTS_REQUEST:
      return loop(
        state.set('loading', true),
        Effects.promise(resultsResponse),
      );

    case RESULTS_RESPONSE:
      return state.merge({
        loading: false,
        results: state.get('results').mergeDeep(action.payload.results),
      });

    case RESULTS_FAIL:
      return state.set('loading', false);

    default:
      return state;
  }
}
