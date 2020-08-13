import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions, ScrollView, Image } from 'react-native';
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
            <WebView
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
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
                    if (!nativeEvent.url.includes('www.departmynt.co/checkout/order-received')) {
                        setLoader(nativeEvent.loading)
                    }
                }}
                onLoadEnd={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    if (!nativeEvent.url.includes('www.departmynt.co/checkout/order-received')) {
                        setLoader(nativeEvent.loading)
                    }
                }}
            />
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