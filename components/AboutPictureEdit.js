import React, { Component,useState } from 'react';
import {StyleSheet, Text, View, Image, Platform
} from 'react-native';
import { connect } from 'react-redux';
import {Icon} from 'react-native-elements';
import {Left,Right,Footer,Button, Header,Content, Container} from 'native-base';
import { MyModal } from './UpdateInfoModal';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { processUpdateUserInfo } from '../redux/actions/UpdateUserInfoActionCreator';
import {IMAGE_PATH,SetImage} from './Data';


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
      image:''
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
        this.processImage(capturedImage.uri);
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
      SetImage(this.state.image);
      //this.props.processUpdateUserInfo({shopkeeper_id:this.state.shopkeeper_id,image:this.state.image});
      
     }catch(E){
       console.log("This is an Excepition in ImageManipulator", E);
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
            size={20} 
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
                <View style={{alignContent:'center',justifyContent:'center'}}>
                  <Text style={styles.ModalHeaderText}>Choose From</Text>
                </View>
                <Right>
                  <Icon name='cancel' color='white'  onPress={()=>{this.setState({modalVisible:false})}} />
                </Right>
              </Header>
              <View style={styles.ModalViewInner}>
                <Button transparent style={styles.ButtonCamera} onPress={()=>this.getImageFromCamera()} > 
                    <Icon 
                    name = 'camera'
                    size = {60}
                    type = "font-awesome"
                    color = 'rgba(52, 87, 85,1)'
                    />
                    <Text style={{paddingTop:15,fontSize:16}}>Camera</Text>
                </Button>
                <Button transparent style = {styles.ButtonGallery} onPress={()=>this.getImageFromGallery()}>
                    <Icon 
                    name = 'image'
                    size = {60}
                    type = "font-awesome"
                    color = 'rgba(52, 87, 85,1)'
                    
                    />
                    <Text style={{paddingTop:15,fontSize:16}}>Gallery</Text>
                </Button>
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
    ImageBOx:{
      width:400,
      height:170,
      justifyContent:'center',
      borderBottomColor:'grey',
      borderBottomWidth:0.5
    },
    ImageTag: {
      width: 400,
      height:170,
      opacity:0.2,
      position:'absolute'
    }, 
    ViewBox: {
      width:270,
      marginVertical:5,
      marginLeft:40,
      height:30,
      flexDirection:"row"
    },
    inputBox: {
        fontSize:17,borderBottomWidth:1,borderBottomColor:'grey',width:230,marginVertical:5
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
    touchableopacitystyle :{
        marginVertical:8,
        width:340,
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
