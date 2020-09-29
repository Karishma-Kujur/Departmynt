import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import NoImage from '../assets/images/noImage.png';
import Similar from '../assets/images/similar.png';
import styles from '../assets/styles';
import * as ProductsApi from '../api/Products';
import * as ToteApi from '../api/Tote';
import CustomDialog from '../components/shared/CustomDialog';
import PopupDialog, {
  DialogContent,
  DialogTitle,
} from 'react-native-popup-dialog';
import Spinner from 'react-native-loading-spinner-overlay';

const CardItem = ({
  actions,
  images,
  matches,
  name,
  onPressBagIt,
  variant,
  price,
  productId,
  attributes,
  user,
  handleRefresh,
}) => {
  // Custom styling
  const fullWidth = Dimensions.get('window').width;
  const fullHeight = Dimensions.get('window').height;
  const imageStyle = [
    {
      borderRadius: 8,
      width: fullWidth - 20,
      height: fullHeight - 350,
    },
  ];

  const similarImageStyle = [
    {
      width: fullWidth / 2 - 20,
      height: 200,
      margin: 2,
      borderRadius: 8,
    },
  ];

  const similarIconStyle = [
    {
      width: 25,
      height: 25,
    },
  ];

  const [showSize, changeShowSize] = useState(false);
  const [showColor, changeShowColor] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialog, showDialog] = useState(false);
  const [spinner, setLoader] = useState('');
  const [suggestionDialog, showSuggestionDialog] = useState(false);
  const [image, changeImage] = useState(images.length > 0 ? images[0] : '');
  const [sizes, setSizes] = useState(null);
  const [colors, setColors] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    if (attributes) {
      let sizeAttributes = attributes.find(
        (element) => element.name === 'size',
      );
      if (sizeAttributes) {
        let newSizes = [];
        sizeAttributes.options.forEach((size) => {
          newSizes.push(size.label);
        });
        setSizes(newSizes);
      }
      let colorAttributes = attributes.find(
        (element) => element.name === 'color',
      );
      if (colorAttributes) {
        let newColors = [];
        colorAttributes.options.forEach((color) => {
          newColors.push(color.label);
        });
        setColors(newColors);
      }
    }
  }, [attributes]);

  const handleOnClickSave = () => {
    setLoader(true);
    ProductsApi.saveProducts({productId: productId})
      .then((result) => {
        setLoader(false);
        setDialogMessage('Added to Favorites!');
        showDialog(true);
        setTimeout(() => {
          showDialog(false);
          setDialogMessage('');
        }, 2000);
      })
      .catch((error) => {
        setLoader(false);
        setDialogMessage('Something went wrong! Please try again later');
        showDialog(true);
        setTimeout(() => {
          showDialog(false);
          setDialogMessage('');
        }, 2000);
      });
  };

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
      }, 2000)
      .catch((error) => {
        console.log(error);
        return null;
      }, 2000);
  };

  const handleOnClickBag = async (size, color) => {
    setLoader(true);
    let variantId = await getVariantId(size, color);
    const data = {
      user_id: user.id,
      product_id: productId,
      quantity: 1,
    };
    if (variantId) data.variation_id = variantId;
    ToteApi.addToTote(data)
      .then((result) => {
        setLoader(false);
        setDialogMessage('Added to Bag!');
        showDialog(true);
        changeShowSize(false);
        setTimeout(() => {
          showDialog(false);
          setDialogMessage('');
        }, 2000);
      })
      .catch((error) => {
        setLoader(false);
        changeShowSize(false);
        setDialogMessage('Error occured while adding to bag!');
        showDialog(true);
        setTimeout(() => {
          showDialog(false);
          setDialogMessage('');
        }, 2000);
      });
  };

  const handleOnClickLoseIt = () => {
    setLoader(true);
    const data = {
      userId: user.id,
      productId: productId,
    };
    ProductsApi.removeFromMatches(data)
      .then((result) => {
        setLoader(false);
        setDialogMessage('Not your Style? Got it!');
        showDialog(true);
        changeShowSize(false);
        setTimeout(() => {
          showDialog(false);
          setDialogMessage('');
        }, 2000);
      })
      .catch((error) => {
        setLoader(false);
        changeShowSize(false);
        setDialogMessage('Error occured while removing from Tote!');
        showDialog(true);
        setTimeout(() => {
          showDialog(false);
          setDialogMessage('');
        }, 2000);
      });
  };

  return (
    <View style={styles.containerCardItem}>
      <Spinner visible={spinner} />
      <CustomDialog modalVisible={dialog} message={dialogMessage} />
      <ScrollView>
        <View style={{height: fullHeight - 130}}>
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
          <TouchableOpacity
            style={{
              bottom: 40,
              left: 10,
              backgroundColor: 'white',
              width: 35,
              padding: 5,
              borderRadius: 18,
            }}
            onPress={() => {
              if (images && images.length > 0) showSuggestionDialog(true);
            }}>
            <Image source={Similar} style={similarIconStyle} />
          </TouchableOpacity>
          <Text style={styles.nameCardItem}>{name}</Text>
          <Text style={styles.priceCardItem}>{'$ ' + (price || '0')}</Text>
        </View>
        <View style={{height: 80}}>
          {showSize && (
            <View style={styles.actionsCardItem}>
              <View style={styles.button}>
                <Text style={styles.flash}>Select Size : </Text>
              </View>
              <View
                style={{
                  width: 220,
                  height: 50,
                  borderWidth: 1,
                  borderColor: 'black',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {sizes.map((size) => {
                  return (
                    <TouchableOpacity
                      style={styles.sizeButton}
                      onPress={() => {
                        setSelectedSize(size);
                        if (colors) changeShowColor(true);
                        else handleOnClickBag(size, selectedColor);
                      }}>
                      <Text>{size}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
          {showColor && (
            <View style={styles.actionsCardItem}>
              <View style={styles.button}>
                <Text style={styles.flash}>Select Color : </Text>
              </View>
              <View
                style={{
                  width: 220,
                  height: 50,
                  borderWidth: 1,
                  borderColor: 'black',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {colors.map((color) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedColor(color);
                        handleOnClickBag(selectedSize, color);
                      }}
                      style={styles.sizeButton}>
                      <Text>{color}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* ACTIONS */}
          {!showSize && !showColor && (
            <View style={styles.actionsCardItem}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (sizes) {
                    changeShowSize(true);
                  } else if (colors) {
                    changeShowColor(true);
                  } else {
                    handleOnClickBag(selectedSize, selectedColor);
                  }
                }}>
                <Text style={styles.flash}>Bag It</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleOnClickSave}
                style={{...styles.button, marginHorizontal: 10}}>
                <Text style={styles.flash}>Save It</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleOnClickLoseIt}
                style={styles.button}>
                <Text style={styles.flash}>Lose It</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <PopupDialog
          visible={suggestionDialog}
          containerStyle={{justifyContent: 'flex-end'}}
          height={280}
          width={fullWidth}
          onTouchOutside={() => {
            showSuggestionDialog(false);
          }}
          dialogTitle={<DialogTitle title="Images" />}>
          <DialogContent>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              pagingEnabled>
              {images.map((img) => {
                return (
                  <Image
                    source={
                      img
                        ? {
                            uri: img,
                          }
                        : NoImage
                    }
                    style={similarImageStyle}
                  />
                );
              })}
            </ScrollView>
          </DialogContent>
        </PopupDialog>
      </ScrollView>
    </View>
  );
};

export default CardItem;
