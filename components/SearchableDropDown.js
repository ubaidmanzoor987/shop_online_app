import { Button } from 'native-base';
import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,Alert
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Obj,Setselected_brand} from './Data';

class MySearchableDropDown extends Component {
    
    static navigationOptions = {
        title: 'Choose Brand',
        headerStyle: {
          backgroundColor:'rgba(52, 87, 85,1)',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 23,
    
        },
        
    } 

    constructor(props) {
      super(props);
      this.state = {
        brand:'',
        result:[{}]
      }
      console.log("this si soprop  aa", this.props);
    }

    componentDidMount(){
        this.setState({resut:this.props.navigation.state.params.result})
    }
    
    render() {
      return (
        <SafeAreaView >
            <Text style={{marginHorizontal:3, fontSize:16,  marginVertical:10,fontWeight:'bold' }}> Select Your Brand </Text>
             <View style={{marginLeft:5,marginRight:3,flexDirection:'row',width:"98%"}}>
                
                <SearchableDropdown
                    onTextChange={text => console.log(text)}
                    //On text change listner on the searchable input
                    onItemSelect={(item) => {this.setState({brand:item.name})}}
                    //onItemSelect called after the selection from the dropdown
                    containerStyle={{ padding: 5,width:"75%" }}
                    //suggestion container style
                    textInputStyle={{
                    //inserted text style
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    backgroundColor: '#FAF7F6',
                    }}
                    itemStyle={{
                    //single dropdown item style
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#FAF9F8',
                    borderColor: '#bbb',
                    borderWidth: 1,
                    }}
                    itemTextStyle={{
                    //text style of a single dropdown item
                    color: '#222',
                    }}
                    itemsContainerStyle={{
                    //items container style you can pass maxHeight
                    //to restrict the items dropdown hieght
                    maxHeight: '80%',
                    }}
                    items={this.props.navigation.state.params.result}
                    //mapping of item array
                    //default selected item index
                    placeholder="Select Brands"
                    //place holder for the search input
                    resetValue={false}
                    //reset textInput Value with true and false state
                    underlineColorAndroid="transparent"
                    //To remove the underline from the android input
                />
            <Button style={{backgroundColor:'rgba(52, 87, 85,1)',width:'22%',justifyContent:"center",alignContent:'center',marginTop:5}} 
                onPress={()=>{Setselected_brand(this.state.brand);this.props.navigation.goBack()}} 
            >
                <Text style={{color:"white"}}>Save</Text>
            </Button>
            </View>
            
                  
        </SafeAreaView>
      )
    }
}
  
export default MySearchableDropDown ;