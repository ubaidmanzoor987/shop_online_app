import React, { Component } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,ToastAndroid } from 'react-native';
import {connect} from 'react-redux';
import {Right,Button,Container,Content} from 'native-base';
import {Icon,CheckBox} from 'react-native-elements';
import {Field, reduxForm,} from 'redux-form';
import {processUpdateBrands} from '../../redux/actions/BrandsActionCreator/UpdateBrandsActionCreator';
import {processDeleteBrands} from '../../redux/actions/BrandsActionCreator/DeleteBrandActionCreator';
import { Obj,SetChangesDetect,SetChangesDetect1 } from '../Data';
import {Loader} from '../LoadingComponent';
import {Message} from '../UserSettingForm';

const mapStateToProps = (state) => {
    return {
      update_brand : state.update_brand,
      delete_brand : state.delete_brand
    }
};
  
const mapDispatchToProps = (dispatch)=>{
  return {
    processUpdateBrands: (details) =>
    {
      dispatch(processUpdateBrands(details));
    },
    processDeleteBrands : (details) => {
      dispatch(processDeleteBrands(details));
    }
  }
} 
  

class CustomizeBrand extends Component {

  static navigationOptions = {
    title: 'Edit Brand',
    headerStyle: {
      backgroundColor:'rgba(52, 87, 85,1)',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
    },
  } 
  constructor(props)
  {
    super(props);
    console.log("Theese are customize props" ,  this.props);
    this.state = {
        name:'',
        own_brand:false,
        id:'',
        active_brand_name:false
    }

    
  }

  componentDidUpdate(){
    if(this.props.delete_brand.inProcess !== true && this.props.delete_brand.isDeleted === true)
    {
      if(Platform.OS==="android"){
        ToastAndroid.show(this.props.delete_brand.msg, ToastAndroid.SHORT);
      }
      processingView = <View />
      SetChangesDetect("delete");
      SetChangesDetect1("delete");
      this.props.navigation.goBack();
    }
  }

  componentDidMount(){
    this.setState({
        name : this.props.navigation.state.params.brand_data.name,
        id :  this.props.navigation.state.params.brand_data.id,
        own_brand : this.props.navigation.state.params.brand_data.own_brand === "true" ||
              this.props.navigation.state.params.brand_data.own_brand === '1' ? true : false
    });
  }


  UpdateBrandName = () => {
    console.log("These are values", this.state);
    this.setState({active_brand_name:false})
      const details = {
        shopkeeper_id:Obj.shopkeeper_id,
        id : this.state.id,
        brand_name : this.state.name,
      };
      this.props.processUpdateBrands(details)
  }

  UpdateBrandOwnbrand = () => {
      console.log("These are values", this.state);
      this.setState({own_brand: !this.state.own_brand}); 
      const details = {
        shopkeeper_id:Obj.shopkeeper_id,
        id : this.state.id,
        own_brand : this.state.own_brand === true ? '0' : '1',
      };
      console.log("these are details ", details);
      this.props.processUpdateBrands(details)
  }

  DeleteBrand = () => {
    //console.log("These are values", this.state);
      const details = {
        shopkeeper_id:Obj.shopkeeper_id,
        id : this.state.id,
      };
      this.props.processDeleteBrands(details);
    
  }

