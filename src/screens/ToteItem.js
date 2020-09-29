import React, { useState, useEffect } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { Chevron } from 'react-native-shapes';
import styles from '../assets/styles';
import NoImage from '../assets/images/noImage.png';
import AddToFavorite from '../assets/images/favorite.jpeg';
import AddToBag from '../assets/images/bag.jpeg';
import * as ToteApi from '../api/Tote';
import * as ProductsApi from '../api/Products';
import RNPickerSelect from 'react-native-picker-select';
import Spinner from 'react-native-loading-spinner-overlay';

const ToteItem = ({
  image,
  matches,
  name,
  isFavorite,
  price,
  quantity,
  id,
  productId,
  user,
  attributes,
  toteEdited,
  size,
  color,
  stockQuantity
}) => {
  const [selectedQuantity, changeQuantity] = useState(quantity);
  const [selectedSize, changeSize] = useState('');
  const [selectedColor, changeColor] = useState('');
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [showDialog, changeShowDialog] = useState(false);
  const [quantities, setQuantities] = useState([])
  const [spinner, setLoader] = useState('')
  // Custom styling
  const fullWidth = Dimensions.get('window').width;
  const favoriteImageStyle = [
    {
      width: 15,
      height: 15,
    },
  ];
  const bagImageStyle = [
    {
      width: 20,
      height: 20,
    },
  ];
  const imageStyle = [
    {
      borderRadius: 8,
      width: fullWidth / 2 - 30,
      height: 170,
      marginRight: 10,
    },
  ];

  const toteContainer = [
    {
      flex: 1,
      flexDirection: 'row',
    },
  ];

  const descriptionStyle = [
    {
      width: fullWidth / 2 - 30,
    },
  ];

  useEffect(() => {
    if (attributes && attributes.length) {
      attributes.forEach((element) => {
        if (element.name === 'size') {
          setSizes(element.options);
          changeSize(size ? size.toUpperCase() : element.options[0].value);
        } else if (element.name === 'color') {
          setColors(element.options);
          changeColor(color ? color : element.options[0].value);
        }
      });
    }
    if (stockQuantity) {
      setQuantities(stockQuantity)
    }
  }, [attributes, stockQuantity]);

  const getVariantId = async (size, color) => {
    return ToteApi.getVariants(productId)
      .then((result) => {
        let variationId = null;
        result.forEach((variation) => {
          if (
            size &&
            color &&
            size.toLowerCase() === variation.size &&
            color.toLowerCase() === variation.color
          )
            variationId = variation.variationId;
          else if (size && size.toLowerCase() === variation.size)
            variationId = variation.variationId;
          else if (color && color.toLowerCase() === variation.color)
            variationId = variation.variationId;
        });
        return variationId;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  };

  const handleEditToteProduct = async (newQuantity, size, color) => {
    setLoader(true)
    let variantId = await getVariantId(size, color);
    const data = {
      userId: user.id,
      productId: productId,
      quantity: newQuantity,
      variation_id: variantId
    };
    if (newQuantity === '0') {
      ToteApi.removeToteItem(data)
        .then((result) => {
          setLoader(false)
          changeQuantity(newQuantity);
          toteEdited();
        })
        .catch((error) => { });
    } else {
      ToteApi.editTote(data)
        .then((result) => {
          setLoader(false)
          changeQuantity(newQuantity);
          toteEdited();
        })
        .catch((error) => {
          setLoader(false)
        });
    }
  };

  const handleMoveToBag = () => {
    setLoader(true)
    const data = {
      user_id: user.id,
      product_id: productId,
      quantity: 1,
    };
    ToteApi.addToTote(data)
      .then((result) => {
        ProductsApi.removeFromFavorites(productId, user.id)
          .then((result) => {
            setLoader(false)
            toteEdited();
          })
          .catch((error) => {
            setLoader(false)
          });
      })
      .catch((error) => {
        setLoader(false)
      });
  };

  const handleMoveToFavorites = () => {
    setLoader(true)
    const data = {
      userId: user.id,
      productId: productId
    };
    ToteApi.removeToteItem(data)
      .then((result) => {
        ProductsApi.saveProducts({ productId: productId })
          .then((result) => {
            setLoader(false)
            toteEdited();
          })
          .catch((error) => {
            setLoader(false)
          });
      })
      .catch((error) => {
        setLoader(false)
      });
  };

  return (
    <View style={styles.toteCardItem}>
      <Spinner
        visible={spinner}
      />
      <View style={toteContainer}>
        <View>
          <Image
            source={
              image
                ? {
                  uri: image,
                }
                : NoImage
            }
            style={imageStyle}
          />
        </View>
        <View style={descriptionStyle}>
          <Text style={styles.nameToteItem}>{name}</Text>
          <Text style={styles.priceToteItem}>{'$ ' + (price || '0')}</Text>
          {isFavorite && (
            <View style={styles.favoriteActionContainer}>
              <View style={{ borderWidth: 1, padding: 5 }}>
                <TouchableOpacity onPress={handleMoveToBag}>
                  <Image source={AddToBag} style={bagImageStyle} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
      <View>
        {!isFavorite && (
          <View style={styles.toteActionContainer}>
            <View style={{ borderWidth: 1, padding: 5 }}>
              <TouchableOpacity onPress={handleMoveToFavorites}>
                <Image source={AddToFavorite} style={favoriteImageStyle} />
              </TouchableOpacity>
            </View>
            {sizes && sizes.length ? (
              <View>
                <Text>Size</Text>
                <View>
                  <RNPickerSelect
                    value={selectedSize}
                    onValueChange={(value) => {
                      changeSize(value)
                      if (Platform.OS === 'android')
                        handleEditToteProduct(selectedQuantity, value, selectedColor)
                    }}
                    onDonePress={(value) => {handleEditToteProduct(selectedQuantity, value, selectedColor)}}
                    items={sizes}
                    useNativeAndroidPickerStyle={false}
                    placeholder={{}}
                    Icon={() => {
                      return <Chevron size={1} color="gray" />;
                    }}
                    style={{
                      inputIOS: {
                        fontSize: 16,
                        paddingVertical: 2,
                        paddingHorizontal: 5,
                        borderWidth: 1,
                        color: 'black',
                        paddingRight: 20,
                      },
                      inputAndroid: {
                        fontSize: 16,
                        paddingVertical: 2,
                        paddingHorizontal: 5,
                        color: 'black',
                        paddingRight: 20,
                      },
                      iconContainer: {
                        top: 10,
                        right: 7,
                      },
                    }}
                  />
                </View>
              </View>
            ) : (
                <></>
              )}
            {colors && colors.length ? (
              <View>
                <Text>Color</Text>
                <View>
                  <RNPickerSelect
                    value={selectedColor}
                    onValueChange={(value) => {
                      changeColor(value)
                      if (Platform.OS === 'android')
                        handleEditToteProduct(selectedQuantity, selectedSize, value)
                    }}
                    onDonePress={(value) => {handleEditToteProduct(selectedQuantity, selectedSize, value)}}
                    items={colors}
                    placeholder={{}}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => {
                      return <Chevron size={1} color="gray" />;
                    }}
                    style={{
                      inputIOS: {
                        fontSize: 16,
                        paddingVertical: 2,
                        paddingHorizontal: 5,
                        borderWidth: 1,
                        color: 'black',
                        paddingRight: 20,
                      },
                      inputAndroid: {
                        fontSize: 16,
                        paddingVertical: 2,
                        paddingHorizontal: 5,
                        color: 'black',
                        paddingRight: 20,
                      },
                      iconContainer: {
                        top: 10,
                        right: 7,
                      },
                    }}
                  />
                </View>
              </View>
            ) : (
                <></>
              )}
            {quantities && quantities.length ? (
              <View>
                <Text>Qty</Text>
                <View>
                  <RNPickerSelect
                    value={selectedQuantity}
                    onValueChange={(value) => {
                      changeQuantity(value)
                      if (Platform.OS === 'android')
                        handleEditToteProduct(value, selectedSize, selectedColor)
                    }}
                    onDonePress={(value) => {handleEditToteProduct(value, selectedSize, selectedColor)}}
                    items={quantities}
                    useNativeAndroidPickerStyle={false}
                    placeholder={{}}
                    Icon={() => {
                      return <Chevron size={1} color="gray" />;
                    }}
                    style={{
                      inputIOS: {
                        fontSize: 16,
                        paddingVertical: 2,
                        paddingHorizontal: 5,
                        borderWidth: 1,
                        color: 'black',
                        paddingRight: 20,
                      },
                      inputAndroid: {
                        fontSize: 16,
                        paddingVertical: 2,
                        paddingHorizontal: 5,
                        color: 'black',
                        paddingRight: 20,
                      },
                      iconContainer: {
                        top: 10,
                        right: 7,
                      },
                    }}
                  />
                </View>
              </View>
            ) : (
                <></>
              )}
          </View>
        )}
      </View>
    </View>
  );
};

export default ToteItem;
