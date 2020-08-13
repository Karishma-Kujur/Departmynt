import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import styles from '../assets/styles';
import Spinner from 'react-native-loading-spinner-overlay';
import TextInput from '../components/shared/TextInput';
import Button from '../components/shared/Button';
import {forgotPassword} from '../api/Login';

const {width, height} = Dimensions.get('window');

const ForgotPassword = (props) => {
  const [spinner, setLaoder] = useState(false);
  const [email, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState(false);
  const validator = {
    email: {
      type: 'string',
      field: 'email',
      onError: setUserNameError,
      onChange: setUserName,
    },
  };

  const validateInput = (value, setError) => {
    if (value === '') {
      setError(true);
    }
  };

  const redirectTo = () => props.navigation.navigate( 'Reset Password' ,{email});

  const handleOnSubmit = () => {
    validateInput(email, setUserNameError);

    if (!email) {
      return null;
    }

    setLaoder(true);
    forgotPassword({email})
      .then((response) => {
        console.log(response);
        setLaoder(false);
        Alert.alert(
            "Alert",
            `${response.message}`,
            [
              { text: "OK", onPress: () => redirectTo() }
            ],
            { cancelable: false }
          );
       
      })
      .catch((err) => {
        setLaoder(false);
        Alert.alert(
            "Alert",
            `${err.message}`,
            [
              { text: "OK", onPress: () => {} }
            ],
            { cancelable: false }
          );
       
      });
  };

  const onChangeText = (value, validatorObj, onChange) => {
    if (validatorObj) {
      if (value !== '') {
        validatorObj.onError(false);
      } else {
        validatorObj.onError(true);
      }
      validatorObj.onChange(value);
    } else {
      onChange(value);
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} 
    behavior = {Platform.OS === 'ios' ? "padding" : "height"} enabled>
      <View style={styles.containerMatches}>
        <Spinner visible={spinner} />

        <View style={styles.top}>
          <Text style={styles.centerTitle}>Forgot Password</Text>
        </View>
        <ScrollView>
          <TextInput
            name="Email"
            onChangeText={(text) => onChangeText(text, validator.email)}
            value={email}
          />
          {userNameError && (
            <Text style={styles.errorMessage}>*Please Enter your Email</Text>
          )}
        </ScrollView>
        <View style={styles.formButton}>
          <Button label="Send OTP" onPress={handleOnSubmit} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
