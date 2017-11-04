import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import CountryDetailItem from './CountryDetailItem';

const CountryForm = ({
  name,
  capital,
  region,
  subregion,
  population,
  timezones
}) =>
  <View>
    <CountryDetailItem label="Name" value={name} />
    <CountryDetailItem label="Capital" value={capital} />
    <CountryDetailItem label="Region" value={region} />
    <CountryDetailItem label="SubRegion" value={subregion} />
    <CountryDetailItem label="Population" value={population} />
    <CountryDetailItem label="Timezones" value={timezones} />
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
