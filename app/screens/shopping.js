import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RNCamera } from 'react-native-camera';
import { Text, TouchableOpacity, View } from 'react-native';

import { changeCurrentCart, changePrice, changeShownModal } from '../store';
import AcceptModal from '../components/acceptModal';
import Button from '../components/button';
import styles from '../style';
import settings from '../settings';


const mapStateToProps = (state) => {
  return {
    isShown: state.isShown,
    price: state.price,
    currentCart: state.currentCart,
    cartCost: state.cartCost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return ({
    changeShownModal: bindActionCreators(changeShownModal, dispatch),
    changePrice: bindActionCreators(changePrice, dispatch),
    changeCurrentCart: bindActionCreators(changeCurrentCart, dispatch),
  })
};

class Shopping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pic_path: undefined,
    };
  }

  async completeCart () {
    const token = await AsyncStorage.getItem('token');
    const currentCart = this.props.currentCart
    await axios.patch(settings.serverDomain + `/carts/${currentCart}/`, {
      is_completed: true
    }, {
      headers: {Authorization: "Token " + token }
    }).then((response) => {
      this.props.changeCurrentCart(NaN)
      this.props.navigation.navigate('Home');
    }).catch((error) => {
      alert(error)
    });
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    await axios.post(settings.serverDomain + '/carts/', {
      "is_completed": false,
    }, {
      headers: {Authorization: "Token " + token,}
    }).then((response) => {
      this.props.changeCurrentCart(response.data.id)
    }).catch((error) => {
      alert(error)
    });
  }

  // async sendPicture() {
  //   var data = new FormData();
  //   data.append('upload', {
  //     uri: this.state.pic_path,
  //     name: 'my_photo.jpg',
  //     type: 'image/jpg'
  //   })
  //   await axios.post(settings.serverDomain + '/carts/read-pricetag', {
  //     data
  //   }, {
  //     "Authorization": "Token " + AsyncStorage.getItem('token'),
  //   }).then((response) => {
  //     console.log(response);
  //     this.props.changeCurrentCart(NaN)
  //   }).catch((error) => {
  //     alert(error)
  //   });
  // }

  async sendPicture(pic_uri) {
    var data = new FormData();
    data.append('upload', {
      uri: pic_uri,
      name: 'my_photo.jpg',
      type: 'image/jpg'
    })
    fetch(settings.serverDomain + '/carts/read-pricetag', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST',
      body: data
    }).then(response => response.json()).then(data => {
      this.props.changeShownModal(true);
      this.props.changePrice(data.price);
    });
  }

  render() {
    const shownModal = this.props.isShown;
    let modal
    if (shownModal) {
      modal = <AcceptModal price={this.props.price}/>;
    }

    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        { modal }
        <View style={ shownModal ? { display: 'none' } : { flex: 0, flexDirection: 'row', justifyContent: 'center' } }>
          <Button
            text="Get It"
            type="upper"
            pressFunc={() =>
              this.takePicture()
            }
          />
          <Button
            text="Stop Shopping"
            type="upper"
            pressFunc={() =>
              this.completeCart()
            }
          />
          <Text style={{ fontSize: 15, color: 'white' }}>Total: {this.props.cartCost}</Text>
        </View>
      </View>
    );
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.sendPicture(data.uri)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Shopping);
