import React from 'react'
import { StyleSheet, Text, View,TextInput } from 'react-native'
import AppContext from '../context/AppContext'
import i18n from '../i18n'
const CustomInput = ({placeholder,icon,security=false,onChange,style,value,disabled=true}) => {
    const {lang} = React.useContext(AppContext)
    return (
        <View style={[{marginVertical:15,flexDirection:'row',height:50,borderBottomWidth:1,width:'90%',alignSelf:'center',alignItems:'center'},style]}>
            {icon}<Text style={{marginLeft:5}}>971</Text>
            <TextInput editable={disabled} value={value} onChangeText={onChange} keyboardType="number-pad" style={{height:50,width:'80%',marginLeft:10,textAlign:lang == 'en' ? 'left' : 'right',color:'#000'}} placeholder={i18n.t(placeholder, { locale: lang })}></TextInput>
        </View>
    ) 
}

export default CustomInput

const styles = StyleSheet.create({})
