import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import Checked from '../../assets/images/checked.png'
import UnChecked from '../../assets/images/unchecked.jpeg'
import NoImage from '../../assets/images/noImage.png'

const MultiSelect = (props) => {
    const { items, selectedId, changeSelectedId } = props
    const fullWidth = Dimensions.get('window').width;

    const imageStyle = [
        {
            alignItems: 'flex-start',
            width: 20,
            height: 20,
        }
    ];

    const answerImageStyle = [
        {
            width: fullWidth / 2 - 20,
            height: 200,
            margin: 2,
            borderRadius: 8,
        }
    ];

    return (
        <View>
            {items.map((item) => {
                return (
                    <TouchableOpacity onPress={() => {
                        let ids = [...selectedId || []]
                            if (ids.includes(item.id)) {
                                ids = ids.filter(id =>
                                    id !== item.id
                                )
                            } else {
                                ids.push(item.id)
                            }
                            changeSelectedId(ids)
                        }
                        }>
                            <View style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 15 }}>
                            {selectedId && selectedId.includes(item.id) ?
                                <Image source={Checked} style={imageStyle} /> :
                                <Image source={UnChecked} style={imageStyle} />}
                        {item.answerType === 'image' ?
                            <Image source={item.answer ? {
                                uri: item.answer,
                            } : NoImage}
                            style={answerImageStyle} /> :
                            <Text style={{ fontSize: 16, marginLeft: 5, marginRight: 10 }}>{item.answer}</Text>
                        }
                    </View>
                        </TouchableOpacity>
                )
            })}
        </View>
    )
}
export default MultiSelect