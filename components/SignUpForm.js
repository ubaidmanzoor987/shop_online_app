import React, { Component } from 'react';
import {
  ProgressBarAndroid,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid,
  Platform,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { processSignUp } from '../redux/actions/signupActionCreator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Loader} from './LoadingComponent';
const mapStateToProps = (state) => {
  return {
    signUpDetails: state.signup
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    processSignUp: (signUpDetails) => dispatch(processSignUp(signUpDetails)),
  }
}

export class SignUpForm extends Component {


  constructor(props)
  {
    console.log("This is Sign Up Props" , props);
    super(props);
    this.state={
        user_name:"",
        owner_name:"",
        shop_name:"",
        owner_phone_no:"",
        shop_phone_no1:"",
        shop_phone_no2:"",
        address:"",
        password:"",
        showFirstSection:true
    };
  }

  ProcessSignUpAsync() {
    console.log("Process SignUp Asyn Called ", this.state);
    this.props.processSignUp(this.state);
  }

  shouldComponentUpdate() {
    return true;
  }
  render() {
    console.log(this.props);
    let processingView = <View/>;
    if(this.props.signUpDetails.inProcess === true)
    {
      processingView = <Loader msg="SigningUp...."/>
    }
    else if(this.props.signUpDetails.inProcess !== true && this.props.signUpDetails.isSignedUp === true)
    {
      ToastAndroid.show(this.props.signUpDetails.msg, ToastAndroid.SHORT);
      this.props.returnToLogin();
    }
    else if(this.props.signUpDetails.inProcess !== true && this.props.signUpDetails.isSignedUp === false){
      ToastAndroid.show(this.props.signUpDetails.msg, ToastAndroid.SHORT);
    }
    return(
      <KeyboardAwareScrollView style={styles.container}>
        {processingView}
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="User Name"
          placeholderTextColor = "#ffffff"
          selectionColor="#fff"
          keyboardType="default"
          onSubmitEditing={()=> this.password.focus()}
          onChangeText={(user_name) => this.setState({user_name})}
        />
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Owner Name"
          placeholderTextColor = "#ffffff"
          selectionColor="#fff"
          keyboardType="default"
          onSubmitEditing={()=> this.password.focus()}
          onChangeText={(owner_name) => this.setState({owner_name})}
        />
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Shop Name"
          placeholderTextColor = "#ffffff"
          selectionColor="#fff"
          keyboardType="default"
          onSubmitEditing={()=> this.password.focus()}
          onChangeText={(shop_name) => this.setState({shop_name})}
        />
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Owner Mobile No"
          placeholderTextColor = "#ffffff"
          selectionColor="#fff"
          keyboardType="number-pad"
          onSubmitEditing={()=> this.password.focus()}
          onChangeText={(owner_phone_no) => this.setState({owner_phone_no})}
        />
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Shop Phone No"
          placeholderTextColor = "#ffffff"
          selectionColor="#fff"
          keyboardType="number-pad"
          onSubmitEditing={()=> this.password.focus()}
          onChangeText={(shop_phone_no1)=>this.setState({shop_phone_no1})}
        />
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Address"
          placeholderTextColor = "#ffffff"
          selectionColor="#fff"
          keyboardType="default"
          onSubmitEditing={()=> this.password.focus()}
          onChangeText={(address)=>this.setState({address})}
        />
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor = "#ffffff"
          ref={(input) => this.password = input}
          onChangeText={(password)=>this.setState({password})}
        />
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Confirm Password"
          secureTextEntry={true}
          placeholderTextColor = "#ffffff"
          ref={(input) => this.password = input}
          onChangeText={(password)=>this.setState({password})}
        />
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={()=>{this.ProcessSignUpAsync()}}>Sign Up</Text>
        </TouchableOpacity>
        
      </KeyboardAwareScrollView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

const styles = StyleSheet.create({
    progressViewStyle:{
      position:'absolute',
      width : '85%',
      backgroundColor:'#ffffff',
      height: "10%",
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1
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
      borderBottomColor: '#d6d7da',
      paddingHorizontal:16,
      height:35,
      fontSize:18,
      color:'#ffffff',
      marginVertical: 13,
      borderLeftColor:'transparent',
      borderRadius: 25,
      borderColor: '#d6d7da',
      borderWidth: 0.5,
    },
    header:{
      fontSize:24,
      color:'#ffffff',
      paddingBottom:10,
      borderBottomColor:'rgba(52, 87, 85,1)',
      borderBottomWidth:1,
      marginBottom:15
    },
    container:{
      marginTop:10
    }
});
