import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text } from 'react-native';
import ColorTheme from '../styles/theme'


const styles = StyleSheet.create({
  upperButton: {
    backgroundColor: ColorTheme.buttonMainBackgroundColor,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    height: 45,
    marginBottom: 15,
    padding: 10,
    borderRadius: 20,
  },
  lowerButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 45,
    marginBottom: 15,
    padding: 10,
    borderRadius: 20,
  },
  upperButtonText: {
    color: ColorTheme.buttonMainTextColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  lowerButtonText: {
    color: ColorTheme.buttonSecondaryTextColor,
    fontSize: 18,
  },
});

class Button extends Component {
  render() {
    const { type } = this.props;
    return (
      <TouchableHighlight
        style={ type === 'upper' ? styles.upperButton : styles.lowerButton }
        onPress={this.props.pressFunc}
      >
        <Text style={ type === 'upper' ? styles.upperButtonText : styles.lowerButtonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

export default Button;