import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppContext from '../context/AppContext'
import i18n from '../i18n'
const AuthHeader = ({head,desp}) => {
    const {lang} = React.useContext(AppContext)

    return (
        <View style={{marginTop:hp('10%')}}> 
           <Text style={{fontSize:hp('3%'),color:'#000',textAlign:'center'}}>{i18n.t(head, { locale: lang })}</Text>
           <Text style={{fontSize:hp('2%'),color:'#a7a7a5',textAlign:'center',marginVertical:20}}>{i18n.t(desp, { locale: lang })}</Text>
        </View>
    )
}

export default AuthHeader

const styles = StyleSheet.create({
    desp:{
        color:'#a7a7a5'
    }
})
