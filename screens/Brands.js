import React, { Component } from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import ListBrands from '../components/BrandsComponent/ListBrands';
import AddBrands from '../components/BrandsComponent/AddBrands';
import {Right,Button} from 'native-base';
import {Icon} from 'react-native-elements';


class Brands extends Component {

  constructor(props)
  {
    super(props);
  }

  static navigationOptions = {
    title: 'Brands',
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
        <>
          <TouchableOpacity style={styles.addtouchableopacity} onPress={()=>this.props.navigation.navigate("AddBrands")}>
            <View style={styles.addtouchableopacityView}>
                <Text style={styles.addtouchableopacityText}>Add New Brands</Text> 
            </View>
            <Right>
                <Button transparent style={styles.addtouchableopacityRightButton} >
                    <Icon 
                    name = 'plus'
                    size = {24}
                    color = 'black'
                    type = 'font-awesome'
                    />
                </Button>
            </Right>
          </TouchableOpacity>
          <ListBrands navigation = {this.props.navigation} /> 
        </>
    )
  }
}


export default Brands;
const styles = StyleSheet.create({
  addtouchableopacity:{
      width:'98%',
      marginVertical:10,
      marginHorizontal:5,
      flexDirection:'row',
      height:40,
      borderWidth:0.5,
      borderColor:"grey",
      borderRadius:15,
      backgroundColor:"white"
  },
  addtouchableopacityView:{
      justifyContent:"center"
  },
  addtouchableopacityText:{
      fontSize:15,fontWeight:'bold',paddingHorizontal:5
  },
  addtouchableopacityRightButton:{
      marginRight:10
  },
      
});
