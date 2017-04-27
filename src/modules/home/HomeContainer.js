import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import HomeView from './HomeView';
import { resultsRequest } from './HomeState';

export default connect(
  () => ({}),
  dispatch => ({
    navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    resultsRequest: bindActionCreators(resultsRequest, dispatch),
  }),
)(HomeView);
