import React from 'react'
import { StyleSheet, Text, View ,Linking} from 'react-native'
import LightBlueHead from '../../components/LightBlueHead';
import CustomButton from '../../components/CustomButton';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import i18n from '../../i18n'
import AppContext from '../../context/AppContext'
const ThankYou = ({route,navigation}) => {
    const {lang} = React.useContext(AppContext)
     return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
        <LightBlueHead press={()=>navigation.navigate('Home')} text="thankyou"></LightBlueHead>
        <View style={styles.card}>
            <View style={styles.row}>
                <Text style={styles.head}>{i18n.t('booking_failed', { locale: lang })}</Text>
              <Text style={styles.subhead} >{i18n.t('try_again', { locale: lang })}</Text>
            </View> 
           
        </View>
         
        <View style={{flexDirection:'row'}}>
              <View style={styles.col}>
                  <CustomButton press={()=>{
           Linking.openURL(`whatsapp://send?phone=971555199899`)

        }}  is_pri={true} text="chat_with_us"></CustomButton>
              </View>
              <View style={styles.col}>
                  <CustomButton press={()=>{
                      Linking.openURL(`tel:971555199899`)
                  }} text="call_us"></CustomButton>
              </View>
          </View>
          <View style={{flexDirection:'row',justifyContent:'center'}}>
              <View style={styles.col}>
                  <CustomButton press={()=>navigation.navigate('Home')} is_pri={false} text="go"></CustomButton>
              </View>
              
          </View>
  </View>
    )
}

export default ThankYou

const styles = StyleSheet.create({
    col:{
        flexDirection:'column',
        paddingHorizontal:10,
        width:'50%',
        alignItems:'center'
    },
    card:{
    
        width:'90%',
        height:heightPercentageToDP('25%'),
        backgroundColor:'#fff',
        alignSelf:'center',
        marginVertical:30,
        padding:15,
        borderRadius:10,
        borderStyle:'dashed',
        borderWidth:2
    },
    head:{
        fontWeight:'bold',
        fontSize:heightPercentageToDP('2.5%'),
        color:'red',
        alignSelf:'center'
    },
    subhead:{
        fontSize:heightPercentageToDP('2.5%'),
        color:'#000',
        alignSelf:'center',marginTop:30
    },
    row:{
        justifyContent:'center',
        width:'100%',
        marginVertical:4,
        alignItems:'center'
    }
})
