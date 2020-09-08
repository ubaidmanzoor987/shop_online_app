import React, { Component } from 'react';
import { StyleSheet, Text, View, 
} from 'react-native';
import  AboutPicture  from './AboutPicture';
import {Icon} from 'react-native-elements';
import {Button,Right} from 'native-base';

export default class User extends Component {
    
    static navigationOptions = {
      title: 'Settings',
      headerStyle: {
        backgroundColor:'rgba(52, 87, 85,1)',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  
    render() {
      return(
        <View style={styles.container}>
            <AboutPicture goToEditScreen = {()=>{this.props.navigation.navigate('AboutPictureEdit')}} 
              navigation = {this.props.navigation}
            />
            <View style={{marginTop:70}}>
              <Button style={styles.PasswordTouchableOpacity} onPress={()=>{
                this.props.navigation.navigate("UpdatePasswordForm")
              }}>
                <View style={styles.PasswordTouchableOpacityView}>
                    <Text style={styles.PasswordTouchableOpacityText}>Change Password</Text>
                </View>
                <Right style={{marginRight:-5}}>
                    <Icon 
                    reverse
                    name = 'forward'
                    size = {24}
                    color = 'black'
                    />
                </Right>
              </Button> 
              <Button style={styles.PasswordTouchableOpacity} onPress={()=>{
                this.props.navigation.navigate("UserSettingForm")
              }}>
                <View style={styles.PasswordTouchableOpacityView}>
                    <Text style={styles.PasswordTouchableOpacityText}>Personal Information </Text>
                </View>
                <Right style={{marginRight:-5}}>
                    <Icon 
                    reverse
                    name = 'forward'
                    size = {24}
                    color = 'black'
                    />
                </Right>
              </Button>
            </View>
        </View>
      )
    }
}


const styles = StyleSheet.create({
    container: {
      flexDirection:'column',
      alignItems: 'center',
    },
    PasswordTouchableOpacity:{
      width:'97%',
      flexDirection:'row',
      borderRadius:25,
      alignSelf:'center',
      marginVertical:7,
      backgroundColor:'white',
      height:50,
      opacity:0.9
    },
    PasswordTouchableOpacityView:{
      alignItems:'center',justifyContent:'center'
    },
    PasswordTouchableOpacityText:{
      paddingLeft:10,
      fontWeight:"bold",
      fontSize:15,
      color:'black'

    } 
});
