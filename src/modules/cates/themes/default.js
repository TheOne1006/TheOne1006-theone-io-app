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
  baseLine: {
    marginTop: 10,
    justifyContent: 'center',
    height: 20,
    flexDirection: 'row',
    paddingLeft: 30,
    paddingRight: 30,
  },
  line: {
    flex: 1,
    borderTopColor: '#CCCCCC',
    borderTopWidth: minPixel,
    marginTop: 8,
  },
  baseLineText: {
    color: '#CCCCCC',
    fontSize: 15,
    textAlign: 'center',
  },
};

const defaultStyles = StyleSheet.create(styleJson);

export default defaultStyles;
