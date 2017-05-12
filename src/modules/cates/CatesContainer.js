import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import CatesView from './CatesView';
import { resultsRequest, resultsReload, resultsNextPage } from './CatesState';

export default connect(
  globalState => ({
    articles: globalState.getIn(['cate', 'articles']),
    cateName: globalState.getIn(['cate', 'cateName']),
    loading: globalState.getIn(['cate', 'loading']),
    loaded: globalState.getIn(['cate', 'loaded']),
    hasNextPage: globalState.getIn(['cate', 'hasNextPage']),
  }),
  dispatch => ({
    navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    resultsRequest: bindActionCreators(resultsRequest, dispatch),
    resultsReload: bindActionCreators(resultsReload, dispatch),
    resultsNextPage: bindActionCreators(resultsNextPage, dispatch),
  }),
)(CatesView);
