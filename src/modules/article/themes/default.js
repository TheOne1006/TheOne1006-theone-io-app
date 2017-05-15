/**
 * @flow
 */
import { StyleSheet, PixelRatio } from 'react-native';

const minPixel = 1 / PixelRatio.get();

export const styleJson = {
  thumbnail: {
    backgroundColor: '#FFFFFF',
    height: 250,
  },
};

const defaultStyles = StyleSheet.create(styleJson);

export default defaultStyles;
