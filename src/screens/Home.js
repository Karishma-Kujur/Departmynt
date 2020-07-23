import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native'
import { View, Dimensions, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native'
import styles from '../assets/styles';
import Avatar from '../assets/images/avatar.jpeg'
import Spinner from 'react-native-loading-spinner-overlay'
import * as ProductAction from '../actions/ProductAction'
import * as ProductApi from '../api/Products'
import * as LoginApi from '../api/Login'
import * as UserAction from '../actions/UserAction'
import * as UserApi from '../api/User'

const { width, height } = Dimensions.get("window");

const HomeScreen = (props) => {
    const { navigation, UserAction, user, ProductAction } = props
    const [spinner, setLoader] = useState('')
    const menuList = [
        {
            name: 'View Rack',
            onClick: () => { navigation.navigate('View Rack') }
        },
        {
            name: 'View Tote',
            onClick: () => { navigation.navigate('View Tote') }
        },
        {
            name: 'View Favorites',
            onClick: () => { navigation.navigate('View Favorites') }
        },
        // {
        //     name: 'My Chart',
        //     onClick: () => { navigation.navigate('My Chart') }
        // },
        {
            name: 'Order History',
            onClick: () => { navigation.navigate('Order History') }
        },
        {
            name: 'My Account',
            onClick: () => { navigation.navigate('My Account') }
        },
        {
            name: 'Log Out',
            onClick: () => {
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
            }
        }
    ]
    const imageStyle = [
        {
            alignItems: 'flex-start',
            width: 30,
            height: 30,
            borderRadius: 15
        }
    ];

    const getUserDetails = () => {
        setLoader(true)
        UserApi.getUserDetails(user.id)
            .then((result) => {
                setLoader(false)
                let userData = {
                    ...result,
                    userName: user.userName,
                    password: user.password
                }
                UserAction.setUser(userData)

            })
            .catch((error) => {
                setLoader(false)
            })
    }

    const getAllProducts = () => {
        setLoader(true)
        ProductAction.setProducts([])
        ProductApi.getProducts()
            .then((result) => {
                setLoader(false)
                ProductAction.setProducts(result)

            })
            .catch((error) => {
                setLoader(false)
            })
    }

    const isFocused = useIsFocused()
    useEffect(() => {
        getUserDetails()
        getAllProducts()
    }, [isFocused])

    return (
        <>
            <Spinner
                visible={spinner}
            />
            <ScrollView>
                <View style={styles.titleContainer}>
                    <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
                        <Image source={Avatar} style={imageStyle} />
                    </TouchableOpacity>
                </View>
                <View style={styles.homeContainer}>
                    <Text style={styles.homeTitle}>Hello, Beautiful</Text>
                    <FlatList
                        data={menuList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={item.onClick}>
                                <View style={styles.containerMessage}>
                                    <Text style={styles.homeText}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </ScrollView>
        </>
    )
}
const mapStateToProps = ({ user }) => {
    return {
        user
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        UserAction: bindActionCreators(UserAction, dispatch),
        ProductAction: bindActionCreators(ProductAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)