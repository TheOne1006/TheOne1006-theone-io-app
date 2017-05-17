/**
 * @flow
 */
import { StyleSheet } from 'react-native';

export const styleJson = {
  row: {
    flexDirection: 'row',
    flex: 1,
    padding: 6,
    backgroundColor: '#ffffff',
  },
  rowTitle: {
    fontSize: 16,
  },
  rowDesc: {
    fontSize: 13,
    color: '#1C1C1C',
  },
  content: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
  },
  thumbnail: {
    width: 120,
    height: 90,
    flex: 0,
    backgroundColor: 'transparent',
  },
};

const defaultStyles = StyleSheet.create(styleJson);

export default defaultStyles;
