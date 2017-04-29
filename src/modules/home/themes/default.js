/**
 * @flow
 */
import { StyleSheet, PixelRatio } from 'react-native';

const minPixel = 1 / PixelRatio.get();

export const styleJson = {
  listview: {
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B5998',
    flexDirection: 'row',
  },
  buttonContents: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 3,
    padding: 5,
    backgroundColor: '#EAEAEA',
    borderRadius: 3,
    paddingVertical: 10,
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    backgroundColor: '#00bcd4',
  },
  text: {
    color: '#FFFFFF',
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
