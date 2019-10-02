import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

class SignUp extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      username: '',
      password: '',
    };
    this.signUp = this.signUp.bind(this);
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

  async signUp() {
    if (!this.validate()) return;
    await axios.post(settings.serverDomain + '/profiles/register', {
      "username": this.state.username,
      "email": this.state.email,
      "password": this.state.password,
    }).then((response) => {
      this._storeToken(response.data.token);
      this.props.changeUser(response.data.username);
      this.props.navigation.navigate('Home');
    }).catch((error) => {
      alert(error.data);
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
          text="Sign Up"
          type="upper"
          pressFunc={() =>
            this.signUp()
          }
        />
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
