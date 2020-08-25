import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Menu from './src/navigators/Menu';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import configureStore from './src/appConfig/store/configureStore';
import { PersistGate } from 'redux-persist/integration/react'

const { store, persistor } = configureStore();

const linking = {
  prefixes: ['https://departmynt.co'],
  config: {
    screens: {
      'Order Placed': 'checkout/order-received/:id',
    },
  }
};

const App = () => {
  console.disableYellowBox = true;

  useEffect(() => {
    const backAction = () => {
      // Alert.alert("Hold on!", "Are you sure you want to go back?", [
      //   {
      //     text: "Cancel",
      //     onPress: () => null,
      //     style: "cancel"
      //   },
      //   { text: "YES", onPress: () => BackHandler.exitApp() }
      // ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Menu />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}

export default App;