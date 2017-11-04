import React, { Component } from 'react';
import Expo, { SQLite } from 'expo';
import { Alert, Button, Modal, Text, StyleSheet, ScrollView, View } from 'react-native';
import DatePicker from 'react-native-datepicker';
import PropTypes from 'prop-types';
import _omit from 'lodash/omit';

import Database from '../../database';
import { httpClient } from '../../config';
import { Header, Spinner } from '../../components';
import CountryForm from './CountryForm';

const db = SQLite.openDatabase({ name: Database.NAME });

export default class CountryDetails extends Component {
  state = {
    emptyDate: false,
    visibleModal: false,
    date: null,
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

    this.alpha3Code = alpha3Code;

    httpClient(`/alpha/${this.alpha3Code}`).then(({ data }) => {
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

    db.transaction((tx) => {
      tx.executeSql(
        `create table if not exists ${Database.TABLES.VISITS} (id integer primary key not null, country text, visitDate text);`
      );
    });
  }

  openModal = () => {
    this.setState({ visibleModal: true });
  };

  closeModal = () => {
    this.setState({ visibleModal: false });

    const {
      props: {
        navigation
      },
      state: {
        date
      }
    } = this;

    db.transaction((tx) => {
      tx.executeSql(
        `insert into ${Database.TABLES.VISITS} (country, visitDate) values (?, ?);`,
        [
          this.alpha3Code,
          date
        ],
        () => navigation.goBack()
      );
    });
  };

  onClickButton = () => {
    const {
      state: {
        date
      }
    } = this;

    if (!date) {
      return Alert.alert(
        'Empty date',
        'Please, select the date that you visited this place',
        [
          {
            text: 'OK',
            onPress: () => this.setState({ emptyDate: true })
          },
        ],
        { cancelable: false }
      );
    }

    return this.openModal();
  };

  renderError() {
    if (!this.state.emptyDate) {
      return null;
    }

    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>Fill here</Text>
      </View>
    );
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <Spinner />;
    }

    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <CountryForm {..._omit(this.state, 'loading') } />
        </ScrollView>
        <View>
          <View style={{ paddingVertical: 30 }}>
            {this.renderError()}
            <DatePicker
              style={{ width: 340 }}
              date={this.state.date}
              mode="date"
              placeholder="When did you visit here?"
              format="DD/MM/YYYY"
              maxDate={new Date()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 30,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 65
                }
              }}
              onDateChange={(date) => this.setState({
                date,
                emptyDate: false
              })}
            />
          </View>
          <Button
            onPress={this.onClickButton}
            style={styles.button}
            title="I visited here"
            color="#841584"
            accessibilityLabel="I visited this country!"
          />
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.visibleModal}
          onRequestClose={this.closeModal}
        >
          <View style={modalStyles.container}>
            <Text style={modalStyles.message}>You visited here!</Text>
            <Button
              onPress={this.closeModal}
              title="Ok, I got it!"
            />
          </View>

        </Modal>
      </View>
    );
  }
}

const modalStyles = StyleSheet.flatten({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    fontSize: 24,
    paddingVertical: 15
  }
});

const styles = StyleSheet.flatten({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  observation: {
    backgroundColor: 'white'
  },
  button: {
    height: 30
  },
  errorContainer: {
    backgroundColor: '#ff8080',
    alignItems: 'center',
    marginBottom: 5
  },
  errorMessage: {
    color: 'darkred',
    fontSize: 15,
    paddingVertical: 10
  }
});
