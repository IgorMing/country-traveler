import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

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
        <Text style={styles.leftContainer__text}>({region})</Text>
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

const DISTANCE_SIDES = 15;
const styles = StyleSheet.flatten({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 80,
    marginHorizontal: DISTANCE_SIDES,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  leftContainer: {
    flex: 4,
    justifyContent: 'center'
  },
  leftContainer__text: {
    fontSize: 18,
    paddingLeft: DISTANCE_SIDES
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContainer__text: {
    fontSize: 12,
    color: 'grey',
    textAlign: 'right',
    paddingRight: DISTANCE_SIDES
  }
});

export default CountryItem;
