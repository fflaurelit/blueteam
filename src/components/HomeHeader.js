import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FEA from 'react-native-vector-icons/Feather'

const HomeHeader = ({onnoti,oncontact}) => {
    return (
        <View style={{flexDirection:'row',height:hp('10%'),backgroundColor:'#fff',width:'100%',alignItems:'center',justifyContent:'space-between',paddingHorizontal:10}}>
            <Image style={{width:wp('40%'),resizeMode:'contain'}} source={require('../assets/gfgf.png')}></Image>
            <View style={{flexDirection:'row'}}>
                <AntDesign  onPress={oncontact} style={{marginHorizontal:5}} name="customerservice" size={40}></AntDesign>
                <AntDesign style={{marginHorizontal:5}} name="shoppingcart" size={40}></AntDesign>
                <Ionicons  onPress={onnoti} style={{marginHorizontal:5}} name="notifications-outline" size={40}></Ionicons>
            </View>
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({})
