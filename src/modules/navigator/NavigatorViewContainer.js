/**
 * @flow
 */
import { connect } from 'react-redux';
import NavigatorView from './NavigatorView';

export default connect(
  globalState => ({
    navigatorState: globalState.get('navigatorState').toJS(),
    theme: globalState.getIn(['setting', 'theme']),
  }),
)(NavigatorView);
