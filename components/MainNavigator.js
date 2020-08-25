import { View, Platform, Text, ScrollView, Image, StyleSheet,ToastAndroid } from 'react-native';
import React from 'react';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer, SafeAreaView} from 'react-navigation';
import { Home } from '../screens/Home';
import {Icon} from 'react-native-elements';

const MyHeader = (navigation) => {
  return{
      headerStyle : {
          backgroundColor:'blue',
      },
      headertintColor:'#fff',
      headerTitleStyle:{
          color:"#fff"
      },
  };
}

const HomeNavigator = createAppContainer(createStackNavigator({
  Home:{
    screen:Home, 
  },
  initialRouteName:'Home'
}));


const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{flex:1}}>
        
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.drawerHeaderText}>Shop Online</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

export const MainNavigator = createAppContainer(createDrawerNavigator({
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='home'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }
      },
}, {
  initialRouteName: 'Home',
  drawerBackgroundColor: '#D1C4E9',
  contentComponent: CustomDrawerContentComponent
}));

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
}); 