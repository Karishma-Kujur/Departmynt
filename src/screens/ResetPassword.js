import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  Text,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Button from '../components/shared/Button';
import TextInput from '../components/shared/TextInput';
import styles from '../assets/styles';

const {width, height} = Dimensions.get('window');

const ResetPassword = (props) => {
  const {navigation} = props;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const email = props.route.params;

  const handleResetPassword = () => {
    if (
      passwordError ||
      confirmPasswordError ||
      !password.length ||
      !confirmPassword.length
    ) {
      if (!passwordError) setPasswordError(!password.length);

      if (!confirmPasswordError)
        setConfirmPasswordError(!confirmPassword.length);

      return;
    }
    redirectTo();
  };
  const redirectTo = () => navigation.navigate('Otp Screen', {password, email});

  const onChangeText = (value, type) => {
    if (type === 'password') {
      setPasswordError(!value.length);
      setPassword(value);
    } else {
      setConfirmPasswordError(value !== password);
      setConfirmPassword(value);
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} 
    behavior={Platform.OS === 'ios' ? "padding" : "height"} enabled>
      <View style={styles.containerMatches}>
        <View style={styles.top}>
          <Text style={styles.title}>Reset Password</Text>
        </View>
        <ScrollView>
          <TextInput
            name="Password"
            mode="password"
            onChangeText={(text) => onChangeText(text, 'password')}
            value={password}
          />
          {passwordError && (
            <Text style={styles.errorMessage}>*Please Enter your Password</Text>
          )}
          <TextInput
            name="Confirm Password"
            mode="password"
            onChangeText={(text) => onChangeText(text, 'confirmPassword')}
            value={confirmPassword}
          />
          {confirmPasswordError && (
            <Text style={styles.errorMessage}>*Password is not matching.</Text>
          )}
        </ScrollView>
        <View style={styles.formButton}>
          <Button label="Reset Password" onPress={handleResetPassword} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;
