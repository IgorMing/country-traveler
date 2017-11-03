import React from 'react';
import { StackNavigator } from 'react-navigation';

import Countries from './Countries';

const MainStackNavigator = StackNavigator({
  Countries: { screen: Countries }
});

const MainNavigator = () => <MainStackNavigator />;

export default MainNavigator;
