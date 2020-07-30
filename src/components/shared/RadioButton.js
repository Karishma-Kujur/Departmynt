import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import Selected from '../../assets/images/selected.png'
import UnSelected from '../../assets/images/unselected.png'
import NoImage from '../../assets/images/noImage.png'

const RadioButtonComponent = (props) => {
    const { items, selectedAnswer, setAnswer, selectedId, changeSelectedId } = props
    const fullWidth = Dimensions.get('window').width;

    const imageStyle = [
        {
            alignItems: 'flex-start',
            width: 20,
            height: 20,
            borderRadius: 10
        }
    ];

    const answerImageStyle = [
        {
            width: fullWidth / 2 - 20,
            height: 200,
            marginLeft: 20,
            borderRadius: 8,
        }
    ];

    return (
        <View>
            {items.map((item) => {
                return (
                    <TouchableOpacity onPress={() => {
                        changeSelectedId(item.id)
                            setAnswer(item)
                        }
                        }>
                            <View style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 10 }}>
                            {selectedId === item.id ?
                                <Image source={Selected} style={imageStyle} /> :
                                <Image source={UnSelected} style={imageStyle} />}
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
export default RadioButtonComponent