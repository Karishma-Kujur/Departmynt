import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native';
import {
  View,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Button from '../components/shared/Button';
import styles from '../assets/styles';
import FavoritesItem from './ToteItem';
import * as ProductAction from '../actions/ProductAction';
import * as ProductApi from '../api/Products';
import AppLayout from '../components/shared/AppLayout';

const { width, height } = Dimensions.get('window');

const FavoritesScreen = (props) => {
  const { navigation, ProductAction, products, user, favorites } = props;
  const [spinner, setLoader] = useState('');

  const getFavoritesByProductId = (productIds) => {
    const favoriteItems = [];
    productIds.forEach((productId) => {
      let item = products.find((product) => product.id === Number(productId));
      if (item) favoriteItems.push(item);
    });
    return favoriteItems;
  };

  const getFavorites = () => {
    setLoader(true);
    ProductAction.setFavorites([]);
    ProductApi.getFavorites(user.id)
      .then((productIds) => {
        let favoriteItems = getFavoritesByProductId(productIds);
        setLoader(false);
        ProductAction.setFavorites(favoriteItems);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  const handleRefreshFavorites = () => {
    getFavorites();
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if(isFocused)
      getFavorites();
  }, [isFocused]);
  return (
    <AppLayout title={'Favorite'} spinner={spinner} openDrawer={() => { navigation.openDrawer() }}>
      <ScrollView>
        {favorites.length ? (
          <FlatList
            data={favorites}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <FavoritesItem
                  image={item.images && item.images[0]}
                  name={item.name}
                  price={item.price}
                  productId={item.id}
                  isFavorite={true}
                  toteEdited={handleRefreshFavorites}
                  user={user}
                />
              </TouchableOpacity>
            )}
          />
        ) : (
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height / 3,
              }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', width: '100%', textAlign: 'center'}}>
                {spinner ? '': 'No items added to Favorites!'}
            </Text>
            </View>
          )}
      </ScrollView>
      <View style={styles.bottom}>
        <Button
          label="View Tote"
          onPress={() => navigation.navigate('View Tote')}
        />
      </View>
    </AppLayout>
  );
};
const mapStateToProps = ({ products, user }) => {
  return {
    favorites: products.favorites || [],
    products: products.list,
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ProductAction: bindActionCreators(ProductAction, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);
