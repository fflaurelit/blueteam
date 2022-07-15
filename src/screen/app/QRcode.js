import React,{useEffect,useContext,useState} from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign'
import AppContext from '../../context/AppContext'
 
const QRcode = ({navigation}) => {
    const {user,lang} = useContext(AppContext)
    const [qrurl, setQR] = useState('')
    useEffect(() => {
       setQR(user.qrcode)
    },[])
  
    return (
        <View style={{flex:1,backgroundColor:'#000'}}>
            <View style={{flexDirection:'row',height:60,alignItems:'center',paddingHorizontal:10}}>
            <AntDesign onPress={()=>navigation.goBack()} name={lang == 'en' ?'arrowleft':'arrowright'} color="#fff" size={35}></AntDesign>
            <Text style={{color:'#fff',fontSize:20,marginLeft:10}}>QR Code</Text>
            </View>
            <Image style={{width:wp('90%'),height:hp('80%'),resizeMode:'contain',alignSelf:'center'}} source={{uri:qrurl}}></Image>
        </View>
    )
}

export default QRcode

const styles = StyleSheet.create({})
 