import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';


export default class Home extends Component {
  render() {
    return (
      <View>
        <Text>Welcome!</Text>
        <Button
          title="Log In"
          onPress={() =>
            this.props.navigation.navigate('Login')
          }
        />
      </View>
    );
  }
}
