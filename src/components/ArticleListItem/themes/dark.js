import { StyleSheet } from 'react-native';
import { styleJson as defaultStyleJson } from './default';

export const styleJson = {
  ...defaultStyleJson,
  row: {
    ...defaultStyleJson.row,
    backgroundColor: '#808080',
  },
  rowTitle: {
    ...defaultStyleJson.rowTitle,
    color: 'mintcream',
  },
  rowDesc: {
    ...defaultStyleJson.rowDesc,
    color: 'honeydew',
  },
};

const darkStyles = StyleSheet.create(styleJson);

export default darkStyles;
