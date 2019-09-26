'use strict';
import React, { PureComponent, Component } from 'react';
import { AppRegistry, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

import AcceptModal from './app/components/acceptProduct';
import AppNavigator from './app/appNavigator';
import styles from './app/style';


const initialState = {
  isShown: false,
  price: 0,
};

const ACTION_CHANGE_SHOWN = 'ACTION_CHANGE_SHOWN';
const ACTION_CHANGE_PRICE = 'ACTION_CHANGE_PRICE';

const changeShownModal = (isShown) => {
  return {
    type: ACTION_CHANGE_SHOWN,
    payload: isShown
  }
};

const changePrice = (price) => {
  return {
    type: ACTION_CHANGE_PRICE,
    payload: price
  }
};

const rootReducer = (state=initialState, action) => {
  switch (action.type) {
    case ACTION_CHANGE_SHOWN:
      return { ...state, isShown: action.payload }
    case ACTION_CHANGE_PRICE:
      return { ...state, price: action.payload }
    default:
      return state;
  }
};

const store = createStore(rootReducer);

// class Container extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       pic_path: undefined,
//     };
//   }

//   componentDidUpdate() {
//     let dispatch = this.props.dispatch;
//     var data = new FormData();
//     data.append('upload', {
//       uri: this.state.pic_path,
//       name: 'my_photo.jpg',
//       type: 'image/jpg'
//     })
//     fetch('http://192.168.250.97:8000/carts/read-pricetag', {
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'multipart/form-data'
//       },
//       method: 'POST',
//       body: data
//     }).then(response => response.json()).then(data => {
//       dispatch(changeShownModal(true));
//       dispatch(changePrice(data.price));
//     });
//   }

//   render() {
//     const shownModal = this.props.isShown;
//     let modal
//     if (shownModal) {
//       modal = <AcceptModal price={this.props.price}/>;
//     }

//     return (
//       <View style={styles.container}>
//         <RNCamera
//           ref={ref => {
//             this.camera = ref;
//           }}
//           style={styles.preview}
//           type={RNCamera.Constants.Type.back}
//           flashMode={RNCamera.Constants.FlashMode.on}
//           androidCameraPermissionOptions={{
//             title: 'Permission to use camera',
//             message: 'We need your permission to use your camera',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}
//         />
//         { modal }
//         <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
//           <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
//             <Text style={{ fontSize: 14 }}> SNAP </Text>
//           </TouchableOpacity>
//         </View>
//         <Text style={{ fontSize: 16 }}> {this.state.pic_path} </Text>
//       </View>
//     );
//   }

//   takePicture = async() => {
//     if (this.camera) {
//       const options = { quality: 0.5, base64: true };
//       const data = await this.camera.takePictureAsync(options);
//       this.setState({
//         pic_path: data.uri
//       });
//     }
//   };
// }

const mapStateToProps = (state) => {
  return {
    isShown: state.isShown,
    price: state.price,
  };
};

// const WrappedMainComponent = connect(mapStateToProps)(Container);

export default class Root extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return  (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Root', () => Root);
