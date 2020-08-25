import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export class Home extends Component {

  constructor(props)
  {
    super(props);
    console.log("This is Home Screen Props", props);
  }

  static navigationOptions = {
    title: 'Home',
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
        <Text style = {styles.text}>
          Salam Pakistan
        </Text>
      </View>
    )
  }
}



const styles = StyleSheet.create({
    container: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'gray',
    },
    text:{
      padding: 2,
    }
});
