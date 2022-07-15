import React,{useState,useContext} from 'react'
import { StyleSheet, Text, View,Pressable,ScrollView } from 'react-native'
import BlueHeader from '../../components/BlueHeader';
import AuthHeader from '../../components/AuthHeader';
import CustomButton from '../../components/CustomButton';
import APL from 'react-native-vector-icons/SimpleLineIcons'
import CustomPhone from '../../components/CustomPhone';
import api from '../../constant/ApiCall'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import Donthave from '../../components/Donthave';

const Login = ({navigation}) => { 
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState('') 
    const [ee, setemailerr] = useState(false)
    const LoginFun = async() =>{
        console.log(phone)
        if(phone != ''){ 
                let otp = Math.floor(1000 + Math.random() * 9000);
                setLoading(true)
                api.post('/api.php?action=sendLoginSMS', {
                    phone: phone,
                    otp:otp,
                    last_four:phone.substring(phone.length - 4)
                })
                .then(response => {
                    console.log(response.data)
                if(response.status == 200){
                    console.log(otp)
                   if(response.data.status == '400'){
                    Toast.show('Please enter valid phone number.',Toast.LONG)
                   }else if(response.data.status == '500'){
                    navigation.navigate('RegisterWhenNotExist',{phone:phone})
                    Toast.show('User Does Not Exist. Register Now !!',Toast.LONG)
                   }else{
                    savData(response.data.data)
                    navigation.navigate('ForgetPass',{otp:otp})
                   
                   
                   }
                  
                }
            })
                .then().finally(()=>{
                    setLoading(false)
                })
           
            
        }else{
           
           phone == '' ? setemailerr(true):setemailerr(false)
            Toast.show('Please enter required fields',Toast.LONG)
        }
       
      }
    //   async function LoginFun() {
    //     let otp = Math.floor(1000 + Math.random() * 9000);
    //     try {
    //     let response = await fetch(
    //         'http://185.241.124.114/admin/api.php?action=getCategory'
    //     );
      
    //     console.log(await response);
        
    //     } catch (error) {
    //     console.error(error);
    //     }
    //     }
      const savData = async(data)=>{
        
        await AsyncStorage.setItem('USER', JSON.stringify(data))
        
      }
    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <BlueHeader showback={false} text=""></BlueHeader>
            <AuthHeader head="login" desp="login_with"></AuthHeader>
        
            <CustomPhone onChange={(text)=>{
                setPhone(text)
                setemailerr(false)
            }}  style={{borderBottomColor:ee == true ? 'red' : '#000'}}  placeholder="phone" icon={<APL size={30} name="phone"></APL>}></CustomPhone>

         
            <View style={{width:'95%',alignSelf:'center'}}>
            <CustomButton isloading={loading} press={LoginFun} is_pri={true} text="login"></CustomButton>
            </View>
            <Donthave press={()=>navigation.navigate('Register')} title="already_login_page" subtitle="signup"></Donthave>

            </ScrollView>
            </KeyboardAwareScrollView>
           
      
        
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    langText:{
        fontSize:20,
        alignSelf:'center',
        fontWeight:'bold'
    }
})
