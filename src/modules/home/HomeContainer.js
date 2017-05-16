/**
 * @flow
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import HomeView from './HomeView';
import { resultsRequest } from './HomeState';

export default connect(
  globalState => ({
    sections: globalState.getIn(['home', 'results']),
    loading: globalState.getIn(['home', 'loading']),
    loaded: globalState.getIn(['home', 'loaded']),
  }),
  dispatch => ({
    navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    resultsRequest: bindActionCreators(resultsRequest, dispatch),
  }),
)(HomeView);
