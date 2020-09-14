import React, { Component } from 'react';
import { StyleSheet, Text, Button, View, TextInput, TouchableOpacity,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { Logo } from '../components/LogoComponent';
import  LoginForm from '../components/LoginForm';


export class Login extends Component {

  constructor(props)
  {
    super(props);
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
        goToHomeScreen={(data) => this.props.navigation.navigate('Main')}
        forgetPasswordPress={() => Alert.alert("Alert","This is under Development")} />
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
