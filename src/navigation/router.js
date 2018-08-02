import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
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
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    CreateAccount: CreateAccountScreen,
    SignedIn: SignedIn,
  },
  {
    initialRouteName: 'SignUp',
  }
);