import React from 'react';
import { MainComponent } from './components/MainComponent';
import { createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import {ConfigureStore} from './redux/configureStore';

const AppContainer = MainComponent;

const store = ConfigureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store} >
        <AppContainer />
      </Provider>
    );
  }
}
