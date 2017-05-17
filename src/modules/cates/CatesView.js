/**
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import CateList from './CateList';

export default class CateView extends Component {
  static navigationOptions = {
    title: ({ state }) => (state.params.title || 'Cate'),
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
        backgroundColor: '#39babd',
      },
    }),
    tabBar: () => ({
      icon: props => (
        <Icon name="home" size={24} color={props.tintColor} />
      ),
    }),
  }

  componentWillMount() {
    const { resultsRequest, currentCateID, loaded, navigation: { state } } = this.props;
    const cateID = state && state.params && state.params.cateID;

    if (currentCateID !== cateID || !loaded) {
      resultsRequest(cateID);
    }
  }

  props: {
    navigation: Object,
    navigate: Function,
    resultsRequest: Function,
    resultsReload: Function,
    resultsNextPage: Function,
    loading: boolean,
    loaded: boolean,
    hasNextPage: boolean,
    articles: Object,
    currentCateID: string,
    currentTheme: string,
  }

  refreshHandle = () => {
    const { resultsReload, navigation: { state } } = this.props;
    const cateID = state && state.params && state.params.cateID;
    if (cateID) {
      resultsReload(cateID);
    }
  }

  loadMoreHandle = () => {
    const { resultsNextPage, loading, hasNextPage, navigation: { state } } = this.props;
    const cateID = state && state.params && state.params.cateID;
    if (!loading && hasNextPage && cateID) {
      resultsNextPage(cateID);
    }
  }

  render() {
    const { articles,
      loading,
      loaded,
      hasNextPage,
      navigate,
      currentTheme,
      } = this.props;

    return (
      <View>
        <CateList
          articles={articles}
          loading={loading}
          loaded={loaded}
          refresh={this.refreshHandle}
          loadMore={this.loadMoreHandle}
          hasNextPage={hasNextPage}
          navigate={navigate}
          theme={currentTheme}
        />
      </View>
    );
  }
}
