/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import DrawerView from './DrawerView';

export default connect(
  globalState => ({
    cates: globalState.getIn(['home', 'results']).filter(item => item.get('_id')).map(item => ({ _id: item.get('_id'), title: item.get('title') })),
  }),
  dispatch => ({
    navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  }),
)(DrawerView);
