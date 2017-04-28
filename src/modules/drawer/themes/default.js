/**
 * @flow
 */
import { StyleSheet } from 'react-native';

export const styleJson = {
  root: {
    backgroundColor: 'slategrey',
    flex: 1,
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 6,
    paddingRight: 6,
  },
  avatar: {
    flexDirection: 'row',
  },
  avatarThumbnail: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  avatarContent: {
    paddingTop: 20,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
};

const defaultStyles = StyleSheet.create(styleJson);

export default defaultStyles;
