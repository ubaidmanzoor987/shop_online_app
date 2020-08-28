import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {connect} from 'react-redux';

export class Product extends Component {

  constructor(props)
  {
    super(props);
    console.log("This is Home Screen Props", props);
  }

  static navigationOptions = {
    title: 'Products',
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
        <Text style = {styles.text}>
          Salam Pakistan Zindabbad 
        </Text>
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
    }
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
export default connect(mapStateToProps, mapDispatchToProps)(Product)