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
import { Formik } from "formik";
import { withNextInputAutoFocusForm } from "react-native-formik";
import * as UserApi from '../api/User';
import * as UserAction from '../actions/UserAction';
import styles from '../assets/styles';
import RNPickerSelect from 'react-native-picker-select';
import { formatList } from '../helpers'
import CustomAlert from '../components/shared/CustomAlert';
import Spinner from 'react-native-loading-spinner-overlay';
import { validationSchema } from '../schema/address'

const { width, height } = Dimensions.get('window');

const AddAddress = (props) => {
  const { navigation, user, UserAction, route } = props;
  const [alertMessage, setAlertMessage] = useState('')
  const [alert, showAlert] = useState(false)
  const [spinner, setLoader] = useState(false);

  const countryList = formatList(csc.getAllCountries());

  const initialValues = {
    firstName: user.billing.first_name || '',
    lastName: user.billing.last_name || '',
    email: user.billing.email || '',
    address1: user.billing.address_1 || '',
    address2: user.billing.address_2 || '',
    postcode: user.billing.postcode || '',
    state: user.billing.state || '',
    city: user.billing.city || '',
    country: user.billing.country || countryList[0].value || '',
    phone: user.billing.phone || ''
  }

  const Form = withNextInputAutoFocusForm(View);

  const handleSaveAddress = (values) => {
    setLoader(true)
    let data = {
      billing: {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        address_1: values.address1,
        address_2: values.address2,
        city: values.city,
        postcode: values.postcode,
        state: values.state,
        country: values.country,
        phone: values.phone,
      },
    };
    UserApi.updateUserDetails(user.id, data)
      .then((result) => {
        setLoader(false)
        let userData = {
          ...result,
          userName: user.userName,
          password: user.password,
          rememberMe: user.rememberMe
        }
        UserAction.setUser(userData);
        navigation.navigate('Checkout');
      })
      .catch((error) => {
        setLoader(false)
        setAlertMessage(error)
        showAlert(true)
      });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? "padding" : "height"} enabled>
      <Spinner visible={spinner} />
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
        <Formik
          initialValues={initialValues}
          onSubmit={values => handleSaveAddress(values)}
          validationSchema={validationSchema}
          render={({ values, handleChange, errors, handleSubmit, touched, setFieldTouched }) => {
            return (
              <>
                <View style={{ height: height - 120 }}>
                  <View style={styles.accountBodyContainer}>
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                    >
                      <Text style={styles.accountTextConatiner}>First Name</Text>
                      <TextInput
                        style={styles.accountTextInput}
                        secureTextEntry={false}
                        value={values.firstName}
                        onChangeText={handleChange('firstName')}
                        onBlur={() => setFieldTouched('firstName')}
                      />
                      {touched.firstName && errors.firstName && (
                        <Text style={styles.errorMessage}>
                          {errors.firstName}
                        </Text>
                      )}
                      <Text style={styles.accountTextConatiner}>Last Name</Text>
                      <TextInput
                        style={styles.accountTextInput}
                        secureTextEntry={false}
                        value={values.lastName}
                        onChangeText={handleChange('lastName')}
                        onBlur={() => setFieldTouched('lastName')}
                      />
                      {touched.lastName && errors.lastName && (
                        <Text style={styles.errorMessage}>
                          {errors.lastName}
                        </Text>
                      )}
                      <Text style={styles.accountTextConatiner}>Email</Text>
                      <TextInput
                        style={styles.accountTextInput}
                        secureTextEntry={false}
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={() => setFieldTouched('email')}
                      />
                      {touched.email && errors.email && (
                        <Text style={styles.errorMessage}>
                          {errors.email}
                        </Text>
                      )}
                      <Text style={styles.accountTextConatiner}>Address line 1</Text>
                      <TextInput
                        style={styles.accountTextInput}
                        secureTextEntry={false}
                        value={values.address1}
                        onChangeText={handleChange('address1')}
                        onBlur={() => setFieldTouched('address1')}
                      />
                      {touched.address1 && errors.address1 && (
                        <Text style={styles.errorMessage}>
                          {errors.address1}
                        </Text>
                      )}
                      <Text style={styles.accountTextConatiner}>Address line 2</Text>
                      <TextInput
                        style={styles.accountTextInput}
                        secureTextEntry={false}
                        value={values.address2}
                        onChangeText={handleChange('address2')}
                        onBlur={() => setFieldTouched('address2')}
                      />
                      <Text style={styles.accountTextConatiner}>Zip code</Text>
                      <TextInput
                        style={styles.accountTextInput}
                        secureTextEntry={false}
                        value={values.postcode}
                        keyboardType='numeric'
                        onChangeText={handleChange('postcode')}
                        onBlur={() => setFieldTouched('postcode')}
                      />
                      {touched.postcode && errors.postcode && (
                        <Text style={styles.errorMessage}>
                          {errors.postcode}
                        </Text>
                      )}
                      <Text style={styles.accountTextConatiner}>Country</Text>
                      <RNPickerSelect
                        value={values.country}
                        onValueChange={handleChange('country')}

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
                            color: 'black',
                            borderWidth: 1,
                          },
                          iconContainer: {
                            top: 10,
                            right: 10,
                          },
                        }}
                      />
                      {touched.country && errors.country && (
                        <Text style={styles.errorMessage}>
                          {errors.country}
                        </Text>
                      )}
                      <Text style={styles.accountTextConatiner}>State</Text>
                      <TextInput
                        style={styles.accountTextInput}
                        secureTextEntry={false}
                        value={values.state}
                        onChangeText={handleChange('state')}
                        onBlur={() => setFieldTouched('state')}
                      />
                      {touched.state && errors.state && (
                        <Text style={styles.errorMessage}>
                          {errors.state}
                        </Text>
                      )}
                      <Text style={styles.accountTextConatiner}>City</Text>
                      <TextInput
                        style={styles.accountTextInput}
                        secureTextEntry={false}
                        value={values.city}
                        onChangeText={handleChange('city')}
                        onBlur={() => setFieldTouched('city')}
                      />
                      {touched.city && errors.city && (
                        <Text style={styles.errorMessage}>{errors.city}</Text>
                      )}
                      <Text style={styles.accountTextConatiner}>Phone</Text>
                      <TextInput
                        style={styles.accountTextInput}
                        secureTextEntry={false}
                        value={values.phone}
                        keyboardType='numeric'
                        onChangeText={handleChange('phone')}
                        onBlur={() => setFieldTouched('phone')}
                      />
                      {touched.phone && errors.phone && (
                        <Text style={styles.errorMessage}>
                          {errors.phone}
                        </Text>
                      )}
                    </ScrollView>
                  </View>
                </View>
                <View style={styles.bottom}>
                  <Button label={route.params && route.params.edit ? "Edit Address" : "Add Address"} onPress={handleSubmit} />
                </View>
              </>
            );
          }}
        />
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
