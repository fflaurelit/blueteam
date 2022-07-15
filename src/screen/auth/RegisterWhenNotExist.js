import React,{useState,useContext} from 'react'
import { StyleSheet, Text, View,Pressable,ScrollView } from 'react-native'
import BlueHeader from '../../components/BlueHeader';
import AuthHeader from '../../components/AuthHeader';
import CustomButton from '../../components/CustomButton';
import Ripple from 'react-native-material-ripple'; 
import CustomInput from '../../components/CustomInput';
import ANT from 'react-native-vector-icons/AntDesign'
import APL from 'react-native-vector-icons/SimpleLineIcons' 
import CustomPhone from '../../components/CustomPhone';
import Donthave from '../../components/Donthave'; 
import api from '../../constant/ApiCall'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../navigation/Auth'
import Toast from 'react-native-simple-toast';

const Login = ({route,navigation}) => {
    const {phone} = route.params;
    // const [phone, setPhone] = useState('')
    const [passwword, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [cpassword, setCPassword] = useState('')
    const [loading, setLoading] = useState('') 
    const { signIn } = useContext(AuthContext)  
    const [ne, setnameerr] = useState(false)
    const [ee, setemailerr] = useState(false)
    const [pe, setpasserr] = useState(false)
    const [cperr, setcpasserr] = useState(false)
    const LoginFun = async() =>{
        if(phone != '' &&  name != ''){
            //if(passwword == cpassword){
                let otp = Math.floor(1000 + Math.random() * 9000);
                setLoading(true)
                api.post('/api.php?action=sendSMS', {
                    phone: phone,
                    otp:otp 
                })
                .then(response => {
                    if(response.status == 200){
                      
                   if(response.data.status == '500'){
                    Toast.show('User Already Exist.',Toast.LONG)
                   }else if(response.data.status == '400'){
                    Toast.show('Error sending message.kindly check phone number',Toast.LONG)
                   }else{                
                    navigation.navigate('Otp',{data:{
                        name:name,
                        email:email,
                        phone:phone,
                        password:passwword,
                        near_by: "", 
                        address_link: "",
                        house_no: "",
                        otp:otp
                    }})
                    
                   
                   }
                  
                }})
                .then().finally(()=>{
                    setLoading(false)
                })
            // }else{
            //     Toast.show('Password Donot Match',Toast.LONG)
            // }
            
        }else{
           name == '' ? setnameerr(true):setnameerr(false)
           phone == '' ? setemailerr(true):setemailerr(false)
        //    passwword == '' ? setpasserr(true):setpasserr(false)
        //    cpassword == '' ? setcpasserr(true):setcpasserr(false)
            Toast.show('Please enter required fields',Toast.LONG)
        }
       
      }
    //   const savData = async(data)=>{
    //     await AsyncStorage.setItem('USER_TOKEN', '123')
    //     await AsyncStorage.setItem('USER', JSON.stringify(data))
    //     signIn('123')
    //   }
    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
               <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true}>
               <ScrollView showsVerticalScrollIndicator={false}>
            <BlueHeader showback={false} text=""></BlueHeader>
            <AuthHeader head="register" desp="Createandaccount"></AuthHeader>
            <CustomInput style={{borderBottomColor:ne == true ? 'red' : '#000'}} onChange={(text)=>{
                setName(text)
                setnameerr(false)
            }} placeholder="name" icon={<ANT size={30} name="user"></ANT>}></CustomInput>
            {/* <CustomInput  onChange={setEmail} placeholder="email" icon={<APL size={30} name="envelope"></APL>}></CustomInput> */}
            <CustomPhone  disabled={false} value={phone} style={{borderBottomColor:ee == true ? 'red' : '#000'}}  placeholder="phone" icon={<APL size={30} name="phone"></APL>}></CustomPhone>

            {/* <CustomInput onChange={(text)=>{
                setPassword(text)
                setpasserr(false)
            }}  style={{borderBottomColor:pe == true ? 'red' : '#000'}} security={true} placeholder="password" icon={<APL size={30} name="lock"></APL>}></CustomInput>
            <CustomInput onChange={(text)=>{
                setCPassword(text)
                setcpasserr(false) 
            }} style={{borderBottomColor:cperr == true ? 'red' : '#000'}}  security={true} placeholder="confirm" icon={<APL size={30} name="lock"></APL>}></CustomInput> */}
            <View style={{width:'95%',alignSelf:'center'}}>
            <CustomButton isloading={loading} press={()=>{LoginFun()}} is_pri={true} text="signup"></CustomButton>
            <Donthave title="dont_signup" press={()=>navigation.navigate('LoginWithPhone')} subtitle="login"></Donthave>
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
