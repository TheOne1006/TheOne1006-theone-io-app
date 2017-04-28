/**
 * @flow
 */
import { StyleSheet } from 'react-native';

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
    alignItems: 'flex-start',
    padding: 6,
    backgroundColor: '#5890ff',
  },
  text: {
    color: '#FFF',
  },
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
