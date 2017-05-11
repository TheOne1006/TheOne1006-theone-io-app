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
    fontSize: 16,
  },
  scroll: {
    marginTop: 30,
  },
  item: {
    height: 35,
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: 18,
    flex: 1,
  },
  itemIcon: {
    paddingRight: 5,
    width: 30,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerItem: {
    flex: 1,
  },
};

const defaultStyles = StyleSheet.create(styleJson);

export default defaultStyles;
