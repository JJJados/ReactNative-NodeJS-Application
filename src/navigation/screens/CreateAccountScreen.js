import React from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';

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
      firstName: null,
      lastName: null,
      password: null,
      email: null,
      userID: null,
    };
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#3d495f' }}>
        <Text style={styles.title}>Account Details</Text>
        <Text style={styles.text}>First Name</Text>
        <TextInput
          style={styles.textInput}
          selectionColor={'#fff'}
          secureTextEntry={true}
          onChangeText={(firstName) => this.setState({firstName})}
          value={this.state.firstName}
        />
        <Text style={styles.text}>Last Name</Text>
        <TextInput
          style={styles.textInput}
          selectionColor={'#fff'}
          secureTextEntry={true}
          onChangeText={(lastName) => this.setState({lastName})}
          value={this.state.lastName}
        />
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.textInput}
          selectionColor={'#fff'}
          secureTextEntry={true}
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