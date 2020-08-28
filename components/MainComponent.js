import { View, Platform } from 'react-native';
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Login } from '../screens/Login';
import { ForgotPassword } from '../screens/ForgotPassword';
import { Signup } from '../screens/SignUp';
import { Main } from './MainNavigator';

export const MainComponent = createAppContainer(createStackNavigator(
  {
    Login: Login,
    SignUp:  Signup,
    ForgotPassword: ForgotPassword, 
    Main:{screen:Main,
      navigationOptions: {
        headerShown: false,
    },}         
  },
  {
    initialRouteName: 'Login'
  }
));
