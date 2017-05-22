/**
 * @flow
 */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import lightStyles from './themes/light';
import darkStyles from './themes/dark';

type ArticleListItemProps = {
  theme?: ?string,
  title: string,
  articleID: string,
  descript: string,
  thumbnail: ?string,
  navigate: Function,
}

const ArticleListItem = ({
  theme,
  title,
  descript,
  thumbnail,
  articleID,
  navigate,
  }: ArticleListItemProps) => {
  const styles = theme === 'night' ? darkStyles : lightStyles;
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => (navigate({ routeName: 'Article', params: { articleID, title } }))}
    >
      <View style={styles.content}>
        <Text style={styles.rowTitle}>
          {title}
        </Text>
        <Text style={styles.rowDesc}>
          {descript}
        </Text>
      </View>
      {
        thumbnail ? (
          <Image
            style={styles.thumbnail}
            source={{
              uri: `https:${thumbnail}`,
            }}
            indicator={Progress.Circle}
          />
        ) : null
      }

    </TouchableOpacity>
  );
};

ArticleListItem.defaultProps = {
  theme: 'light',
};

export default ArticleListItem;
