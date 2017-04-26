import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styleJson = {
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    width,
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  loadingImage: {
    width: 60,
    height: 60,
  },
};

const defaultStyles = StyleSheet.create(styleJson);

export default defaultStyles;
