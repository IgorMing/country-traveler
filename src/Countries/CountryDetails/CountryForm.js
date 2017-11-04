import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

function renderTimezones(timezones) {
  return timezones.map((timezone, index) => <Text key={index}>{timezone}</Text>);
}

const CountryForm = ({
  name,
  capital,
  region,
  subregion,
  population,
  timezones
}) =>
  <View>
    <View>
      <Text>Name: {name}</Text>
    </View>
    <View>
      <Text>Capital: {capital}</Text>
    </View>
    <View>
      <Text>Region: {region}</Text>
    </View>
    <View>
      <Text>SubRegion: {subregion}</Text>
    </View>
    <View>
      <Text>Population: {population}</Text>
    </View>
    <View>
      <Text>Timezones:</Text>
      {renderTimezones(timezones)}
    </View>
  </View>;

CountryForm.propTypes = {
  name: PropTypes.string.isRequired,
  capital: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  subregion: PropTypes.string.isRequired,
  population: PropTypes.number.isRequired,
  timezones: PropTypes.array.isRequired
};

export default CountryForm;
