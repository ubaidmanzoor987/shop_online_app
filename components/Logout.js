import React, { Component } from 'react';
import { connect } from 'react-redux';
import { processLogout } from '../redux/actions/logoutActionCreater';
import {View,Text,TouchableOpacity,ToastAndroid, Platform} from 'react-native';
import {Loader} from './LoadingComponent';
const mapStateToProps = (state) => {
    return {
      logoutDetails: state.logout    };
  }
  
  const mapDispatchToProps = (dispatch)=>{
    return {
      processLogout: (a) =>
      {
        console.log("dispatch process logout");
        dispatch(processLogout(a));
      }
    }
}

class LogOutComponent extends Component { 
  
    constructor(props){
      global.processingView = <View/>;
      super(props)
      //console.log("this is LogOutComponent Props", props);
    
    }
    componentDidUpdate(){
      if(this.props.logoutDetails.inProcess !== true && this.props.logoutDetails.isLoggedOut === true)
      {
        //// TODO: GOTO Login Page
        if(Platform.OS==="android"){
          ToastAndroid.show(this.props.logoutDetails.msg, ToastAndroid.SHORT);
        }
        this.props.goToLoginScreen();
      }
       
    }
    componentDidMount(){
      this.props.processLogout("some");
    }
    render(){
      if(this.props.logoutDetails.inProcess === true)
      {
        processingView = <Loader msg="Signing Out..."/>
      }
      else if(this.props.logoutDetails.inProcess !== true && this.props.logoutDetails.isLoggedOut === false){
        {Platform.OS==="android" ? ToastAndroid.show(this.props.logoutDetails.msg, ToastAndroid.SHORT) : Alert.alert("Message",this.props.logoutDetails.msg) }
      }
      return (
        <View>
          {processingView}
        </View>
        
      )
    }
    
};

export default connect(mapStateToProps, mapDispatchToProps)(LogOutComponent);