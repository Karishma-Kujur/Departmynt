import React from 'react'
import { TouchableOpacity, Text, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import SideMenu from './SideMenu'
import SplashScreen from '../screens/SplashScreen'
import Survey from '../screens/Survey'
import Transitions from '../screens/Transitions'
import LogOff from '../screens/LogOff'
import PaymentScreen from '../screens/PaymentScreen';
import OrderPlaced from '../screens/OrderPlaced';
import AddAddress from '../screens/AddAddress';
import OrderDetails from '../screens/OrderDetails';
import CheckOutScreen from '../screens/CheckoutScreen'
import ForgotPassword from '../screens/ForgotPassword'
import OtpScreen from '../screens/OtpScreen'
import ResetPassword from '../screens/ResetPassword'

const NavigatorMenu = (props) => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            headerLeft: null,
            gestureEnabled: false
        }}>
            <Stack.Screen name="Landing Page" component={SplashScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Sign Up" component={SignUp} />
            <Stack.Screen name="Survey" component={Survey} />
            <Stack.Screen name="Transitions" component={Transitions} />
            <Stack.Screen name="Log Off" component={LogOff} />
            <Stack.Screen name="Home" component={SideMenu} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="Order Placed" component={OrderPlaced} />
            <Stack.Screen name="Add Address" component={AddAddress} />
            <Stack.Screen name="Order Details" component={OrderDetails} />
            <Stack.Screen name="Checkout" component={CheckOutScreen} />
            <Stack.Screen name="Forgot Password" component={ForgotPassword} />
            <Stack.Screen name="Reset Password" component={ResetPassword} />
            <Stack.Screen name="Otp Screen" component={OtpScreen} />
        </Stack.Navigator>
    )
}
export default NavigatorMenu