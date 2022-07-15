import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LightBlueHead from '../../components/BlueHeader';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { heightPercentageToDP } from 'react-native-responsive-screen';

const Shop = () => {
    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <LightBlueHead showback={false} text="shop"></LightBlueHead>
            <Fontisto style={{alignSelf:'center',marginTop:heightPercentageToDP('10%')}} color="#b9dfff" size={heightPercentageToDP('20%')} name="shopping-bag-1"></Fontisto>
            <Text style={{alignSelf:'center',marginTop:heightPercentageToDP('10%'),fontSize:heightPercentageToDP('5%'),color:'#b9dfff'}}>Coming Soon</Text>
        </View>
    )
}

export default Shop

const styles = StyleSheet.create({})
