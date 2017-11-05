import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import { COMMON_STYLE } from '../style';
import { NO_REGION } from '../utils/common';

function renderRegion(region) {
  if (!region) {
    return <Text style={styles.leftContainer__text}>{NO_REGION}</Text>;
  }

  return <Text style={styles.leftContainer__text}>({region})</Text>;
}

const CountryItem = ({
  alpha3Code,
  name,
  navigation,
  region,
  population
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('CountryDetails', {
        alpha3Code,
        name
      })}
    >
      <View style={styles.leftContainer}>
        <Text style={styles.leftContainer__text}>{name}</Text>
        {renderRegion(region)}
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.rightContainer__text}>Population: {population}</Text>
      </View>
    </TouchableOpacity>
  );
};

CountryItem.propTypes = {
  alpha3Code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  region: PropTypes.string.isRequired,
  population: PropTypes.number.isRequired
};

const styles = StyleSheet.flatten({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 80,
    marginHorizontal: COMMON_STYLE.distanceSides,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1
  },
  leftContainer: {
    flex: 4,
    justifyContent: 'center'
  },
  leftContainer__text: {
    fontSize: 16,
    paddingLeft: COMMON_STYLE.distanceSides
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContainer__text: {
    fontSize: 12,
    color: 'grey',
    textAlign: 'right',
    paddingRight: COMMON_STYLE.distanceSides
  }
});

export default CountryItem;
