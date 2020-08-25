import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native'
import { View, StyleSheet, Dimensions, Text, Animated, TouchableOpacity, Image } from 'react-native'
import * as Progress from 'react-native-progress'
import CardItem from './CardItem'
import Avatar from '../assets/images/avatar.jpeg'
import styles from '../assets/styles';
import * as ProductAction from '../actions/ProductAction';
import * as ProductApi from '../api/Products'
import Spinner from 'react-native-loading-spinner-overlay';
import Swiper from 'react-native-deck-swiper'

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
        if (isFocused)
            getProducts()
    }, [isFocused])

    useEffect(() => {
        if (products.length > 0) {
            changeProgressStatus(1 / products.length)
            changeCount(1)
        }
    }, [products])


    return (
        <View style={{ backgroundColor: 'white' }}>
            <Spinner visible={spinner} />
            <View style={styles.titleContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.openDrawer()
                    }}>
                    <Image source={Avatar} style={imageStyle} />
                </TouchableOpacity>
                <View style={{ height: 8, width: width - 60, alignItems: 'center' }}>
                    <Progress.Bar progress={progressStatus} width={width - 70} />
                </View>
            </View>
            {products.length > 0 &&
                <Swiper
                    cards={products}
                    renderCard={(card) => {
                        return (
                            <CardItem
                                images={card.images}
                                name={card.name}
                                price={card.price}
                                productId={card.id}
                                attributes={card.attributes}
                                user={user}
                                handleRefresh={handleRefreshMatches}
                            />
                        )
                    }}
                    onSwipedLeft={(index) => {
                        let value = products.length <= count ? 1 : count + 1
                        changeProgressStatus(value / products.length)
                        console.log(value)
                        changeCount(value)
                    }}
                    onSwipedRight={(index) => {
                        let value = count <= 1 ? products.length : count - 1
                        changeProgressStatus(value / products.length)
                        console.log(value)
                        changeCount(value)
                    }}
                    onSwiped={(cardIndex) => { console.log(cardIndex) }}
                    onSwipedAll={() => { console.log('onSwipedAll') }}
                    goBackToPreviousCardOnSwipeRight={true}
                    cardIndex={0}
                    infinite={true}
                    verticalSwipe={false}
                    useViewOverflow={false}
                    backgroundColor={'white'}
                    cardVerticalMargin={0}
                    cardHorizontalMargin={0}
                    marginTop={50}
                >
                </Swiper>
            }
        </View>
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
