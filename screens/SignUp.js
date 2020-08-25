import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import SignUpForm from '../components/SignUpForm';


export class Signup extends Component {

  static navigationOptions = {
    title: 'Sign Up',
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
      <View style={styles.container}>
        <SignUpForm
         signupDetails={this.props.signup}
         returnToLogin={()=>{this.props.navigation.goBack()}}/>
      </View>
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
