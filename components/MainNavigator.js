import { View, Platform, Text, ScrollView, Image, StyleSheet,ToastAndroid, Alert } from 'react-native';
import React,{Component} from 'react';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer, SafeAreaView} from 'react-navigation';
import { Home } from '../screens/Home';
import { Product } from '../screens/Product';
import {Icon} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Footer,Header,Container,Content,Right,Left,Button} from 'native-base';

const HomeNavigator = createAppContainer(createStackNavigator({
  Home:{
    screen:Home,
    navigationOptions: ({ navigation }) => (
      {
      headerLeft:()=><Icon name="menu" size={24} 
      color= 'white'
      onPress={ () => navigation.toggleDrawer() } style={{paddingRight:25}} />,      
    })  
  },
  
},{
  initialRouteName:"Home",
}));
const ProductNavigator = createAppContainer(createStackNavigator({
  Product:{
    screen:Product,
    navigationOptions: ({ navigation }) => (
      {
      headerLeft:()=><Icon name="menu" size={23} 
      color= 'white'
      onPress={ () => navigation.toggleDrawer() }/>         
    })  
  },
  
},{
  initialRouteName:"Product",
}));


const CustomDrawerContentComponent = {
  initialRouteName: 'Home',
  drawerBackgroundColor: 'white',
  headerMode:'none',
  contentComponent: (props) => { 
   return (
   <Container>
     <Header style={styles.drawerHeader} androidStatusBarColor='black'>
        <Button transparent onPress={()=>Alert.alert("this is touch")}>
        <View>
          <Image style={styles.drawerImage} source={require('../assets/logo.png')} />
        </View>
        <View style={{paddingLeft:10}}>
          <Text style={styles.drawerHeaderText} >{props.navigation.state.params.data.data.shop_name}</Text>
          <Text style={styles.drawerHeaderText1} >{props.navigation.state.params.data.data.owner_phone_no}</Text>
        </View>
        </Button>
     </Header>
        <ScrollView style={styles.container}> 
          <SafeAreaView>
            <DrawerItems {...props} />
          </SafeAreaView>
        </ScrollView>
     
     <Footer style={styles.footerContainer}>
        <TouchableOpacity style={styles.footerTouchable} onPress={()=> {props.navigation.navigate('Logout')}}>
          <Icon
          name='sign-out'
          type='font-awesome'            
          size={24}
          color="white"
          />
          <Text style={{color:"white",fontSize:17}}>Sign Out</Text>
        </TouchableOpacity>
     </Footer>
   </Container>
  )
  }
  
};

export const Main = createAppContainer(createDrawerNavigator(
  {
    Home: 
        { screen:HomeNavigator ,
          navigationOptions: {
            title: 'Home',
            drawerLabel:'Home',
            drawerIcon: ({ tintColor, focused }) => (
              <Icon
                name='home'
                type='font-awesome'            
                size={24}
                color={tintColor}
              />
            ),
          },
    
        },
    Product: 
    { screen:ProductNavigator ,
      navigationOptions: {
        title: 'Products',
        drawerLabel:'Products',
        drawerIcon: ({ tintColor, focused }) => (
          <Icon
            name='home'
            type='font-awesome'            
            size={24}
            color={tintColor}
          />
        ),
      },

    },
  },
  CustomDrawerContentComponent
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: 'rgba(52, 87, 85,1)',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',

  },
  drawerHeaderText1: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  },
  drawerImage: {
    width: 70,
    height:70,
    borderRadius:50,
    marginLeft:-60
  },
  footerContainer:{
      backgroundColor: 'rgba(52, 87, 85,1)',
      alignContent:'center',
      justifyContent:"center"
  },
  footerTouchable:{
    flexDirection:"row",
    marginTop:15
  }
}); 