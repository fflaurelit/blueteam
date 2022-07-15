import React,{useContext} from 'react'
import { StyleSheet, Text, View,ActivityIndicator,TouchableOpacity } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../constant/colors'
import Ripple from 'react-native-material-ripple';
import i18n from '../i18n'
import AppContext from '../context/AppContext'

const CustomButton = ({text,press,is_pri,isloading}) => {
    const {lang} = useContext(AppContext)

    return (
        <TouchableOpacity onPress={press} style={{width:'100%',
        height:hp('6.5%'),
        backgroundColor:is_pri == true ? colors.darkBlue : colors.grey,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10,
        borderRadius:5,
       
        }}>
            {isloading == true ? (<ActivityIndicator size={30} color={is_pri?'#fff':'#000'}></ActivityIndicator>) : ( <Text style={{color:is_pri == true ? '#fff' : '#000',fontSize:hp('2.6%')}}>{i18n.t(text, { locale: lang })}</Text>)}
           
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({})
