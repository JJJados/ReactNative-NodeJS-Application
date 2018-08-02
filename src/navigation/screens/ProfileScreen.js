import React from 'react';
import { View, Text, Button } from 'react-native';

export default class ProfileScreen extends React.Component {

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
        <Text>Profile Screen</Text>
      </View>
    );
  }
}