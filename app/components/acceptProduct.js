import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from '../style'


export default class AcceptModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    shownModal: false,
    };
  }

  putInCart () {
    const dispatch = this.props.dispatch;
    fetch('http://192.168.250.97:8000/carts/cart-products', {
    headers: {
      'Authorization': 'Token 304368a2f8fdf911eb7288d35b75736ea2a58650',
    },
    method: 'GET',
    // body: data
    }).then(response => response.json()).then(data => {
      dispatch(changeShownModal(false));
    });
  }

  render() {
    return (
    <View>
      <Text style={{ fontSize: 20, color: 'white' }}>Is this what you want to put in your cart?</Text>
      <Text style={{ fontSize: 16, color: 'white' }}>{this.props.price}</Text>
      <TouchableOpacity onPress={this.putInCart.bind(this)} style={styles.capture}>
        <Text style={{ fontSize: 16 }}> Put In the Cart </Text>
      </TouchableOpacity>
    </View>
    );
  }
}
