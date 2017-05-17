/**
 * @flow
 */
import { StyleSheet, PixelRatio } from 'react-native';

const minPixel = 1 / PixelRatio.get();

export const styleJson = {
  root: {
    borderTopWidth: 20,
    borderTopColor: '#39babd',
  },
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
    backgroundColor: '#39babd',
    height: 44,
  },
  sectionHeader: {
    marginBottom: -44,
    zIndex: 999,
  },
  fixButton: {
    position: 'absolute',
    top: 3,
    left: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: 16,
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
