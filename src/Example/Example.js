import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as actions from './redux';
import { Spinner } from '../components';

class Example extends Component {
  componentDidMount() {
    this.props.getMessage();
  }

  buttonClick = () => {
    this.props.getAnotherMessage();
  };

  render() {
    const { example } = this.props;

    if (example.loading) {
      return <Spinner />;
    }

    return (
      <View style={styles.container}>
        <Text>{example.message}</Text>
        <TouchableOpacity onPress={this.buttonClick}>
          <Text>Click me to change the text above</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  }
});

Example.propTypes = {
  example: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  getAnotherMessage: PropTypes.func.isRequired
};

const mapStateToProps = ({ example }) => ({ example });
const mapDispatchToProps = {
  ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(Example);
