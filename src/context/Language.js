import React,{useContext} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import I18n from '../i18n';
import AppContext from './AppContext'

const Language = () => {
    const { setUser,setUserId,lang } = useContext(AppContext)   
    const changelang = (text) =>{
       return I18n.t(text, { locale: lang })
    }
    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default Language

const styles = StyleSheet.create({})
