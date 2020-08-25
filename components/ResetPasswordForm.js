import React, { Component } from 'react';
import { StyleSheet, Text, Button, View, TextInput, TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView
} from 'react-native';
import { processResetPassword } from '../redux/actions/forgetPasswordActionCreator';

const mapStateToProps = (state) => {
  return {
    resetPass: state.resetPass
  };
}

const mapDispatchToProps = (dispatch)=>{
  return {
    processFrgtPass: (username, old_password, new_password) =>
    {
      console.log("dispatch process login");
      dispatch(processResetPassword(username, old_password,new_password));
    }
  }
}


export class ForgotPasswordForm extends Component {

  constructor(props){
    super(props);
    this.state = {old_password:"", new_password:"", customer_name:""};
  }



  ProcessChangePasswordAsync() {
    console.log("process login asunc called");
    username = this.state.username;
    old_password = this.state.old_password;
    new_password = this.state.new_password;
    console.log(username,password);
    this.props.processFrgtPass(username,old_password,new_password);
  }

  render() {
    return(
      <View style={styles.loginPanel}>
        <TextInput style={styles.inputBox}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Shop Name"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                keyboardType="email-address"
                onSubmitEditing={()=> this.password.focus()}
                onChangeText={(shop_name)=>{this.setState({shop_name})}}
        />
        <TextInput style={styles.inputBox}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Old Passowrd"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                keyboardType="email-address"
                onSubmitEditing={()=> this.password.focus()}
                onChangeText={(old_password)=>{this.setState({old_password})}}
        />
        <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="New Password"
            secureTextEntry={true}
            placeholderTextColor = "#ffffff"
            ref={(input) => this.password = input}
            onChangeText={(new_password)=>{this.setState({new_password})}}
        />
        <TouchableOpacity style={styles.button} onPress={() => {this.ProcessChangePasswordAsync()}}>
             <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    )
  }
}



const styles = StyleSheet.create({
    loginPanel:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    button: {
      width:300,
      backgroundColor:'#1c313a',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
    },
    buttonText: {
      fontSize:16,
      fontWeight:'500',
      color:'#ffffff',
      textAlign:'center'
    },
    inputBox: {
      width:300,
      backgroundColor:'rgba(255, 255,255,0.2)',
      borderRadius: 25,
      borderColor: '#d6d7da',
      borderWidth: 0.5,
      paddingHorizontal:16,
      fontSize:18,
      color:'#ffffff',
      marginVertical: 10
    }
});
