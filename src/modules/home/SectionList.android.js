/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
} from 'react-native';
import { cloneDeep } from 'lodash';

import ArticleListItem from '../../components/ArticleListItem/ArticleListItem';
import Banner from '../banner/BannerView';
import lightStyles from './themes/light';
import darkStyles from './themes/dark';

const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
const rowHasChanged = (row1, row2) => row1 !== row2;
const sectionHeaderHasChanged = (s1, s2) => s2 !== s1;

type SectionListPropsType = {
  sections: Object,
  navigate: Function,
  theme: string,
}

class SectionList extends Component {
  state = {
    dataSource: {},
    headerPressCount: 0,
    firstRowID: '',
    firstSectionID: '',
    firsetSectionBackGroundOpacity: 0,
    dataBlob: {},
    sectionIDs: [],
    rowIDs: [],
  };

  componentWillMount() {
    const { sections } = this.props;
    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged,
      sectionHeaderHasChanged,
    });

    const dataBlob = {};
    const sectionIDs = [];
    const rowIDs = [];
    const firstRowID = sections.getIn([0, 'articles', 0, '_id']);
    const firstSectionID = sections.getIn([0, 'title']);

    sections.map((section, index) => {
      const title = section.get('title');
      sectionIDs.push(title);
      dataBlob[title] = { title };
      const articles = section.get('articles').toJS() || [];
      rowIDs[index] = articles.map((article) => {
        dataBlob[article._id] = article;
        return article._id;
      });
      return title;
    });

    this.setState({
      firstRowID,
      firstSectionID,
      dataSource: dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
      dataBlob,
      sectionIDs,
      rowIDs,
    });
  }

  componentWillReceiveProps(nextProps: SectionListPropsType) {
    /**
     * FIXME: 深度克隆原数据
     */
    const { theme } = this.props;
    const nextTheme = nextProps.theme;
    if (theme !== nextTheme) {
      const { dataSource, dataBlob, sectionIDs, rowIDs } = this.state;
      const nextDataBlob = cloneDeep(dataBlob);
      this.setState({
        dataSource: dataSource.cloneWithRowsAndSections(nextDataBlob, sectionIDs, rowIDs),
      });
    }
  }

  props: SectionListPropsType

  firstSectionHeader: Object

  renderRow = (rowData: Object, sectionID: string, rowID: string): React.Element<any> => {
    const { firstSectionID, firstRowID } = this.state;
    const { theme } = this.props;

    if (sectionID === firstSectionID && firstRowID === rowID) {
      return (
        <View>
          <Banner />
          <ArticleListItem
            articleID={rowData._id}
            title={rowData.title}
            descript={rowData.descript}
            thumbnail={rowData.thumbnail}
            navigate={this.props.navigate}
            theme={theme}
          />
        </View>
      );
    }

    return (
      <ArticleListItem
        articleID={rowData._id}
        title={rowData.title}
        descript={rowData.descript}
        thumbnail={rowData.thumbnail}
        navigate={this.props.navigate}
        theme={theme}
      />
    );
  }

  renderSeparator = (sectionID: string, rowID: string) => {
    const { theme } = this.props;
    const styles = (theme === 'night') ? darkStyles : lightStyles;
    return (
      <View key={`${sectionID}-${rowID}-separator`} style={styles.separator} />
    );
  }

  renderSectionHeader = (sectionData: Object) => {
    const { theme } = this.props;
    const styles = (theme === 'night') ? darkStyles : lightStyles;

    return (
      <View style={[styles.section]}>
        <Text style={styles.text}>
          {sectionData.title}
        </Text>
      </View>
    );
  }
  // renderHeader = () => (<Banner />)

  render() {
    const { theme } = this.props;
    const styles = (theme === 'night') ? darkStyles : lightStyles;

    return (
      <ListView
        style={styles.listview}
        dataSource={this.state.dataSource}
        // renderHeader={this.renderHeader}
        enableEmptySections
        renderSectionHeader={this.renderSectionHeader}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        initialListSize={10}
        pageSize={4}
        scrollRenderAheadDistance={500}
        stickySectionHeadersEnabled
        bounces
      />
    );
  }
}

export default SectionList;
