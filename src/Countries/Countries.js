import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { Header, Spinner } from '../components';
import CountryItem from './CountryItem';
import { httpClient } from '../config';

export default class Countries extends Component {
  state = {
    countries: [],
    loading: true
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = {
    ...Header({ title: 'Country list' })
  };

  componentDidMount() {
    httpClient('/all').then((response) => {
      const allCountries = response.data.map(({ alpha3Code, name, region, population }) => (
        {
          alpha3Code,
          name,
          region,
          population
        }
      ));

      this.setState({
        countries: allCountries,
        loading: false
      });
    });
  }

  renderItem = ({ index, item }) => {
    const { navigation } = this.props;

    return (
      <CountryItem
        key={Math.random()}
        navigation={navigation}
        {...item}
      />
    );
  };

  render() {
    const { countries, loading } = this.state;

    if (loading) {
      return <Spinner />;
    }

    return (
      <FlatList
        data={countries}
        keyExtractor={({ name }) => name}
        renderItem={this.renderItem}
      />
    );
  }
}
