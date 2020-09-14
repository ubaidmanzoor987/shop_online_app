import React, { Component } from 'react';
import {StyleSheet,Text,View,TouchableOpacity,TextInput,ToastAndroid,Platform,Alert} from 'react-native';
import { connect } from 'react-redux';
import { processSignUp } from '../redux/actions/signupActionCreator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Loader} from './LoadingComponent';
import {Field, reduxForm,} from 'redux-form';

// const required = value => value ? undefined : ' Required' ;
// const maxLength = max => value =>
//   value && value.length > max ? `Must be ${max} characters or less` : undefined
// const maxLength15 = maxLength(15)
// const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
// const minValue = min => value =>
//   value && value.length < min ? `Must be at least ${min}` : undefined
// const minValue18 = minValue(18)
// const email = value =>
//   value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
//   'Invalid email address' : undefined
// const tooOld = value =>
//   value && value > 65 ? 'You might be too old for this' : undefined
// const aol = value =>
//   value && /.+@aol\.com/.test(value) ?
//   'Really? You still use AOL for your email?' : undefined


const validate = (values, allValues) => {
    const errors = {}
    
    if (!values.user_name) {
      errors.user_name = 'Required'
    } else if (values.user_name.length > 15) {
      errors.user_name = 'Must be 15 characters or less'
    }
    
    if (values.email) {
      //errors.email = 'Required'
     if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
     }
    }
    
    if (!values.owner_name) {
      errors.owner_name = 'Required'
    } else if (values.owner_name.length > 25) {
      errors.owner_name = 'Must be 25 characters or less'
    }
    
    if (!values.shop_name) {
      errors.shop_name = 'Required'
    } else if (values.shop_name.length > 15) {
      errors.shop_name = 'Must be 15 characters or less'
    }
    
    if (!values.owner_phone_no) {
      errors.owner_phone_no = 'Required'
    } else if (values.owner_phone_no.length > 11) {
      errors.owner_phone_no = 'Must be 11 characters'
    }
    else if (values.owner_phone_no.length < 11) {
      errors.owner_phone_no = 'Must be 11 characters'
    }

    if (!values.address) {
      errors.address = 'Required'
    }

    if (!values.password) {
      errors.password = 'Required'
    }

    if(!values.confirm_password){
      errors.confirm_password = "Required"
    }else if (values.confirm_password !==values.password){
      errors.confirm_password = "Password do not Match"
    }
    return errors
}
  
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

class SignUpForm1 extends Component {


  constructor(props)
  {
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
        confirm_password:"",
        email:""
    };
  }
  
  renderInput = (field)=> {
  const {meta:{touched,error}, label, secureTextEntry, maxLength, keyboardType, placeholder ,placeholderTextColor, input :{ onChange, ...restInput } , ...inputProps } = field;
    var hasError= false;
    if(error !== undefined){
      hasError= true;
    }
    return( 
      <View error= {hasError}>
        <TextInput  
          onChangeText = {onChange}
          maxLength = {maxLength}
          placeholder=  {placeholder}
          keyboardType = {keyboardType}
          secureTextEntry = {secureTextEntry}
          label = {label}
          placeholderTextColor = {placeholderTextColor}
          {...restInput}
          style = {styles.inputBox}
          />
        {touched ? hasError ? <Text style={{color:'red',fontSize:13,}}>{error}</Text> : null : null}
      </View>
    )
  }

  OnSubmit = (values) => {
    console.log("These are values", values);
    this.props.processSignUp(values);
    
  }

  componentDidUpdate() {
    if(this.props.signUpDetails.inProcess !== true && this.props.signUpDetails.isSignedUp === true)
    {
      // Return TO Login After Successfull Signup
      if(Platform.OS==="android"){
        ToastAndroid.show(this.props.signUpDetails.msg, ToastAndroid.SHORT);
      }
      this.props.returnToLogin();
    
    }
  }
  
  render() {
    let processingView = <View/>;
    const { handleSubmit, pristine, reset, submitting } = this.props;
    if(this.props.signUpDetails.inProcess === true)
    {
      processingView = <Loader msg="SigningUp...."/>
    }
    else if(this.props.signUpDetails.inProcess !== true && this.props.signUpDetails.isSignedUp === false){
      
      {Platform.OS==="android" ?  ToastAndroid.show(this.props.signUpDetails.msg, ToastAndroid.SHORT) : Alert.alert("Message", this.props.signUpDetails.msg) };
    }
    return(
      <KeyboardAwareScrollView style={styles.container}>
        {processingView}
        <Field name="user_name" component={this.renderInput} 
            placeholder="User Name" placeholderTextColor = "#ffffff"
            onChange={(user_name)=>{this.setState({user_name})}}
        />
        <Field name="email" component={this.renderInput} 
          placeholder="Email" placeholderTextColor = "#ffffff"
          onChange={(email)=>{this.setState({email})}}
        
        />
        <Field name="owner_name" component={this.renderInput} 
          placeholder="Owner Name" placeholderTextColor = "#ffffff"
          onChange={(owner_name)=>{this.setState({owner_name})}}
        
        />
        <Field name="shop_name" component={this.renderInput} 
          placeholder="Shop Name" placeholderTextColor = "#ffffff"
          onChange={(shop_name)=>{this.setState({shop_name})}}
        
        />
        <Field name="owner_phone_no" component={this.renderInput} 
          placeholder="Owner Mobile No" placeholderTextColor = "#ffffff"
          onChange={(owner_phone_no)=>{this.setState({owner_phone_no})}}
          keyboardType = "number-pad"
        
        />
        <Field name="shopphoneno" component={this.renderInput} 
          placeholder="Shop Phone No" placeholderTextColor = "#ffffff"
          onChange={(shop_phone_no1)=>{this.setState({shop_phone_no1})}}
          keyboardType = "number-pad"
        
        />
        
        <Field name="address" component={this.renderInput} 
          placeholder="Address" placeholderTextColor = "#ffffff"
          onChange={(address)=>{this.setState({address})}}
          
        />
        
        <Field name="password" component={this.renderInput} 
          placeholder="Password" placeholderTextColor = "#ffffff"
          onChange={(password)=>{this.setState({password})}}
          secureTextEntry={true}
        />

        <Field name="confirm_password" component={this.renderInput} 
          placeholder="Confirm Password" placeholderTextColor = "#ffffff"
          onChange={(confirm_password)=>{this.setState({confirm_password})}}
          secureTextEntry={true}
        />
        
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={handleSubmit(this.OnSubmit)}> Sign Up</Text>
        </TouchableOpacity>
        
      </KeyboardAwareScrollView>
    )
  }
}
const SignUpForm = reduxForm({
  form: 'SignUpForm1',
  validate
})(SignUpForm1);

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
