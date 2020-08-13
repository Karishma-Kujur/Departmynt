import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native'
import { View, Dimensions, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native'
import styles from '../assets/styles';
import OrderedItem from './OrderedItem'
import TrackOrder from './TrackOrder'
import Avatar from '../assets/images/avatar.jpeg'
import * as ToteAction from '../actions/ToteAction';
import * as ToteApi from '../api/Tote'
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get("window");

const OrderDetails = (props) => {
    const { navigation, ToteAction, toteItems } = props
    const [spinner, setLoader] = useState('')
    const [trackOrder, setTrackOrder] = useState(false)
    const imageStyle = [
        {
            alignItems: 'flex-start',
            width: 30,
            height: 30,
            borderRadius: 15
        }
    ];

    const getTotes = () => {
        setLoader(true)
        ToteApi.getTotes()
            .then((result) => {
                setLoader(false)
                ToteAction.setTotes(result)

            })
            .catch((error) => {
                setLoader(false)
                Alert.alert('Invalid User name or Password', 'Please enter valid user name and password')
            })
    }

    const isFocused = useIsFocused()
    useEffect(() => {
        if(isFocused)
            getTotes()
    }, [isFocused])

    const handleRefreshTote = () => {
        getTotes()
    }

    return (
        <>
            {trackOrder ? <TrackOrder closeTackOrder={() => setTrackOrder(false)} /> :
                <View style={styles.containerMatches}>
                    <Spinner
                        visible={spinner}
                    />
                    <View style={styles.titleContainer}>
                        <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
                            <Image source={Avatar} style={imageStyle} />
                        </TouchableOpacity>
                        <Text style={styles.title}>My Orders</Text>
                    </View>
                    <ScrollView>
                        <FlatList
                            data={toteItems}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <OrderedItem
                                    id={item.id}
                                    image={item.image}
                                    name={item.name}
                                    price={item.price}
                                    description={item.description}
                                    quantity={item.quantity}
                                    toteEdited={handleRefreshTote}
                                    setTrackOrder={() => setTrackOrder(true)}
                                />
                            )}
                        />
                    </ScrollView>
                </View>}
        </>
    )
}

const mapStateToProps = ({ tote }) => {
    return {
        toteItems: tote
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        ToteAction: bindActionCreators(ToteAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails)

