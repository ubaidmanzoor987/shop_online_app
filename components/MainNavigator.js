import { View, Platform, Text, ScrollView, Image, StyleSheet,ToastAndroid, Alert } from 'react-native';
import React,{Component} from 'react';
import { createDrawerNavigator,DrawerItems, } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer, SafeAreaView} from 'react-navigation';
import {Icon} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Footer,Header,Container,Content,Right,Left,Button} from 'native-base';
import {Obj,IMAGE_PATH,changesdetect,SetChangesDetect} from './Data';
import UserSettingForm from './UserSettingForm'
import AboutPictureEdit from './AboutPictureEdit';
import UpdatePasswordForm from './UpdatePasswordForm';
import { Home } from '../screens/Home';
import Product from '../screens/Product';
import User from '../screens/User';
import Brands from '../screens/Brands';
import AddBrands from './BrandsComponent/AddBrands';
import CustomizeBrand from './BrandsComponent/CustomizeBrand';
import MySearchableDropDown from './SearchableDropDown';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
  return {
  }
}

const HomeNavigator = createAppContainer(createStackNavigator({
  Home:{
    screen:Home,
    navigationOptions: ({ navigation }) => (
      {
      headerLeft:()=><Button style={{marginLeft:10}} transparent onPress={ () => navigation.toggleDrawer() }>
        <Icon 
          name="menu" 
          size={24}
          color= 'white'
          style={{paddingRight:25}} 
        />
      </Button>,
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
      headerLeft:()=><Button style={{marginLeft:10}} transparent onPress={ () => navigation.toggleDrawer() }>
        <Icon 
          name="menu" 
          size={24}
          color= 'white'
          style={{paddingRight:25}} 
        />
      </Button>,
    })
  },
  MySearchableDropDown:MySearchableDropDown

},{
  initialRouteName:"Product",
}));

const BrandNavigator = createAppContainer(createStackNavigator({
  Brands:{
    screen:Brands,
    navigationOptions: ({ navigation }) => (
      {
      headerLeft:()=><Button style={{marginLeft:10}} transparent onPress={ () => navigation.toggleDrawer() }>
        <Icon 
          name="menu" 
          size={24}
          color= 'white'
          style={{paddingRight:25}} 
        />
      </Button>,
    })
  },
  AddBrands:AddBrands,
  CustomizeBrand:CustomizeBrand

},{
  initialRouteName:"Brands",
}));

const SettingsNavigator = createAppContainer(createStackNavigator({
  User:{
    screen:User,
    navigationOptions: ({ navigation }) => (
      {
      headerLeft:()=><Button style={{marginLeft:10}} transparent onPress={ () => navigation.toggleDrawer() }>
        <Icon 
          name="menu" 
          size={24}
          color= 'white'
          style={{paddingRight:25}} 
        />
      </Button>,
    })
  },
  AboutPictureEdit:{
    screen:AboutPictureEdit,
    navigationOptions: ({ navigation }) => (
      {
      headerShown:false
    })
  },
  UserSettingForm:UserSettingForm,
  UpdatePasswordForm:UpdatePasswordForm

},{
  initialRouteName:"User",
}));

const CustomDrawerContentComponent = {
  initialRouteName: 'Home',
  drawerBackgroundColor: 'white',
  headerMode:'none',
  contentComponent: (props) => {
   return (
   <Container>
     <Header style={styles.drawerHeader} androidStatusBarColor='rgba(52, 87, 85,1)'>
        <View style={{width:'30%'}}>
          <Image style={styles.drawerImage} source={IMAGE_PATH === '../assets/logo.png' ? require('../assets/logo.png') : {uri:IMAGE_PATH }} /> 
        </View>
        <View style={{width:'60%'}}>
          <Text style={styles.drawerHeaderText} >{Obj.shop_name}</Text>
          <Text style={styles.drawerHeaderText1} >{Obj.owner_phone_no}</Text>
        </View>
     </Header>
        <ScrollView style={styles.container}>
          <SafeAreaView>
            <DrawerItems {...props} />

          </SafeAreaView>
        </ScrollView>

     <Footer style={styles.footerContainer}>
        <TouchableOpacity style={styles.footerTouchable} onPress={()=> {props.navigation.navigate("Logout")}}>
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

export default MainComponentDrawer = createAppContainer(createDrawerNavigator({
  Home:{ 
    screen:HomeNavigator ,
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
        drawerLabel:'Add Products',
        drawerIcon: ({ tintColor, focused }) => (
          <Icon
            name='cart-plus'
            type='font-awesome'
            size={24}
            color={tintColor}
          />
        ),
      },

    },
    Brand:
    { screen:BrandNavigator ,
      navigationOptions: {
        title: 'Brands',
        drawerLabel:'Brands',
        drawerIcon: ({ tintColor, focused }) => (
          <Icon
            name='cart-plus'
            type='font-awesome'
            size={24}
            color={tintColor}
          />
        ),
      },

    },
    Setting:{
      screen:SettingsNavigator,
      navigationOptions: {
        title: 'Setting',
        drawerLabel:'Setting',
        drawerIcon: ({ tintColor, focused }) => (
          <Icon
            name='cog'
            type='font-awesome'
            size={24}
            color={tintColor}
          />
        ),
      },
    }
},
  CustomDrawerContentComponent
));

class MainComponentDrawer1 extends Component {
  constructor(props){
    super(props)
    console.log("these are props in main ", this.props);
  }
  componentDidMount(){
     
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      if (changesdetect === "initialize" || changesdetect === "add" || changesdetect === "update" || changesdetect === "delete"){
        this.props.fetchBrands({shopkeeper_id:Obj.shopkeeper_id});
          SetChangesDetect("fail");
      }
      });
  }
  
  componentWillUnmount(){
    this.focusListener.remove();
  }
  render(){
    return (
      <View style={{flex:1}}>
        <MainNavigator navigation1={this.props.navigation}/>
       </View>
    )
  }
}

//export default connect(mapStateToProps,mapDispatchToProps)(MainComponentDrawer);


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
    width:'100%'
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