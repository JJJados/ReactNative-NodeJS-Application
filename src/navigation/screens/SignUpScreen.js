import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Container, Header, Content, Icon, Button } from 'native-base';
import LoginStyles from './../../styles/LoginScreenStyle';

export default class SignedInScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={LoginStyles.container}>

        <Button transparent style={{marginTop: 20, alignSelf: 'flex-end', marginRight: 30}} onPress = {() => this.props.navigation.navigate('SignIn')}>
          <Text style={{fontSize: 14, fontFamily: 'SourceSansPro-Regular', color: '#fff'}}>Log In</Text>
        </Button>

        <Text style={{fontSize: 96, fontFamily: 'SourceSansPro-Bold', marginLeft: 30, color: '#fff'}}>S</Text>
        <Text style={{fontSize: 32, fontFamily: 'SourceSansPro-Regular', marginLeft: 30, color: '#fff', marginTop: 10}}>Welcome to S</Text>           

        <Button iconLeft rounded SignUp style={{width: 325, marginRight: 'auto', marginLeft: 'auto', backgroundColor: 'transparent', borderWidth: 1/4, borderColor: '#fff', marginTop: 75}}>
          <Image style={{width: 25, height: 25, marginLeft: 25}}source={require('../../assets/icons/facebook_logo_58.png')}/>
          <Text style={{fontSize: 16, fontFamily: 'SourceSansPro-Regular', marginRight: 'auto', marginLeft: 31, color: '#fff'}}>Continue with Facebook</Text>
        </Button>

        <Button rounded SignUp style={{width: 325, marginRight: 'auto', marginLeft: 'auto', marginTop: 15, backgroundColor: 'transparent', borderWidth: 1/4, borderColor: '#fff'}} onPress = {() => this.props.navigation.navigate('CreateAccount')}>
          <Text style={{fontSize: 16, fontFamily: 'SourceSansPro-Regular', marginRight: 'auto', marginLeft: 'auto', color: '#fff'}}>Create Account</Text>
        </Button>

        <Button transparent style={{marginTop: 15, marginLeft: 30}}>
          <Text style={{fontSize: 14, fontFamily: 'SourceSansPro-Regular', color: '#fff'}}>More Options</Text>
        </Button>

      </View>
    );
  }
}