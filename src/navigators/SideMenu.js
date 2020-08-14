import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Matches from '../screens/Matches';
import Tote from '../screens/Tote';
import Favorites from '../screens/Favorites';
import Home from '../screens/Home';
import OrderHistory from '../screens/OrderHistory';
import Account from '../screens/Account';
import ViewQuestions from '../screens/ViewQuestions';
import LogOutAlert  from '../screens/LogOutAlert';
import { View, Text } from 'react-native';

const SideMenu = (props) => {

  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator 
    initialRouteName="Home"
    itemStyle= {{ width: '100%' }}

    >
      <Drawer.Screen name="Home" component={Home} options={{ drawerLabel: () => { return (<View><Text>Home</Text></View>)}}}/>
      <Drawer.Screen name="View Rack" component={Matches} options={{ drawerLabel: () => { return (<View><Text>View Matches</Text></View>)}}}/>
      <Drawer.Screen name="View Tote" component={Tote} options={{ drawerLabel: () => { return (<View><Text>View Bag</Text></View>)}}}/>
      <Drawer.Screen name="View Favorites" component={Favorites} options={{ drawerLabel: () => { return (<View><Text>View Favorites</Text></View>)}}}/>
      {/* <Drawer.Screen name="My Chart" component={ViewQuestions} options={{ drawerLabel: 'View Chart' }}/> */}
      <Drawer.Screen name="Order History" component={OrderHistory} options={{ drawerLabel: () => { return (<View><Text>Order History</Text></View>)}}}/>
      <Drawer.Screen name="My Account" component={Account} options={{ drawerLabel: () => { return (<View><Text>My Account</Text></View>)}}}/>
      <Drawer.Screen name="Log Out" component={LogOutAlert} options={{ drawerLabel: () => { return (<View><Text>Log Out</Text></View>)}}}/>
    </Drawer.Navigator>
  );
};
export default SideMenu;
