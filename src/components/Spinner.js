import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export const Spinner = ({ size }) =>
  <View style={styles.spinnerStyle}>
    <ActivityIndicator size={size} />
  </View>;

const styles = StyleSheet.create({
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

Spinner.propTypes = {
  size: PropTypes.oneOf([
    'small',
    'large'
  ])
};

Spinner.defaultProps = {
  size: 'large'
};
