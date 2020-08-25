import React, { Component } from 'react';
import { StyleSheet, Text, Button, View, TextInput, TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { Logo } from '../components/LogoComponent';
import  LoginForm from '../components/LoginForm';


export class Login extends Component {

  constructor(props)
  {
    super(props);
    console.log(props);
  }

  static navigationOptions = {
    title: 'Login',
    headerStyle: {
      backgroundColor:'rgba(52, 87, 85,1)',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }

  render() {
    return(
      <View  style={styles.container} >
        <Logo />
        <LoginForm
        signUpPress={() => this.props.navigation.navigate('SignUp')}
        goToHomeScreen={() => this.props.navigation.navigate('MainNavigator')}
        forgetPasswordPress={() => this.props.navigation.navigate('ForgotPassword')} />
      </View >
    )
  }
}



const styles = StyleSheet.create({
    container: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'gray',
    }
});
