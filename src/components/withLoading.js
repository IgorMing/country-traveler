import React, { Component } from 'react';
import { Spinner } from './Spinner';

export function withLoading(WrappedComponent) {
  return class WrapperComponent extends Component {
    state = {
      loading: true
    };

    changeLoading = (isLoading) => {
      this.setState({ loading: isLoading });
    };

    render() {
      if (this.state.loading) {
        return <Spinner />;
      }

      return (
        <WrappedComponent
          changeLoading={this.changeLoading}
          {...this.props}
        />
      );
    }
  };
}
