import React, { Component } from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import {Input, CheckBox, Button, Icon } from 'react-native-elements';
import {connect} from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import {Asset} from 'expo-asset';
import { Loader } from '../components/LoadingComponent';

export class Home extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      imageUrl:null
    }
  }


  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor:'rgba(52, 87, 85,1)',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 23,

    },
    
  } 
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Text>Salam</Text>
        </View>
      </View>
    )
  }
}



const styles = StyleSheet.create({
    container: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text:{
      padding: 2,
    },
    btn:{
      margin:20,
      flexDirection:"row"
    },
    imageContainer: {
      flex: 1,
      flexDirection: 'row',
      margin: 20
   },
   image: {
    margin: 10,
    width: 80,
    height: 60
  },
  
});

const mapStateToProps = (state) => {
  return {
  }
};

/**
* Provide store actions to the component.
*/
const mapDispatchToProps = (dispatch) => ({
});

/**
* Connect the component to the store and export it.
*/
export default connect(mapStateToProps, mapDispatchToProps)(Home)