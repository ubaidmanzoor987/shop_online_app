import React, { Component,useState } from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity,TouchableHighlight,Modal,
  Alert, Image,ToastAndroid, Platform
} from 'react-native';
import { connect } from 'react-redux';
import {Icon,Input} from 'react-native-elements';
import {Left,Right,Footer,Button, Header,Content, Container,Textarea} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { ScrollView } from 'react-native-gesture-handler';
import { processUpdateUserInfo } from '../redux/actions/UpdateUserInfoActionCreator';
import {SetValues,Obj} from './Data';

const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9]+\.[A-Z]{2,4}$/i.test(val);

export function Message(props){
    return(
        <Text style={{color:'red',fontSize:12}}>{props.message}</Text>
    )
};

const mapStateToProps = (state) => {
  return {
    UpdateDetails: state.update_user_info
  };
}

const mapDispatchToProps = (dispatch)=>{
  return {
    processUpdateUserInfo: (UpdateDetails) =>
    {
      console.log("dispatch process login");
      dispatch(processUpdateUserInfo(UpdateDetails));
    }
  }
} 


class UserSettingForm extends Component {
    constructor(props){
    super(props);
    this.state = {
      user_name:'',
      active_user_name:false,
      shop_name:'',
      active_shop_name:false,
      image:null,
      owner_name:'',
      active_owner_name:false,
      owner_phone_no:'',
      active_owner_phone_no:false,
      address:'',
      active_address:false,
      email:'',
      active_email:false,
      shop_phone_no1:'',
      active_shop_phone_no1:false,
      shop_phone_no2:'',
      active_shop_phone_no2:false,
      shopkeeper_id:0,
      viewmore:false
    }
  } 

  
  componentDidMount(){
    this.setState({
        user_name: Obj.user_name,
        shop_name:Obj.shop_name,
        owner_name:Obj.owner_name,
        image:Obj.image,
        owner_phone_no:Obj.owner_phone_no,
        address:Obj.address,
        shopkeeper_id:Obj.shopkeeper_id,
        email:Obj.email,
        shop_phone_no1:Obj.shop_phone_no1,
        shop_phone_no2:Obj.shop_phone_no2

    });
  }
    
  validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    }
    else {
      return true;
    }
  }

  

  componentDidUpdate(){
    if(this.props.UpdateDetails.inProcess !== true && this.props.UpdateDetails.isUpdated === true)
    {
      if(Platform.OS==="android"){
        ToastAndroid.show(this.props.UpdateDetails.msg, ToastAndroid.SHORT);
      }
      else{
        Alert.alert("Message",this.props.UpdateDetails.msg);
      }
      const value = {
        user_name : this.state.user_name,
        shop_name : this.state.shop_name,
        address   : this.state.address,
        owner_phone_no : this.state.owner_phone_no,
        owner_name : this.state.owner_name,
        image : this.state.image,
        shopkeeper_id: this.state.shopkeeper_id,
        email:this.state.email,
        shop_phone_no1:this.state.shop_phone_no1,
        shop_phone_no2:this.state.shop_phone_no2
      }
      SetValues(value); 
    }
    
  }

  static navigationOptions = {
    title: 'Personal Info',
    headerStyle: {
      backgroundColor:'rgba(52, 87, 85,1)',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }

  render() {
    let processingView = <View/>;
    if(this.props.UpdateDetails.inProcess !== true && this.props.UpdateDetails.isUpdated === false){
      {Platform.OS==="android" ? ToastAndroid.show(this.props.UpdateDetails.msg, ToastAndroid.SHORT) : Alert.alert("Message",this.props.UpdateDetails.msg) }
    }

    return(
        <KeyboardAwareScrollView style={styles.container}>
            <ScrollView contentContainerStyle={{alignItems:'center'}}>
                <View style={styles.touchableopacitystyle} >
                    <View style={{flexDirection:'row'}}>
                        <Icon
                            name='user'
                            color = 'rgba(52, 87, 85,1)'
                            size = {19}
                            type = "font-awesome" 
                        />
                        <Text style={styles.textStyle}>User Name</Text>
                    </View>
                    <View style={styles.ViewBox}>
                        <Left style={{opacity:0.5}} >
                            <Text style={{fontSize:16}}>{this.state.user_name}</Text>                             
                        </Left>
                          <Icon
                              name='check'
                              color = 'rgba(52, 87, 85,1)'
                              size = {19}
                              type = "font-awesome"
                              style = {{opacity:  0.5,paddingTop:1}}
                          />
                            
                    </View>
                 </View>
                <View style={styles.touchableopacitystyle} >
                    <View style={{flexDirection:'row'}}>
                        <Icon
                            name='torso-business'
                            color = 'rgba(52, 87, 85,1)'
                            size = {24} 
                            type = 'foundation'
                        />
                        <Text style={styles.textStyle}>Owner Name</Text>
                    </View>
                    <View style={styles.ViewBox}>
                        <TouchableOpacity onPress={()=>this.setState({active_owner_name:true})} >
                            {this.state.active_owner_name === false ? <Text style={styles.txtinputBox}>{this.state.owner_name}</Text> :
                                <View>
                                    <TextInput placeholder="Owner name" 
                                    value={this.state.owner_name} 
                                    onChangeText={value=> this.setState({owner_name: value})}  
                                    style={styles.inputBox}
                                    maxLength = {15}
                                    /> 
                                    {this.state.owner_name === '' ? 
                                        <Message message="Required" />
                                        :null
                                    }
                                    {this.state.owner_name !==''  && this.state.owner_name.startsWith(' ') ? 
                                         <Message message="Invalid Owner Name" />
                                        :null
                                    }
                                    {this.state.owner_name !=='' && this.state.owner_name.length < 3 ? 
                                         <Message message="At Least 3 Characters" />
                                        :null
                                    }
                                </View>
                            }
                            
                        </TouchableOpacity>
                        <Right>
                            {this.state.active_owner_name === false ?
                            <Icon
                                name='pencil'
                                color = 'rgba(52, 87, 85,1)'
                                size = {19}
                                type = "font-awesome"
                                onPress = {()=>this.setState({ active_owner_name: true })}
                            /> : 
                            <Button transparent style={{marginTop:-10}}
                              disabled = {this.state.owner_name === '' || this.state.owner_name.length<3 || this.state.owner_name.startsWith(' ')} 
                              onPress = {()=>{this.setState({active_owner_name:false});this.props.processUpdateUserInfo({
                                shopkeeper_id:this.state.shopkeeper_id,
                                owner_name:this.state.owner_name
                              })}}
                            >
                            <Icon
                                name='check'
                                color = 'rgba(52, 87, 85,1)'
                                size = {19}
                                type = "font-awesome"
                                style = {{opacity:this.state.owner_name === '' || this.state.owner_name.length<3 || this.state.owner_name.startsWith(' ') ? 0.3 : 1 }}
                            />
                            </Button>
                            }
                        </Right>
                    </View>
                 </View>
                <View style={styles.touchableopacitystyle} >
                    <View style={{flexDirection:'row'}}>
                        <Icon
                            name='building'
                            color = 'rgba(52, 87, 85,1)'
                            size = {19}
                            type = 'font-awesome'
                            style = {{paddingTop:5}}
                        />
                        <Text style={styles.textStyle}>Shop Name</Text>
                    </View>
                    <View style={styles.ViewBox}>
                        <TouchableOpacity underlayColor={null} onPress={()=>this.setState({active_shop_name:true})}>
                            {this.state.active_shop_name === false ? <Text style={styles.txtinputBox}>{this.state.shop_name}</Text> :
                                <View>
                                    <TextInput placeholder="Shop name" 
                                    value={this.state.shop_name} 
                                    onChangeText={value=> this.setState({shop_name: value})}  
                                    style={styles.inputBox}
                                    maxLength = {20}
                                    /> 
                                    {this.state.shop_name === '' ? 
                                         <Message message="Required" />
                                        :null
                                    }
                                    {this.state.shop_name !==''  && this.state.shop_name.startsWith(' ') ? 
                                         <Message message="Invalid Shop Name" />
                                        :null
                                    }
                                    {this.state.shop_name !=='' && this.state.shop_name.length < 3 ? 
                                         <Message message="At Least 3 Characters" />
                                        :null
                                    }
                                
                                </View>
                            }
                            
                        </TouchableOpacity>
                        <Right>
                            {this.state.active_shop_name === false ?
                            <Icon
                                name='pencil'
                                color = 'rgba(52, 87, 85,1)'
                                size = {19}
                                type = "font-awesome"
                                onPress = {()=>this.setState({ active_shop_name: true })}
                            /> : 
                            <Button transparent style={{marginTop:-10}}
                              disabled = {this.state.shop_name === '' || this.state.shop_name.length<3 || this.state.shop_name.startsWith(' ')} 
                              onPress = {()=>{
                                this.setState({active_shop_name:false});this.props.processUpdateUserInfo({
                                  shopkeeper_id:this.state.shopkeeper_id,
                                  shop_name:this.state.shop_name
                                })
                              }} 
                            >
                            <Icon
                                name='check'
                                color = 'rgba(52, 87, 85,1)'
                                size = {19}
                                type = "font-awesome"
                                
                                style = {{opacity:this.state.shop_name === '' || this.state.shop_name.length<3 || this.state.shop_name.startsWith(' ') ? 0.3 : 1 }}
                            />
                            </Button>
                            }

                        </Right>
                    </View>
                 </View>
                <View style={styles.touchableopacitystyle} >
                    <View style={{flexDirection:'row'}}>
                        <Icon
                            name='phone'
                            color = 'rgba(52, 87, 85,1)'
                            size = {19}
                            type = 'font-awesome'
                            style = {{paddingTop:5}}
                        />
                        <Text style={styles.textStyle}>Cell No</Text>
                    </View>
                    <View style={styles.ViewBox}>
                      <TouchableOpacity underlayColor={null} onPress={()=>this.setState({active_owner_phone_no:true})}>
                              {this.state.active_owner_phone_no === false ? <Text style={styles.txtinputBox}>{this.state.owner_phone_no}</Text> :
                                  <View>
                                      <TextInput placeholder="Phone Number" 
                                      value={this.state.owner_phone_no} 
                                      onChangeText={value=> this.setState({owner_phone_no: value})}  
                                      style={styles.inputBox}
                                      maxLength = {11}
                                      keyboardType = "number-pad"
                                      /> 
                                      {this.state.owner_phone_no === '' ? 
                                          <Message message="Required" />
                                          :null
                                      }
                                      {this.state.owner_phone_no !=='' && this.state.owner_phone_no.length < 11 ? 
                                          <Message message="Invalid Phone Number" />
                                          :null
                                      }
                                  
                                  </View>
                              }
                              
                      </TouchableOpacity>
                      <Right>
                            {this.state.active_owner_phone_no === false ?
                            <Icon
                                name='pencil'
                                color = 'rgba(52, 87, 85,1)'
                                size = {19}
                                type = "font-awesome"
                                onPress = {()=>this.setState({ active_owner_phone_no: true })}
                            /> : 
                            <Button 
                              transparent 
                              style={{marginTop:-10}}
                              disabled = {this.state.owner_phone_no === '' || this.state.owner_phone_no.length<11 } 
                              onPress = {()=>{
                                this.setState({active_owner_phone_no:false}); 
                                this.props.processUpdateUserInfo({
                                  shopkeeper_id:this.state.shopkeeper_id,
                                  owner_phone_no:this.state.owner_phone_no
                                })
                              }}
                                
                            >
                            <Icon
                                name='check'
                                color = 'rgba(52, 87, 85,1)'
                                size = {19}
                                type = "font-awesome"
                                style = {{opacity:this.state.owner_phone_no === '' || this.state.owner_phone_no.length<11 ? 0.3 : 1 }}
                            />
                            </Button>
                            }
                      </Right>
                    </View>
                 </View>
                {
                this.state.viewmore === false ? 
                  <Button style={styles.ButtonMoreAndUpdate} onPress={()=>this.setState({viewmore:true})}>
                    <Text style={{color:'white'}} >More</Text>
                  </Button>
                : 
                <>
                  <View style={styles.touchableopacitystyle} >
                    <View style={{flexDirection:'row'}}>
                        <Icon
                            name='envelope'
                            color = 'rgba(52, 87, 85,1)'
                            size = {19}
                            type = "font-awesome" 
                            style = {{paddingTop:3}}
                        />
                        <Text style={styles.textStyle}>Email</Text>
                    </View>
                    <View style={styles.ViewBox}>
                        <TouchableOpacity underlayColor={null} onPress={()=>this.setState({active_email:true})}>
                            {this.state.active_email === false ? 
                                <Text style={styles.txtinputBox}>{this.state.email}</Text> 
                                :
                                <View>
                                    <TextInput placeholder="Email" 
                                    value={this.state.email} 
                                    onChangeText={value=> this.setState({ email: value})}  
                                    style={styles.inputBox}
                                    />
                                    {this.state.email !==''  && this.state.email.startsWith(' ')  ? 
                                         <Message message="Invalid Remove Space from start" />
                                        :null
                                    }
                                    {this.state.email !=='' && this.validate(this.state.email) === false ? 
                                         <Message message="Invalid Email Address" />
                                        :null
                                    }
                                
                                </View>
                            }
                        </TouchableOpacity>
                        <Right>
                            {this.state.active_email === false ?
                              <Icon
                              name='pencil'
                              color = 'rgba(52, 87, 85,1)'
                              size = {19}
                              type = "font-awesome"
                              onPress = {()=>this.setState({ active_email: true })}
                              />
                             : 
                             <Button transparent style={{marginTop:-10}}
                                disabled = {this.validate(this.state.email) === false ||  this.state.email.startsWith(' ') } 
                                onPress = {()=>{this.setState({active_email:false});this.props.processUpdateUserInfo({
                                  shopkeeper_id:this.state.shopkeeper_id,
                                  email:this.state.email
                                })}}
                             >
                              <Icon
                                  name='check'
                                  color = 'rgba(52, 87, 85,1)'
                                  size = {19}
                                  type = "font-awesome"
                                  style = {{opacity: this.validate(this.state.email) === false ||  this.state.address.startsWith(' ') ? 0.3 : 1}}
                              />
                              </Button>
                            }
                        </Right>
                    </View>
                 </View>
                  <View style={styles.touchableopacitystyle} >
                    <View style={{flexDirection:'row'}}>
                        <Icon
                            name='phone'
                            color = 'rgba(52, 87, 85,1)'
                            size = {19}
                            type = "font-awesome" 
                            style = {{paddingTop:5}}
                        />
                        <Text style={styles.textStyle}>Shop Phone No 1</Text>
                    </View>
                    <View style={styles.ViewBox}>
                        <TouchableOpacity onPress={()=>this.setState({active_shop_phone_no1:true})} underlayColor={null}>
                            {this.state.active_shop_phone_no1 === false ? 
                                <Text style={styles.txtinputBox}>{this.state.shop_phone_no1}</Text> 
                                :
                                <View>
                                    <TextInput placeholder="Shop Phone No 1" 
                                    value={this.state.shop_phone_no1} 
                                    onChangeText={value=> this.setState({ shop_phone_no1: value})}  
                                    style={styles.inputBox}
                                    keyboardType = "number-pad"
                                    />
                                    
                                    {this.state.shop_phone_no1 !=='' && this.state.shop_phone_no1.length<11  ? 
                                         <Message message="Invalid Phone Number" />
                                        :null
                                    }
                                
                                </View>
                            }
                            
                        </TouchableOpacity>
                        <Right>
                            {this.state.active_shop_phone_no1 === false ?
                              <Icon
                              name='pencil'
                              color = 'rgba(52, 87, 85,1)'
                              size = {19}
                              type = "font-awesome"
                              onPress = {()=>this.setState({ active_shop_phone_no1: true })}
                              />
                             : 
                             <Button transparent style={{marginTop:-10}}
                                disabled = {this.state.shop_phone_no1.length<11 } 
                                onPress = {()=>{this.setState({active_shop_phone_no1:false});this.props.processUpdateUserInfo({
                                  shopkeeper_id:this.state.shopkeeper_id,
                                  shop_phone_no1:this.state.shop_phone_no1
                                })}}
                             >
                              <Icon
                                  name='check'
                                  color = 'rgba(52, 87, 85,1)'
                                  size = {19}
                                  type = "font-awesome"
                                  style = {{opacity: this.state.shop_phone_no1.length<11 ? 0.3 : 1}}
                              />
                              </Button>
                            }
                        </Right>
                    </View>
                 </View> 
                  <View style={styles.touchableopacitystyle} >
                    <View style={{flexDirection:'row'}}>
                        <Icon
                            name='phone'
                            color = 'rgba(52, 87, 85,1)'
                            size = {19}
                            type = "font-awesome" 
                            style = {{paddingTop:5}}
                        />
                        <Text style={styles.textStyle}>Shop Phone No 2</Text>
                    </View>
                    <View style={styles.ViewBox}>
                        <TouchableOpacity onPress={()=>this.setState({active_shop_phone_no2:true})} underlayColor={null}>
                            {this.state.active_shop_phone_no2 === false ? 
                                <Text style={styles.txtinputBox}>{this.state.shop_phone_no2}</Text> 
                                :
                                <View>
                                    <TextInput placeholder="Shop Phone No 2" 
                                    value={this.state.shop_phone_no2} 
                                    onChangeText={value=> this.setState({ shop_phone_no2: value})}  
                                    style={styles.inputBox}
                                    keyboardType = "number-pad"
                                    />
                                    
                                    {this.state.shop_phone_no2 !=='' && this.state.shop_phone_no2.length<11  ? 
                                         <Message message="Invalid Phone Number" />
                                        :null
                                    }
                                
                                </View>
                            }
                            
                        </TouchableOpacity>
                        <Right>
                            {this.state.active_shop_phone_no2 === false ?
                              <Icon
                              name='pencil'
                              color = 'rgba(52, 87, 85,1)'
                              size = {19}
                              type = "font-awesome"
                              onPress = {()=>this.setState({ active_shop_phone_no2: true })}
                              />
                             : 
                             <Button transparent style={{marginTop:-10}}
                                disabled = {this.state.shop_phone_no1.length<11 } 
                                onPress = {()=>{this.setState({active_shop_phone_no2:false});this.props.processUpdateUserInfo({
                                  shopkeeper_id:this.state.shopkeeper_id,
                                  shop_phone_no2:this.state.shop_phone_no2
                                })}}
                             >
                              <Icon
                                  name='check'
                                  color = 'rgba(52, 87, 85,1)'
                                  size = {19}
                                  type = "font-awesome"
                                  style = {{opacity: this.state.shop_phone_no2.length<11 ? 0.3 : 1}}
                              />
                              </Button>
                            }
                        </Right>
                    </View>
                 </View> 
                  <View style={styles.touchableopacitystyle1} >
                    <View style={{flexDirection:'row'}}>
                        <Icon
                            name='home'
                            color = 'rgba(52, 87, 85,1)'
                            size = {19}
                            type = "font-awesome"
                            style = {{paddingTop:3}} 
                        />
                        <Text style={styles.textStyle}>Address</Text>
                    </View>
                    <View style={styles.ViewBox1}>
                        <Left>
                            {this.state.active_address === false ? 
                              <TouchableOpacity style={styles.txtinputBox} onPress={()=>this.setState({active_address:true})}>
                                  <TextInput editable = {false} 
                                  value={this.state.address}   
                                  style={styles.inputBox1}
                                  numberOfLines = {6}
                                  multiline = {true}
                                
                              />
                              </TouchableOpacity>
                              :
                              <View>
                                <TextInput placeholder="Address" 
                                value={this.state.address} 
                                onChangeText={value=> this.setState({ address: value})}  
                                style={styles.inputBox2}
                                maxLength = {50}
                                />
                                {this.state.address === '' ? 
                                      <Message message="Required" />
                                    :null
                                }
                                {this.state.address !==''  && this.state.address.startsWith(' ')  ? 
                                      <Message message="Invalid Remove Space from start" />
                                    :null
                                }
                                {this.state.address !=='' && this.state.address.length < 5 ? 
                                      <Message message="At Least 5 Characters" />
                                    :null
                                }
                                
                              </View>
                            }
                            
                        </Left>
                            {this.state.active_address === false ?
                              <Icon
                              name='pencil'
                              color = 'rgba(52, 87, 85,1)'
                              size = {19}
                              type = "font-awesome"
                              onPress = {()=>this.setState({ active_address: true })}
                              />
                             : 
                             <Button transparent style={{marginTop:-10}}
                                disabled = {this.state.address ==='' || this.state.address.length<5 || this.state.address.startsWith(' ') } 
                                onPress = {()=>{this.setState({active_address:false});this.props.processUpdateUserInfo({
                                  shopkeeper_id:this.state.shopkeeper_id,
                                  address:this.state.address
                                })}}
                             >
                              <Icon
                                  name='check'
                                  color = 'rgba(52, 87, 85,1)'
                                  size = {19}
                                  type = "font-awesome"
                                  style = {{opacity: this.state.address ==='' ||  this.state.address.length<5 || this.state.address.startsWith(' ')   ? 0.3 : 1}}
                              />
                              </Button>
                            }
                    </View>
                  </View>
                  <Button style={styles.ButtonMoreAndUpdate} onPress={()=>this.setState({viewmore:false})}>
                    <Text style={{color:'white'}} >Less</Text>
                  </Button>
                </>
                }
                      
            </ScrollView>
        </KeyboardAwareScrollView>
    )
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(UserSettingForm);


const styles = StyleSheet.create({
    
    ViewBox: {
      width:270,
      marginVertical:5,
      marginLeft:40,
      height:30,
      flexDirection:"row"
    },
    ViewBox1: {
      marginVertical:5,
      marginLeft:40,
      flexDirection:"row",
      width:270,
    },
    inputBox: {
        fontSize:17,borderBottomWidth:1,borderBottomColor:'grey',width:230,marginVertical:5
    },
    txtinputBox: {
      fontSize:17,width:230,marginVertical:5
    },
    inputBox1: {
      fontSize:17,textAlignVertical: "top"
    },
    inputBox2: {
      fontSize:17,borderBottomWidth:1,borderBottomColor:'grey',width:230,
    },
    TouchableOpacityImage:{
      alignItems:'center',borderBottomColor:'rgba(52, 87, 85,1)',borderBottomWidth:0.5
    },
    drawerImage: {
        width: 150,
        marginVertical:10,
        height:150,
        borderRadius:75,
        borderColor:'grey',
        borderWidth:0.7,
    },
    touchableopacitystyle :{
        marginVertical:8,
        width:340,
        borderBottomColor:'grey',
        borderBottomWidth:1
    },
    touchableopacitystyle1 :{
      marginVertical:8,
      width:340,
      borderBottomColor:'grey',
      borderBottomWidth:1,
      height:100
  },
    textStyle:{
        fontSize:18,paddingLeft:22
    },
    ModalViewOuter:{
      backgroundColor:'white',height:'35%',width:'90%'
    },
    ModalheaderStyle:{
      backgroundColor:'rgba(52, 87, 85,1)',
      width:'100%'
    },
    ModalHeaderText:{
      color:'white',fontWeight:'bold',fontSize:16
    },
    ModalViewInner:{
      flexDirection:'row',marginVertical:20,justifyContent:'center'
    },
    ButtonCamera:{
      flexDirection:'column'
    },
    ButtonGallery:{
      paddingLeft:30,flexDirection:'column'
    },
    ButtonMoreAndUpdate:{
      backgroundColor:'rgba(52, 87, 85,1)',
      width:100,borderRadius:10,justifyContent:'center',alignItems:'center',
      height:40
    },
    TextStyleOr:{
      alignSelf:'center',marginHorizontal:5
    },
    
    
});
