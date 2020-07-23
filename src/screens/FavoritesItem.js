import React from 'react';
import styles from '../assets/styles';
import NoImage from '../assets/images/noImage.png'
import { Text, View, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import * as ToteAction from '../actions/ToteAction';

const FavoritesItem = ({
  productId,
  actions,
  description,
  images,
  matches,
  name,
  onPressLeft,
  onPressRight,
  price,
  variant
}) => {
  // Custom styling
  const fullWidth = Dimensions.get('window').width;
  const imageStyle = [
    {
      borderRadius: 8,
      width: variant ? fullWidth / 2 - 30 : fullWidth - 80,
      height: variant ? 170 : 350,
      margin: variant ? 0 : 20
    }
  ];

  const nameStyle = [
    {
      paddingTop: 10,
      paddingLeft: 5,
      paddingRight: 5,
      paddingBottom: 2,
      color: '#363636',
      fontSize: 15
    }
  ];
  const image = images.length > 0 ? images[0] : ''

  const handleAddToTote = () => {
    const data = {
      "product_id": productId,
      "quantity": 1
    }
    ToteAction.addToTote(data)
      .then((result) => {

      })
      .catch((error) => {
        Alert.alert('Invalid User name or Password', 'Please enter valid user name and password')
      })
  }

  return (
    <View style={styles.favoritesCardItem}>
      <Image source={image ? {
        uri: image,
      } : NoImage}
        style={imageStyle} />
      <View style={styles.favoritesDescriptionContainer}>
        <Text style={nameStyle}>{name}</Text>
        <Text style={nameStyle}>{'$ ' + price}</Text>
      </View>
      <TouchableOpacity style={styles.addToToteButton} onPress={handleAddToTote}>
        <Text style={styles.text}>Add to Tote</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FavoritesItem;