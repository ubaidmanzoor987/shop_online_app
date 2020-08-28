import React, { Component } from 'react';
import { connect } from 'react-redux';
import { processLogout } from '../redux/actions/logoutActionCreater';
import {View,Text} from 'react-native';

const mapStateToProps = (state) => {
    return {
      logoutDetails: state.logout    };
  }
  
  const mapDispatchToProps = (dispatch)=>{
    return {
      processLogout: () =>
      {
        console.log("dispatch process login");
        dispatch(processLogout());
      }
    }
}

class LogOutComponent extends Component { 
  
    constructor(props){
      
      super(props)
      console.log("this is LogOutComponent Props", props);
    }
    
    render(){
      return (
        <View><Text>Hello</Text></View>
      )
    }
    
};

export default connect(mapStateToProps, mapDispatchToProps)(LogOutComponent);