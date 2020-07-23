import React from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../assets/styles';

const SurveyItem = ({
    actions,
    description,
    image,
    matches,
    name,
    onPressLeft,
    onPressRight,
    variant,
    isSelected,
    setSelection
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
            paddingTop: variant ? 10 : 15,
            paddingBottom: variant ? 5 : 7,
            color: '#363636',
            fontSize: variant ? 15 : 30
        }
    ];

    return (
        <View style={styles.favoritesCardItem}>
            <Image source={image} style={imageStyle} />
            <Text style={nameStyle}>{name}</Text>
            {description && (
                <Text style={styles.descriptionCardItem}>{description}</Text>
            )}

        </View>
    );
};

export default SurveyItem
