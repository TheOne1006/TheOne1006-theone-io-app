/**
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import ArticleListItem from '../../components/ArticleListItem/ArticleListItem';
import lightStyles from './themes/light';
import darkStyles from './themes/dark';

type CateListPropsType = {
  articles: Object,
  loaded: boolean,
  loading: boolean,
  refresh: Function,
  loadMore: Function,
  navigate: Function,
  hasNextPage: boolean,
  theme: string,
}

class CateList extends Component {
  state = {
    dataSource: {},
    headerPressCount: 0,
  };

  componentWillMount() {
    const { articles } = this.props;
    const rowHasChanged = (row1, row2) => row1 !== row2;
    const dataSource = new ListView.DataSource({
      rowHasChanged,
    });

    this.setState({
      dataSource: dataSource.cloneWithRows(articles.toJS()),
    });
  }

  componentWillReceiveProps(nextProps: CateListPropsType) {
    const { loading } = this.props;
    const nextLoaded = nextProps.loaded;
    const nextLoading = nextProps.loading;

    if (nextLoaded === true && nextLoading === false && loading === true) {
      const nextArticle = nextProps.articles;
      const { dataSource } = this.state;
      this.setState({
        dataSource: dataSource.cloneWithRows(nextArticle.toJS()),
      });
    }
  }

  props: CateListPropsType

  renderSeparator = (sectionID: string, rowID: string) => {
    const { theme } = this.props;
    const styles = (theme === 'night') ? darkStyles : lightStyles;
    return (
      <View key={`${sectionID}-${rowID}-separator`} style={styles.separator} />
    );
  }

  renderFooter = () => {
    const { hasNextPage, loading, loaded, theme } = this.props;
    const styles = (theme === 'night') ? darkStyles : lightStyles;

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
            我也是有底线的
          </Text>
          <View style={styles.line} />
        </View>
      );
    }
    return footerEle;
  }

  renderRow = (rowData: Object): React.Element<any> => {
    const { theme } = this.props;
    return (
      <ArticleListItem
        title={rowData.title}
        descript={rowData.descript}
        thumbnail={rowData.thumbnail}
        articleID={rowData._id}
        navigate={this.props.navigate}
        theme={theme}
      />
    );
  }

  render() {
    const { refresh, loadMore, theme } = this.props;
    const styles = (theme === 'night') ? darkStyles : lightStyles;

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
