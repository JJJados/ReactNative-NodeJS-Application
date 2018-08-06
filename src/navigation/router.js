import React from 'react';
import { StackNavigator, TabNavigator, SwitchNavigator } from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import Explore from './screens/ExploreScreen';
import Profile from './screens/ProfileScreen';

export const SignedIn = TabNavigator(
	{
		Explore: Explore,
		Profile: Profile,
	},
	{
		navigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, tintColor }) => {
				const { routeName } = navigation.state;
				let iconName;
				if (routeName === 'Explore') {
					iconName = `navigation${focused ? '' : '-outline'}`;
				} else if (routeName === 'Profile') {
					iconName = `user${focused ? '' : '-outline'}`;
				}

				return <Feather name={iconName} size={25} color={tintColor} />;
			},
		}),
		tabBarOptions: {
			activeTintColor: 'green',
			inactiveTintColor: 'gray',
		}
	},
);

export const SignedOut = StackNavigator(
  {
    SignIn: LoginScreen,
    SignUp: SignUpScreen,
    CreateAccount: CreateAccountScreen,
  },
  {
    initialRouteName: 'SignUp',
  }
);

export const AuthLoading = SwitchNavigator(
	{
		AuthLoading: AuthLoadingScreen,
		SignedIn: SignedIn,
		SignedOut: SignedOut
	},
	{
	initialRouteName: 'AuthLoading'
	}
);