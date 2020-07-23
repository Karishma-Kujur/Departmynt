import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Selected from '../../assets/images/selected.png'
import UnSelected from '../../assets/images/unselected.png'
import Checked from '../../assets/images/checked.png'
import UnChecked from '../../assets/images/unchecked.jpeg'

const AnswersComponent = (props) => {
    const { multiselect, value, items, selectedAnswer } = props
    const [selectedId, changeSelectedId] = useState(multiselect ? [selectedAnswer] : selectedAnswer)

    const imageStyle = [
        {
            alignItems: 'flex-start',
            width: 20,
            height: 20,
        }
    ];

    return (
        <View>
            {items.map((item) => {
                return (
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 10 }}>
                        {multiselect &&
                            <>
                                {selectedId.includes(item.id) ?
                                    <Image source={Checked} style={imageStyle} /> :
                                    <Image source={UnChecked} style={imageStyle} />}
                            </>
                        }
                        {!multiselect &&
                            <>
                                {selectedId === item.id ?
                                    <Image source={Selected} style={imageStyle} /> :
                                    <Image source={UnSelected} style={imageStyle} />}
                            </>}
                        <Text style={{ fontSize: 16, marginLeft: 5, marginRight: 10 }}>{item.answer}</Text>
                    </View>
                )
            })}
        </View>
    )
}
export default AnswersComponent