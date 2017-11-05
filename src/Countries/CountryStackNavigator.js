import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import Countries from '.';
import CountryDetails from './CountryDetails';

class Navigator extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Search',
    tabBarIcon: ({ tintColor }) =>
      <Ionicons name="md-search" size={30} color={tintColor} />
  });

  render() {
    const EstablishmentStackNavigator = StackNavigator(
      {
        Countries: { screen: Countries },
        CountryDetails: { screen: CountryDetails }
      }
    );

    return <EstablishmentStackNavigator />;
  }
}

export default Navigator;
