import React,{useContext,useState} from 'react'
import { ScrollView, StyleSheet, Text, View ,ToastAndroid} from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import CustomButton from '../../components/CustomButton';
import AuthContext from '../../navigation/Auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BlueHeader from '../../components/BlueHeader';
import AuthHeader from '../../components/AuthHeader';
import Toast from 'react-native-simple-toast';

const ForgetPass = ({route,navigation}) => {
    const { signIn } = useContext(AuthContext)  
    const {otp} = route.params;
    const [text, setText] = useState('')
    const CheckOTP = async() =>{
      console.log(otp)
        if(otp == text){
            //console.log('match')
            signIn('123')
        await AsyncStorage.setItem('USER_TOKEN', '123')
        }else{
          Toast.show('Please enter valid OTP.',Toast.LONG)
        }
        
    }
    return (
        <ScrollView>
            <BlueHeader showback={false} text=""></BlueHeader>
            <AuthHeader head="enter_otp" desp="login_with"></AuthHeader>
           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
           <OTPInputView
                style={{width: '80%', height: 100,alignSelf:'center'}}
                pinCount={4}
                autoFocusOnLoad 
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled = {(code => {
                    setText(code)
                })}
            />
            
           </View>
            <View style={{width:'95%',alignSelf:'center',marginTop:30}}>
            <CustomButton press={()=>{CheckOTP()}} is_pri={true} text="submit"></CustomButton>
            </View>
        </ScrollView>
    )
}

export default ForgetPass

const styles = StyleSheet.create({
    borderStyleBase: {
      width: 30,
      height: 45
    },
   
    borderStyleHighLighted: {
      borderColor: "#03DAC6",
    },
   
    underlineStyleBase: {
      width: 30,
      height: 45,
      borderWidth: 0,
      borderBottomWidth: 1,
      color:'#000'
    },
   
    underlineStyleHighLighted: {
      borderColor: "#03DAC6",
      color:'#000'
    },
  });