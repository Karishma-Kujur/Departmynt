import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
} from 'react-native';
import PopupDialog, {
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';
import RadioButton from '../components/shared/RadioButton';
import styles from '../assets/styles';
import NoImage from '../assets/images/noImage.png';
import * as Orders from '../constants/Orders';
import * as PaymentAction from '../actions/PaymentAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const OrderedItem = ({
  image,
  id,
  price,
  status,
  list,
  currency,
  currencySymbol,
  setTrackOrder,
  order_key,
  PaymentAction,
  navigation
}) => {
  const fullWidth = Dimensions.get('window').width;

  const imageStyle = [
    {
      width: fullWidth / 3 - 30,
      height: 100,
      margin: 2,
    },
  ];
  const [returnOrder, setReturnOrder] = useState(false);
  const [returnSuccess, setReturnSuccess] = useState(false);

  const handlePayment = () => {
    PaymentAction.setOrderDetails({order_key: order_key, id: id});
    navigation.navigate('Payment');
  };

  return (
    <View style={styles.toteCardItem}>
      <View style={{padding: 10}}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: 'green',
              borderRadius: 50,
              width: 12,
              height: 12,
              marginRight: 10,
            }}></View>
          <Text style={{fontWeight: 'bold'}}>{status}</Text>
        </View>
        <Text style={{color: 'grey', fontSize: 12}}>
          {'Order # ' + id}
        </Text>
      </View>
      <ScrollView
        horizontal={true}
        // contentContainerStyle={{ width: `${100 * 0.3}%` }}
        showsHorizontalScrollIndicator={false}
        // scrollEventThrottle={200}
        // decelerationRate="fast"
        pagingEnabled>
        {list.map((item) => (
          <Image
            source={
              item.images.length
                ? {
                    uri: item.images[0],
                  }
                : NoImage
            }
            style={imageStyle}
          />
        ))}
      </ScrollView>
      <View style={{padding: 5}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginBottom: 10,
          }}>
          <Text style={{color: 'grey'}}>
            {list.length + ' Items in Total:'}
          </Text>
          <Text style={{fontWeight: 'bold'}}>
            {currency + currencySymbol + price}
          </Text>
        </View>
        {(status === 'failed' || status === 'pending') && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity onPress={handlePayment}>
              <View style={{borderWidth: 1, padding: 3, marginRight: 5}}>
                <Text>Pay Now</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {!returnOrder && false && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity onPress={() => setTrackOrder(true)}>
              <View style={{borderWidth: 1, padding: 3, marginRight: 5}}>
                <Text>Track</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                );
                setReturnOrder(true);
              }}>
              <View style={{borderWidth: 1, padding: 3, marginRight: 5}}>
                <Text>Return Item</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{borderWidth: 1, padding: 3, backgroundColor: 'black'}}>
                <Text style={{color: 'white'}}>Review</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {returnOrder && false && (
          <>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>
                Why are you returning this?
              </Text>
              <RadioButton items={Orders.ReturnOrder} selectedAnswer={null} />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut,
                  );
                  setReturnOrder(false);
                }}>
                <View style={{borderWidth: 1, padding: 3, marginRight: 5}}>
                  <Text>Cancel</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut,
                  );
                  setReturnOrder(false);
                  setReturnSuccess(true);
                }}>
                <View style={{borderWidth: 1, padding: 3, marginRight: 5}}>
                  <Text>Continue</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <PopupDialog
        visible={returnSuccess}
        // containerStyle={{ justifyContent: 'flex-end' }}
        height={200}
        width={fullWidth - 40}
        onTouchOutside={() => setReturnSuccess(false)}
        footer={
          <DialogFooter>
            <DialogButton
              text="Got it!"
              onPress={() => {
                setReturnSuccess(false);
              }}
            />
          </DialogFooter>
        }>
        <DialogContent>
          <View
            style={{
              height: 120,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{marginTop: 15, fontWeight: 'bold', fontSize: 18}}>
              Your return has been initiated!
            </Text>
            <Text style={{marginTop: 15, fontSize: 16}}>
              You will receive the pickup date and time in your registered email
              id.{' '}
            </Text>
          </View>
        </DialogContent>
      </PopupDialog>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    PaymentAction: bindActionCreators(PaymentAction, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(OrderedItem);
