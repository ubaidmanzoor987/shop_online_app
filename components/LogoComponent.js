import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import {baseUrl} from '../shared/ServerConf';

export class Logo extends Component {
	render(){
		return(
			<View style={styles.container}>
        <Image
          style={{width: 100, height: 100}}
          source={require('../assets/logoo.jpg')}
        />
      <Text style={styles.logoText}>Welcome to Shop Online.</Text>
  		</View>
			)
	}
};

const styles = StyleSheet.create({
  container : {
    flex: 0.7,
    justifyContent:'flex-end',
    alignItems: 'center'
  },
  logoText : {
  	marginVertical: 15,
  	fontSize:18,
  	color:'rgba(255, 255, 255, 0.7)'
  }
});
