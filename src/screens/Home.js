import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native'
import { View, Dimensions, Text, ScrollView, TouchableOpacity, FlatList, Image, ImageBackground } from 'react-native'
import styles from '../assets/styles/home';
import commonStyles from '../assets/styles'
import Logo from '../assets/images/logo.png'
import HomeBackground from '../assets/images/home.jpg'
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
            width: 50,
            height: 50,
            borderRadius: 5
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
        <ImageBackground source={HomeBackground} style={styles.backgroudContainer}>
            <Spinner
                visible={spinner}
            />
            <ScrollView>
                <View style={commonStyles.titleContainer}>
                    <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
                        <Image source={Logo} style={imageStyle} />
                    </TouchableOpacity>
                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.homeContainer}>
                        <Text style={styles.homeTitle}>Hello, Beautiful</Text>
                        <View style={styles.line} />
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
                </View>
            </ScrollView>
        </ImageBackground>
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