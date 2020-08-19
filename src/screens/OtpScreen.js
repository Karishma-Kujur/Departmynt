import React, { useState, useRef } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../assets/styles';
import Button from '../components/shared/Button';
import { resetPassword } from '../api/Login';
import CustomAlert from '../components/shared/CustomAlert';

const OtpScreen = (props) => {
  const [spinner, setLoader] = useState(false);
  const [otpValue, setOtpValue] = useState(['', '', '', '']);
  const [alertMessage, setAlertMessage] = useState('')
  const [alert, showAlert] = useState(false)
  const otpElementRef = useRef([null, null, null, null]);
  const { email, password } = props.route.params;

  const handleOnChange = (text, index) => {
    if (text.length === 1) {
      const primaryElement = getElement(index);
      const secondaryElement = getElement(index < 4 ? index + 1 : 0);
      if (primaryElement && secondaryElement) {
        focusNdBlur(primaryElement, secondaryElement);
      }
    } else if (!text.length) {
      const primaryElement = getElement(index);
      const secondaryElement = getElement(index < 4 ? index - 1 : 0);
      if (primaryElement && secondaryElement) {
        focusNdBlur(primaryElement, secondaryElement);
      }
    }
    const otpObject = JSON.parse(JSON.stringify(otpValue));
    otpObject[index] = text;
    setOtpValue(otpObject);
  };

  const getElement = (index) => otpElementRef.current[index];

  const focusNdBlur = (primaryElement, secondaryElement) => {
    primaryElement.blur();
    secondaryElement.focus();
  };

  const handleOnSubmit = () => {
    if (otpValue.some((item) => !item.length)) {
      return;
    }

    setLoader(true);
    let code = ''
    otpValue.forEach(item => code += item)

    resetPassword({ email: email.email, password, code:/* Number( */code/* ) */ })
      .then((response) => {
        console.log(response);
        setLoader(false);
        setAlertMessage(response.message)
        showAlert(true)
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        setAlertMessage('Otp is incorrect,Please try again.')
        showAlert(true)
      });
  };

  const redirectTo = () => {
    props.navigation.navigate('Login');
  };

  const renderOtpScreen = () => {
    return otpValue.map((item, index) => (
      <View
        style={{
          height: 60,
          width: 60,
          borderColor: 'black',
          borderBottomWidth: 2,
        }}>
        <TextInput
          ref={(ref) => (otpElementRef.current[index] = ref)}
          style={{ textAlign: 'center', fontSize: 35 }}
          onChangeText={(text) => handleOnChange(text, index)}
          value={item}
          maxLength={1}
        />
      </View>
    ));
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? "padding" : "height"} enabled>
      <CustomAlert modalVisible={alert} message={alertMessage} onPressOK={() => showAlert(false)} />
      <View style={styles.containerMatches}>
        <Spinner visible={spinner} />
        <View style={styles.top}>
          <Text style={styles.title}>Verify OTP</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            {renderOtpScreen()}
          </View>
        </View>
        <View style={{ ...styles.formButton, flex: 0 }}>
          <Button label="Verify OTP" onPress={handleOnSubmit} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OtpScreen;
