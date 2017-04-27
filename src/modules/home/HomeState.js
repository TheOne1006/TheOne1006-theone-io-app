import Promise from 'bluebird';
import { fromJS } from 'immutable';
import { loop, Effects } from 'redux-loop-symbol-ponyfill';
import createHelpers from '../../redux/createHelpers';

const { graphqlRequest } = createHelpers();

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

  return Promise.all([recommendPromise, catesArticlesPromise])
    .then(([recommendResults, catesArticlesResults]) => {
      const reqError = recommendResults.error || catesArticlesResults.error;
      if (reqError) {
        return {
          type: RESULTS_FAIL,
        };
      }

      let resultArr = [];
      const recommendArticles = recommendResults.data &&
       recommendResults.data.allArticles &&
       recommendResults.data.allArticles.articles;

      if (resultArr) {
        resultArr.push({
          title: 'Top',
          articles: recommendArticles,
        });
      }

      // 所有分类
      const allCates = catesArticlesResults.data &&
        catesArticlesResults.data.allCates &&
        catesArticlesResults.data.allCates.cates;

      if (allCates) {
        const catesSectionsArr = allCates.map(item => ({
          title: item.name,
          articles: (item.articlesConnection && item.articlesConnection.articles) || [],
        }));
        resultArr = resultArr.concat(catesSectionsArr);
      }

      return {
        type: RESULTS_RESPONSE,
        payload: {
          results: resultArr,
        },
      };
    })
    .catch(() => ({
      type: RESULTS_FAIL,
    }));
}

// Initial state
const initialState = fromJS({
  results: fromJS([]),
  loading: false,
  loaded: false,
});

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
        loaded: true,
        results: state.get('results').mergeDeep(action.payload.results),
      });

    case RESULTS_FAIL:
      return state.set('loading', false);

    default:
      return state;
  }
}
