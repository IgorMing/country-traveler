import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, View } from 'react-native';

import { COMMON_STYLE } from '../../style';

const Item = ({ label, value }) => {
  if (Array.isArray(value)) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}:</Text>
        {value.map((each, index) => <Text style={styles.value} key={index}>{each}</Text>)}
      </View>
    );
  }

  return (
    <View style={[
      styles.container,
      styles.containerSingle
    ]}>
      <Text style={styles.label}>{label}: </Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.flatten({
  container: {
    paddingVertical: 15,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    marginHorizontal: COMMON_STYLE.distanceSides
  },
  containerSingle: {
    flexDirection: 'row'
  },
  containerMulti: {
    justifyContent: 'center'
  },
  label: {
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  value: {
    fontSize: 16,
    justifyContent: 'center'
  }
});

Item.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};

export default Item;
