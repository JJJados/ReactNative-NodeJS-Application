import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Alert,
} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._retreiveToken();
  }

  // Fetch the token from storage then navigate to our appropriate place
  async _retreiveToken() {

    try {

      const userToken = await AsyncStorage.getItem('@USERTOKEN');
      console.log('USERTOKEN RETREIVED: ' + userToken);

      if (userToken !== null) {
        this.props.navigation.navigate('SignedIn');

      } else {
        this.props.navigation.navigate('SignedOut');
      }

    } catch(error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={{flex: 1}}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}