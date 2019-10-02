import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import Button from './button';
import { changePrice, changeShownModal, changeCartCost } from '../store';
import settings from '../settings';


const mapStateToProps = (state) => {
  return {
    isShown: state.isShown,
    price: state.price,
    currentCart: state.currentCart,
    cartCost: state.cartCost
  };
};

const mapDispatchToProps = (dispatch) => {
  return ({
    changeShownModal: bindActionCreators(changeShownModal, dispatch),
    changePrice: bindActionCreators(changePrice, dispatch),
    changeCartCost: bindActionCreators(changeCartCost, dispatch),
  })
};


class AcceptModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    shownModal: false,
    };
  }

  async updateCartSum () {
    const token = await AsyncStorage.getItem('token');
    const currentCart = this.props.currentCart;
    await axios.get(settings.serverDomain + `/carts/${currentCart}`, {
      headers: {Authorization: "Token " + token }
    }).then((response) => {
      console.log(response);
      this.props.changeCartCost(response.data.cost)
    }).catch((error) => {
      alert(error);
    });
  }

  async putInCart () {
    const token = await AsyncStorage.getItem('token');
    const currentCart = this.props.currentCart;
    await axios.post(settings.serverDomain + '/carts/cart-products/', {
      price: this.props.price,
      cart: this.props.currentCart
    }, {
      headers: {Authorization: "Token " + token }
    }).then((response) => {
      this.updateCartSum();
      this.props.changeShownModal(false);
    }).catch((error) => {
      alert(error)
    });
  }

  render() {
    return (
    <View>
      <View style={{ marginBottom: 30}}>
        <Text style={{ fontSize: 20, color: 'white' }}>Your cart costs is {this.props.cartCost}</Text>
      </View>
      <View style={{ marginBottom: 30}}>
        <Text style={{ fontSize: 20, color: 'white' }}>Is this what you want to put in your cart?</Text>
        <Text style={{ fontSize: 30, color: 'white' }}>{this.props.price}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', padding: 20 }}>
        <Button
          text="In Cart"
          type="upper"
          pressFunc={() =>
            this.putInCart()
          }
        />
        <Button
          text="Cancel"
          type="upper"
          pressFunc={() =>
            this.props.changeShownModal(false)
          }
        />
      </View>
      {/* <TouchableOpacity onPress={this.putInCart.bind(this)} style={styles.capture}>
        <Text style={{ fontSize: 16 }}> Put In the Cart </Text>
      </TouchableOpacity> */}
    </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptModal);
