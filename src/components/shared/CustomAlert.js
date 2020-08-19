import React, { Component, useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    View,
    Dimensions
} from "react-native";
import PopupDialog, {
    DialogContent,
    DialogTitle,
    Dialog,
    DialogFooter,
    DialogButton,
} from 'react-native-popup-dialog';

const fullWidth = Dimensions.get('window').width;
const CustomAlert = (props) => {
    const { modalVisible, message, onPressOK } = props;
    return (
        <Dialog
            dialogTitle={
                <View
                    style={{
                        width: 300,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text style={{ fontSize: 18, marginTop: 20, marginLeft: 10, marginRight: 10, marginBottom: 20, textAlign: 'center' }}>{message}</Text>
                </View>
            }
            visible={modalVisible}
            footer={
                <DialogFooter>
                    <DialogButton text="OK" onPress={onPressOK} />
                </DialogFooter>
            }></Dialog>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: fullWidth
    },
    modalView: {
        width: fullWidth - 40,
        padding: 5,
        alignItems: "center",
        elevation: 5,
        marginHorizontal: 50
    },
    modalText: {
        margin: 5,
        textAlign: "center",
    }
});

export default CustomAlert;