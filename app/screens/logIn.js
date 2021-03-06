import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeUser, changeIsAuthenticated } from '../store';
import { TextInput } from 'react-native-gesture-handler';

import Button from '../components/button';
import Input from '../components/input';
import settings from '../settings';


const mapStateToProps = (state) => {
  return ({
    user: state.currentUser,
    isAuthenticated: state.isAuthenticated,
  })
};

const mapDispatchToProps = (dispatch) => {
  return ({
    changeUser: bindActionCreators(changeUser, dispatch),
    changeIsAuthenticated: bindActionCreators(changeIsAuthenticated, dispatch),
  })
};

class LogIn extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      username: '',
      password: '',
    };
    this.signIn = this.signIn.bind(this);
  }

  _storeToken = async (token) => {
    await AsyncStorage.setItem('token', token);
  }

  validate() {
    if (this.state.username.length === 0) {
      alert('Username is required');
      return false;
    }
    if (this.state.password.length === 0) {
      alert('Password is required');
      return false;
    }
    return true;
  }

  async signIn() {
    if (!this.validate()) return;
    await axios.post(settings.serverDomain + '/profiles/login', {
      "username": this.state.username,
      "password": this.state.password,
    }).then((response) => {
      this._storeToken(response.data.token);
      this.props.changeUser(response.data.user.username);
      this.props.changeIsAuthenticated(true);
      this.props.navigation.navigate('Home');
    }).catch((error) => {
      if (error.response.status === 400) {
        alert('Wrong Credentials!');
      }
    });
  }

  render() {
    const user = this.props.user
    return (
      <View>
        <View>
        <Input
          label='Enter Username'
          onChangeFunc={(text)=>this.setState({username: text})}
          isPassword={false}
        />
        <Input
          label='Enter Password'
          onChangeFunc={(text)=>this.setState({password: text})}
          isPassword={true}
        />
        <Button
          text="Log In"
          type="upper"
          pressFunc={() =>
            this.signIn()
          }
        />
        </View>
        <Text>{user}</Text>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
