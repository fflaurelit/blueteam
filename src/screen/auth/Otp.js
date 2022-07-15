import React,{useState,useContext} from 'react'
import { StyleSheet, Text, View,ScrollView } from 'react-native'
import BlueHeader from '../../components/BlueHeader';
import AuthHeader from '../../components/AuthHeader';
import CustomButton from '../../components/CustomButton';
import CustomOtp from '../../components/CustomOtp';
import APL from 'react-native-vector-icons/SimpleLineIcons'
import api from '../../constant/ApiCall'
import AuthContext from '../../navigation/Auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

const Login = ({route,navigation}) => {
    const {data} = route.params
    const [entotp, setOtp] = useState('')
    const { signIn } = useContext(AuthContext) 
    const [loading, setLoading] = useState(false) 
  
    const LoginFun = async() =>{
        console.log(data.otp)
        if(data.otp == entotp){
            setLoading(true)
            api.post('/api.php?action=signupnew', data)
            .then(response => {
                if(response.status == 200){
                    savData(response.data.data)
                Toast.show('Registration Success',Toast.LONG)

                }
            })
            .then().finally(()=>{
                setLoading(false)
            })
        }else{
            Toast.show('Otp does not match',Toast.LONG)
        }

      }
      const savData = async(data)=>{ 
        await AsyncStorage.setItem('USER_TOKEN', '123')
        await AsyncStorage.setItem('USER', JSON.stringify(data))
        signIn('123') 
      } 
    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <BlueHeader showback={false} text=""></BlueHeader>
            <AuthHeader head="enter_otp" desp="enter_otp_received"></AuthHeader>
            <CustomOtp change={setOtp} placeholder="OTP"   icon={<APL size={30} name="screen-smartphone"></APL>}></CustomOtp>
          
            <View style={{width:'90%',alignSelf:'center'}}> 
            <CustomButton press={()=>{LoginFun()}} isloading={loading} is_pri={true} text="submit"></CustomButton>
            </View>
            </ScrollView>
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
