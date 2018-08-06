import React from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';

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

  async _deleteUserToken(token) {

    try {
      await AsyncStorage.removeItem(token);
      this.props.navigation.navigate('SignedOut')
      return true;
    } catch(error) {
      return false;
    }
  }

  render = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile Screen</Text>
        <Button
          title="Sign Out"
          onPress={() => this._deleteUserToken('@USERTOKEN')}
        >
        </Button>
      </View>
    );
  }
}