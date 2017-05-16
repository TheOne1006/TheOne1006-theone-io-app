/**
 * @flow
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchTheme } from '../../redux/actions/setting';
import SwitchThemeView from './SwitchThemeView';

const mapState = glabalState => ({
  theme: glabalState.getIn(['setting', 'theme']),
});

// const mapDispatch = {
//   switchNextTheme: ,
// };

export default connect(
   mapState,
   dispatch => (
     {
       switchNextTheme: bindActionCreators(switchTheme, dispatch),
     }
   ),
)(SwitchThemeView);
