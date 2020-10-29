import React, { useState } from 'react';
import { connect } from 'react-redux';
import Back from '../assets/images/back.png';
import { View, Dimensions, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';
import { CreditCardInput } from "react-native-credit-card-input";

const { width, height } = Dimensions.get("window");

const PaymentScreen = (props) => {
    const { navigation, user, orderDetails } = props
    const [spinner, setLoader] = useState(true);

    return (
        <View style={{ flex: 1 }}>
            <Spinner visible={spinner} />
            <View >
                <TouchableOpacity style={{ margin: 15 }} onPress={() =>navigation.navigate('Order History')}>
                    <Image source={Back} style={{ width: 30, height: 24, borderRadius: 12 }}/>
                    <Text style={{position:'absolute',marginHorizontal:20,marginVertical:2,fontSize:15}}>Back</Text>
                </TouchableOpacity>

            </View>
            <View style={{ flex: 1 }}>
                <WebView
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: (Platform.OS) === 'ios' ? 20 : 0,
                    }}
                    onNavigationStateChange={(e) => {
                        if (e.url && e.url.includes('www.departmynt.co/checkout/order-received')) {
                            navigation.navigate('Order Placed');
                            setLoader(false)
                        }
                    }}
                    source={{ uri: `https://www.departmynt.co/wp-json/process/payment?username=${user.userName}&password=${user.password}&order_key=${orderDetails.order_key}&orderId=${orderDetails.id}` }}
                    onLoadStart={syntheticEvent => {
                        const { nativeEvent } = syntheticEvent;
                        if (!nativeEvent.url.includes('www.departmynt.co/checkout/order-received') || !nativeEvent.url.includes('www.departmynt.co/checkout/order-pay')) {
                            setLoader(nativeEvent.loading)
                        }
                    }}
                    onLoadEnd={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent;
                        setLoader(nativeEvent.loading)
                    }}
                />

            </View>
        </View>
    )
}
const mapStateToProps = ({ user, payment }) => {
    return {
        user,
        orderDetails: payment.orderDetails
    };
};
export default connect(mapStateToProps, null)(PaymentScreen);