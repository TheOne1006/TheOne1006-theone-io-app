/**
 * @flow
 */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import ArticleListItem from '../../components/ArticleListItem/ArticleListItem';
import styles from './themes/light';

const rowHasChanged = (row1, row2) => row1 !== row2;
const dataSource = new ListView.DataSource({
  rowHasChanged,
});

class CateList extends Component {
  state = {
    dataSource: {},
    headerPressCount: 0,
  };

  componentWillMount() {
    const { articles } = this.props;
    this.setState({
      dataSource: dataSource.cloneWithRows(articles.toJS()),
    });
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = this.props;
    const nextLoaded = nextProps.loaded;
    const nextLoading = nextProps.loading;

    if (nextLoaded === true && nextLoading === false && loading === true) {
      const nextArticle = nextProps.articles;
      this.setState({
        dataSource: dataSource.cloneWithRows(nextArticle.toJS()),
      });
    }
  }

  props: {
    articles: Object,
    loaded: boolean,
    loading: boolean,
    refresh: Function,
    loadMore: Function,
    hasNextPage: boolean,
  }

  renderSeparator = (sectionID: string, rowID: string) => (
    <View key={`${sectionID}-${rowID}-separator`} style={styles.separator} />
  );

  renderFooter = () => {
    const { hasNextPage, loading, loaded } = this.props;
    let footerEle = (
      <View style={styles.baseLine}>
        <ActivityIndicator />
      </View>
    );

    if (!hasNextPage && !loading && loaded) {
      footerEle = (
        <View style={styles.baseLine}>
          <View style={styles.line} />
          <Text style={styles.baseLineText}>
            我也是有底线了
          </Text>
          <View style={styles.line} />
        </View>
      );
    }
    return footerEle;
  }

  renderRow = (rowData: Object): React.Element<any> => (
    <ArticleListItem
      title={rowData.title}
      descript={rowData.descript}
      thumbnail={rowData.thumbnail}
    />
  );

  render() {
    const { refresh, loadMore } = this.props;

    return (
      <ListView
        style={styles.listview}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={refresh}
          />}
        dataSource={this.state.dataSource}
        enableEmptySections
        renderRow={this.renderRow}
        renderFooter={this.renderFooter}
        renderSeparator={this.renderSeparator}
        initialListSize={9}
        pageSize={4}
        scrollRenderAheadDistance={500}
        onEndReached={loadMore}
        onEndReachedThreshold={10}
        stickySectionHeadersEnabled
      />
    );
  }
}

export default CateList;
