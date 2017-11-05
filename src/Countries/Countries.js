import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { Spinner } from '../components';
import CountryItem from './CountryItem';
import { httpClient } from '../utils/config';
import { COMMON_STYLE } from '../style';

export default class Countries extends Component {
  state = {
    search: '',
    countries: [],
    loading: true
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = {
    title: 'Country list'
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

  filterCountries(countries, search) {
    return countries.filter((country) => {
      const { name, region } = country;

      return name.includes(search) || region.includes(search);
    });
  }

  render() {
    const { countries, loading, search } = this.state;

    if (loading) {
      return <Spinner />;
    }

    const filteredCountries = this.filterCountries(countries, search);

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.searchFieldContainer}>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.searchField}
            onChangeText={(_search) => this.setState({ search: _search })}
            placeholder="Search"
            value={search}
          />
        </View>
        <FlatList
          data={filteredCountries}
          keyExtractor={({ name }) => name}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.flatten({
  searchFieldContainer: {
    backgroundColor: 'white',
    paddingHorizontal: COMMON_STYLE.distanceSides,
    paddingVertical: 10
  },
  searchField: {
    fontSize: 16
  }
});
