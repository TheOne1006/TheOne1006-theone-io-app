/**
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

import lightStyles from './themes/light';
import darkStyles from './themes/dark';

import MarkDownView from '../../components/MarkDownView/MarkDownView';

export default class ArticleView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title || 'Article',
    headerTintColor: 'white',
    headerLeft: (<Icon.Button
      onPress={() => navigation.goBack()}
      name="navigate-before"
      size={24}
      color="#fff"
      style={{ paddingLeft: 5 }}
      backgroundColor="transparent"
      underlayColor="transparent"
    />),
    headerStyle: {
      backgroundColor: navigation.headerBackground,
    },
  })

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
                  indicator={Progress.Circle}
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
