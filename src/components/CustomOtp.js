import React from 'react'
import { StyleSheet, Text, View,TextInput } from 'react-native'

const CustomInput = ({placeholder,icon,security=false,change}) => {
    return (
        <View style={{marginVertical:15,flexDirection:'row',height:50,borderBottomWidth:1,width:'90%',alignSelf:'center',alignItems:'center'}}>
            {icon}
            <TextInput onChangeText={change} maxLength={4} keyboardType="number-pad" style={{height:50,width:'90%',marginLeft:10}} placeholder={placeholder}></TextInput>
        </View>
    )
}

export default CustomInput

const styles = StyleSheet.create({})
