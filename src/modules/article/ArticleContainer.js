import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import ArticleView from './ArticleView';
import { resultsRequest, resultsReload } from './ArticleState';

export default connect(
  globalState => ({
    article: globalState.getIn(['article', 'article']),
    loading: globalState.getIn(['article', 'loading']),
    loaded: globalState.getIn(['article', 'loaded']),
  }),
  dispatch => ({
    navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    resultsRequest: bindActionCreators(resultsRequest, dispatch),
    resultsReload: bindActionCreators(resultsReload, dispatch),
  }),
)(ArticleView);