  render() {
    let processingView = <View />;
    if(this.props.update_brand.inProcess === true)
    {
      processingView = <Loader msg="Updating...."/>
    }
    else if(this.props.update_brand.inProcess !== true && this.props.update_brand.isUpdated === true)
    {
      if(Platform.OS==="android"){
        ToastAndroid.show(this.props.update_brand.msg, ToastAndroid.SHORT);
      }
      processingView = <View />
      SetChangesDetect("update");

    }
    else if(this.props.update_brand.inProcess !== true && this.props.update_brand.isUpdated === false){
      
      {Platform.OS==="android" ?  ToastAndroid.show(this.props.update_brand.msg, ToastAndroid.SHORT) : Alert.alert("Message", this.props.update_brand.msg) };
      processingView = <View />
    }

    if(this.props.delete_brand.inProcess === true)
    {
      processingView = <Loader msg="Deleting...."/>
    }
    
    else if(this.props.delete_brand.inProcess !== true && this.props.delete_brand.isDeleted === false){
      
      {Platform.OS==="android" ?  ToastAndroid.show(this.props.delete_brand.msg, ToastAndroid.SHORT) : Alert.alert("Message", this.props.delete_brand.msg) };
      processingView = <View />
    }
    
    return(
          <Container>
            {processingView}
              <Content>
                  <View style={{marginLeft:3,marginTop:25}}><Text style={styles.ContentViewText}>Brand Name:</Text></View>
                    <View style={{backgroundColor:'white',width:'100%',alignItems:'center',justifyContent:"center"}} >
                            {this.state.active_brand_name === false ? 
                                <TouchableOpacity style={{width:'95%',borderColor:'grey',borderWidth:1,borderRadius:25,marginTop:20,flexDirection:'row'}} 
                                  onPress={()=>this.setState({active_brand_name:true})}>
                                  <Text style={styles.txtinputBox}>{this.state.name}</Text>
                                  <Right>
                                    <Button transparent onPress = {()=>this.setState({ active_brand_name: true })}
                                        style = {{paddingRight:10,height:24}}
                                    >
                                      <Icon
                                        name='pencil'
                                        color = 'rgba(52, 87, 85,1)'
                                        size = {19}
                                        type = "font-awesome"
                                      />
                                    </Button>
                                     
                                  </Right>
                                </TouchableOpacity> :
                                <View style={{width:'95%',borderColor:'grey',borderWidth:1,borderRadius:25,marginTop:20,flexDirection:'row'}} >
                                    <TextInput placeholder="Brand name" 
                                    value={this.state.name} 
                                    onChangeText={value=> this.setState({name: value})}  
                                    style={styles.inputBox}
                                    maxLength = {15}
                                    autoFocus = {true}
                                    /> 
                                    {this.state.name === '' ? 
                                        <Message message="Required" />
                                        :null
                                    }
                                    
                                    <Right>
                                      <Button transparent style = {{paddingRight:10,height:24}}
                                        disabled = {this.state.name === ''} 
                                        onPress = {()=>{this.UpdateBrandName()}}
                                      >
                                      <Icon
                                        name='check'
                                        color = 'rgba(52, 87, 85,1)'
                                        size = {19}
                                        type = "font-awesome"
                                        style = {{opacity:this.state.name === '' ? 0.3 : 1 }}
                                      />
                                      </Button>
                                    </Right>
                                    
                              </View>
                            }
                      </View>
                    
                <View style={styles.ContentView2}>
                    <Text style={styles.ContentView2Text}>
                        Your Personal Brand
                    </Text>
                    <Right style={{paddingTop:5}}>
                        <CheckBox
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.own_brand}
                        onPress={() => {this.UpdateBrandOwnbrand() } }
                        />
                    </Right>
                </View>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:'center'}}>
                    <TouchableOpacity style={styles.footerTouchableOpacityDelete} onPress={()=>this.DeleteBrand()} >
                        <Text style={styles.footerText}>Delete Brand</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerTouchableOpacityUpdate} onPress={()=>this.props.navigation.goBack()} >
                        <Text style={styles.footerText}>Go Backs</Text>
                    </TouchableOpacity>
                    </View>
              </Content>
              
          </Container>
        
    )
  }
}


// const AddBrands = reduxForm({
//     form: 'AddBrands1',
//     validate
// })(AddBrands1);


export default connect(mapStateToProps, mapDispatchToProps)(CustomizeBrand)

const styles = StyleSheet.create({
    ContentView:{
      flexDirection:'column',marginHorizontal:5,width:'100%',marginVertical:10
    },
    ContentViewText:{
      fontSize:16,fontWeight:'bold',paddingHorizontal:5
    },
    ContentView2:{
      flexDirection:'row',marginHorizontal:5
    },
    ContentView2Text:{
      fontWeight:"bold",paddingTop:20,fontSize:16,paddingHorizontal:2
    },
    footerText:{
        fontSize:16,fontWeight:'bold',color:'white'
    },
    footerTouchableOpacityUpdate:{
        width:'40%',
        backgroundColor:'rgba(52, 87, 85,1)',
        height:45,
        opacity:0.9,
        borderWidth:0.5,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        marginTop:30,
        marginHorizontal:5
    },
    footerTouchableOpacityDelete:{
      width:'40%',
      backgroundColor:'red',
      height:45,
      opacity:0.9,
      borderWidth:0.5,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:20,
      marginTop:30,
      marginHorizontal:5

    },
    inputBox:{
        width:270,
        height:40,
        fontSize:17,
        paddingHorizontal:10,
        marginVertical:5
    },
    txtinputBox: {
      fontSize:17,width:270,marginVertical:5,paddingHorizontal:10
    },  

});
