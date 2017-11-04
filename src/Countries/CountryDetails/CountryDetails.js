import React, { Component } from 'react';
import { Button, View } from 'react-native';
import PropTypes from 'prop-types';
import _omit from 'lodash/omit';

import { httpClient } from '../../config';
import { Header, Spinner } from '../../components';
import CountryForm from './CountryForm';

export default class CountryDetails extends Component {
  state = {
    name: '',
    capital: '',
    region: '',
    subregion: '',
    population: 0,
    timezones: [],
    loading: true
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => Header({
    title: navigation.state.params.name
  });

  componentDidMount() {
    const {
      navigation: {
        state: {
          params: {
            alpha3Code
          }
        }
      }
    } = this.props;

    httpClient(`/alpha/${alpha3Code}`).then(({ data }) => {
      const {
        name,
        capital,
        region,
        subregion,
        population,
        timezones
      } = data;

      this.setState({
        loading: false,
        name,
        capital,
        region,
        subregion,
        population,
        timezones
      });
    });
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <Spinner />;
    }

    return (
      <View>
        <CountryForm {..._omit(this.state, 'loading') } />
        <Button
          onPress={() => {}}
          title="I visited here"
          color="#841584"
          accessibilityLabel="I visited this country!"
        />
      </View>
    );
  }
}
