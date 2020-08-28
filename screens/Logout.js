import React, { Component } from 'react';
import LogOutComponent from '../components/Logout';


export class Logout extends Component {

  constructor(props)
  {
    super(props);
    console.log("this is props" , props);
  }

  static navigationOptions = {
    title: 'Logout',
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
      <LogOutComponent
        goToLoginScreen = {()=> this.props.navigation.navigate("Login")}
      />
    )
  }
}

