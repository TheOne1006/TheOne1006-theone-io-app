/**
 * @flow
 */
import React from 'react';
import {
  View,
  Text,
  Image,
  WebView,
} from 'react-native';

import lightStyles from './themes/light';
import darkStyles from './themes/dark';

type MarkDownViewProps = {
  theme?: ?string,
  content: string,
}

const HTML = `
<!DOCTYPE html>\n
<html>
  <head>
    <title>Hello Static World</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        font: 62.5% arial, sans-serif;
        background: #ccc;
      }
      h1 {
        padding: 45px;
        margin: 0;
        text-align: center;
        color: #33f;
      }
    </style>
  </head>
  <body>
    <h1>Hello Static World</h1>
  </body>
</html>
`;

const MarkDownView = ({ theme, content }: MarkDownViewProps) => {
  const styles = theme === 'dark' ? darkStyles : lightStyles;
  return (
    <View>
      <WebView
        style={{
          height: 100,
        }}
        source={{ html: HTML }}
        scalesPageToFit
      />
    </View>
  );
};

MarkDownView.defaultProps = {
  theme: 'light',
};

export default MarkDownView;
