import React from 'react'
import { StyleSheet, Text, View,Pressable } from 'react-native'

const MapAddress = ({text,icon,press}) => {
    return (
        <Pressable onPress={press} style={{minWidth:100,
        height:35,
        borderWidth:1,
        borderColor:'#3880ff',
        borderRadius:5
        ,flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:5,marginHorizontal:5}}>
            {icon}<Text style={{marginHorizontal:10,color:'#3880ff',fontWeight:'bold'}}>{text}</Text>
        </Pressable>
    )
}

export default MapAddress

const styles = StyleSheet.create({})
