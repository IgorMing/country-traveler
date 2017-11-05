import React from 'react';
import { TabNavigator } from 'react-navigation';

import CountryStackNavigator from './Countries/CountryStackNavigator';
import MyVisits from './MyVisits/MyVisits';

const MainTabNavigator = TabNavigator({
  Countries: { screen: CountryStackNavigator },
  MyVisits: { screen: MyVisits }
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#fff',
    inactiveTintColor: '#fff',
    labelStyle: {
      fontSize: 12,
      marginBottom: 2
    },
    showIcon: true,
    indicatorStyle: {
      backgroundColor: 'white'
    }
  }
}

);

const MainNavigator = () => <MainTabNavigator />;

export default MainNavigator;
