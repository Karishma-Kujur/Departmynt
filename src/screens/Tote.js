import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native';
import {
  View,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Linking,
} from 'react-native';
import Button from '../components/shared/Button';
import styles from '../assets/styles';
import ToteItem from './ToteItem';
import * as ToteAction from '../actions/ToteAction';
import * as ToteApi from '../api/Tote';
import AppLayout from '../components/shared/AppLayout';

const { width, height } = Dimensions.get('window');

const ToteScreen = (props) => {
  const { navigation, ToteAction, toteItems, user, products } = props;
  const [spinner, setLoader] = useState('');
  const [addAddress, setAddAddress] = useState(false);
  const [selectAddress, showSelectAddress] = useState(false);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalPriceExTax, setTotalPriceExTax] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [shippingCharge, setShipppingCharge] = useState(0);
  const getToteByProductId = (data, variations) => {
    const toteItems = [];
    data.forEach((element) => {
      let item = products.find(
        (product) => product.id === Number(element.product_id),
      );
      let variation = variations.find(
        (variant) => element.variation_id === variant.variationId.toString(),
      );
      if (item)
        toteItems.push({
          ...element,
          ...item,
          ...variation,
        });
    });
    return toteItems;
  };

  const getProductIds = (products) => {
    let ids = '';
    products.forEach((product) => {
      ids = product.product_id + ', ';
    });
    return ids;
  };

  const getTotes = () => {
    setLoader(true);
    ToteAction.setTotes([]);
    ToteApi.getTotes(user.id)
      .then((result) => {
        let productIds = getProductIds(result);
        ToteApi.getVariants(productIds)
          .then((variations) => {
            let toteItems = getToteByProductId(result, variations);
            ToteAction.setTotes(toteItems);
          })
          .catch((error) => {
            setLoader(false);
          });
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) getTotes();
  }, [isFocused]);

  useEffect(() => {
    let totalPrice = 0;
    let totalPriceExTax = 0;
    let totalTax = 0;
    toteItems.forEach((item) => {
      totalPrice = totalPrice + Number(item.price_with_tax) * Number(item.quantity);
      totalPriceExTax = totalPriceExTax + Number(item.price) * Number(item.quantity);
      totalTax = totalTax + Number((item.price_with_tax) - (item.price)) * Number(item.quantity);
    });
    setPrice(totalPrice);
    setTotal(totalPrice);
    setTotalPriceExTax(totalPriceExTax);
    setTotalTax(totalTax);
    calculateTax(totalPriceExTax)
  }, [toteItems, calculateTax]);

  const calculateTax = (price) => {
    if (price <= 15) {
      setShipppingCharge(3.75)

    }
    else if (price > 15 && price <= 50) {
      setShipppingCharge(5)

    }
    else {
      setShipppingCharge(8)

    }

  }

  const handleRefreshTote = () => {
    getTotes();
  };

  const handleProceedToShipping = () => {
    ToteAction.setShippingCharges(shippingCharge);
    navigation.navigate('Checkout');
  };

  return (
    <AppLayout
      spinner={spinner}
      title={'Bag'}
      openDrawer={() => {
        navigation.openDrawer();
      }}>
      <ScrollView>
        <FlatList
          data={toteItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ToteItem
              id={item.id}
              productId={item.product_id}
              image={item.images && item.images[0]}
              name={item.name}
              price={item.price_with_tax}
              size={item.size}
              color={item.color}
              quantity={item.quantity}
              stockQuantity={item.stockQuantity}
              attributes={item.attributes}
              user={user}
              toteEdited={handleRefreshTote}
            />
          )}
        />

        <View style={{ padding: 10 }}>

          {toteItems.length ? (
            <>
              <Text
                style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                Price Details:
              </Text>
              <View style={{ width: '100%', borderWidth: .5, borderColor: 'black', marginBottom: 10, }} />
              <FlatList
                data={toteItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  let totalIndivisualPrice = (item.price * item.quantity);
                  return (
                    <View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{ width: '60%' }}>
                          <Text style={{ fontSize: 16, marginBottom: 10 }}>
                            {item.name}
                          </Text>
                        </View>
                        <View style={{ width: '19%' }}>
                          <Text style={{ fontSize: 16, textAlign: 'right', marginBottom: 10 }}>
                            {item.quantity} * {item.price}
                          </Text>
                        </View>
                        <View style={{ width: '20%' }}>
                          <Text style={{ fontSize: 16, marginBottom: 10, textAlign: 'right' }}>
                            {'$ ' + totalIndivisualPrice}
                          </Text>
                        </View>
                      </View>


                    </View>
                  )
                }
                }
              />
              <View style={{ borderColor: 'black', borderWidth: .5 }} />

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>
                  {'Total Price'}
                </Text>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>
                  {'$ ' + totalPriceExTax}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>
                  {'Tax Price'}
                </Text>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>
                  {'$ ' + totalTax.toFixed(2)}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>
                  {'Shipping Charge'}
                </Text>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>
                  {'$ ' + shippingCharge}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>
                  {'Grand Total'}
                </Text>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>
                  {'$ ' + (total + shippingCharge)}
                </Text>
              </View>
            </>
          ) : (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: height / 3,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    width: '100%',
                    textAlign: 'center',
                  }}>
                  {' '}
                  {spinner ? '' : 'No items available in your cart'}
                </Text>
              </View>
            )}
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        {toteItems.length ? (
          <Button
            label="Proceed to shipping"
            onPress={handleProceedToShipping}
          />
        ) : (
            <Button
              label="Shop Now"
              onPress={() => navigation.navigate('View Rack')}
            />
          )}
      </View>
    </AppLayout>
  );
};

const mapStateToProps = ({ products, tote, user }) => {
  return {
    products: products.list,
    toteItems: tote.list,
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ToteAction: bindActionCreators(ToteAction, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ToteScreen);
