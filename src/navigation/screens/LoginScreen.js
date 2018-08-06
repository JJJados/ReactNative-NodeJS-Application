import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert, AsyncStorage } from 'react-native';
import USER_TOKEN from '../../api/UserInfo';

export default class SignUpScreen extends React.Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#3d495f',
      borderBottomWidth: 0
    },
    headerTintColor: '#fff'
  }

  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      user_ID: '',
    };
  }

  async _storeUserToken(token) {

    console.log(token);

    try {
      await AsyncStorage.setItem('@USERTOKEN', token);
    } catch(error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  _loginAccount() {

    return fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then((response) => response.json())
    .then((response) => {
      this._storeUserToken(response.user.token);
      this.props.navigation.navigate('SignedIn');
    })
    .done();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#3d495f' }}>
        <Text style={styles.title}>Account Login</Text>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.textInput}
          selectionColor={'#fff'}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.textInput}
          selectionColor={'#fff'}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <Button 
          title="Submit"
          onPress={() => this._loginAccount()}>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  title: {
    color: '#fff',
    fontSize: 32,
    fontFamily: 'SourceSansPro-Regular',
    marginTop: 20,
    marginBottom: 50,
    marginLeft: 30
  },

  text: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'SourceSansPro-Regular',
    marginLeft: 30
  },

  textInput: {
    color: '#fff', 
    borderBottomWidth: 1/4, 
    borderColor: '#fff', 
    fontSize: 24,
    fontFamily: 'SourceSansPro-Regular',
    marginBottom: 25,
    marginLeft: 30, 
    marginRight: 30
  },
});