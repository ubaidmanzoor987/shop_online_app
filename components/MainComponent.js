import { View, Platform } from 'react-native';
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Login } from '../screens/Login';
import { ForgotPassword } from '../screens/ForgotPassword';
import {Logout} from '../screens/Logout';
import { Signup } from '../screens/SignUp';
import MainComponentDrawer from './MainNavigator';

export const MainComponent = createAppContainer(createStackNavigator({
    Login: Login,
    SignUp:  Signup,
    ForgotPassword: ForgotPassword, 
    Logout:{screen:Logout,
      navigationOptions: {
        headerShown: false,
    },}, 
    Main:{screen:MainComponentDrawer,
      navigationOptions: {
        headerShown: false,
    },},         
  },
  {
    initialRouteName: 'Login'
  },

));
