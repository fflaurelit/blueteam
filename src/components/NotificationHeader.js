import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../constant/colors'
const NotificationHeader = ({text}) => {
    return (
        <View style={{width:'100%',minHeight:hp('7%'),backgroundColor:colors.darkBlue,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'#fff',textAlign:'center'}}>{text}</Text>
        </View>
    )
} 

export default NotificationHeader

const styles = StyleSheet.create({})
