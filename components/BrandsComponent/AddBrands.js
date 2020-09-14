import React, { Component } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,ToastAndroid } from 'react-native';
import {connect} from 'react-redux';
import {Right,Button,Container,Content} from 'native-base';
import {Icon,CheckBox} from 'react-native-elements';
import {Field, reduxForm,} from 'redux-form';
import {processAddBrands} from '../../redux/actions/BrandsActionCreator/AddBrandsActionCreator';
import { Obj,SetChangesDetect,SetChangesDetect1 } from '../Data';
import {Loader} from '../LoadingComponent';

const validate = (values, allValues) => {
    const errors = {}
    if (!values.name) {
      errors.name = 'Required'
    }
     else if (values.name.length > 15) {
      errors.name = 'Must be 15 characters or less'
    }

    return errors;
}

const mapStateToProps = (state) => {
    return {
      addBrandsdetail:state.addBrands
    }
};
  
const mapDispatchToProps = (dispatch)=>{
  return {
    processAddBrands: (details) =>
    {
      dispatch(processAddBrands(details));
    }
  }
} 
  

class AddBrands1 extends Component {

  static navigationOptions = {
    title: 'Add Brands',
    headerStyle: {
      backgroundColor:'rgba(52, 87, 85,1)',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 23,
    },
  } 
  constructor(props)
  {
    super(props);
    this.state = {
        name:'',
        own_brand:false,
        shopkeeper_id:''
    }

    
  }

  componentDidMount(){
    this.setState({
      shopkeeper_id:Obj.shopkeeper_id
    });
  }
  renderInput = (field)=> {
    const {meta:{touched,error}, label, secureTextEntry, maxLength, keyboardType, placeholder ,placeholderTextColor, input :{ onChange, ...restInput } , ...inputProps } = field;
      var hasError= false;
      if(error !== undefined){
        hasError= true;
      }
      return( 
        <View error= {hasError}>
          <TextInput  
            onChangeText = {onChange}
            maxLength = {maxLength}
            placeholder=  {placeholder}
            keyboardType = {keyboardType}
            secureTextEntry = {secureTextEntry}
            label = {label}
            placeholderTextColor = {placeholderTextColor}
            {...restInput}
            style = {styles.inputBox}
            />
          {touched ? hasError ? <Text style={{color:'red',fontSize:13,}}>{error}</Text> : null : null}
        </View>
      )
  }
  
  OnSubmit = (values) => {
    //console.log("These are values", this.state);
    let own_brand1 = this.state.own_brand;
    let val = {
      brand_name : this.state.name,
      shopkeeper_id:this.state.shopkeeper_id,
      own_brand : this.state.own_brand === false ? "false" : "true"
    }
    this.props.processAddBrands(val);
    SetChangesDetect("add");
    SetChangesDetect1("add");
    
  }
  componentDidUpdate(){
    if(this.props.addBrandsdetail.inProcess !== true && this.props.addBrandsdetail.isBrandAdded === true)
    {
      if(Platform.OS==="android"){
        ToastAndroid.show(this.props.addBrandsdetail.msg, ToastAndroid.SHORT);
      }
      this.props.navigation.goBack();
    }
  }
  render() {
    let processingView = <View />;
    if(this.props.addBrandsdetail.inProcess === true)
    {
      processingView = <Loader msg="Adding...."/>
    }
    
    else if(this.props.addBrandsdetail.inProcess !== true && this.props.addBrandsdetail.isBrandAdded === false){
      
      {Platform.OS==="android" ?  ToastAndroid.show(this.props.addBrandsdetail.msg, ToastAndroid.SHORT) : Alert.alert("Message", this.props.addBrandsdetail.msg) };
      processingView = <View />
    }
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return(
          <Container>
            {processingView}
              <Content>
                <View style={styles.ContentView} > 
                    <Text style={styles.ContentViewText}>Brand Name:</Text>
                    <Field name="name" component={this.renderInput} 
                        placeholder="Brand Name"
                        onChange={(name)=>{this.setState({name})}}
                    />
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
                        onPress={() => this.setState({own_brand: !this.state.own_brand})}
                        />
                    </Right>
                </View>
                    <TouchableOpacity style={styles.footerTouchableOpacity} onPress={handleSubmit(this.OnSubmit)} >
                        <Text style={styles.footerText}>Add</Text>
                    </TouchableOpacity>
              </Content>
              
          </Container>
    )
  }
}


const AddBrands = reduxForm({
    form: 'AddBrands1',
    validate
})(AddBrands1);


export default connect(mapStateToProps, mapDispatchToProps)(AddBrands)

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
    inputBox:{
        borderWidth:1,
        borderColor:'grey',
        borderRadius:8,
        width:'85%',
        height:40,
        fontSize:16,
        paddingHorizontal:8,
        marginHorizontal:25,
        marginVertical:10
    },
      
});
