/**
 * @flow
 */
import React, { PropTypes, Component } from 'react';
import {
  Text,
  View,
  ListView,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './themes/light';
import Banner from '../banner/BannerView';
import SectionList from './SectionList';

export default class HomeView extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    resultsRequest: PropTypes.func.isRequired,
    sections: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
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

  componentWillMount() {
    const { resultsRequest } = this.props;
    resultsRequest();
  }
  render() {
    const { sections, loading, loaded } = this.props;
    if (!loading && loaded) {
      return (
        <SectionList
          sections={sections}
        />
      );
    }

    return (
      <View>
        <Text> loading... </Text>
      </View>
    );
  }
}

// const NUM_SECTIONS = 10;
// const NUM_ROWS_PER_SECTION = 10;
//
// class ListViewPagingExample extends Component {
//   constructor(props) {
//     super(props);
//     const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
//     const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
//
//     const dataSource = new ListView.DataSource({
//       getRowData,
//       getSectionHeaderData: getSectionData,
//       rowHasChanged: (row1, row2) => row1 !== row2,
//       sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
//     });
//
//     let dataBlob = {};
//     let sectionIDs = [];
//     let rowIDs = [];
//     for (let ii = 0; ii < NUM_SECTIONS; ii += 1) {
//       const sectionName = `Section ${ii}`;
//       sectionIDs.push(sectionName);
//       dataBlob[sectionName] = sectionName;
//       rowIDs[ii] = [];
//
//       for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj += 1) {
//         const rowName = `S${ii},R${jj}`;
//         rowIDs[ii].push(rowName);
//         dataBlob[rowName] = rowName;
//       }
//     }
//
//     this.state = {
//       dataSource: dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
//       headerPressCount: 0,
//     };
//   }
//
//   componentWillMount() {
//
//   }
//
//   renderRow = (rowData: ?string, sectionID: ?string, rowID: ?string): React.Element<any> => (
//     <View>
//       <Text> {`${rowData} ${sectionID} ${rowID}` } </Text>
//     </View>
//   );
//
//   renderSectionHeader = (sectionData: string, sectionID: string) => {
//     return (
//       <View style={styles.section}>
//         <Text style={styles.text}>
//           {sectionData}
//         </Text>
//       </View>
//     );
//   };
//
//   renderHeader = () => (<Banner />)
//
//   render() {
//     return (
//       <ListView
//         style={styles.listview}
//         dataSource={this.state.dataSource}
//         onChangeVisibleRows={(visibleRows, changedRows) => console.log({visibleRows, changedRows })}
//         renderHeader={this.renderHeader}
//         renderSectionHeader={this.renderSectionHeader}
//         renderRow={this.renderRow}
//         initialListSize={10}
//         pageSize={4}
//         scrollRenderAheadDistance={500}
//         stickySectionHeadersEnabled
//       />
//     );
//   }
//
//   _onPressHeader = () => {
//     var config = layoutAnimationConfigs[Math.floor(this.state.headerPressCount / 2) % layoutAnimationConfigs.length];
//     LayoutAnimation.configureNext(config);
//     this.setState({headerPressCount: this.state.headerPressCount + 1});
//   };
//
// }
