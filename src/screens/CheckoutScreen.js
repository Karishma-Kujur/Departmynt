import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {useIsFocused} from '@react-navigation/native';
import PopupDialog, {
  DialogContent,
  DialogTitle,
  Dialog,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import Button from '../components/shared/Button';
import Back from '../assets/images/back.png';
import Link from '../components/shared/Link';
import * as ProductApi from '../api/Products';
import * as ToteApi from '../api/Tote';
import styles from '../assets/styles';
import Spinner from 'react-native-loading-spinner-overlay';
import {Title} from 'react-native-paper';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import DeepLinking from 'react-native-deep-linking';

const {width, height} = Dimensions.get('window');

const CheckoutScreen = (props) => {
  const {navigation, tote, user} = props;
  const [spinner, setLoader] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleUrl = ({url}) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        setLoader(false);
        navigation.navigate('Order Placed');
      }
    });
  };

  const addRoutesToDeepLinking = () => {
    DeepLinking.addScheme('https://');
    Linking.addEventListener('url', handleUrl);

    DeepLinking.addRoute(
      '/departmynt.co/checkout/order-received/:id',
      (response) => {
        navigation.navigate('Order Placed');
      },
    );
  };

  useEffect(() => {
    addRoutesToDeepLinking();
  }, []);

  const openLink = async (data) => {
    try {
      const url = `https://www.departmynt.co/wp-json/process/payment?username=${user.userName}&password=${user.password}&order_key=${data.order_key}&orderId=${data.id}`;
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          // modalPresentationStyle: 'overFullScreen',
          // modalTransitionStyle: 'partialCurl',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: true,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
      } else Linking.openURL(url);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleDeliveryMethodPress = () => {
    if (
      !user.billing.first_name ||
      !user.billing.last_name ||
      !user.billing.address_1 ||
      !user.billing.address_2 ||
      !user.billing.city ||
      !user.billing.state ||
      !user.billing.postcode ||
      !user.billing.country ||
      !user.billing.email ||
      !user.billing.phone
    ) {
      setShowWarning(true);
    } else {
      let data = {
        customer_id: user.id,
        billing: {
          first_name: user.billing.first_name,
          last_name: user.billing.last_name,
          address_1: user.billing.address_1,
          address_2: user.billing.address_2,
          city: user.billing.city,
          state: user.billing.state,
          postcode: user.billing.postcode,
          country: user.billing.country,
          email: user.billing.email,
          phone: user.billing.phone,
        },
        shipping: {
          first_name: user.billing.first_name,
          last_name: user.billing.last_name,
          address_1: user.billing.address_1,
          address_2: user.billing.address_2,
          city: user.billing.city,
          state: user.billing.state,
          postcode: user.billing.postcode,
          country: user.billing.country,
        },
        line_items: [],
      };
      tote.forEach((item) => {
        data.line_items.push({
          product_id: item.id,
          quantity: item.quantity,
        });
      });
      ProductApi.placeOder(data)
        .then((result) => {
          let userData = {
            user_id: user.id,
          };
          ToteApi.clearTote(userData)
            .then((resultData) => {
              openLink(result);
            })
            .catch((error) => {
              setLoader(false);
            });
        })
        .catch((error) => {
          setLoader(false);
        });
    }
  };

  return (
    <View style={styles.containerMatches}>
      <Spinner visible={spinner} />
      <View style={styles.titleContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('View Tote');
          }}>
          <Image
            source={Back}
            style={{width: 24, height: 24, borderRadius: 12}}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Payment</Text>
      </View>
      <ScrollView>
        <View
          style={{
            padding: 20,
          }}>
          {user.billing.first_name === '' ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Link
                label="Add Delivery Address"
                onPress={() => navigation.navigate('Add Address')}
              />
            </View>
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <Title style={{justifyContent: 'center'}}>
                  Delivery Address
                </Title>
                <Link
                  label="Edit"
                  onPress={() => navigation.navigate('Add Address')}
                />
              </View>

              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 8,
                  fontWeight: 'bold',
                  fontSize: 14,
                }}>
                {user.billing.first_name + ' ' + user.billing.last_name}
              </Text>
              <Text>{user.billing.email}</Text>
              <Text>{user.billing.address_1}</Text>
              <Text>{user.billing.address_2}</Text>
              <Text>{user.billing.city}</Text>
              <Text>{user.billing.postcode}</Text>
              <Text>{user.billing.state}</Text>
              <Text style={{marginTop: 10}}>{user.billing.phone}</Text>
            </>
          )}
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <Button label="Proceed" onPress={() => handleDeliveryMethodPress()} />
      </View>
      <Dialog
        dialogTitle={
          <View
            style={{
              height: 80,
              width: 300,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                paddingTop: 20,
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 20,
                textAlign: 'center',
              }}>
              Please Enter your Address before Proceeding
            </Text>
          </View>
        }
        visible={showWarning}
        /*  height={200}
    width={300} */
        footer={
          <DialogFooter>
            <DialogButton text="OK" onPress={() => setShowWarning(false)} />
          </DialogFooter>
        }></Dialog>
    </View>
  );
};
const mapStateToProps = ({tote, user, payment}) => {
  return {
    tote,
    user,
  };
};

export default connect(mapStateToProps, null)(CheckoutScreen);
