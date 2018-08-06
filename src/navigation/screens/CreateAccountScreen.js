import React from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert, AsyncStorage } from 'react-native';

export default class CreateAccountScreen extends React.Component {

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
      userID: null,
    };
  }

  async _storeUserToken(token) {

    try {
      await AsyncStorage.setItem('@USERTOKEN', token);
    } catch(error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  _createAccount() {

    if (this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.password === '') {
      Alert.alert('', 'All fields are required!');
      return;
    }

    return fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname: this.state.firstName,
        lastname: this.state.lastName,
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
        <Text style={styles.title}>Account Details</Text>
        <Text style={styles.text}>First Name</Text>
        <TextInput
          style={styles.textInput}
          selectionColor={'#fff'}
          onChangeText={(firstName) => this.setState({firstName})}
          value={this.state.firstName}
        />
        <Text style={styles.text}>Last Name</Text>
        <TextInput
          style={styles.textInput}
          selectionColor={'#fff'}
          onChangeText={(lastName) => this.setState({lastName})}
          value={this.state.lastName}
        />
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
          onPress={() => this._createAccount()}>
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