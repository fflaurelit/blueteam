import React from 'react'
import { StyleSheet, Text, View ,Linking} from 'react-native'
import LightBlueHead from '../../components/LightBlueHead';
import CustomButton from '../../components/CustomButton';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import i18n from '../../i18n'
import AppContext from '../../context/AppContext'

const Failed = ({route,navigation}) => {
   
     const {lang} = React.useContext(AppContext)

     return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
        <LightBlueHead press={()=>navigation.navigate('Home')} text="thankyou"></LightBlueHead>
       <Text style={{color:'red',fontSize:20,margin:20}}>Booking Failed. If payment is deducted from you account please contact below.</Text>
        
        <View style={{flexDirection:'row'}}>
              <View style={styles.col}>
                  <CustomButton press={()=>{
           Linking.openURL(`whatsapp://send?phone=971555199899`)

        }}  is_pri={true} text="chat_with_us"></CustomButton>
              </View>
              <View style={styles.col}>
                  <CustomButton press={()=>{
                      Linking.openURL(`tel:8002827`)
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

export default Failed

const styles = StyleSheet.create({
    col:{
        flexDirection:'column',
        paddingHorizontal:10,
        width:'50%',
        alignItems:'center'
    },
    card:{
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,  
        // elevation: 5,
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
        color:'#000'
    },
    subhead:{
        fontSize:heightPercentageToDP('2.5%'),
        color:'#000'
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        marginVertical:4
    }
})
