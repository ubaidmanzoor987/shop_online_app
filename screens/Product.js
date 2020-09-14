import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {connect} from 'react-redux';
import ProductForm from '../components/ProductForm';

class Product extends Component {

  constructor(props)
  {
    super(props);
    console.log("this si s s", this.props);
  }

  static navigationOptions = {
    title: 'Add Products',
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
      <ProductForm navigation = {this.props.navigation} navigateToSearchable = {(details) => this.props.navigation.navigate("MySearchableDropDown",{details}) } />
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