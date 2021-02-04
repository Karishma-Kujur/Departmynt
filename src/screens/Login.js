import React, {useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import {bindActionCreators} from 'redux';
import Button from '../components/shared/Button';
import TextInput from '../components/shared/TextInput';
import Link from '../components/shared/Link';
import * as LoginApi from '../api/Login';
import * as SurveyApi from '../api/Survey';
import * as SurveyAction from '../actions/SurveyAction';
import * as UserAction from '../actions/UserAction';
import styles from '../assets/styles';
import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash';
import CustomAlert from '../components/shared/CustomAlert';
import {validationSchema} from '../schema/login';
import {withNextInputAutoFocusForm} from 'react-native-formik';

const {width, height} = Dimensions.get('window');

const LoginScreen = (props) => {
  const {navigation, UserAction, SurveyAction} = props;
  const [spinner, setLoader] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alert, showAlert] = useState(false);
  const Form = withNextInputAutoFocusForm(View);

  const loginApi = (values) => {
    const data = {
      username: values.email,
      password: values.password,
    };
    setLoader(true);
    LoginApi.login(data)
      .then((result) => {
        let userData = {
          ...result,
          userName: values.email,
          password: values.password,
          rememberMe: true,
        };
        SurveyApi.getSurveyStatus(userData.id)
          .then((answerResult) => {
            SurveyApi.getSurveyQuestions()
              .then((questionResult) => {
                setLoader(false);
                if (
                  answerResult &&
                  answerResult.length >= questionResult.length
                ) {
                  UserAction.setUser(userData);
                  navigation.navigate('Home');
                } else {
                  let answeredQuestions =
                    (answerResult && answerResult.length) || 0;
                  SurveyAction.setSurveyQuestions(
                    questionResult,
                    answeredQuestions,
                    questionResult.length,
                  );
                  navigation.navigate('Survey');
                }
              })
              .catch((error) => {
                setLoader(false);
                setAlertMessage(
                  'Some error has occured! Please contact the administrator or try after sometime.',
                );
                showAlert(true);
              });
          })
          .catch((error) => {
            setLoader(false);
            setAlertMessage(
              'Some error has occured! Please contact the administrator or try after sometime.',
            );
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
      style={{flex: 1}}
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
          <Text style={styles.centerTitle}>Login</Text>
        </View>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={(values) => loginApi(values)}
          validationSchema={validationSchema}
          render={({
            values,
            handleChange,
            errors,
            handleSubmit,
            touched,
            setFieldTouched,
          }) => {
            return (
              <>
                <ScrollView>
                  <TextInput
                    name="Email"
                    type="email"
                    onChangeText={handleChange('email')}
                    inputStyle={{
                      color: 'black',
                    }}
                    value={values.email}
                    onBlur={() => setFieldTouched('email')}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                  <TextInput
                    name="Password"
                    mode="password"
                    inputStyle={{
                      color: 'black',
                    }}
                    onChangeText={handleChange('password')}
                    value={values.password}
                    onBlur={() => setFieldTouched('password')}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'flex-end',
                      marginTop: 10,
                    }}>
                    <Link
                      label="Forgot your password ?"
                      onPress={() => navigation.navigate('Forgot Password')}
                    />
                  </View>
                </ScrollView>
                <View style={styles.formButton}>
                  <Button label="Login" onPress={handleSubmit} />
                  <View style={styles.linkContainer}>
                    <Text style={styles.label}>
                      {'Don’t have an account? '}
                    </Text>
                    <Link
                      label="Sign Up"
                      onPress={() => navigation.navigate('Sign Up')}
                    />
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

export default connect(null, mapDispatchToProps)(LoginScreen);
