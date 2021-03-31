import React, { Component,useState } from 'react';
import {StyleSheet, Text, View, Image, Platform,TouchableOpacity, Alert
} from 'react-native';
import { connect } from 'react-redux';
import {Icon} from 'react-native-elements';
import {Left,Right,Footer,Button, Header,Content, Container} from 'native-base';
import { MyModal } from './UpdateInfoModal';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { processUpdateUserInfo } from '../redux/actions/UpdateUserInfoActionCreator';
import {IMAGE_PATH,Obj,SetImage} from './Data';
import {baseUrl} from '../shared/ServerConf'; 

const mapStateToProps = (state) => {
  return {
    UpdateDetails: state.update_user_info
  };
}

const mapDispatchToProps = (dispatch)=>{
  return {
    processUpdateUserInfo: (UpdateDetails) =>
    {
      dispatch(processUpdateUserInfo(UpdateDetails));
    }
  }
} 

class AboutPictureEdit extends Component{
  constructor(props){
    super(props);
    this.state={
      modalVisible:false,
      image:'',
      pic_uri:""
    }
  }

  componentDidMount(){
    this.setState({
      image:IMAGE_PATH
    })
  }
  componentDidUpdate(){

  }
  getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
      if (cameraPermission.status !== 'granted' && cameraRollPermission.status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  getImageFromCamera = async () => {
    try{
      let capturedImage = await ImagePicker.launchCameraAsync({
          allowsEditing:false,
          aspect:[4,3],
          quality:1,
          base64:true
      });
    
      if (!capturedImage.cancelled) {
        //console.log("This is Exception in Camera as" , capturedImage);
        this.handleUploadImage(capturedImage.base64);
        this.setState({modalVisible:false });
        this.setState({image: capturedImage.uri});
        SetImage(this.state.image);
      }
    }catch(E){
      console.log("This is Exception in Camera as" , E);
    }
  }

  

  getImageFromGallery = async () =>{
    try{
      const galleryImage = await ImagePicker.launchImageLibraryAsync({
          allowsEditing:true,
          aspect:[4,3],
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality:1,
          base64:true
          
      });
      if(!galleryImage.cancelled){
        this.handleUploadImage(galleryImage.base64);
        this.processImage(galleryImage.uri);
      }
    }catch(E){
      console.log("This is an Exception in gallery",  E);
    }
  }


  
  processImage = async (imageUri) => {
    try{
      let processedImage = await ImageManipulator.manipulateAsync(
          imageUri, 
          [
              {resize: {width: 400}}
          ],
          {format: 'png'}
      );
      this.setState({modalVisible:false });
      this.setState({image: processedImage.uri});
      //console.log("this is image" ,  this.state.image);
      SetImage(this.state.image);
      
     }catch(E){
       console.log("This is an Excepition in ImageManipulator", E);
     }


  }

   handleUploadImage = async (photo) => {

    const data = {'file_attachement':photo, 'shopkeeper_id': Obj.shopkeeper_id}
    console.log(data);
    let res;
    try{
      res = await fetch(
        baseUrl + "shopkeeper/update_user_picture",
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers:{
            'Content-Type': 'application/json',
          }
        }
      );
      let responseJson = await res.json();
      if (responseJson.status == 1) {
        alert('Upload Successful');
      }
    } catch(ex) {
      console.log(ex);
    }
   
}

  render(){
    return(
      <Container style={styles.container}>
      <Header style={styles.header} androidStatusBarColor='rgba(52, 87, 85,1)'>
        <View style={styles.headerView}>
          <Button transparent onPress={()=>this.props.navigation.goBack()} >
            <Icon name='arrow-left' type='font-awesome' color='white' size={20} style={{paddingTop:3}}  />
          </Button>
          <Text style={{paddingLeft:20,color:'white',fontWeight:'bold', fontSize:18,paddingTop:11}}>Edit Picture</Text>
        </View>
        <Right>
          <Button transparent onPress={()=>this.setState({modalVisible:true})} >
           <Icon name='ellipsis-v' 
            type='font-awesome' 
            color='white' 
            size={25} 
           />
          </Button>
          
        </Right>
      </Header>
        <View style={styles.TouchableOpacityImage}>
          <Image 
            source = {this.state.image === '../assets/logo.png' ? require('../assets/logo.png') :  
              {uri:this.state.image !== '' ? this.state.image : 'abc'} } style={styles.drawerImage}
          /> 
        </View>
      <MyModal visible={this.state.modalVisible} onRequestClose={()=> this.setState({modalVisible:false})} onPressOverlay={()=> this.setState({modalVisible:false})}>
          <View style={styles.ModalViewOuter}>
              <Header androidStatusBarColor='rgba(52, 87, 85,1)' style={styles.ModalheaderStyle}>               
                <View style={{justifyContent:'center'}}>
                  <Text style={styles.ModalHeaderText}>Choose From</Text>
                </View>
                <Right>
                  <Button transparent style={{marginRight:-20}} onPress={()=>this.setState({modalVisible:false})}>
                    <Icon name='cancel' size={30} color='white'  />
                  </Button>
                  </Right>
              </Header>
              <View style={{marginVertical:5}}>
                <TouchableOpacity style={styles.MediaTouchableOpacity} onPress={()=>this.getImageFromCamera()} > 
                    <Text style={{fontSize:16,fontWeight:'bold'}}>Take Image From Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.MediaTouchableOpacity} onPress={()=>this.getImageFromGallery()}>
                    <Text style={{fontSize:16,fontWeight:'bold'}}>Take Image From Photos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.MediaTouchableOpacity} onPress={()=>this.setState({modalVisible:false})}>
                    <Text style={{fontSize:16,fontWeight:'bold'}}>Cancel</Text>
                </TouchableOpacity>
              </View>  
          </View>
        </MyModal>
      </Container>
    )
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(AboutPictureEdit);

const styles = StyleSheet.create({
    container:{
      backgroundColor:'rgb(56,56,56)'
    },
    header:{
      backgroundColor:'rgba(52, 87, 85,1)',
      alignItems:'center',
      justifyContent:'center'
    },
    headerView:{
      flexDirection:'row'
    },
    
    TouchableOpacityImage:{
      borderBottomColor:'rgba(52, 87, 85,1)',
      borderBottomWidth:0.5,
      alignItems:'center',
      height:'90%',
      justifyContent:'center',
    },
    drawerImage: {
        width:'95%',
        height:300,
        marginHorizontal:10
    },
    ModalViewOuter:{
      backgroundColor:'white',height:'36%',width:'90%'
    },
    ModalheaderStyle:{
      backgroundColor:'rgba(52, 87, 85,1)',
      width:'100%'
    },
    ModalHeaderText:{
      color:'white',fontWeight:'bold',fontSize:16
    },
    ModalViewInner:{
      flexDirection:'column',marginVertical:20,justifyContent:'center',alignItems:'center'
    },
    
    MediaTouchableOpacity:{
      width:'100%',
      marginTop:10,
      backgroundColor:'white',
      height:40,
      opacity:0.9,
      borderBottomWidth:1,
      alignItems:'center',
      justifyContent:'center'
    },
    

});
