/**
 * @flow
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  WebView,
} from 'react-native';

import marked from 'marked';
import highLight from 'highlight.js';
import SafariView from 'react-native-safari-view';

import lightStyles from './themes/light';
import darkStyles from './themes/dark';
import HtmlRender from './HtmlRender';

type MarkDownViewProps = {
  theme?: ?string,
  content: string,
}

const renderer = new marked.Renderer();
renderer.link = (href, title, text) => {
  return (`
    <a class="link" title="${title}" href="javascript:;" data-href="${href}"> ${text} </a>
  `);
};

class MarkDownView extends Component {
  static defaultProps = {
    theme: 'light',
    content: '# h1',
  };

  state = {
    warrperHeihgt: 300,
  }

  props: MarkDownViewProps

  handleChangeHeight = (height: Number) => {
    if (height) {
      this.setState({
        warrperHeihgt: height,
      });
    }
  }

  componentWillMount() {
    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: (code: string, lang: string) => (highLight.highlight(lang || 'js', code).value),
    });
  }

  render() {
    const { theme, content } = this.props;
    const { warrperHeihgt } = this.state;
    const htmlText = marked(content, { renderer });

    // console.log(htmlText);
    return (
      <View>
        <WebView
          style={{ flex: 1, minHeight: 300, height: warrperHeihgt }}
          bounces={false}
          scrollEnabled={false}
          javaScriptEnabled
          source={{ html: HtmlRender(htmlText) }}
          scalesPageToFit
          canGoBack
          onNavigationStateChange={(info) => {
            const WebViewHeight = info.url.replace('about:blank%23', '') / 1 ;
            if (WebViewHeight) {
              this.handleChangeHeight(WebViewHeight - 0);
            }
          }}
          onMessage={(e) => {
            const url = e.nativeEvent.data;
            if (url) {
              console.log(SafariView);
              // SafariView.show({
              //   url: 'https://github.com/naoufal',
              // });
            }
          }}
        />
      </View>
    );
  }
}

export default MarkDownView;
