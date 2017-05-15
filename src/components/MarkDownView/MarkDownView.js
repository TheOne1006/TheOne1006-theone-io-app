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

import lightStyles from './themes/light';
import darkStyles from './themes/dark';
import HtmlRender from './HtmlRender';

type MarkDownViewProps = {
  theme?: ?string,
  content: string,
}

const renderer = new marked.Renderer();
renderer.link = (href, title, text) => (`<a target="_blank" href="${href}" title="${title}"> ${text} </a>`);

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
        warrperHeihgt: height
      })
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
          onNavigationStateChange={(info) => {
            const WebViewHeight = info.url.replace('about:blank%23', '') / 1 ;
            if (WebViewHeight) {
              this.handleChangeHeight(WebViewHeight - 0);
            }
          }}
        />
      </View>
    );
  }
}

export default MarkDownView;
