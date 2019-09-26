import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Button } from 'react-native';


export default class Home extends Component {
  render() {
    return (
      <View>
        <Text>Welcome!</Text>
        <Button
          title="Log In"
          onPress={() =>
            this.props.navigation.navigate('LogIn')
          }
        />
      </View>
    );
  }
}
