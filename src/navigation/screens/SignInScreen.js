import React from 'react';
import { View, Text, Button } from 'react-native';

export default class SignUpScreen extends React.Component {

  static navigationOptions = {
    title: 'Signup',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>SignIn Screen</Text>
      </View>
    );
  }
}