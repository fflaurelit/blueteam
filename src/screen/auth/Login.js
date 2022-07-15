import React,{useState,useContext} from 'react'
import { StyleSheet, Text, View,ScrollView,I18nManager } from 'react-native'
import BlueHeader from '../../components/BlueHeader';
import AuthHeader from '../../components/AuthHeader';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import APL from 'react-native-vector-icons/SimpleLineIcons'
import Donthave from '../../components/Donthave';
import api from '../../constant/ApiCall'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../navigation/Auth'
import i18n from '../../i18n'
import AppContext from '../../context/AppContext';
import Ripple from 'react-native-material-ripple';
import Toast from 'react-native-simple-toast';

 
const Login = ({navigation}) => { 
    const [phone, setPhone] = useState('')
    const [passwword, setPassword] = useState('')
    const [loading, setLoading] = useState('')
    const { signIn } = useContext(AuthContext)  
    const {lang,setLang} = useContext(AppContext)
  
    const LoginFun = async() =>{
        if(phone != '' || passwword != ''){
            setLoading(true)
            api.post('/api.php?action=login', {
                phone: phone,
                password:passwword
            })
            .then(response => {if(response.status == 200){
               if(response.data.status == '400'){
                Toast.show('Invalid Credentials.',Toast.LONG)
               }else{
               
                Toast.show('Login Success',Toast.LONG)
                savData(response.data.data)
               
               }
              
            }})
            .then().finally(()=>{
                setLoading(false)
            })
        }else{
            Toast.show('Please enter phone number and password',Toast.LONG)
        }
        
      }
      const savData = async(data)=>{ 
        await AsyncStorage.setItem('USER_TOKEN', '123')
        await AsyncStorage.setItem('USER', JSON.stringify(data))
        signIn('123') 
      } 
    return ( 
        <View style={{flex:1,backgroundColor:'#fff'}}>
                  <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <BlueHeader showback={false} text=""></BlueHeader>
                    <AuthHeader head="login" desp="login_with"></AuthHeader>
                    <CustomInput onChange={setPhone}  placeholder="email" icon={<APL size={30} name="envelope"></APL>}></CustomInput>
                    <CustomInput onChange={setPassword} security={true} placeholder="password" icon={<APL size={30} name="lock"></APL>}></CustomInput>
                    <View style={{width:'90%',alignSelf:'center',marginTop:'10%'}}>
                    <CustomButton isloading={loading} press={LoginFun} is_pri={true} text="login"></CustomButton>
                    <CustomButton isloading={loading} press={()=>navigation.navigate('LoginWithPhone')} is_pri={true} text="login_with_otp"></CustomButton>
                    <Donthave press={()=>navigation.navigate('Register')} title="already_login_page" subtitle="signup"></Donthave>
                    </View>
                    
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
