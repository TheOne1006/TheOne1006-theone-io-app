/**
 * @flow
 */
import React, { Component } from 'react';
import {
  View,
  WebView,
} from 'react-native';

import marked from 'marked';
import highLight from 'highlight.js';
import SafariView from 'react-native-safari-view';

import lightStyles from './themes/light';
import darkStyles from './themes/dark';
import HtmlRender from './HtmlRender';

const renderer = new marked.Renderer();
renderer.link = (href, title, text) => (`
    <a class="link" title="${title}" href="javascript:;" data-href="${href}"> ${text} </a>
  `);

class MarkDownView extends Component {
  static defaultProps = {
    theme: 'light',
    content: '',
  };

  state = {
    warrperHeihgt: 300,
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

  props: {
    theme?: ?string,
    content: string,
  }

  handleChangeHeight = (height: number) => {
    if (height) {
      this.setState({
        warrperHeihgt: height,
      });
    }
  }

  render() {
    const { theme, content } = this.props;
    const { warrperHeihgt } = this.state;
    const htmlText = marked(content, { renderer });
    const styles = (theme === 'dark') ? darkStyles : lightStyles;

    // console.log(htmlText);
    return (
      <View>
        <WebView
          style={[styles.webViewContainer, { height: warrperHeihgt }]}
          bounces={false}
          scrollEnabled={false}
          javaScriptEnabled
          source={{ html: HtmlRender(htmlText) }}
          scalesPageToFit={false}
          canGoBack
          onNavigationStateChange={(info) => {
            const WebViewHeight = info.url.replace('about:blank%23', '') / 1;
            if (WebViewHeight) {
              this.handleChangeHeight(WebViewHeight - 0);
            }
          }}
          onMessage={(e) => {
            const url = e.nativeEvent.data;
            if (url) {
              SafariView.isAvailable()
                .then(SafariView.show({
                  url,
                }))
                .catch((error) => {
                  // Fallback WebView code for iOS 8 and earlier
                  console.log(error);
                });
            }
          }}
        />
      </View>
    );
  }
}

export default MarkDownView;
