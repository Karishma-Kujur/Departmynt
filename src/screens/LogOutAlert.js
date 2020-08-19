import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import PopupDialog, {
  DialogContent,
  DialogTitle,
  Dialog,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';
import { bindActionCreators } from 'redux';
import { CommonActions } from '@react-navigation/native';
import * as LoginApi from '../api/Login'
import * as UserAction from '../actions/UserAction'
import Spinner from 'react-native-loading-spinner-overlay'

const LogOutAlert = (props) => {
  const { navigation, UserAction } = props
  const [spinner, setLoader] = useState(false)

  const redirectBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  const logOut = () => {

    setLoader(true)
    LoginApi.logout()
      .then((result) => {
        setLoader(false)
        UserAction.setUser({})
        navigation.navigate('Landing Page')
      })
      .catch((error) => {
        setLoader(false)
      })
  };

  return (
    <View style={{ flex: 1 }}>
      <Spinner
        visible={spinner}
      />
      <Dialog
        dialogTitle={
          <View
            style={{
              height: 80,
              width: 300,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 20, paddingTop: 20, paddingLeft: 10, paddingRight: 10, paddingBottom: 20, textAlign: 'center' }}>Are you sure you want to log out?</Text>
          </View>
        }
        visible={true}
        footer={
          <DialogFooter>
            <DialogButton text="NO" onPress={redirectBack} />
            <DialogButton text="YES" onPress={logOut} />
          </DialogFooter>
        }></Dialog>
    </View>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    UserAction: bindActionCreators(UserAction, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(LogOutAlert);
