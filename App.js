import React from 'react';
import { MainComponent } from './components/MainComponent';
import { createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import {ConfigureStore} from './redux/configureStore';
import {Main} from './components/MainNavigator';
const store = ConfigureStore();
import { StyleSheet, SafeAreaView } from 'react-native';
import AppStatusBar from './components/AppStatusBar';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store} >
        <MainComponent />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  topSafeArea: {
      flex: 0, 
  }, 
  bottomSafeArea: {
      flex: 1, 
      
  },
});