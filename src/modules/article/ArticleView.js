/**
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Image,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import lightStyles from './themes/light';
import darkStyles from './themes/dark';

import MarkDownView from '../../components/MarkDownView/MarkDownView';

export default class ArticleView extends Component {
  static navigationOptions = {
    title: ({ state }) => (state.params.title || 'Article'),
    header: navigation => ({
      left: (<Icon.Button
        onPress={() => navigation.goBack()}
        name="navigate-before"
        size={24}
        color="#fff"
        style={{ paddingLeft: 5 }}
        backgroundColor="transparent"
        underlayColor="transparent"
      />),
      tintColor: 'white',
      style: {
        backgroundColor: navigation.headerBackground,
      },
    }),
    tabBar: () => ({
      icon: props => (
        <Icon name="home" size={24} color={props.tintColor} />
      ),
    }),
  }

  componentWillMount() {
    const { resultsRequest, currentArticleID, loaded, navigation: { state } } = this.props;
    const articleID = state.params.articleID;
    if (currentArticleID !== articleID || !loaded) {
      resultsRequest(articleID);
    }
  }

  props: {
    navigation: Object,
    resultsRequest: Function,
    article: Object,
    currentArticleID: string,
    loaded: boolean,
  }

  render() {
    const {
      article,
      currentArticleID,
      navigation: { state, theme, headerBackground },
    } = this.props;
    const articleID = state.params.articleID;

    const styles = (theme === 'night') ? darkStyles : lightStyles;

    return (
      <ScrollView>
        {
          (currentArticleID === articleID) ? (
            <View>
              <View>
                <Image
                  source={{ uri: `https:${article.get('thumbnail')}` }}
                  style={styles.thumbnail}
                />
              </View>
              <View>
                <MarkDownView
                  content={article.get('content')}
                  theme={theme}
                  barTintColor={headerBackground}
                />
              </View>
            </View>
          ) : null
        }
      </ScrollView>
    );
  }
}
