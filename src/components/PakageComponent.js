import React from 'react'
import { StyleSheet, Text, View,Pressable } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign'
import AppContext from '../context/AppContext'

const PakageComponent = ({name,press}) => {
    const {lang} = React.useContext(AppContext)
 
    return (
        <Pressable onPress={press} style={{flexDirection:'row',
        minHeight:hp('12%'),
        width:wp('89%'),
        borderWidth:1,
        borderColor:'#fff',
        marginVertical:10,
        borderRadius:15,
        alignItems:'center',
        alignSelf:'center'
        }}>
            <Text style={styles.titlw}>{name}</Text>
           <View style={styles.blueCircle}>
               <View style={styles.whiteCircle}> 
                   <AntDesign name={lang == 'en' ? "arrowright" : 'arrowleft'} size={25}></AntDesign>
               </View>
           </View>
        </Pressable>
    )
}

export default PakageComponent

const styles = StyleSheet.create({
    blueCircle:{
        width:hp('10%'),
        backgroundColor:'#1755c6',
        height:hp('10%'),
        borderRadius:hp('10%'),
        position:'absolute',
        right:wp('-4%'),
        flexDirection:'row',
        alignItems:'center',justifyContent:'center'
    },
    whiteCircle:{
        width:hp('7.5%'),
        backgroundColor:'#fff',
        height:hp('7.5%'),
        borderRadius:hp('7.5%'),
        flexDirection:'row',
        alignItems:'center',justifyContent:'center'
    },
    titlw:{
        color:'#fff',fontSize:hp('2.2%'),
        marginLeft:20,
        width:'80%',
        flexWrap:'wrap',
        textAlign:'left'
    }
})
