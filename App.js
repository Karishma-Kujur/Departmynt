import React from 'react';
import { BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Menu from './src/navigators/Menu';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import configureStore from './src/appConfig/store/configureStore';
import { PersistGate } from 'redux-persist/integration/react'

const { store, persistor } = configureStore();

const App = () => {
  console.disableYellowBox = true;

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Menu />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}

export default App;