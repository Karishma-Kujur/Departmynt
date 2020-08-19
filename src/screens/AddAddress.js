import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import csc from 'country-state-city'
import { Chevron } from 'react-native-shapes';
import Back from '../assets/images/back.png';
import Button from '../components/shared/Button';
import * as UserApi from '../api/User';
import * as UserAction from '../actions/UserAction';
import styles from '../assets/styles';
import RNPickerSelect from 'react-native-picker-select';
import { formatList } from '../helpers'
import CustomAlert from '../components/shared/CustomAlert';

const { width, height } = Dimensions.get('window');

const AddAddress = (props) => {
  const { navigation, user, UserAction, route } = props;
  const [address, setAddress] = useState(user.billing);
  const [firstNameError, setFirstNameError] = useState(route.params && route.params.edit ? !user.billing.first_name : false);
  const [lastNameError, setLastNameError] = useState(route.params && route.params.edit ? !user.billing.last_name : false);
  const [emailError, setEmailError] = useState(route.params && route.params.edit ? !user.billing.email : false);
  const [address1Error, setAddress1Error] = useState(route.params && route.params.edit ? !user.billing.address_1 : false);
  const [address2Error, setAddress2Error] = useState(route.params && route.params.edit ? !user.billing.address_2 : false);
  const [cityError, setCityError] = useState(route.params && route.params.edit ? !user.billing.city : false);
  const [postCodeError, setPostCodeError] = useState(route.params && route.params.edit ? !user.billing.postcode : false);
  const [stateError, setStateError] = useState(route.params && route.params.edit ? !user.billing.state : false);
  const [countryError, setCountryError] = useState(route.params && route.params.edit ? !user.billing.country : false);
  const [phoneError, setPhoneError] = useState(route.params && route.params.edit ? !user.billing.phone : false);
  const [alertMessage, setAlertMessage] = useState('')
  const [alert, showAlert] = useState(false)

  const isValidPostCode = (postCode) => {
    return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(postCode);
  }

  const changeAddress = (field, value) => {
    let newAddress = { ...address };
    newAddress[field] = value;
    setAddress(newAddress);
  };

  const countryList = formatList(csc.getAllCountries());

  const handleSaveAddress = () => {
    if (firstNameError || lastNameError || emailError || address1Error || cityError || postCodeError || stateError || countryError || phoneError)
      return null
    let data = {
      billing: {
        first_name: address.first_name,
        last_name: address.last_name,
        email: address.email,
        address_1: address.address_1,
        address_2: address.address_2,
        city: address.city,
        postcode: address.postcode,
        state: address.state,
        country: address.country,
        phone: address.phone,
      },
    };
    UserApi.updateUserDetails(user.id, data)
      .then((result) => {
        let userData = {
          ...result,
          userName: user.userName,
          password: user.password
        }
        UserAction.setUser(userData);
        navigation.navigate('Checkout');
      })
      .catch((error) => {
        setAlertMessage('The billing address you entered is not valid')
        showAlert(true)
      });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? "padding" : "height"} enabled>
      <CustomAlert modalVisible={alert} message={alertMessage} onPressOK={() => showAlert(false)} />
      <View style={styles.containerMatches}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Checkout');
            }}>
            <Image
              source={Back}
              style={{ width: 24, height: 24, borderRadius: 12 }}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{route.params && route.params.edit ? "Edit Address" : "Add New Address"}</Text>
        </View>
        <View style={{ height: height - 120 }}>
          <View style={styles.accountBodyContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.accountTextConatiner}>First Name</Text>
              <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.first_name}
                onChangeText={(text) => {
                  if (text === '') {
                    setFirstNameError(true);
                  } else if (firstNameError) {
                    setFirstNameError(false);
                  }
                  changeAddress('first_name', text);
                }}
              />
              {firstNameError && (
                <Text style={styles.errorMessage}>
                  *Please Enter your First Name
                </Text>
              )}
              <Text style={styles.accountTextConatiner}>Last Name</Text>
              <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.last_name}
                onChangeText={(text) => {
                  if (text === '') {
                    setLastNameError(true);
                  } else if (lastNameError) {
                    setLastNameError(false);
                  }
                  changeAddress('last_name', text);
                }}
              />
              {lastNameError && (
                <Text style={styles.errorMessage}>
                  *Please Enter your Last Name
                </Text>
              )}
              <Text style={styles.accountTextConatiner}>Email</Text>
              <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.email}
                onChangeText={(text) => {
                  if (text === '') {
                    setEmailError(true);
                  } else if (emailError) {
                    setEmailError(false);
                  }
                  changeAddress('email', text);
                }}
              />
              {emailError && (
                <Text style={styles.errorMessage}>
                  *Please Enter your Email
                </Text>
              )}
              <Text style={styles.accountTextConatiner}>Address line 1</Text>
              <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.address_1}
                onChangeText={(text) => {
                  if (text === '') {
                    setAddress1Error(true);
                  } else if (address1Error) {
                    setAddress1Error(false);
                  }
                  changeAddress('address_1', text);
                }}
              />
              {address1Error && (
                <Text style={styles.errorMessage}>
                  *Please Enter Address Line 1
                </Text>
              )}
              <Text style={styles.accountTextConatiner}>Address line 2</Text>
              <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.address_2}
                onChangeText={(text) => {
                  if (text === '') {
                    setAddress2Error(true);
                  } else if (address2Error) {
                    setAddress2Error(false);
                  }
                  changeAddress('address_2', text);
                }}
              />
              <Text style={styles.accountTextConatiner}>Zip code</Text>
              <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.postcode}
                keyboardType='numeric'
                onChangeText={(text) => {
                  if (text === '' || !isValidPostCode(text)) {
                    setPostCodeError(true);
                  } else if (postCodeError) {
                    setPostCodeError(false);
                  }
                  changeAddress('postcode', text);
                }}
              />
              {postCodeError && (
                <Text style={styles.errorMessage}>
                  *Please enter your postal code.
                </Text>
              )}
              <Text style={styles.accountTextConatiner}>Country</Text>
              <RNPickerSelect
                value={address.country}
                onValueChange={(value) => {
                  if (value === '') {
                    setCountryError(true);
                  } else if (countryError) {
                    setCountryError(false);
                  }
                  changeAddress('country', value)
                }}

                items={countryList}
                placeholder={{}}
                useNativeAndroidPickerStyle={false}
                Icon={() => {
                  return <Chevron size={1} color="gray" />;
                }}
                style={{
                  inputIOS: {
                    fontSize: 16,
                    paddingVertical: 2,
                    paddingHorizontal: 5,
                    borderWidth: 1,
                    color: 'black',
                    paddingRight: 20,
                  },
                  inputAndroid: {
                    fontSize: 16,
                    paddingVertical: 2,
                    paddingHorizontal: 5,
                    color: 'black',
                    paddingRight: 20,
                  },
                  iconContainer: {
                    top: 10,
                    right: 7,
                  },
                }}
              />
              {countryError && (
                <Text style={styles.errorMessage}>
                  *Please Enter your Country Name
                </Text>
              )}
              <Text style={styles.accountTextConatiner}>State</Text>
              <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.state}
                onChangeText={(text) => {
                  if (text === '') {
                    setStateError(true);
                  } else if (stateError) {
                    setStateError(false);
                  }
                  changeAddress('state', text);
                }}
              />
              {stateError && (
                <Text style={styles.errorMessage}>
                  *Please Enter your State Name
                </Text>
              )}
              <Text style={styles.accountTextConatiner}>City</Text>
              <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.city}
                onChangeText={(text) => {
                  if (text === '') {
                    setCityError(true);
                  } else if (cityError) {
                    setCityError(false);
                  }
                  changeAddress('city', text);
                }}
              />
              {cityError && (
                <Text style={styles.errorMessage}>*Please Enter City Name</Text>
              )}
              <Text style={styles.accountTextConatiner}>Phone</Text>
              <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.phone}
                keyboardType='numeric'
                onChangeText={(text) => {
                  if (text === '') {
                    setPhoneError(true);
                  } else if (phoneError) {
                    setPhoneError(false);
                  }
                  changeAddress('phone', text);
                }}
              />
              {phoneError && (
                <Text style={styles.errorMessage}>
                  *Please Enter your Phone Number
                </Text>
              )}
            </ScrollView>
          </View>
        </View>
        <View style={styles.bottom}>
          <Button label={route.params && route.params.edit ? "Edit Address" : "Add Address"} onPress={handleSaveAddress} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UserAction: bindActionCreators(UserAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);
