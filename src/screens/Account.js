import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  LayoutAnimation
} from 'react-native';
import styles from '../assets/styles';
import Avatar from '../assets/images/avatar.jpeg';
import RadioButton from '../components/shared/RadioButton';
import PresonalDetailsForm from '../components/PersonalDetailsForm';
import AddressForm from '../components/AddressForm';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Accounts from '../constants/Accounts';
import * as UserAction from '../actions/UserAction';
import * as UserApi from '../api/User';
import CustomAlert from '../components/shared/CustomAlert';

const { width, height } = Dimensions.get('window');

const AccountScreen = (props) => {
  const { navigation, user, UserAction } = props;
  const [removeCard, changeRemoveCard] = useState(false);
  const [editPersonalDetails, changeEditPersonalDetails] = useState(false);
  const [editAddress, changeEditAddress] = useState(false);
  const [expandedIds, changeExpanded] = useState([]);
  const [spinner, setLoader] = useState('');
  const [personalDetails, setPersonalDetails] = useState(user);
  const [address, setAddress] = useState(user.billing);
  const [alertMessage, setAlertMessage] = useState('')
  const [alert, showAlert] = useState(false)

  const handleSavePersonalDetails = () => {
    if (editPersonalDetails) {
      let data = {
        email: personalDetails.email,
        first_name: personalDetails.firstName,
        last_name: personalDetails.lastName
      };
      UserApi.updateUserDetails(user.id, data)
        .then((result) => {
          setLoader(false)
          let userData = {
            ...result,
            userName: user.userName,
            password: user.password,
            rememberMe: user.rememberMe
          };
          UserAction.setUser(userData);
        })
        .catch((error) => {
          setLoader(false)
          setAlertMessage('Error occured while saving your details')
          showAlert(true)
        });
    }
    changeEditPersonalDetails(!editPersonalDetails);
  };

  const handleSaveAddress = () => {
    
    if (!address.first_name || !address.last_name || !address.email || !address.address_1 || !address.city || !address.postcode || !address.state || !address.country || !address.phone) 
    return false
    
    if (editAddress) {
      let data = {
        billing: {
          first_name : address.first_name,
          last_name: address.last_name,
          email: address.email,
          address_1: address.address_1,
          address_2: address.address_2 || "",
          city: address.city,
          postcode:  address.postcode,
          state: address.state,
          country: address.country,
          phone: address.phone
        },
      };

      setLoader(true)
      UserApi.updateUserDetails(user.id, data)
        .then((result) => {
          let userData = {
            ...result,
            userName: user.userName,
            password: user.password,
            rememberMe: user.rememberMe
          };
          UserAction.setUser(userData);
          setLoader(false)
        })
        .catch((error) => {
          setLoader(false)
          setAlertMessage('Error occured while saving your details')
          showAlert(true)
        });
    }
    changeEditAddress(!editAddress);
  };

  const menuList = [
    // {
    //     id: 1,
    //     name: 'Card Details',
    //     button: expandedIds.includes(1) ? (removeCard ? '' : 'Remove Card') : '',
    //     onClick: () => { changeRemoveCard(!removeCard) }
    // },
    {
      id: 2,
      name: 'Personal Details',
      button: expandedIds.includes(2)
        ? editPersonalDetails
          ? 'Save'
          : 'Edit'
        : '',
      onClick: () => {
        handleSavePersonalDetails();
      },
    },
    {
      id: 3,
      name: 'MY ADDRESSES',
      button: expandedIds.includes(3) ? (editAddress ? 'Save' : 'Edit') : '',
      onClick: () => {
        handleSaveAddress();
      },
    },
    // {
    //     id: 4,
    //     name: 'PRIVACY',
    //     onClick: () => { }
    // }
  ];
  const imageStyle = [
    {
      alignItems: 'flex-start',
      width: 30,
      height: 30,
      borderRadius: 15,
    },
  ];

  const defaultAddress = [
    {
      id: 1,
      answer: 'Use as Default',
    },
  ];

  const getUserDetails = () => {
    setLoader(true);
    UserApi.getUserDetails(user.id)
      .then((result) => {
        let userData = {
          ...result,
          userName: user.userName,
          password: user.password,
          rememberMe: user.rememberMe
        };
        UserAction.setUser(userData);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused)
      getUserDetails();
  }, [isFocused]);

  const changeAddress = (field, value) => {
    let newAddress = { ...address };
    newAddress[field] = value;
    setAddress(newAddress);
  };

  const changePersonalDetails = (field, value) => {
    let details = { ...personalDetails };
    details[field] = value;
    setPersonalDetails(details);
  };

  return (
    <>
      <Spinner visible={spinner} />
      <CustomAlert modalVisible={alert} message={alertMessage} onPressOK={() => showAlert(false)} />
      <View style={styles.titleContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Image source={Avatar} style={imageStyle} />
        </TouchableOpacity>
        <Text style={styles.title}>My Account</Text>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled>
        <ScrollView>
          <View style={{ marginTop: 10 }}>
            <FlatList
              data={menuList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut,
                      );
                      let ids = [...expandedIds];
                      if (ids.includes(item.id)) {
                        ids = ids.filter((id) => id !== item.id);
                      } else {
                        ids.push(item.id);
                      }
                      changeExpanded(ids);
                    }}>
                    <View style={styles.containerAccountTitle}>
                      <Text
                        style={{ fontWeight: 'bold', padding: 5, width: 180 }}>
                        {item.name}
                      </Text>
                      <View style={styles.titleButtonStyle}>
                        <TouchableOpacity onPress={item.onClick}>
                          <Text style={{ textDecorationLine: 'underline' }}>
                            {item.button}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {expandedIds.includes(item.id) && (
                    <>
                      {!removeCard && item.name === 'Card Details' && (
                        <View style={styles.accountBodyContainer}>
                          <Text style={styles.accountTextConatiner}>
                            Cardholder
                          </Text>
                          <Text style={styles.accountDataContainer}>
                            Karishma Kujur
                          </Text>
                          <Text style={styles.accountTextConatiner}>
                            Card number
                          </Text>
                          <Text style={styles.accountDataContainer}>
                            1234567890
                          </Text>
                          <Text style={styles.accountTextConatiner}>
                            Expiration date
                          </Text>
                          <Text style={styles.accountDataContainer}>
                            12-12-22
                          </Text>
                          <Text style={styles.accountDataContainer}>
                            BILLING ADDRESS
                          </Text>
                          <Text style={styles.accountTextConatiner}>
                            Address line 1
                          </Text>
                          <Text style={styles.accountDataContainer}>
                            12-12-22
                          </Text>
                          <Text style={styles.accountTextConatiner}>
                            Address line 2
                          </Text>
                          <Text style={styles.accountDataContainer}>
                            12-12-22
                          </Text>
                          <Text style={styles.accountTextConatiner}>City</Text>
                          <Text style={styles.accountDataContainer}>
                            12-12-22
                          </Text>
                          <Text style={styles.accountTextConatiner}>
                            Zip Code
                          </Text>
                          <Text style={styles.accountDataContainer}>
                            12-12-22
                          </Text>
                          <Text style={styles.accountTextConatiner}>
                            Market
                          </Text>
                          <Text style={styles.accountDataContainer}>US</Text>
                        </View>
                      )}
                      {!editPersonalDetails &&
                        item.name === 'Personal Details' && (
                          <View style={styles.accountBodyContainer}>
                            <Text style={styles.accountTextConatiner}>
                              Email
                            </Text>
                            <Text style={styles.accountDataContainer}>
                              {user.email}
                            </Text>
                            <Text style={styles.accountTextConatiner}>
                              First Name
                            </Text>
                            <Text style={styles.accountDataContainer}>
                              {user.firstName}
                            </Text>
                            <Text style={styles.accountTextConatiner}>
                              Last Name
                            </Text>
                            <Text style={styles.accountDataContainer}>
                              {user.lastName}
                            </Text>
                          </View>
                        )}
                      {editPersonalDetails &&
                        item.name === 'Personal Details' && (
                          <PresonalDetailsForm
                            details={personalDetails}
                            changePersonalDetails={changePersonalDetails}
                          />
                        )}
                      {!editAddress && item.name === 'MY ADDRESSES' && (
                        <View style={styles.accountBodyContainer}>
                          <Text style={styles.accountTextConatiner}>
                            Billing Address
                          </Text>
                          <Text>{user.billing.first_name}</Text>
                          <Text>{user.billing.last_name}</Text>
                          <Text>{user.billing.address_1}</Text>
                          <Text>{user.billing.address_2}</Text>
                          <Text>{user.billing.city}</Text>
                          <Text>{user.billing.state}</Text>
                          <Text>{user.billing.country}</Text>
                          <Text>{user.billing.postcode}</Text>
                          <Text>{user.billing.phone}</Text>
                        </View>
                      )}
                      {editAddress && item.name === 'MY ADDRESSES' && (
                        <AddressForm
                          address={address}
                          changeAddress={changeAddress}
                        />
                      )}
                      {item.name === 'PRIVACY' && (
                        <View style={{ padding: 20 }}>
                          <Text
                            style={{
                              textDecorationLine: 'underline',
                              marginBottom: 10,
                            }}>
                            Change password
                          </Text>
                          <Text style={{ marginBottom: 10 }}>
                            Cancel subscription
                          </Text>
                          <Text
                            style={{
                              textDecorationLine: 'underline',
                              marginBottom: 10,
                            }}>
                            Request to download my data
                          </Text>
                        </View>
                      )}
                    </>
                  )}
                </>
              )}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
const mapStateToProps = ({ user }) => {
  return {
    user: user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UserAction: bindActionCreators(UserAction, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
