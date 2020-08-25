import React, { useState, useEffect } from 'react';
import {
  View,
  Dimensions,
  Text,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from "formik";
import { withNextInputAutoFocusForm } from "react-native-formik";
import Button from '../components/shared/Button';
import TextInput from '../components/shared/TextInput';
import Link from '../components/shared/Link';
import styles from '../assets/styles';
import * as SignupAction from '../actions/SignupAction';
import * as UserAction from '../actions/UserAction';
import * as LoginApi from '../api/Login';
import * as SurveyApi from '../api/Survey';
import * as SurveyAction from '../actions/SurveyAction';
import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash';
import CustomAlert from '../components/shared/CustomAlert';
import { validationSchema } from '../schema/signup';

const { width, height } = Dimensions.get('window');

const SignUpScreen = (props) => {
  const { navigation, UserAction, SurveyAction } = props;
  const [spinner, setLoader] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alert, showAlert] = useState(false);

  const Form = withNextInputAutoFocusForm(View);

  const handleSignUpApi = (values) => {
    const data = {
      email: values.email,
      first_name: values.firstName,
      last_name: values.lastName,
      username: values.email,
      password: values.password,
    };
    setLoader(true);
    SignupAction.signupUser(data)
      .then((result) => {
        LoginApi.login(data)
          .then((userResult) => {
            let userData = {
              ...userResult,
              userName: values.email,
              password: values.password,
            };
            UserAction.setUser(userData);
            SurveyApi.getSurveyQuestions()
              .then((questionResult) => {
                setLoader(false);
                SurveyAction.setSurveyQuestions(
                  questionResult,
                  0,
                  questionResult.length,
                );
                navigation.navigate('Survey');
              })
              .catch((error) => {
                setLoader(false);
                setAlertMessage(
                  'Some error has occured! Please contact the administrator or try again after sometime.',
                );
                showAlert(true);
              });
          })
          .catch((error) => {
            setLoader(false);
            setAlertMessage(error);
            showAlert(true);
          });
      })
      .catch((error) => {
        setLoader(false);
        setAlertMessage(error);
        showAlert(true);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      <CustomAlert
        modalVisible={alert}
        message={alertMessage}
        onPressOK={() => showAlert(false)}
      />
      <View style={styles.containerMatches}>
        <Spinner visible={spinner} />
        <View style={styles.top}>
          <Text style={styles.centerTitle}>Sign Up</Text>
        </View>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          onSubmit={values => handleSignUpApi(values)}
          validationSchema={validationSchema}
          render={({ values, handleChange, errors, handleSubmit, touched, setFieldTouched }) => {
            return (
              <>
                <View style={{ height: height - 180 }}>
                  <ScrollView>
                    <TextInput
                      name="First Name"
                      onChangeText={handleChange('firstName')}
                      value={values.firstName}
                      onBlur={() => setFieldTouched('firstName')}
                    />
                    {touched.firstName && errors.firstName && (
                      <Text style={styles.errorMessage}>
                        {errors.firstName}
                      </Text>
                    )}
                    <TextInput
                      name="Last Name"
                      onChangeText={handleChange('lastName')}
                      value={values.lastName}
                      onBlur={() => setFieldTouched('lastName')}
                    />
                    {touched.lastName && errors.lastName && (
                      <Text style={styles.errorMessage}>{errors.lastName}</Text>
                    )}
                    <TextInput
                      name="Email"
                      onChangeText={handleChange('email')}
                      value={values.email}
                      onBlur={() => setFieldTouched('email')}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.errorMessage}>{errors.email}</Text>
                    )}
                    <TextInput
                      name="Password"
                      mode="password"
                      onChangeText={handleChange('password')}
                      value={values.password}
                      onBlur={() => setFieldTouched('password')}
                    />
                    {touched.password && errors.password && (
                      <Text style={styles.errorMessage}>{errors.password}</Text>
                    )}
                    <TextInput
                      name="Confirm Password"
                      mode="password"
                      onChangeText={handleChange('confirmPassword')}
                      value={values.confirmPassword}
                      onBlur={() => setFieldTouched('confirmPassword')}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <Text style={styles.errorMessage}>
                        {errors.confirmPassword}
                      </Text>
                    )}
                  </ScrollView>
                </View>
                <View style={styles.formButton}>
                  <Button label="Begin Survey" onPress={handleSubmit} />
                  <View style={styles.linkContainer}>
                    <Text style={styles.label}>{'Existing User? '}</Text>
                    <Link label="Login" onPress={() => navigation.navigate('Login')} />
                  </View>
                </View>
              </>
            );
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    UserAction: bindActionCreators(UserAction, dispatch),
    SurveyAction: bindActionCreators(SurveyAction, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(SignUpScreen);
