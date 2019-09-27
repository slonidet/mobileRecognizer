import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeUser, changeIsAuthenticated } from '../store';


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

  validate() {
    if (state.username.length === 0) {
      Logger.alert('Username is required');
      return false;
    }
    if (this.state.password.length === 0) {
      Logger.alert('Password is required');
      return false;
    }
    return true;
  }

  async signIn() {
    if (!this.validate()) return;
    try {
      const user = await this.props.signIn({
        username: this.state.username,
        password: this.state.password,
      });
      this.props.navigation.navigate('Home');
    } catch (error) {
      alert('Wrong Credentials!');
    }
  }

  render() {
    const user = this.props.user;
    console.log('THIS IS PROPS');
    console.log(this.props)
    return (
      <View>
        <View>
          <Text style={{ alignSelf: 'center', color: 'blue' }}>Or sign in with</Text>
        </View>
        <Text>{user}</Text>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
