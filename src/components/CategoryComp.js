import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../constant/colors'
import Ripple from 'react-native-material-ripple';

const CategoryComp = ({name,img,press}) => {
    return (
        <Ripple onPress={press}>
<View style={{borderRadius:8,flexDirection:'column',width:wp('30%'),height:hp('20%'),backgroundColor:colors.darkBlue,marginHorizontal:wp('1.5%'),justifyContent:'center',alignItems:'center'}}>
            
            <View style={styles.whitecirl}>
           
            <Image style={{width:wp('12%'),height:wp('12%'),resizeMode:'contain'}} source={{uri:img}}></Image>
            
            </View>
            <Text style={styles.text}>{name}</Text>
           
           
        </View>
        </Ripple>
        
    )
}

export default CategoryComp

const styles = StyleSheet.create({
    whitecirl:{
        width:wp('20%'),
        height:wp('20%'),
        backgroundColor:'#fff',
        borderRadius:wp('20%'),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        color:'#fff',
        fontSize:hp('2%'),
        marginTop:10
    }
})
