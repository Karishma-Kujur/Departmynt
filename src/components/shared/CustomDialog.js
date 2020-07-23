import React, { Component, useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    View,
    Dimensions
} from "react-native";

const fullWidth = Dimensions.get('window').width;
const CustomDialog = (props) => {
    const { modalVisible, message } = props;
    return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{message}</Text>
                    </View>
                </View>
            </Modal>
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
        width: '100%',
        backgroundColor: "white",
        borderRadius: 15,
        padding: 5,
        alignItems: "center",
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        margin: 5,
        textAlign: "center",
        fontWeight: 'bold',
        width: '100%'
    }
});

export default CustomDialog;