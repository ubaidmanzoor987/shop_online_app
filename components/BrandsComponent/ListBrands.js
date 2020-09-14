import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View,Text,TouchableOpacity,ToastAndroid, Platform,FlatList,ScrollView,SafeAreaView, StyleSheet} from 'react-native';
import {Card,Tile,Icon,CheckBox} from 'react-native-elements';
import {Button,Right} from 'native-base';
import {fetchBrands} from '../../redux/actions/BrandsActionCreator/FetchBrandsActionCreator';
import {Obj,changesdetect,SetChangesDetect} from '../Data';

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBrands: (details) => dispatch(fetchBrands(details)),
  }
}
const mapStateToProps = (state) => {
    return {
      brands : state.Brands 
    }
}
  
class ListBrands extends Component { 
  
    constructor(props){
      global.processingView = <View/>;
      super(props);
    }

    componentDidMount(){
     
      const { navigation } = this.props;
      this.focusListener = navigation.addListener('didFocus', () => {
        if (changesdetect === "initialize" || changesdetect === "add" || changesdetect === "update" || changesdetect === "delete"){
          this.props.fetchBrands({shopkeeper_id:Obj.shopkeeper_id});
            SetChangesDetect("fail");
        }
        });
    }
    
    componentWillUnmount(){
      this.focusListener.remove();
    }


    render(){
      const renderMenuItem = ({item, index}) => {
        return (
            <TouchableOpacity key={index} style={styles.TouchableOpacityStyle} onPress={()=>this.props.navigation.navigate("CustomizeBrand",{brand_data:item})} >
              <View style={styles.TouchableOpacityView}>
                <Text style={styles.TouchableOpacityText} >
                  {item.name}
                </Text>
                <View style={{flexDirection:'row',marginTop:5}}>
                  <Text style={{paddingHorizontal:5}}>
                    Personal Brand
                  </Text>
                  {item.own_brand === "true" || item.own_brand === '1' ?
                    <Icon
                      name='check'
                      color = 'rgba(52, 87, 85,1)'
                      size = {19}
                      type = "font-awesome"
                     
                    /> : 
                    <Icon
                      name='close'
                      color = 'rgba(52, 87, 85,1)'
                      size = {19}
                      type = "font-awesome"
                      color = 'red'
                    />
                    }
                </View>
              </View>
              <Right>
                <Icon name="chevron-right" type="font-awesome" />
              </Right>
            </TouchableOpacity>
        );
      };

      if(this.props.brands.inProcess === true)
      {
        processingView = <View />
      }
      else if (this.props.brands.brands != null){
        processingView = <View />
      }
      else if(this.props.brands.inProcess !== true){
        
        {Platform.OS==="android" ?  ToastAndroid.show(this.props.brands.msg, ToastAndroid.SHORT) : Alert.alert("Message", this.props.brands.msg) };
      }
      return (
        <SafeAreaView style={{flex: 1}}>
          {processingView}
          {!this.props.brands.brands.msg ? 
          <FlatList
            data={this.props.brands.brands}
            renderItem={renderMenuItem} 
            keyExtractor={item => item.id.toString()}
          /> : <Text>No Brands To Display</Text> }
        </SafeAreaView>
        
      )
    }
    
};

const styles = StyleSheet.create({
  TouchableOpacityStyle:{
    width:'98%',height:60,backgroundColor:'white',flexDirection:'row',marginVertical:5,
  },
  TouchableOpacityView:{
    flexDirection:'column'
  },
  TouchableOpacityText:{
    paddingHorizontal:5,paddingTop:10,fontSize:17
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(ListBrands);