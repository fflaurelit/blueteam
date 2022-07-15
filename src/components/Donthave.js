import React from 'react'
import {  StyleSheet, Text, View ,Pressable} from 'react-native'
import { sub } from 'react-native-reanimated';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppContext from '../context/AppContext'
import i18n from '../i18n'
const Donthave = ({title,subtitle,press}) => {
    const {lang} = React.useContext(AppContext)
    return (
        <View style={{flexDirection:'row',justifyContent:'center',marginVertical:40}}>
            <Text style={{fontSize:hp('2.5%')}}>{i18n.t(title, { locale: lang })}</Text>
            <Pressable onPress={press}><Text style={{fontSize:hp('2.5%'),color:'#3173e6',marginLeft:10}}>{i18n.t(subtitle, { locale: lang })}</Text></Pressable>
        </View>
    )
}

export default Donthave

const styles = StyleSheet.create({})
