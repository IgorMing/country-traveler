import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Spinner } from '../components';
import { httpClient } from '../config';

export default class Countries extends Component {
  state = {
    loading: true,
    countries: []
  };

  componentDidMount() {
    httpClient('/all').then((response) => {
      const allCountries = response.data.map(({ flag, name, region }) => (
        {
          flag,
          name,
          region
        }
      ));

      this.setState({
        countries: allCountries,
        loading: false
      });
    });
  }

  render() {
    const { countries, loading } = this.state;

    if (loading) {
      return <Spinner />;
    }

    return (
      <FlatList
        data={countries}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.flatten({});
