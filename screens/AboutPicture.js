import React, { Component } from 'react';
import {View, TouchableOpacity, Image, StyleSheet
} from 'react-native';
import {IMAGE_PATH} from '../components/Data';


export default class AboutPicture extends Component {

    constructor(props)
    {
      super(props);
      this.state = {
        image:''
      }
    }

    componentDidMount(){
      this.setState({image: IMAGE_PATH });
      const { navigation } = this.props;
      this.focusListener = navigation.addListener('didFocus', () => {
          this.setState({ image: IMAGE_PATH });
        });
    }
    
    componentWillUnmount(){
      this.focusListener.remove();
    }

  
    render() {
      return(
        <TouchableOpacity style={styles.ImageBOx} onPress={()=>{this.props.goToEditScreen()}}>
           <Image style={styles.ImageTag} source = {this.state.image === '../assets/logo.png' ? require('../assets/logo.png') :  {uri:this.state.image !== '' ? this.state.image : IMAGE_PATH} } />
            <View style={{paddingTop:140,alignItems:"center"}}>
               <Image style={{width:130,height:130,borderRadius:65,}} 
                source = {this.state.image === '../assets/logo.png' ? require('../assets/logo.png') :  {uri:this.state.image !== '' ? this.state.image : IMAGE_PATH} } 
                />

            </View>
        </TouchableOpacity>
      )
    }
}
const styles = StyleSheet.create({
    
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
    

});

