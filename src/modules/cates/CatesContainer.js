import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import CatesView from './CatesView';

export default connect(
  globalState => ({
    articles: globalState.getIn(['cate', 'articles']),
    cateName: globalState.getIn(['cate', 'cateName']),
    loading: globalState.getIn(['cate', 'loading']),
    loaded: globalState.getIn(['cate', 'loaded']),
  }),
  dispatch => ({
    navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  }),
)(CatesView);
