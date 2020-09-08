import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,
  ToastAndroid, Alert
} from 'react-native';
import { processUpdatePassword } from '../redux/actions/UpdatePasswordActionCreator';
import { connect } from 'react-redux';
import {Obj} from './Data';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Icon} from 'react-native-elements';
import {Loader} from './LoadingComponent';
import { Platform } from 'react-native';
import {Field, reduxForm,} from 'redux-form';

const mapStateToProps = (state) => {
  return {
    UpdateDetails: state.UpdatePassword
  };
}

const mapDispatchToProps = (dispatch)=>{
  return {
    processUpdatePassword: (values) =>
    {
      //console.log("dispatch processUpdatePassword");
      dispatch(processUpdatePassword(values));
    }
  }
}

const validate = (values, allValues) => {
  const errors = {}
  
  if (!values.old_password) {
    errors.old_password = 'Required';
  }

  if (!values.new_password) {
    errors.new_password = 'Required';
  }else if(values.new_password === values.old_password){
    errors.new_password = 'New and Old Password Must be Different';
  }

  if(!values.confirm_password){
    errors.confirm_password = "Required"
  }else if (values.confirm_password !== values.new_password){
    errors.confirm_password = "Password do not Match"
  }
  return errors;
}

class UpdatePasswordForm1 extends Component {

  constructor(props){
    super(props);
    this.state = {
      user_name:"",
      old_password:"", 
      new_password:"",
      confirm_password:""
    };
    global.processingView = <View />
    }
  
  
  static navigationOptions = {
    title: 'Change Password',
    headerStyle: {
      backgroundColor:'rgba(52, 87, 85,1)',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }

  renderInput = (field)=> {
    const {meta:{touched,error,visited}, label, secureTextEntry, maxLength, keyboardType, placeholder ,placeholderTextColor, input :{ onChange, ...restInput } , ...inputProps } = field;
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
          {touched ? hasError ? <Text style={{color:'red',fontSize:13,paddingHorizontal:20}}>{error}</Text> : null : null}
          {/* //{visited ? hasError ? <Text style={{color:'red',fontSize:13,paddingHorizontal:20}}>{error}</Text> : null : null} */}
        </View>
      )
  }
  
  OnSubmit = (values) => {
    const newvalue = {
      user_name : this.state.user_name,
      old_password : this.state.old_password,
      new_password : this.state.new_password
    }
    this.props.processUpdatePassword(newvalue);
    
  }

  componentDidMount(){
    this.setState({
      user_name:Obj.user_name
    })
  }
  componentDidUpdate(){
    if(this.props.UpdateDetails.inProcess !== true && this.props.UpdateDetails.isUpdated === true)
    {
      if(Platform.OS==="android"){
        ToastAndroid.show(this.props.UpdateDetails.msg, ToastAndroid.SHORT);
      }
      else{
        Alert.alert("Password Changed",this.props.UpdateDetails.msg )
      }
      processingView = <View />
    }
  }


  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    if(this.props.UpdateDetails.inProcess === true)
    {
      processingView = <Loader msg="Updating..." />
    }
    
    else if(this.props.UpdateDetails.inProcess !== true && this.props.UpdateDetails.isUpdated === false){
      {Platform.OS==="android" ? ToastAndroid.show(this.props.UpdateDetails.msg, ToastAndroid.SHORT) : Alert.alert("Message",this.props.UpdateDetails.msg) }
      processingView = <View />
    }
    return(
      <KeyboardAwareScrollView style={{flex:1}}>
        {processingView}
          <View style={{flex:1,marginVertical:100}}>
            <View style={{flexDirection:'row'}}>
              <Icon
                  name='key'
                  color = 'rgba(52, 87, 85,1)'
                  size = {19}
                  type = "font-awesome"
                  style = {{paddingTop:3}} 
              />
              <Text style={styles.textStyle}>Old Password</Text>
            </View>
            <Field name="old_password" component={this.renderInput} 
              placeholder="Old Password" 
              onChange={(old_password)=>{this.setState({old_password})}}
              secureTextEntry = {true}
            />
            
            <View style={{flexDirection:'row'}}>
                <Icon
                    name='key'
                    color = 'rgba(52, 87, 85,1)'
                    size = {19}
                    type = "font-awesome"
                    style = {{paddingTop:3}} 
                />
                <Text style={styles.textStyle}>New Password</Text>
            </View>
            <Field name="new_password" component={this.renderInput} 
              placeholder="New Password"
              onChange={(new_password)=>{this.setState({new_password})}}
              secureTextEntry = {true}
            />
            <View style={{flexDirection:'row'}}>
              <Icon
                  name='key'
                  color = 'rgba(52, 87, 85,1)'
                  size = {19}
                  type = "font-awesome"
                  style = {{paddingTop:3}} 
              />
              <Text style={styles.textStyle}>Confirm Password</Text>
            </View>
            <Field name="confirm_password" component={this.renderInput} 
              placeholder="Confirm Password"
              onChange={(confirm_password)=>{this.setState({confirm_password})}}
              secureTextEntry = {true}
            />
            <TouchableOpacity style={styles.button}  onPress={handleSubmit(this.OnSubmit)} >
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
          </View>
    </KeyboardAwareScrollView>
    )
  }
}
const UpdatePasswordForm = reduxForm({
  form: 'UpdatePasswordForm1',
  validate
})(UpdatePasswordForm1);
export default connect(mapStateToProps,mapDispatchToProps)(UpdatePasswordForm);

const styles = StyleSheet.create({

  inputBox: {
      fontSize:17,
      borderBottomWidth:1,
      borderColor:'#1c313a',
      width:300,
      height:30,
      borderRadius:20,
      borderWidth:1,
      alignSelf:'center',
      paddingHorizontal:10,
      marginVertical:10
  },
  textStyle:{
      fontSize:18,paddingLeft:15
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    alignSelf:'center',
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  
  
});
