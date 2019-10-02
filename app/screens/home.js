import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import Button from '../components/button';

const mapStateToProps = (state) => {
  return ({
    user: state.currentUser,
    isAuthenticated: state.isAuthenticated,
  })
};


class Home extends Component {
  render() {
    const isAuthenticated = this.props.isAuthenticated;
    if (isAuthenticated) {
      return (
        <View>
        <Button
          text="Start Shopping"
          type="upper"
          pressFunc={() =>
            this.props.navigation.navigate('Shopping')
          }
        />
        <Button
          text="Log Out"
          type="upper"
          pressFunc={() =>
            this.props.navigation.navigate('Home')
          }
        />
      </View>
      );
    }
    else {
      return (
        <View>
        <Text>Welcome!</Text>
        <Button
          text="Log In"
          type="upper"
          pressFunc={() =>
            this.props.navigation.navigate('Login')
          }
        />
        <Button
          text="Sign Up"
          type="upper"
          pressFunc={() =>
            this.props.navigation.navigate('Signup')
          }
        />
      </View>
      );
    }
  }
}

export default connect(mapStateToProps)(Home);
