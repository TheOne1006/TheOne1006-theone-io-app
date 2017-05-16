import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ArticleView from './ArticleView';
import { resultsRequest, resultsReload } from './ArticleState';

export default connect(
  globalState => ({
    article: globalState.getIn(['article', 'article']),
    loading: globalState.getIn(['article', 'loading']),
    loaded: globalState.getIn(['article', 'loaded']),
    currentArticleID: globalState.getIn(['article', 'currentArticleID']),
  }),
  dispatch => ({
    resultsRequest: bindActionCreators(resultsRequest, dispatch),
    resultsReload: bindActionCreators(resultsReload, dispatch),
  }),
)(ArticleView);
