import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';


// export default class LogIn extends Component {
//   render() {
//     <View>
//       <Text>Log In Page</Text>
//       <TextInput></TextInput>
//       <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
//         <Text style={{ fontSize: 14 }}> Log In </Text>
//       </TouchableOpacity>
//     </View>
//   }
// }

export default class LogIn extends Component {
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
    return (
      <View>
        <View>
          <Text style={{ alignSelf: 'center', color: 'blue' }}>Or sign in with</Text>
        </View>
      </View>
    );
  }
}
