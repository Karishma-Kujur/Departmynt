import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Picker } from 'react-native'

const CustomPicker = (props) => {
    const { onChange, value, items } = props
    return (
        <Picker style={styles.pickerStyle}
            selectedValue={value}
            onValueChange={(itemValue, itemPosition) =>
                onChange({ value: itemValue, choosenIndex: itemPosition })}
        >
            {items.map((item) => {
                return <Picker.Item label={item.label} value={item.value} />
            })}
        </Picker>
    )
}
export default CustomPicker
const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'black',
        marginBottom: 12,
        paddingVertical: 12,
        borderRadius: 4
    },
    pickerStyle: {
        height: 20,
        color: '#344953',
        justifyContent: 'center',
    }
})