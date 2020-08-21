import React, { useState } from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import csc from 'country-state-city'
import RadioButton from '../components/shared/RadioButton';
import styles from '../assets/styles';
import { ScrollView } from 'react-native-gesture-handler';
import { Chevron } from 'react-native-shapes';
import RNPickerSelect from 'react-native-picker-select';
import { formatList } from '../helpers'

const defaultAddress = [
  {
    id: 1,
    answer: 'Use as Default',
  },
];

const AddressForm = (props) => {
  const { changeAddress, address } = props;
  const [firstNameError, setFirstNameError] = useState(!address.first_name);
  const [lastNameError, setLastNameError] = useState(!address.last_name);
  const [emailError, setEmailError] = useState(!address.email);
  const [address1Error, setAddress1Error] = useState(!address.address_1);
  const [address2Error, setAddress2Error] = useState(!address.address_2);
  const [cityError, setCityError] = useState(!address.city);
  const [postCodeError, setPostCodeError] = useState(!address.postcode);
  const [stateError, setStateError] = useState(!address.state);
  const [countryError, setCountryError] = useState(!address.country);
  const [phoneError, setPhoneError] = useState(!address.phone);

  const countryList = formatList(csc.getAllCountries());
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? "padding" : "height"} enabled>
      <View style={styles.accountBodyContainer}>
        <ScrollView>
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
          <Text style={styles.accountTextConatiner}>Zip code</Text>
          <TextInput
            style={styles.accountTextInput}
            secureTextEntry={false}
            value={address.postcode}
            keyboardType='numeric'
            onChangeText={(text) => {
              if (text === '') {
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
            useNativeAndroidPickerStyle={false}
            placeholder={{}}
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
    </KeyboardAvoidingView>
  );
};
export default AddressForm;
