import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,Alert,
  TextInput
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Right} from 'native-base';
import { connect } from 'react-redux';
import {Loader} from './LoadingComponent';
import {fetchBrands} from '../redux/actions/BrandsActionCreator/FetchBrandsActionCreator';
import {Obj,changesdetect1,SetChangesDetect1,selected_brand} from './Data';
import { Message } from './UserSettingForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScrollView } from 'react-native-gesture-handler';

const mapStateToProps = (state) => {
  return {
    brands : state.Brands 
  }
}
  
const mapDispatchToProps = (dispatch) => {
  return {
    fetchBrands: (details) => dispatch(fetchBrands(details)),
  }
}

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_name: '',
      price:0,
      brand:''
    }
    //console.log("this si soprop", this.props.brands.brands)
    global.result = null;
  }
  
  componentDidMount(){
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      if (changesdetect1 === "initialize" || changesdetect1 === "add" || changesdetect1 === "update" || changesdetect1 === "delete"){
        this.props.fetchBrands({shopkeeper_id:Obj.shopkeeper_id});
          SetChangesDetect1("fail");
       }
      this.setState({brand:selected_brand !== '' ? selected_brand : 'None'});
      });
  }
  
  componentWillUnmount(){
    this.focusListener.remove();
  }


  render() {
    let processingView = <View/>;

    return (
      <KeyboardAwareScrollView style={{flex:1}}>
        <ScrollView>
            <View style={styles.mainView}>
                <View style={styles.txtView}>
                    <Text style={styles.txtViewText}>Product Name: </Text>
                </View>
                <View style={styles.TextInputView}>
                 <TextInput  
                    onChangeText = {(value)=>{this.setState({product_name:value})}}
                    maxLength = {30}
                    placeholder= "Product Name"
                    style = {styles.inputBox}
                  />
                  {this.state.product_name !== '' && this.state.product_name.length >20 ? <Message message='Must of of 20 characters or less' /> : null } 
                  {this.state.product_name !== '' && this.state.product_name.length <3 ? <Message message='Must of of 3 characters or more' /> : null } 
                </View>
                <View style={styles.txtView}>
                    <Text style={styles.txtViewText}>Price: </Text>
                </View>
                <View style={styles.TextInputView}>
                  <TextInput  
                      onChangeText = {(value)=>{this.setState({price:value})}}
                      placeholder= "Price"
                      style = {styles.inputBox}
                      keyboardType = "numeric"
                    />
                </View>
                <View style={styles.txtView}>
                    <Text style={styles.txtViewText}>Choose Brand: </Text>
                </View>
                <TouchableOpacity style={{width:'95%',flexDirection:'row',borderColor:'grey',borderWidth:1,backgroundColor:'white',alignSelf:'center',borderRadius:10,marginTop:10}}
                  onPress={()=>{this.props.brands.brands.msg ? Alert.alert("No Brands","Please Add Some Brands") : this.props.navigation.navigate("MySearchableDropDown",{result:this.props.brands.brands} )}} >
                 <View style={styles.TextInputView}>
                  <TextInput  
                    value = {this.state.brand}
                    style={{marginTop:-3,fontSize:15,paddingHorizontal:10,height:30}}
                    editable = {false}
                    />
                </View>
                  <Right>
                    <Icon name="chevron-right" type="font-awesome" size={20} style={{marginRight:5}} />
                  </Right>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.footerTouchableOpacity} onPress={()=>console.log("this is state in product" , this.state)} >
                <Text style={styles.footerText}>Add</Text>
            </TouchableOpacity>
       
            </ScrollView>  
      </KeyboardAwareScrollView>

    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductForm);

const styles = StyleSheet.create({
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
  inputBox:{
    borderWidth:1,
    borderColor:'grey',
    borderRadius:25,
    width:'85%',
    height:40,
    fontSize:16,
    paddingHorizontal:8,
    marginLeft:40,
    marginTop:5,
    backgroundColor:'white'
  },
  ScrollViewStyle:{
    justifyContent:'center',
    alignItems:'center'
  },
  mainView:{
        marginVertical:20,
        width:'100%'
    },
  txtView:{
      width:'95%'
  },
  txtViewText:{
    marginHorizontal:10,
    fontSize:16,
    marginTop:2,
    fontWeight:'bold'
  },
  TextInputView:{
      width:'95%'
      ,marginTop:5
  },
  footerText:{
    fontSize:16,fontWeight:'bold',color:'white'
  },
  footerTouchableOpacity:{
    width:'80%',
    backgroundColor:'rgba(52, 87, 85,1)',
    height:45,
    opacity:0.9,
    borderWidth:0.5,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20,
    marginTop:30,
    alignSelf:'center'
},
});