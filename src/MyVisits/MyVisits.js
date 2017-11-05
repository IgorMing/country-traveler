import React, { Component } from 'react';
import { SQLite } from 'expo';
import { StyleSheet, ScrollView, RefreshControl, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Database from '../utils/database';
import MyVisitItem from './MyVisitItem';

const db = SQLite.openDatabase({ name: Database.NAME });

export default class MyVisits extends Component {
  state = {
    visits: [],
    loading: true
  };

  static navigationOptions = {
    title: 'My visits',
    tabBarIcon: ({ tintColor }) =>
      <MaterialCommunityIcons name="wallet-travel" size={25} color={tintColor} />
  };

  componentDidMount() {
    this.fetchInfo();
  }

  fetchInfo() {
    this.setState({ loading: true });
    db.transaction((tx) => {
      tx.executeSql(
        `select * from ${Database.TABLES.VISITS};`,
        [],
        (_, { rows: { _array } }) => this.setState({
          visits: _array,
          loading: false
        })
      );
    });
  }

  onRefresh = () => {
    this.fetchInfo();
  };

  render() {
    const { visits } = this.state;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.loading}
            onRefresh={this.onRefresh}
          />
        }
      >
        {visits.map((visit, index) => <MyVisitItem key={index} {...visit} />)}
      </ScrollView>
    );
  }
}
