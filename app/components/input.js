import React, { Component } from 'react';
import {  
  View,
  StyleSheet,
  TextInput,
} from 'react-native';

import ColorTheme from '../styles/theme';


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '80%',
    alignContent: 'center'
  },
});

class Input extends Component {

  state = {
    text: '',
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder={this.props.label}
          onChangeText={ this.props.onChangeFunc }
          secureTextEntry={this.props.isPassword}
          error={this.props.errorText}
          textColor={ColorTheme.inputColor}
          baseColor={ColorTheme.inputLabelColor}
        />
      </View>
    );
  }
}

export default Input;
