import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import HomeView from './HomeView';

export default connect(
  () => ({}),
  dispatch => ({
    navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  }),
)(HomeView);
