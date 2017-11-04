import React from 'react';
import { StackNavigator } from 'react-navigation';

import Countries from './Countries';
import CountryDetails from './Countries/CountryDetails';

const MainStackNavigator = StackNavigator({
  Countries: { screen: Countries },
  CountryDetails: { screen: CountryDetails }
});

const MainNavigator = () => <MainStackNavigator />;

export default MainNavigator;
