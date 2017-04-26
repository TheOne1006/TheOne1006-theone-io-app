import React, { PropTypes, Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ListView,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class HomeView extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
  };

  static navigationOptions = {
    title: 'Home',
    titleStyle: {
      background: 'red',
    },
    header: navigation => ({
      left: (<Icon.Button
        onPress={() => navigation.navigate('DrawerOpen')}
        name="dehaze"
        size={24}
        color="#fff"
        style={{ paddingLeft: 5 }}
        backgroundColor="transparent"
      />),
      tintColor: 'white',
      style: {
        backgroundColor: 'red',
      },
    }),
    tabBar: () => ({
      icon: props => (
        <Icon name="home" size={24} color={props.tintColor} />
      ),
    }),
  }
  render() {
    return (
      <ListViewPagingExample />
    );
  }
}

const styles = StyleSheet.create({
  listview: {
    backgroundColor: '#B0C4DE',
  },
  header: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B5998',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    paddingHorizontal: 8,
  },
  rowText: {
    color: '#888888',
  },
  thumbText: {
    fontSize: 20,
    color: '#888888',
  },
  buttonContents: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 3,
    padding: 5,
    backgroundColor: '#EAEAEA',
    borderRadius: 3,
    paddingVertical: 10,
  },
  img: {
    width: 64,
    height: 64,
    marginHorizontal: 10,
    backgroundColor: 'transparent',
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 6,
    backgroundColor: '#5890ff',
  },
});

const NUM_SECTIONS = 100;
const NUM_ROWS_PER_SECTION = 10;

class ListViewPagingExample extends Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    let dataBlob = {};
    let sectionIDs = [];
    let rowIDs = [];
    for (let ii = 0; ii < NUM_SECTIONS; ii += 1) {
      const sectionName = `Section ${ii}`;
      sectionIDs.push(sectionName);
      dataBlob[sectionName] = sectionName;
      rowIDs[ii] = [];

      for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj += 1) {
        const rowName = `S${ii},R${jj}`;
        rowIDs[ii].push(rowName);
        dataBlob[rowName] = rowName;
      }
    }

    this.state = {
      dataSource: dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
      headerPressCount: 0,
    };
  }

  renderRow = (rowData: string, sectionID: string, rowID: string): React.Element<any> => {
    return (
      <View>
        <Text> {`${rowData} ${sectionID} ${rowID}` } </Text>
      </View>
    );
  };

  renderSectionHeader = (sectionData: string, sectionID: string) => {
    return (
      <View style={styles.section}>
        <Text style={styles.text}>
          {sectionData}
        </Text>
      </View>
    );
  };

  renderHeader = () => {
    const headerLikeText = this.state.headerPressCount % 2 ?
      <View><Text style={styles.text}>1 Like</Text></View> :
      null;
    return (
      <TouchableOpacity onPress={this._onPressHeader} style={styles.header}>
        {headerLikeText}
        <View>
          <Text style={styles.text}>
            Table Header (click me)
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderFooter = () => {
    return (
      <View style={styles.header}>
        <Text onPress={() => console.log('Footer!')} style={styles.text}>
          Table Footer
        </Text>
      </View>
    );
  };

  render() {
    return (
      <ListView
        style={styles.listview}
        dataSource={this.state.dataSource}
        onChangeVisibleRows={(visibleRows, changedRows) => console.log({visibleRows, changedRows})}
        renderHeader={this.renderHeader}
        renderFooter={this.renderFooter}
        renderSectionHeader={this.renderSectionHeader}
        renderRow={this.renderRow}
        initialListSize={10}
        pageSize={4}
        scrollRenderAheadDistance={500}
        stickySectionHeadersEnabled
      />
    );
  }

  _onPressHeader = () => {
    var config = layoutAnimationConfigs[Math.floor(this.state.headerPressCount / 2) % layoutAnimationConfigs.length];
    LayoutAnimation.configureNext(config);
    this.setState({headerPressCount: this.state.headerPressCount + 1});
  };

}
