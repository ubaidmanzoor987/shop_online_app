import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
//import { ForgotPasswordForm } from '../components/ForgotPasswordForm';



export class ForgotPassword extends Component {

  static navigationOptions = {
    title: 'Change Password',
    headerStyle: {
      backgroundColor: 'rgba(52, 87, 85,1)',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }

  render() {
    return(
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text>SAlam</Text>
      </KeyboardAvoidingView>
    )
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'gray',
    }
});
