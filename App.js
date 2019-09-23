'use strict';
import React, { PureComponent, Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Axios from 'axios';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';


const initialState = {
  isShown: false,
};

const ACTION_CHANGE_SHOWN = 'ACTION_CHANGE_SHOWN';

const changeShownModal = (isShown) => {
  return {
    type: ACTION_CHANGE_SHOWN,
    payload: isShown
  }
};

const rootReducer = (state=initialState, action) => {
  console.log('reducer is callllllled')
  switch (action.type) {
    case ACTION_CHANGE_SHOWN:
      return { ...state, isShown: action.payload }
  }
};

const store = createStore(rootReducer);


class AcceptModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shownModal: false,
    };
  }

  putInCart () {
    const dispatch = this.props.dispatch;
    fetch('http://192.168.0.10:8000/carts/cart-products', {
      // headers: {
      //   'Accept': 'application/json',
      //   'Content-Type': 'multipart/form-data'
      // },
      method: 'GET',
      // body: data
    }).then(response => response.json()).then(data => {
      dispatch(changeShownModal(false));
      console.log("hiiiiiiiiiiiiii")
    });
  }

  render() {
    // if (props.isShow) {
    //   return null;
    // }
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

export default class MainComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pic_path: undefined,
      shownModal: false,
    };
  }

  componentDidUpdate() {
    const dispatch = this.props.dispatch;
    var data = new FormData();
    data.append('upload', {
      uri: this.state.pic_path,
      name: 'my_photo.jpg',
      type: 'image/jpg'
    })
    fetch('http://192.168.0.10:8000/carts/read-pricetag', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST',
      body: data
    }).then(response => response.json()).then(data => {
      dispatch(changeShownModal(true));
      console.log("data" + JSON.stringify(data))
    });
    // Axios.post('http://192.168.0.10:8000/carts/cart-products/', data, {
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'multipart/form-data'
    //   }
    // })
  }

  render() {
    const shownModal = this.state.shownModal;
    let modal
    if (shownModal) {
      modal = <AcceptModal/>;
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
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 16 }}> {this.state.pic_path} </Text>
      </View>
    );
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.setState({
        pic_path: data.uri
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

const mapStateToProps = (state) => {
  console.log(state)
  return {
    isShown: state.isShown
  };
};

const WrappedMainComponent = connect(mapStateToProps)(MainComponent);

const Root = () => (
  <Provider store={store}>
    <WrappedMainComponent />
  </Provider>
);

AppRegistry.registerComponent('Root', () => Root);
// AppRegistry.registerComponent('App', () => MainComponent);
