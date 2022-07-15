import React from 'react'
import { StyleSheet, Text, View,Linking } from 'react-native'
import LightBlueHead from '../../components/BlueHeader';
import CustomButton from '../../components/CustomButton';

const ContactUs = ({navigation}) => {
    const contact = (type) =>{
       
        if(type == 'whatsapp'){
            let url = "whatsapp://send?phone=971555199899";
            Linking.openURL(url)
            .then(data => {
              console.log("WhatsApp Opened successfully " + data);  //<---Success
            })
            .catch(() => {
              alert("Make sure WhatsApp installed on your device");  //<---Error
            });
        }else{
            Linking.openURL(`tel:8002827`)
        }
    }
    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>

            <LightBlueHead press={()=>navigation.goBack()}  showback={true} text="contact"></LightBlueHead>
            <Text style={{width:'90%',textAlign:'center',alignSelf:'center',marginVertical:30,fontSize:20}}>For any complaints and booking related queries kindly Call or Chat with us</Text>
            <View style={{width:'95%',alignSelf:'center'}}>
            <CustomButton isloading={false} press={()=>{contact('whatsapp')}} is_pri={true} text="chat_with_us"></CustomButton>
            </View>
            <View style={{width:'95%',alignSelf:'center'}}>
            <CustomButton isloading={false} press={()=>{contact('phone')}} is_pri={true} text="call_us"></CustomButton>
            </View>
        </View> 
    )
}

export default ContactUs

const styles = StyleSheet.create({})
