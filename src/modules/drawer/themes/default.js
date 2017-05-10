/**
 * @flow
 */
import { StyleSheet } from 'react-native';

export const styleJson = {
  root: {
    backgroundColor: 'slategrey',
    // justifyContent: 'space-between',
    flex: 1,
    paddingTop: 50,
    paddingLeft: 6,
    paddingRight: 6,
  },
  avatar: {
    flexDirection: 'row',
  },
  avatarThumbnail: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
  },
  avatarContent: {
    paddingLeft: 10,
    justifyContent: 'space-around',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  item: {
    height: 30,
    paddingRight: 10,
    paddingLeft: 10,
  },
  ItemText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  footer: {
  },
};

const defaultStyles = StyleSheet.create(styleJson);

export default defaultStyles;
