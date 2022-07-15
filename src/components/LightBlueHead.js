import React,{useContext} from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../constant/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ripple from 'react-native-material-ripple';
import AppContext from '../context/AppContext'
import i18n from '../i18n'
const LightBlueHead = ({press,showback=true,text}) => {
    const {lang} = useContext(AppContext)

    return (
       <View>
            <View style={{
            height:60, 
            backgroundColor:'#ebf6ff',
            flexDirection:'row',
            alignItems:'center',
            paddingHorizontal:10
        }}>
           {showback == true && ( <Ripple onPress={press} style={{width:60,height:60,alignItems:'center',justifyContent:'center'}}>
            <AntDesign name={lang == 'en' ?'arrowleft':'arrowright'} size={25}></AntDesign>
            </Ripple>
           )}
            <Text style={styles.head}>{i18n.t(text, { locale: lang })}</Text>
        </View>
        <Image source={require('../assets/header2.png')} style={{width:'100%',height:70,resizeMode:'cover'}}></Image>
       </View>
    )
}

export default LightBlueHead

const styles = StyleSheet.create({
    head:{
        fontSize:18
    }
})
