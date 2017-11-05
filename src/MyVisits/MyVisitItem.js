import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

import { NO_REGION } from '../utils/common';
import { COMMON_STYLE } from '../style';

function renderRegion(region) {
  if (!region) {
    return <Text style={styles.middleField__text}>{NO_REGION}</Text>;
  }

  return <Text style={styles.middleField__text}>({region})</Text>;
}

const MyVisitItem = ({ country, region, visitDate }) =>
  <View style={styles.container}>
    <View style={styles.topField}>
      <Text style={styles.topField__text}>{country}</Text>
    </View>
    <View style={styles.middleField}>
      {renderRegion(region)}
    </View>
    <View style={styles.bottomField}>
      <Text style={styles.bottomField__text}>{visitDate}</Text>
    </View>
  </View>;

MyVisitItem.propTypes = {
  country: PropTypes.string.isRequired,
  region: PropTypes.string,
  visitDate: PropTypes.string.isRequired
};

MyVisitItem.defaultProps = {
  region: ''
};

const styles = StyleSheet.flatten({
  container: {
    flex: 1,
    alignItems: 'center',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    marginHorizontal: COMMON_STYLE.distanceSides
  },
  topField: {
    paddingTop: 15
  },
  topField__text: {
    fontSize: 18
  },
  middleField: {
  },
  middleField__text: {
    fontSize: 12,
    color: 'grey'
  },
  bottomField: {
    paddingBottom: 15
  },
  bottomField__text: {
    fontSize: 16
  }
});

export default MyVisitItem;
