/**
 * @flow
 */
import { StyleSheet, PixelRatio } from 'react-native';

const minPixel = 1 / PixelRatio.get();

export const styleJson = {
  listview: {
    backgroundColor: '#FFFFFF',
  },
  separator: {
    marginLeft: 6,
    marginRight: 6,
    borderBottomWidth: minPixel,
    borderBottomColor: '#CCCCCC',
  },
};

const defaultStyles = StyleSheet.create(styleJson);

export default defaultStyles;
