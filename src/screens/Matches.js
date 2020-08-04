import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native'
import { View, StyleSheet, Dimensions, Text, Animated, TouchableOpacity, Image } from 'react-native'
import * as Progress from 'react-native-progress'
import CardStack, { Card } from 'react-native-card-stack-swiper'
import CardItem from './CardItem'
import Avatar from '../assets/images/avatar.jpeg'
import styles from '../assets/styles';
import * as ProductAction from '../actions/ProductAction';
import * as ProductApi from '../api/Products'
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get("window");

const MatchesScreen = (props) => {
    const { navigation, products, ProductAction, user } = props
    const [progressStatus, changeProgressStatus] = useState(0)
    const [count, changeCount] = useState(1)
    const [spinner, setLoader] = useState('')

    const imageStyle = [
        {
            alignItems: 'flex-start',
            width: 30,
            height: 30,
            borderRadius: 15
        }
    ];
    const getProducts = () => {
        setLoader(true)
        ProductAction.setMatches([])
        ProductApi.getProductIds(user.id)
            .then((result) => {
                ProductApi.getProducts(result.data)
                    .then((data) => {
                        setLoader(false)
                        ProductAction.setMatches(data)

                    })
                    .catch((error) => {
                        setLoader(false)
                    })

            })
            .catch((error) => {
                setLoader(false)
            })

    }

    const handleRefreshMatches = () => {
        getProducts()
    }

    const isFocused = useIsFocused()
    useEffect(() => {
        getProducts()
    }, [isFocused])

    useEffect(() => {
        if (products.length > 0) {
            changeProgressStatus(1 / products.length)
            let value = products.length <= 2 ? 1 : 2
            changeCount(value)
        }
    }, [products])


    return (
        <>
            <Spinner
                visible={spinner}
            />
            <View style={styles.titleContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.openDrawer()
                    }}>
                    <Image source={Avatar} style={imageStyle} />
                </TouchableOpacity>
                <View style={{ height: 8, alignItems: 'center' }}>
                    <Progress.Bar progress={progressStatus} width={width - 60} />
                </View>
            </View>
            {products.length > 0 &&
                <CardStack
                    loop={true}
                    verticalSwipe={false}
                    onSwipedLeft={() => {
                        changeProgressStatus(count / products.length)
                        let value = products.length <= count ? 1 : count + 1
                        changeCount(value)
                    }}
                    onSwipedRight={() => {
                        changeProgressStatus(count / products.length)
                        let value = products.length <= count ? 1 : count + 1
                        changeCount(value)
                    }}
                    renderNoMoreCards={() => null}
                    ref={swiper => (this.swiper = swiper)}>
                    {products.map((item, index) => (
                        <Card key={index}>
                            <CardItem
                                images={item.images}
                                name={item.name}
                                price={item.price}
                                productId={item.id}
                                attributes={item.attributes}
                                user={user}
                                handleRefresh={handleRefreshMatches}
                            />
                        </Card>))}
                </CardStack>
            }
        </>
    )
}

const mapStateToProps = ({ products, user }) => {
    return {
        products: products.matches || [],
        user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        ProductAction: bindActionCreators(ProductAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MatchesScreen)
